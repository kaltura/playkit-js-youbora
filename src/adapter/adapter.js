// @flow
import youbora from 'youboralib';
import {core} from 'kaltura-player-js';
const {Error, MediaType, DrmScheme} = core;

const DrmSchemeTitle = {
  FAIRPLAY: 'FairPlay',
  PLAYREADY: 'PlayReadyCENC',
  WIDEVINE: 'WidevineCENC',
  UNKNOWN: 'Clear'
};

declare var __VERSION__: string;
declare var __NAME__: string;

let YouboraAdapter = youbora.Adapter.extend({
  constructor: function (player, config) {
    this.config = config;
    YouboraAdapter.__super__.constructor.call(this, player);
  },

  /**  @returns {String} - current plugin version */
  getVersion: function () {
    return youbora.VERSION + '-' + __VERSION__ + '-' + __NAME__;
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function () {
    return this.player.currentTime;
  },

  /**  @returns {Number} - current playrate */
  getPlayrate: function () {
    return this.player.playbackRate;
  },

  /**  @returns {Number} - video duration */
  getDuration: function () {
    return this.player.duration || null;
  },

  /**  @returns {Number} - current bitrate */
  getBitrate: function () {
    let activeVideo = this.player.getActiveTracks().video;
    if (activeVideo && activeVideo.bandwidth) {
      return isNaN(activeVideo.bandwidth) ? null : activeVideo.bandwidth;
    }
    return null;
  },

  /**  @returns {String} - rendition */
  getRendition: function () {
    let activeVideo = this.player.getActiveTracks().video;
    if (activeVideo) {
      if (isNaN(activeVideo.bandwidth)) {
        return null;
      }
      return youbora.Util.buildRenditionString(activeVideo.width, activeVideo.height, activeVideo.bandwidth);
    }
    return null;
  },

  /**  @returns {String} - title */
  getTitle: function () {
    return this.config.entryName;
  },

  /**  @returns {Boolean} - true if live and false if VOD */
  getIsLive: function () {
    return this.config.entryType === MediaType.LIVE;
  },

  /**  @returns {String} - resource URL. */
  getResource: function () {
    return this.player.src;
  },

  /**  @returns {String} - player version */
  getPlayerVersion: function () {
    return this.config.playerVersion;
  },

  /**  @returns {String} - player's name */
  getPlayerName: function () {
    return this.config.playerName;
  },

  /** @returns {String} - Household identifier */
  getHouseholdId: function () {
    return this.config.householdId;
  },

  /**  @returns {String} - active drm scheme */
  getDrmScheme: function (): string {
    const activeDrmScheme: ?string = this.player.getDrmInfo()?.scheme;
    if (activeDrmScheme) {
      for (const [key, value] of Object.entries(DrmScheme)) {
        if (value === activeDrmScheme) {
          return DrmSchemeTitle[key];
        }
      }
    }
    return DrmSchemeTitle.UNKNOWN;
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function () {
    const Event = this.player.Event;
    this.references = {
      [Event.PLAY]: this.playListener.bind(this),
      [Event.LOAD_START]: this.loadListener.bind(this),
      [Event.PAUSE]: this.pauseListener.bind(this),
      [Event.PLAYING]: this.playingListener.bind(this),
      [Event.ERROR]: this.errorListener.bind(this),
      [Event.SEEKING]: this.seekingListener.bind(this),
      [Event.SEEKED]: this.seekedListener.bind(this),
      [Event.PLAYER_STATE_CHANGED]: this.stateChangeListener.bind(this),
      [Event.ENDED]: this.endedListener.bind(this),
      [Event.CHANGE_SOURCE_STARTED]: this.forceEndedListener.bind(this),
      [Event.SOURCE_SELECTED]: this.sourceSelectedListener.bind(this)
    };

    for (let key in this.references) {
      this.player.addEventListener(key, this.references[key]);
    }
  },

  sourceSelectedListener: function () {
    if (!this.player.isLive()) {
      this.monitorPlayhead(true, false, this.config.playheadMonitorInterval);
    }
    this.plugin.options['forceInit'] = this.player.isLive();
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function () {
    // unregister listeners
    if (this.player && this.references) {
      for (let key in this.references) {
        this.player.removeEventListener(key, this.references[key]);
      }
    }
    delete this.references;
  },

  /** @returns {void}
   * @param {Object} logger - playkit logger object.
   * - Bind youbora logs to playkit ones */
  bindLogger: function (logger) {
    youbora.Log.error = logger.error.bind(logger);
    youbora.Log.notice = logger.info.bind(logger);
    youbora.Log.warn = logger.warn.bind(logger);
    youbora.Log.debug = logger.debug.bind(logger);
    youbora.Log.verbose = function () {};
  },

  /** @returns {void} - Listener for 'load_start' event. */
  loadListener: function () {
    if (this.player.config.playback.preload !== 'auto') {
      this.playListener();
    }
  },

  /** @returns {void} - Listener for 'play' event. */
  playListener: function () {
    if (this.blockedByError) return;
    if (!this.flags.isStarted) {
      this.plugin.options['content.isLive.noSeek'] = !this.player.isDvr();
      this.initialPlayhead = this.getPlayhead();
    }
    this.fireStart();
  },

  /** @returns {void} - Listener for 'pause' event. */
  pauseListener: function () {
    this.firePause();
  },

  /** @returns {void} - Listener for 'playing' event. */
  playingListener: function () {
    this.plugin.options['content.drm'] = this.getDrmScheme();
    this.fireResume();
    this.fireSeekEnd();
    this.fireBufferEnd();
    this.fireJoin();
  },

  /** @returns {void}
   * @param {Object} error - object with payload including severity, code and data.
   * - The name of the plugin.- Listener for 'error' event. */
  errorListener: function (error) {
    if (this.blockedByError) return;
    if (error.payload.severity === Error.Severity.CRITICAL) {
      let categoryName = '';
      let codeName = '';
      for (let k in Error.Category) {
        if (Error.Category[k] === error.payload.category) {
          categoryName = k;
        }
      }
      for (let k in Error.Code) {
        if (Error.Code[k] === error.payload.code) {
          codeName = k;
        }
      }
      this.fireError(error.payload.code, {data: error.payload.data, msg: categoryName + ' ' + codeName});
      this.fireStop();
      this.blockedByError = true;
    }
  },

  /** @returns {void} - Listener for 'seeking' event. */
  seekingListener: function () {
    if (!this.flags.isBuffering && this.initialPlayhead !== this.getPlayhead()) {
      this.fireSeekBegin();
    }
  },

  /** @returns {void} - Listener for 'seeked' event. */
  seekedListener: function () {
    this.fireSeekEnd();
  },

  /** @returns {void}
   * @param {Object} e - object with the payload with states.
   * - Listener for 'player_state_changed' event. */
  stateChangeListener: function (e) {
    if (e.payload.newState.type === this.player.State.BUFFERING) {
      if (this.initialPlayhead !== this.getPlayhead()) {
        if (!this.player.isDvr() && this.getIsLive() && this.flags.isPaused) {
          return null;
        }
        this.fireBufferBegin();
      }
    }
    if (e.payload.oldState.type === this.player.State.BUFFERING) {
      this.fireBufferEnd();
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  endedListener: function () {
    if (!this.stopBlockedByAds) {
      this.fireStop();
      this.reset();
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  forceEndedListener: function () {
    this.fireStop();
    this.reset();
  },

  /** @returns {void} - Restores initial values to start new views */
  reset: function () {
    this.stopBlockedByAds = false;
    this.initialPlayhead = null;
    this.blockedByError = false;
    this.stopMonitor();
  }
});

export {YouboraAdapter};
