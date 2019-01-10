// @flow
import youbora from 'youboralib';
import {Error, MediaType} from '@playkit-js/playkit-js';

let YouboraAdapter = youbora.StandardAdapter.extend({
  constructor: function(player, config) {
    this.config = config;
    YouboraAdapter.__super__.constructor.call(this, player);
  },

  /**  @returns {String} - current plugin version */
  getVersion: function() {
    return youbora.VERSION + '-' + __VERSION__ + '-' + __NAME__;
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function() {
    return this.player.currentTime;
  },

  /**  @returns {Number} - current playrate */
  getPlayrate: function() {
    return this.player.playbackRate;
  },

  /**  @returns {Number} - video duration */
  getDuration: function() {
    return this.player.duration || null;
  },

  /**  @returns {Number} - current bitrate */
  getBitrate: function() {
    let activeVideo = this.player.getActiveTracks().video;
    if (activeVideo && activeVideo.bandwidth) {
      return isNaN(activeVideo.bandwidth) ? null : activeVideo.bandwidth;
    }
    return null;
  },

  /**  @returns {String} - rendition */
  getRendition: function() {
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
  getTitle: function() {
    return this.config.entryName;
  },

  /**  @returns {Boolean} - true if live and false if VOD */
  getIsLive: function() {
    return this.config.entryType === MediaType.LIVE;
  },

  /**  @returns {String} - resource URL. */
  getResource: function() {
    return this.player.src;
  },

  /**  @returns {String} - player version */
  getPlayerVersion: function() {
    return this.config.playerVersion;
  },

  /**  @returns {String} - player's name */
  getPlayerName: function() {
    return this.config.playerName;
  },

  /** @returns {String} - Household identifier */
  getHouseholdId: function() {
    return this.config.householdId;
  },

  /**  @returns {void} - Return a list of events and methods to suscribe from this.player. */
  getListenersList: function() {
    const Event = this.player.Event;
    return [
      {
        events: {
          [Event.PLAY]: this.playListener,
          [Event.LOAD_START]: this.loadListener,
          [Event.PAUSE]: this.pauseListener,
          [Event.PLAYING]: this.playingListener,
          [Event.ERROR]: this.errorListener,
          [Event.SEEKING]: this.seekingListener,
          [Event.SEEKED]: this.seekedListener,
          [Event.PLAYER_STATE_CHANGED]: this.stateChangeListener,
          [Event.ENDED]: this.endedListener,
          [Event.CHANGE_SOURCE_STARTED]: this.forceEndedListener
        }
      }
    ];
  },

  /** @returns {void}
   * @param {Object} logger - playkit logger object.
   * - Bind youbora logs to playkit ones */
  bindLogger: function(logger) {
    youbora.Log.error = logger.error.bind(logger);
    youbora.Log.notice = logger.info.bind(logger);
    youbora.Log.warn = logger.warn.bind(logger);
    youbora.Log.debug = logger.debug.bind(logger);
    youbora.Log.verbose = function() {};
  },

  /** @returns {void} - Listener for 'load_start' event. */
  loadListener: function() {
    if (this.player.config.playback.preload !== 'auto') {
      this.playListener();
    }
  },

  /** @returns {void} - Listener for 'play' event. */
  playListener: function() {
    if (this.blockedByError) return;
    if (!this.flags.isStarted) {
      this.plugin.options['content.isLive.noSeek'] = !this.player.isDvr();
      this.initialPlayhead = this.getPlayhead();
    }
    this.fireStart();
  },

  /** @returns {void} - Listener for 'pause' event. */
  pauseListener: function() {
    this.firePause();
  },

  /** @returns {void} - Listener for 'playing' event. */
  playingListener: function() {
    this.fireResume();
    this.fireSeekEnd();
    this.fireBufferEnd();
    this.fireJoin();
  },

  /** @returns {void}
   * @param {Object} error - object with payload including severity, code and data.
   * - The name of the plugin.- Listener for 'error' event. */
  errorListener: function(error) {
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
  seekingListener: function() {
    if (!this.flags.isBuffering && this.initialPlayhead !== this.getPlayhead()) {
      this.fireSeekBegin();
    }
  },

  /** @returns {void} - Listener for 'seeked' event. */
  seekedListener: function() {
    this.fireSeekEnd();
  },

  /** @returns {void}
   * @param {Object} e - object with the payload with states.
   * - Listener for 'player_state_changed' event. */
  stateChangeListener: function(e) {
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
  endedListener: function() {
    if (!this.stopBlockedByAds) {
      this.fireStop();
      this.reset();
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  forceEndedListener: function() {
    this.fireStop();
    this.reset();
  },

  /** @returns {void} - Restores initial values to start new views */
  reset: function() {
    this.stopBlockedByAds = false;
    this.initialPlayhead = null;
    this.blockedByError = false;
  }
});

export {YouboraAdapter};
