/**
 * @license
 * Youbora Plugin JS Kaltura player
 * Copyright NicePopleAtWork & Kaltura
 * @author Jordi Aguilar & Dan Ziv
 */

var $YB = require('./youboralib.min')

$YB.plugins.KalturaV3 = function (player, options) {
  try {
    /** Name and platform of the plugin.*/
    this.pluginName = 'kalturav3';

    /** Version of the plugin. ie: 5.1.0-name */
    this.pluginVersion = '5.3.0-1.0.0-kalturav3';

    /* Initialize YouboraJS */
    this.startMonitoring(player, options);

    this.startingPlayhead = 0;
  } catch (err) {
    $YB.error(err);
  }
};

/** Inherit from generic plugin */
$YB.plugins.KalturaV3.prototype = new $YB.plugins.Generic;

$YB.plugins.KalturaV3.bindLogger = function (logger) {
  $YB.error = logger.error.bind(logger)
  $YB.notice = logger.info.bind(logger)
  $YB.noticeRequest = logger.info.bind(logger)
  $YB.warn = logger.warn.bind(logger)
  $YB.debug = logger.debug.bind(logger)
  $YB.verbose = function () { }
}

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
  return this.player.currentSrc;
};

$YB.plugins.KalturaV3.prototype.getPlayerVersion = function () {
  return "KalturaV3";
};

/** Register Listeners */
$YB.plugins.KalturaV3.prototype.registerListeners = function () {
  // Report events as Debug messages
  $YB.utils.listenAllEvents(this.player);

  // Start buffer watcher. Requires data.enableNiceBuffer to be true.
  this.enableBufferMonitor();

  // save context
  var context = this;

  // Play is clicked (/start)
  this.player.addEventListener("play", function (e) {
    context.playHandler();
  });

  // video ends (stop)
  this.player.addEventListener("ended", function (e) {
    context.endedHandler();
  });

  this.player.addEventListener("playing", function (e) {
    context.playingHandler();
  });

  // Video pauses (pause)
  this.player.addEventListener("pause", function (e) {
    context.pauseHandler();
  });

  // video error (error)
  this.player.addEventListener("error", function (e) {
    context.errorHandler("PLAY_FAILURE");
  });

  // video seek start
  this.player.addEventListener("seeking", function (e) {
    context.seekingHandler();
  });

  this.player.addEventListener("playerStateChanged", function (e) {
    if (e.payload.oldState === "playing" && e.payload.newState === "buffering") {
      context.bufferingHandler();
    }
  });
};

module.exports = $YB.plugins.KalturaV3
