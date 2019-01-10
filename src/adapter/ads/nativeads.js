// @flow
import youbora from 'youboralib';

let NativeAdsAdapter = youbora.StandardAdapter.extend({
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

  /**  @returns {void} - Return a list of events and methods to suscribe from this.player. */
  getListenersList: function() {
    const Event = this.player.Event;
    return [
      {
        events: {
          [Event.AD_LOADED]: this.loadedAdListener,
          [Event.AD_STARTED]: this.startAdListener,
          [Event.AD_RESUMED]: this.resumeAdListener,
          [Event.AD_PAUSED]: this.pauseAdListener,
          [Event.AD_CLICKED]: this.clickAdListener,
          [Event.AD_SKIPPED]: this.skipAdListener,
          [Event.AD_COMPLETED]: this.stopAdListener,
          [Event.AD_ERROR]: this.errorAdListener,
          [Event.AD_PROGRESS]: this.progressAdListener,
          [Event.ALL_ADS_COMPLETED]: this.allAdsCompletedListener
        }
      }
    ];
  },

  loadedAdListener: function(e) {
    this.adObject = e.payload.extraAdData;
    this.adPosition = e.payload.adType;
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
    this.fireClick({adUrl: this.adObject.clickThroughUrl});
  },

  skipAdListener: function() {
    this.fireStop({skipped: true});
    this.resetFlags();
  },

  errorAdListener: function(e) {
    this.fireError(e.payload.error.code, e.payload.error.message);
    if (this.getPosition() === youbora.Adapter.AdPosition.POSTROLL) {
      this.plugin.getAdapter().stopBlockedByAds = false;
      this.plugin.getAdapter().fireStop();
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
