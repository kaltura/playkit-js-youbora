var youbora = require('youboralib')

var NativeAdsAdapter = youbora.Adapter.extend({
  /**  @returns {String} - current plugin version */
  getVersion: function () {
    return "6.2.0-kaltura-ads"
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function () {
    return this.currentTime
  },

  /**  @returns {Number} - video duration */
  getDuration: function () {
    return this.adObject.duration
  },

  getTitle: function () {
    return this.adObject.title
  },

  /**  @returns {String} - current ad position (only ads) */
  getPosition: function () {
    if (this.adPosition) {
      if (this.adPosition === "preroll") {
        return 'pre'
      }
      if (this.adPosition === "midroll") {
        return 'mid'
      }
      if (this.adPosition === "postroll") {
        return 'post'
      }
    }
    if (!this.plugin.getAdapter().flags.isJoined) {
      return 'pre'
    } else if (!this.plugin.getAdapter().isLive() && this.plugin.getAdapter().getPlayhead() > this.plugin.getAdapter().getDuration() - 1) {
      return 'post'
    }
    return 'mid'
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function () {
    this.monitorPlayhead(true, false) //playhead monitor for bufferunderrun

    var Event = this.player.Event
    // Register listeners
    this.references = []
    this.references[Event.AD_LOADED] = this.startAdListener.bind(this)
    this.references[Event.AD_STARTED] = this.startAdListener.bind(this)
    this.references[Event.AD_RESUMED] = this.resumeAdListener.bind(this)
    this.references[Event.AD_PAUSED] = this.pauseAdListener.bind(this)
    this.references[Event.AD_CLICKED] = this.clickAdListener.bind(this)
    this.references[Event.AD_SKIPPED] = this.skipAdListener.bind(this)
    this.references[Event.AD_COMPLETED] = this.stopAdListener.bind(this)
    this.references[Event.AD_ERROR] = this.errorAdListener.bind(this)
    this.references[Event.AD_PROGRESS] = this.progressAdListener.bind(this)
    this.references[Event.ALL_ADS_COMPLETED] = this.allAdsCompletedListener.bind(this)

    for (var key in this.references) {
      this.player.addEventListener(key, this.references[key])
    }
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function () {
    // Disable playhead monitoring
    this.monitor.stop()

    // unregister listeners
    if (this.player && this.references) {
      for (var key in this.references) {
        this.player.removeEventListener(key, this.references[key])
      }
      this.references = []
    }
  },

  startAdListener: function (e) {
    this.plugin.getAdapter().fireStart()
    this.plugin.getAdapter().stopBlockedByAds = true
    this.adObject = e.payload.extraAdData
    this.adPosition = e.payload.adType
    this.fireStart()
  },

  stopAdListener: function () {
    this.fireStop()
    this.currentTime = null
    this.adObject = null
  },

  resumeAdListener: function () {
    this.fireResume()
  },

  pauseAdListener: function () {
    this.firePause()
  },

  clickAdListener: function () {
    this.fireClick({ url: this.adObject.clickThroughUrl })
  },

  skipAdListener: function () {
    this.fireStop({ skipped: true })
    this.currentTime = null
    this.adObject = null
  },

  errorAdListener: function () {
    this.fireError()
  },

  allAdsCompletedListener: function () {
    this.fireStop()
    this.plugin.getAdapter().stopBlockedByAds = false
    if (this.getPosition() === "post") this.plugin.getAdapter().fireStop()
  },

  progressAdListener: function (e) {
    this.currentTime = e.payload.adProgress.currentTime
    this.fireJoin()
    this.monitor.skipNextTick()
  }
})

module.exports = NativeAdsAdapter
