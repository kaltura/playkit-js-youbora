/**
 * @license
 * Youbora Plugin JS Kaltura player
 * Copyright NicePopleAtWork & Kaltura
 * @author Jordi Aguilar & Dan Ziv
 */

var $YB = require('./youboralib.min')

$YB.plugins.Kaltura3 = function (player, options) {
  try {
    /** Name and platform of the plugin.*/
    this.pluginName = 'kaltura3';

    /** Version of the plugin. ie: 5.1.0-name */
    this.pluginVersion = '5.3.0-kaltura3';

    /* Initialize YouboraJS */
    this.startMonitoring(player, options);

    this.startingPlayhead = 0;
  } catch (err) {
    $YB.error(err);
  }
};

/** Inherit from generic plugin */
$YB.plugins.Kaltura3.prototype = new $YB.plugins.Generic;

/** Returns the current playhead of the video or 0. */
$YB.plugins.Kaltura3.prototype.getPlayhead = function () {
  return this.player.currentTime;
};

/** Returns the media duration of the video or 0. */
$YB.plugins.Kaltura3.prototype.getMediaDuration = function () {
  return this.player.duration;
};

/** Returns the src of the resource or an empty string. */
$YB.plugins.Kaltura3.prototype.getResource = function () {
  return this.player.currentSrc;
};

$YB.plugins.Kaltura3.prototype.getPlayerVersion = function () {
  return "Kaltura3";
};

/** Register Listeners */
$YB.plugins.Kaltura3.prototype.registerListeners = function () {
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

  // Video starts (/joinTime)
  this.player.addEventListener("timeupdate", function (e) {
    if (!context.viewManager.isJoinSent) {
      if (
        context.startingPlayhead &&
        context.getPlayhead() != context.startingPlayhead &&
        context.getPlayhead() > 0.1
      ) {
        context.joinHandler();
      }
      context.startingPlayhead = context.getPlayhead();
    }
  });

  this.player.addEventListener("playing", function (e) {
    if (context.viewManager.isJoinSent) {
      context.playingHandler();
    }
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
};

module.exports = $YB.plugins.Kaltura3
