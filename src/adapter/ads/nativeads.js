// @flow
import youbora from 'youboralib';

declare var __VERSION__: string;
declare var __NAME__: string;

let NativeAdsAdapter = youbora.Adapter.extend({
  /**  @returns {String} - current plugin version */
  getVersion: function () {
    return youbora.VERSION + '-' + __VERSION__ + '-' + __NAME__ + '-ads';
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function () {
    return this.currentTime;
  },

  /**  @returns {Number} - video duration */
  getDuration: function () {
    return this.adObject.duration;
  },

  /** @returns {String} - title of the ad */
  getTitle: function () {
    return this.adObject.title;
  },

  /**  @returns {String} - current ad position (only ads) */
  getPosition: function () {
    let returnValue = youbora.Constants.AdPosition.Midroll;
    switch (this.adPosition) {
      case 'preroll':
        returnValue = youbora.Constants.AdPosition.Preroll;
        break;
      case 'postroll':
        returnValue = youbora.Constants.AdPosition.Postroll;
        break;
      case 'midroll':
        break;
      case 'overlay':
        returnValue = 'overlay';
        break;
      default:
        if (!this.plugin.getAdapter().flags.isJoined) {
          returnValue = youbora.Constants.AdPosition.Preroll;
        } else if (!this.plugin.getIsLive() && this.plugin.getPlayhead() > this.plugin.getDuration() - 1) {
          returnValue = youbora.Constants.AdPosition.Postroll;
        }
    }
    return returnValue;
  },

  /** @returns {Number} - the number of ad breaks included in the view */
  getGivenBreaks: function () {
    return this.adBreaks ? this.adBreaks.length : null;
  },

  /** @returns {Array} - a list of playheads of ad breaks begin time */
  getBreaksTime: function () {
    let ret = this.adBreaks;
    if (ret) {
      let len = ret.length;
      if (len > 0 && ret[len - 1] === -1) {
        ret[len - 1] = this.plugin.getDuration() || -1;
      }
    }
    return ret;
  },

  /** @returns {Number} - the number of ads given for the break */
  getGivenAds: function () {
    return this.numAds;
  },

  /** @returns {Boolean} - if the ad is being shown in the screen or not
   * The standard definition is: more than 50% of the pixels of the ad are on the screen
   */
  getIsVisible: function () {
    return youbora.Util.calculateAdViewability(this.player.getVideoElement());
  },

  /** @returns {Boolean} - if the audio is enabled when the ad begins */
  getAudioEnabled: function () {
    return !this.player.muted;
  },

  /** @returns {Boolean} - if the ad is skippable */
  getIsSkippable: function () {
    return typeof this.adObject.skipOffset !== 'undefined' && this.adObject.skipOffset > -1;
  },

  /** @returns {Boolean} - if the player is in fullscreen mode when the ad begins */
  getIsFullscreen: function () {
    return this.fullscreen || false;
  },

  /** @returns {String} - ad creative id */
  getCreativeId: function () {
    return this.adObject.id;
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function () {
    const Event = this.player.Event;
    this.references = {
      [Event.AD_LOADED]: this.loadedAdListener.bind(this),
      [Event.AD_STARTED]: this.startAdListener.bind(this),
      [Event.AD_RESUMED]: this.resumeAdListener.bind(this),
      [Event.AD_PAUSED]: this.pauseAdListener.bind(this),
      [Event.AD_CLICKED]: this.clickAdListener.bind(this),
      [Event.AD_SKIPPED]: this.skipAdListener.bind(this),
      [Event.AD_COMPLETED]: this.stopAdListener.bind(this),
      [Event.AD_ERROR]: this.errorAdListener.bind(this),
      [Event.AD_PROGRESS]: this.progressAdListener.bind(this),
      [Event.ALL_ADS_COMPLETED]: this.allAdsCompletedListener.bind(this),
      [Event.AD_FIRST_QUARTILE]: this.firstQuartileListener.bind(this),
      [Event.AD_MIDPOINT]: this.midpointListener.bind(this),
      [Event.AD_THIRD_QUARTILE]: this.thirdQuartileListener.bind(this),
      [Event.ENTER_FULLSCREEN]: this.enterFullscreenListener.bind(this),
      [Event.EXIT_FULLSCREEN]: this.exitFullscreenListener.bind(this),
      [Event.AD_MANIFEST_LOADED]: this.manifestLoaded.bind(this),
      [Event.AD_BREAK_START]: this.startBreakAdListener.bind(this)
    };

    for (let key in this.references) {
      this.player.addEventListener(key, this.references[key]);
    }
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

  startBreakAdListener: function (e) {
    this.adPosition = e.payload.adBreak.type;
    this.numAds = e.payload.adBreak.numAds;
    this.fireBreakStart();
  },

  endBreakAdListener: function () {
    this.fireBreakEnd();
  },

  loadedAdListener: function (e) {
    this.adObject = e.payload.ad;
  },

  startAdListener: function () {
    this.plugin.getAdapter().stopBlockedByAds = true;
    if (this.adPosition !== 'overlay') {
      this.fireStart();
    }
  },

  stopAdListener: function () {
    this.fireStop();
    this.resetFlags();
  },

  resumeAdListener: function () {
    this.fireResume();
  },

  pauseAdListener: function () {
    this.firePause();
  },

  clickAdListener: function () {
    this.fireClick(this.adObject.clickThroughUrl);
  },

  skipAdListener: function () {
    this.fireSkip();
    this.resetFlags();
  },

  errorAdListener: function (e) {
    this.fireError(e.payload.error.code, e.payload.error.message);
    if (this.getPosition() === youbora.Constants.AdPosition.Postroll) {
      this.plugin.getAdapter().stopBlockedByAds = false;
      this.plugin.fireStop();
    }
  },

  manifestLoaded: function (e) {
    if (e && e.payload && e.payload.adBreaksPosition) {
      this.adBreaks = e.payload.adBreaksPosition;
    }
  },

  firstQuartileListener: function () {
    this.fireQuartile(1);
  },

  midpointListener: function () {
    this.fireQuartile(2);
  },

  thirdQuartileListener: function () {
    this.fireQuartile(3);
  },

  enterFullscreenListener: function () {
    this.fullscreen = true;
  },

  exitFullscreenListener: function () {
    this.fullscreen = false;
  },

  allAdsCompletedListener: function () {
    this.fireStop();
    this.plugin.getAdapter().stopBlockedByAds = false;
    if (this.getPosition() === youbora.Constants.AdPosition.Postroll) this.plugin.getAdapter().fireStop();
    this.adPosition = null;
  },

  progressAdListener: function (e) {
    this.currentTime = e.payload.adProgress.currentTime;
    this.fireJoin();
  },

  resetFlags: function () {
    this.currentTime = null;
    this.adObject = null;
    if (this.getPosition() === youbora.Constants.AdPosition.Postroll) {
      this.adPosition = null;
    }
  }
});
export {NativeAdsAdapter};
