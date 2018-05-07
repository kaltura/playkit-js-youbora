var youbora = require('youboralib')
import { Error } from 'playkit-js'

youbora.adapters.Kaltura = youbora.Adapter.extend({

  constructor: function (player, config) {
    this.config = config
    youbora.adapters.Kaltura.__super__.constructor.call(this, player)
  },

  /**  @returns {String} - current plugin version */
  getVersion: function () {
    return "6.2.0-kaltura"
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function () {
    return this.player.currentTime
  },

  /**  @returns {Number} - current playrate */
  getPlayrate: function () {
    return this.player.playbackRate
  },

  /**  @returns {Number} - video duration */
  getDuration: function () {
    return this.player.duration || null
  },

  /**  @returns {Number} - current bitrate */
  getBitrate: function () {
    var activeVideo = this.player.getActiveTracks().video
    if (activeVideo && activeVideo.bandwidth) {
      return activeVideo.bandwidth
    }
    return null
  },

  /**  @returns {String} - rendition */
  getRendition: function () {
    var activeVideo = this.player.getActiveTracks().video
    if (activeVideo) {
      return youbora.Util.buildRenditionString(activeVideo.width, activeVideo.height, activeVideo.bandwidth)
    }
    return null
  },

  /**  @returns {String} - title */
  getTitle: function () {
    return this.config.entryName
  },

  /**  @returns {Boolean} - true if live and false if VOD */
  getIsLive: function () {
    return this.config.entryType === "Live"
  },

  /**  @returns {String} - resource URL. */
  getResource: function () {
    return this.player.src
  },

  /**  @returns {String} - player version */
  getPlayerVersion: function () {
    return this.config.playerVersion
  },

  /**  @returns {String} - player's name */
  getPlayerName: function () {
    return this.config.playerName
  },

  /** @returns {String} - Household identifier */
  getHouseholdId: function () {
    return this.config.householdId
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function () {
    var Event = this.player.Event
    // References
    this.references = []
    this.references[Event.PLAY] = this.playListener.bind(this)
    this.references[Event.LOAD_START] = this.playListener.bind(this)
    this.references[Event.PAUSE] = this.pauseListener.bind(this)
    this.references[Event.PLAYING] = this.playingListener.bind(this)
    this.references[Event.ERROR] = this.errorListener.bind(this)
    this.references[Event.SEEKING] = this.seekingListener.bind(this)
    this.references[Event.SEEKED] = this.seekedListener.bind(this)
    this.references[Event.PLAYER_STATE_CHANGED] = this.stateChangeListener.bind(this)
    this.references[Event.ENDED] = this.endedListener.bind(this)
    this.references[Event.CHANGE_SOURCE_STARTED] = this.forceEndedListener.bind(this)

    // Register listeners
    for (var key in this.references) {
      this.player.addEventListener(key, this.references[key])
    }
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function () {

    // unregister listeners
    if (this.player && this.references) {
      for (var key in this.references) {
        this.player.removeEventListener(key, this.references[key])
      }
      this.references = []
    }
  },

  bindLogger: function (logger) {
    youbora.Log.error = logger.error.bind(logger)
    youbora.Log.notice = logger.info.bind(logger)
    youbora.Log.warn = logger.warn.bind(logger)
    youbora.Log.debug = logger.debug.bind(logger)
    youbora.Log.verbose = function () {
    }
  },

  /** @returns {void} - Listener for 'play' event. */
  playListener: function () {
    if (!this.flags.isStarted) {
      this.fireStart()
      this.plugin.options['content.isLive.noSeek'] = !this.player.isDvr()
      this.initialPlayhead = this.getPlayhead()
    }
  },

  /** @returns {void} - Listener for 'timeupdate' event. */
  timeupdateListener: function () {
    this.fireStart()
    this.fireJoin()
  },

  /** @returns {void} - Listener for 'pause' event. */
  pauseListener: function () {
    this.firePause()
  },

  /** @returns {void} - Listener for 'playing' event. */
  playingListener: function () {
    this.fireResume()
    this.fireSeekEnd()
    this.fireBufferEnd()
    this.fireStart()
    this.fireJoin()
  },

  /** @returns {void}
   * @param {Object} e - object with payload including severity, code and data.
   * - The name of the plugin.- Listener for 'error' event. */
  errorListener: function (e) {
    if (e.payload.severity === Error.Severity.CRITICAL) {
      this.fireError(e.payload.code, e.payload.data)
      this.fireStop()
    }
  },

  /** @returns {void} - Listener for 'seeking' event. */
  seekingListener: function () {
    if (!this.flags.isBuffering &&
      (this.initialPlayhead !== this.getPlayhead())) {
      this.fireSeekBegin()
    }
  },

  /** @returns {void} - Listener for 'seeked' event. */
  seekedListener: function () {
    this.fireSeekEnd()
  },

  /** @returns {void}
   * @param {Object} e - object with the payload with states.
   * - Listener for 'player_state_changed' event. */
  stateChangeListener: function (e) {
    if (e.payload.newState.type === this.player.State.BUFFERING) {
      if (this.initialPlayhead !== this.getPlayhead()) {
        this.fireBufferBegin()
      }
    }
    if (e.payload.oldState.type === this.player.State.BUFFERING) {
      this.fireBufferEnd()
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  endedListener: function () {
    if (!this.stopBlockedByAds) {
      this.fireStop()
      this.reset()
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  forceEndedListener: function () {
    this.fireStop()
    this.reset()
  },

  reset: function () {
    this.stopBlockedByAds = false
    this.initialPlayhead = null
  }
},
  {
    NativeAdsAdapter: require('./ads/nativeads'),
  }
)

module.exports = youbora.adapters.Kaltura
