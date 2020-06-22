// @flow
import youbora from 'youboralib';

declare var __VERSION__: string;
declare var __NAME__: string;

let NativeAdsAdapter = youbora.Adapter.extend({
  /**  @returns {String} - current plugin version */
  getVersion: function() {
    return youbora.VERSION + '-' + __VERSION__ + '-' + __NAME__ + '-ads';
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function() {
    return this.currentTime;
  },

  /**  @returns {Number} - video duration */
  getDuration: function() {
    return this.adObject.duration;
  },

  getTitle: function() {
    return this.adObject.title;
  },

  /**  @returns {String} - current ad position (only ads) */
  getPosition: function() {
    let returnValue = youbora.Adapter.AdPosition.MIDROLL;
    switch (this.adPosition) {
      case 'preroll':
        returnValue = youbora.Adapter.AdPosition.PREROLL;
        break;
      case 'postroll':
        returnValue = youbora.Adapter.AdPosition.POSTROLL;
        break;
      case 'midroll':
        break;
      case 'overlay':
        returnValue = 'overlay';
        break;
      default:
        if (!this.plugin.getAdapter().flags.isJoined) {
          returnValue = youbora.Adapter.AdPosition.PREROLL;
        } else if (!this.plugin.getAdapter().getIsLive() && this.plugin.getAdapter().getPlayhead() > this.plugin.getAdapter().getDuration() - 1) {
          returnValue = youbora.Adapter.AdPosition.POSTROLL;
        }
    }
    return returnValue;
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function() {
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
      [Event.ALL_ADS_COMPLETED]: this.allAdsCompletedListener.bind(this)
    };

    for (let key in this.references) {
      this.player.addEventListener(key, this.references[key]);
    }
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function() {
    // unregister listeners
    if (this.player && this.references) {
      for (let key in this.references) {
        this.player.removeEventListener(key, this.references[key]);
      }
    }
    delete this.references;
  },

  startBreakAdListener: function(e) {
    this.adPosition = e.payload.adBreak.type;
  },

  loadedAdListener: function(e) {
    this.adObject = e.payload.ad;
  },

  startAdListener: function() {
    this.plugin.getAdapter().stopBlockedByAds = true;
    if (this.adPosition !== 'overlay') {
      this.fireStart();
    }
  },

  stopAdListener: function() {
    this.fireStop();
    this.resetFlags();
  },

  resumeAdListener: function() {
    this.fireResume();
  },

  pauseAdListener: function() {
    this.firePause();
  },

  clickAdListener: function() {
    this.fireClick(this.adObject.clickThroughUrl);
  },

  skipAdListener: function() {
    this.fireSkip();
    this.resetFlags();
  },

  errorAdListener: function(e) {
    this.fireError(e.payload.error.code, e.payload.error.message);
    if (this.getPosition() === youbora.Adapter.AdPosition.POSTROLL) {
      this.plugin.getAdapter().stopBlockedByAds = false;
      this.plugin.fireStop();
    }
  },

  allAdsCompletedListener: function() {
    this.fireStop();
    this.plugin.getAdapter().stopBlockedByAds = false;
    if (this.getPosition() === youbora.Adapter.AdPosition.POSTROLL) this.plugin.getAdapter().fireStop();
    this.adPosition = null;
  },

  progressAdListener: function(e) {
    this.currentTime = e.payload.adProgress.currentTime;
    this.fireJoin();
  },

  resetFlags: function() {
    this.currentTime = null;
    this.adObject = null;
    if (this.getPosition() === youbora.Adapter.AdPosition.POSTROLL) {
      this.adPosition = null;
    }
  }
});
export {NativeAdsAdapter};
