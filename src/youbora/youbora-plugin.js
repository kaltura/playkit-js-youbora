/**
 * @license
 * Youbora Plugin JS Kaltura player
 * Copyright NicePopleAtWork & Kaltura
 * @author Jordi Aguilar & Dan Ziv
 */
import $YB from './youbora.lib.min'
import { VERSION } from 'playkit-js'
import * as pkg from '../../package.json'

$YB.plugins.KalturaV3 = function (player, options) {
  try {
    /** Name and platform of the plugin.*/
    this.pluginName = 'kalturaplaykit-js';

    /** Version of the plugin. ie: 5.1.0-name */
    this.pluginVersion = '5.3.0-' + pkg.version + '-kalturaplaykit-js';

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

/** Returns the current playhead of the video or 0. */
$YB.plugins.KalturaV3.prototype.getPlayhead = function () {
  return this.player.currentTime;
};

/** Returns the media duration of the video or 0. */
$YB.plugins.KalturaV3.prototype.getMediaDuration = function () {
  return this.player.duration;
};

/** Returns the src of the resource or an empty string. */
$YB.plugins.KalturaV3.prototype.getResource = function () {
  return this.player.src;
};

$YB.plugins.KalturaV3.prototype.getPlayerVersion = function () {
  return 'KalturaPlaykitJS ' + VERSION;
};

/** Register Listeners */
$YB.plugins.KalturaV3.prototype.registerListeners = function () {
  // save context
  var context = this;
  var Event = this.player.Event;
  var State = this.player.State;

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

  this.player.addEventListener(Event.PLAYER_STATE_CHANGED, function (e) {
    var oldState = e.payload.oldState.type;
    var newState = e.payload.newState.type;
    if (oldState === State.PLAYING && newState === State.BUFFERING) {
      context.bufferingHandler();
    }
  });
};

module.exports = $YB.plugins.KalturaV3;
