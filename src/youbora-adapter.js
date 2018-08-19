/**
 * @license
 * Youbora Plugin JS Kaltura player
 * Copyright NicePopleAtWork & Kaltura
 * @author Jordi Aguilar & Dan Ziv
 */
import $YB from './youbora.lib.min';
import * as pkg from '../package.json';
import {Error} from 'playkit-js';

$YB.plugins.KalturaV3 = function(player, options) {
  try {
    this.config = options;
    /** Name and platform of the plugin.*/
    this.pluginName = this.config.playerName;

    this.pluginVersion = $YB.version + '-' + pkg.version + '-' + this.pluginName;

    /* Initialize YouboraJS */
    this.startMonitoring(player, this.config.options);
  } catch (err) {
    $YB.error(err);
  }
};

/** Inherit from generic plugin */
$YB.plugins.KalturaV3.prototype = new $YB.plugins.Generic();

$YB.plugins.KalturaV3.bindLogger = function(logger) {
  $YB.error = logger.error.bind(logger);
  $YB.notice = logger.info.bind(logger);
  $YB.noticeRequest = logger.info.bind(logger);
  $YB.warn = logger.warn.bind(logger);
  $YB.debug = logger.debug.bind(logger);
  $YB.verbose = function() {};
};

/**
 * @returns {void}
 */
$YB.plugins.KalturaV3.prototype.reset = function() {
  this.endedHandler();
  this.viewManager.comm.view++;
};

/**
 * @returns {Number} - The current playhead of the video or 0.
 */
$YB.plugins.KalturaV3.prototype.getPlayhead = function() {
  return this.player.currentTime;
};

/**
 * @returns {Number} - The media duration of the video or 0.
 */
$YB.plugins.KalturaV3.prototype.getMediaDuration = function() {
  return this.player.duration;
};

/**
 * @returns {string} - The src of the resource or an empty string.
 */
$YB.plugins.KalturaV3.prototype.getResource = function() {
  return this.player.src;
};

/**
 * @returns {string} - The current player version.
 */
$YB.plugins.KalturaV3.prototype.getPlayerVersion = function() {
  return this.config.playerName + '-' + this.config.playerVersion;
};

$YB.plugins.KalturaV3.prototype.getBitrate = function() {
  let activeVideo = this.player.getActiveTracks().video;
  if (activeVideo && activeVideo.bandwidth) {
    return activeVideo.bandwidth;
  }
  return -1;
};

$YB.plugins.KalturaV3.prototype.getTitle = function() {
  return this.config.entryName;
};

$YB.plugins.KalturaV3.prototype.getRendition = function() {
  let activeVideo = this.player.getActiveTracks().video;
  if (activeVideo) {
    return $YB.utils.buildRenditionString(activeVideo.width, activeVideo.height, activeVideo.bandwidth);
  }
};

$YB.plugins.KalturaV3.prototype.getIsLive = function() {
  return this.config.entryType === 'Live';
};

/**
 * Register Listeners.
 * @returns {void}
 */
$YB.plugins.KalturaV3.prototype.registerListeners = function() {
  let Event = this.player.Event;
  let State = this.player.State;

  // Play is clicked (/start)
  this.player.addEventListener(Event.PLAY, () => {
    isMetadataLoaded().then(() => {
      this.playHandler();
    });
  });

  // video ends (stop)
  this.player.addEventListener(Event.ENDED, () => {
    this.endedHandler();
  });

  this.player.addEventListener(Event.PLAYING, () => {
    this.playingHandler();
  });

  // Video pauses (pause)
  this.player.addEventListener(Event.PAUSE, () => {
    this.pauseHandler();
  });

  // video error (error)
  this.player.addEventListener(Event.ERROR, error => {
    if (error.payload.severity === Error.Severity.CRITICAL) {
      this.errorHandler(error.payload.code, error.payload.data);
      this.endedHandler();
    }
  });

  // video seek start
  this.player.addEventListener(Event.SEEKING, () => {
    if (!context.viewManager.isBuffering) {
      this.seekingHandler();
    }
  });

  // video seek end
  this.player.addEventListener(Event.SEEKED, () => {
    this.seekedHandler();
  });

  this.player.addEventListener(Event.PLAYER_STATE_CHANGED, e => {
    let newState = e.payload.newState.type;
    let oldState = e.payload.oldState.type;
    if (newState === State.BUFFERING) {
      this.bufferingHandler();
    }
    if (oldState === State.BUFFERING) {
      this.bufferedHandler();
    }
  });

  const isMetadataLoaded = () => {
    return new Promise(resolve => {
      this.player.addEventListener(Event.LOADED_METADATA, () => {
        return resolve();
      });
    });
  };
};

module.exports = $YB.plugins.KalturaV3;
