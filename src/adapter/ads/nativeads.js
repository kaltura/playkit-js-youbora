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
    const PREROLL = "pre"
    const MIDROLL = "mid"
    const POSTROLL = "post"
    let returnValue = MIDROLL
    switch (this.adPosition) {
      case "preroll":
        returnValue = PREROLL
        break
      case "postroll":
        returnValue = POSTROLL
        break
      case "midroll":
        break
      case "overlay":
        returnValue = "overlay"
        break
      default:
        if (!this.plugin.getAdapter().flags.isJoined) {
          returnValue = PREROLL
        } else if (!this.plugin.getAdapter().getIsLive() && this.plugin.getAdapter().getPlayhead() > this.plugin.getAdapter().getDuration() - 1) {
          returnValue = POSTROLL
        }
    }
    return returnValue
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function () {
    this.deltaErrorTime = 5000 // Threshold time to ignore repeated errors
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
    if (this.adPosition !== "overlay") {
      this.fireStart()
    }
  },

  stopAdListener: function () {
    this.fireStop()
    this.resetFlags()
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
    this.resetFlags()
  },

  errorAdListener: function (e) {
    let now = new Date().getTime()
    if (this.lastErrorCode === e.payload.error.code && this.lastErrorTime + this.deltaErrorTime > now) {
      return null
    }
    this.lastErrorCode = e.payload.error.code
    this.lastErrorTime = now
    this.fireError(e.payload.error.code, e.payload.error.message)
    if (this.getPosition() === "post") {
      this.plugin.getAdapter().stopBlockedByAds = false
      this.plugin.getAdapter().fireStop()
    }
  },

  allAdsCompletedListener: function () {
    this.fireStop()
    this.plugin.getAdapter().stopBlockedByAds = false
    if (this.adPosition === "post") this.plugin.getAdapter().fireStop()
    this.adPosition = null
  },

  progressAdListener: function (e) {
    this.currentTime = e.payload.adProgress.currentTime
    this.fireJoin()
  },

  resetFlags: function () {
    this.currentTime = null
    this.adObject = null
    if (this.adPosition !== "post") {
      this.adPosition = null
    }
  }
})
export { NativeAdsAdapter }
