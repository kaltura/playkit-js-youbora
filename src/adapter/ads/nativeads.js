// @flow
import youbora from 'youboralib'

let NativeAdsAdapter = youbora.Adapter.extend({

  /**  @returns {String} - current plugin version */
  getVersion: function () {
    return youbora.VERSION + '-' + __VERSION__ + '-' + __NAME__ + '-ads'
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
        return youbora.Adapter.AdPosition.PREROLL
      }
      if (this.adPosition === "midroll") {
        return youbora.Adapter.AdPosition.MIDROLL
      }
      if (this.adPosition === "postroll") {
        return youbora.Adapter.AdPosition.POSTROLL
      }
    }
    if (!this.plugin.getAdapter().flags.isJoined) {
      return youbora.Adapter.AdPosition.PREROLL
    } else if (!this.plugin.getAdapter().isLive() && this.plugin.getAdapter().getPlayhead() > this.plugin.getAdapter().getDuration() - 1) {
      return youbora.Adapter.AdPosition.POSTROLL
    }
    return youbora.Adapter.AdPosition.MIDROLL
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function () {
    this.monitorPlayhead(true, false) //playhead monitor for bufferunderrun

    const Event = this.player.Event
    // Register listeners
    this.references = []
    this.references[Event.AD_LOADED] = this.loadedAdListener.bind(this)
    this.references[Event.AD_STARTED] = this.startAdListener.bind(this)
    this.references[Event.AD_RESUMED] = this.resumeAdListener.bind(this)
    this.references[Event.AD_PAUSED] = this.pauseAdListener.bind(this)
    this.references[Event.AD_CLICKED] = this.clickAdListener.bind(this)
    this.references[Event.AD_SKIPPED] = this.skipAdListener.bind(this)
    this.references[Event.AD_COMPLETED] = this.stopAdListener.bind(this)
    this.references[Event.AD_ERROR] = this.errorAdListener.bind(this)
    this.references[Event.AD_PROGRESS] = this.progressAdListener.bind(this)
    this.references[Event.ALL_ADS_COMPLETED] = this.allAdsCompletedListener.bind(this)

    for (let key in this.references) {
      this.player.addEventListener(key, this.references[key])
    }
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function () {
    // Disable playhead monitoring
    this.monitor.stop()

    // unregister listeners
    if (this.player && this.references) {
      for (let key in this.references) {
        this.player.removeEventListener(key, this.references[key])
      }
      this.references = []
    }
  },

  loadedAdListener: function (e) {
    this.adObject = e.payload.extraAdData
    this.adPosition = e.payload.adType
  },

  startAdListener: function () {
    this.plugin.getAdapter().stopBlockedByAds = true
    this.plugin.getAdapter().fireStart()
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

  errorAdListener: function (e) {
    this.fireError(e.payload.error.code, e.payload.error.message)
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
export { NativeAdsAdapter }
