/**
 * @license
 * Youbora Plugin JS Kaltura player
 * Copyright NicePopleAtWork & Kaltura
 * @author Jordi Aguilar & Dan Ziv
 */
import $YB from './youbora.lib.min'
import {VERSION, PLAYER_NAME} from 'playkit-js'
import * as pkg from '../package.json'

$YB.plugins.KalturaV3 = function (player, options) {
  try {
    /** Name and platform of the plugin.*/
    this.pluginName = PLAYER_NAME;

    this.pluginVersion = $YB.version + '-' + pkg.version + '-' + PLAYER_NAME;

    /* Initialize YouboraJS */
    this.startMonitoring(player, options);
  } catch (err) {
    $YB.error(err);
  }
};

/** Inherit from generic plugin */
$YB.plugins.KalturaV3.prototype = new $YB.plugins.Generic;

$YB.plugins.KalturaV3.bindLogger = function (logger) {
  $YB.error = logger.error.bind(logger);
  $YB.notice = logger.info.bind(logger);
  $YB.noticeRequest = logger.info.bind(logger);
  $YB.warn = logger.warn.bind(logger);
  $YB.debug = logger.debug.bind(logger);
  $YB.verbose = function () {
  };
};

/**
 * @returns {Number} - The current playhead of the video or 0.
 */
$YB.plugins.KalturaV3.prototype.getPlayhead = function () {
  return this.player.currentTime;
};

/**
 * @returns {Number} - The media duration of the video or 0.
 */
$YB.plugins.KalturaV3.prototype.getMediaDuration = function () {
  return this.player.duration;
};

/**
 * @returns {string} - The src of the resource or an empty string.
 */
$YB.plugins.KalturaV3.prototype.getResource = function () {
  return this.player.src;
};

/**
 * @returns {string} - The current player version.
 */
$YB.plugins.KalturaV3.prototype.getPlayerVersion = function () {
  return PLAYER_NAME + "-" + VERSION;
};

$YB.plugins.KalturaV3.prototype.getBitrate = function () {
  let activeVideo = this.player.getActiveTracks().video;
  if (activeVideo && activeVideo.bandwidth) {
    return activeVideo.bandwidth;
  }
  return -1;
};

$YB.plugins.KalturaV3.prototype.getTitle = function () {
  return this.player.config.name;
};

$YB.plugins.KalturaV3.prototype.getRendition = function () {
  let activeVideo = this.player.getActiveTracks().video;
  if (activeVideo) {
    return $YB.utils.buildRenditionString(activeVideo.width, activeVideo.height, activeVideo.bandwidth);
  }
};

$YB.plugins.KalturaV3.prototype.getIsLive = function () {
  return this.player.config.type === "Live";
};

/**
 * Register Listeners.
 * @returns {void}
 */
$YB.plugins.KalturaV3.prototype.registerListeners = function () {
  // save context
  let context = this;
  let Event = this.player.Event;
  let State = this.player.State;

  // Play is clicked (/start)
  this.player.addEventListener(Event.PLAY, function () {
    context.playHandler();
  });

  // video ends (stop)
  this.player.addEventListener(Event.ENDED, function () {
    context.endedHandler();
  });

  this.player.addEventListener(Event.PLAYING, function () {
    context.playingHandler();
  });

  // Video pauses (pause)
  this.player.addEventListener(Event.PAUSE, function () {
    context.pauseHandler();
  });

  // video error (error)
  this.player.addEventListener(Event.ERROR, function () {
    // TO-DO: Rework this after errors are done
    context.errorHandler("PLAY_FAILURE");
  });

  // video seek start
  this.player.addEventListener(Event.SEEKING, function () {
    context.seekingHandler();
  });

  // video seek end
  this.player.addEventListener(Event.SEEKED, function () {
    context.seekedHandler();
  });

  this.player.addEventListener(Event.PLAYER_STATE_CHANGED, function (e) {
    let newState = e.payload.newState.type;
    let oldState = e.payload.oldState.type;
    if (newState === State.BUFFERING) {
      context.bufferingHandler();
    }
    if (oldState === State.BUFFERING) {
      context.bufferedHandler();
    }
  });
};

module.exports = $YB.plugins.KalturaV3;
