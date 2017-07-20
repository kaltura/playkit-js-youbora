(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("playkit-js"));
	else if(typeof define === 'function' && define.amd)
		define(["playkit-js"], factory);
	else if(typeof exports === 'object')
		exports["PlaykitJsYoubora"] = factory(require("playkit-js"));
	else
		root["PlaykitJsYoubora"] = factory(root["Playkit"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playkitJs = __webpack_require__(0);

var _youboraAdapter = __webpack_require__(2);

var _youboraAdapter2 = _interopRequireDefault(_youboraAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The plugin name.
 * @type {string}
 * @const
 */
var pluginName = "youbora";

/**
 * Youbora plugin for analytics.
 * @classdesc
 */

var Youbora = function (_BasePlugin) {
  _inherits(Youbora, _BasePlugin);

  _createClass(Youbora, null, [{
    key: 'isValid',


    /**
     * Define under what conditions the youbora plugin is valid.
     * @returns {boolean} - Whether the plugin is valid or not.
     * @static
     */
    value: function isValid() {
      return true;
    }

    /**
     * @constructor
     * @param {string} name - The name of the plugin.
     * @param {Player} player - Access to the player reference.
     * @param {Object} config - The plugin configuration.
     */


    /**
     * The default configuration of the plugin.
     * @type {Object}
     * @static
     */

  }]);

  function Youbora(name, player, config) {
    _classCallCheck(this, Youbora);

    var _this = _possibleConstructorReturn(this, (Youbora.__proto__ || Object.getPrototypeOf(Youbora)).call(this, name, player, config));

    _this._youbora = new _youboraAdapter2.default(_this.player, _this.config);
    _this._addBindings();
    _this._setup();
    return _this;
  }

  /**
   * Add the necessary bindings.
   * @function
   * @private
   * @returns {void}
   */


  _createClass(Youbora, [{
    key: '_addBindings',
    value: function _addBindings() {
      // Bind the plugin logger to the youbora sdk logger
      _youboraAdapter2.default.bindLogger(this.logger);
    }

    /**
     * Plugin setup operations.
     * @function
     * @private
     * @returns {void}
     */

  }, {
    key: '_setup',
    value: function _setup() {
      this._youbora.registerListeners();
    }

    /**
     * Plugin destroy operations.
     * @function
     * @public
     * @returns {void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._youbora) {
        this._youbora.endedHandler();
      }
    }
  }]);

  return Youbora;
}(_playkitJs.BasePlugin);

/**
 * Register the plugin in player's registry.
 */


Youbora.defaultConfig = {
  accountCode: 'powerdev',
  haltOnError: false,
  transactionCode: 'Free'
};
(0, _playkitJs.registerPlugin)(pluginName, Youbora);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _youboraLib = __webpack_require__(3);

var _youboraLib2 = _interopRequireDefault(_youboraLib);

var _playkitJs = __webpack_require__(0);

var _package = __webpack_require__(4);

var pkg = _interopRequireWildcard(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_youboraLib2.default.plugins.KalturaV3 = function (player, options) {
  try {
    /** Name and platform of the plugin.*/
    this.pluginName = _playkitJs.PLAYER_NAME;

    /** Version of the plugin. ie: 5.1.0-name */
    this.pluginVersion = '5.3.0-' + pkg.version + '-' + _playkitJs.PLAYER_NAME;

    /* Initialize YouboraJS */
    this.startMonitoring(player, options);
  } catch (err) {
    _youboraLib2.default.error(err);
  }
};

/** Inherit from generic plugin */
/**
 * @license
 * Youbora Plugin JS Kaltura player
 * Copyright NicePopleAtWork & Kaltura
 * @author Jordi Aguilar & Dan Ziv
 */
_youboraLib2.default.plugins.KalturaV3.prototype = new _youboraLib2.default.plugins.Generic();

_youboraLib2.default.plugins.KalturaV3.bindLogger = function (logger) {
  _youboraLib2.default.error = logger.error.bind(logger);
  _youboraLib2.default.notice = logger.info.bind(logger);
  _youboraLib2.default.noticeRequest = logger.info.bind(logger);
  _youboraLib2.default.warn = logger.warn.bind(logger);
  _youboraLib2.default.debug = logger.debug.bind(logger);
  _youboraLib2.default.verbose = function () {};
};

/**
 * @returns {Number} - The current playhead of the video or 0.
 */
_youboraLib2.default.plugins.KalturaV3.prototype.getPlayhead = function () {
  return this.player.currentTime;
};

/**
 * @returns {Number} - The media duration of the video or 0.
 */
_youboraLib2.default.plugins.KalturaV3.prototype.getMediaDuration = function () {
  return this.player.duration;
};

/**
 * @returns {string} - The src of the resource or an empty string.
 */
_youboraLib2.default.plugins.KalturaV3.prototype.getResource = function () {
  return this.player.src;
};

/**
 * @returns {string} - The current player version.
 */
_youboraLib2.default.plugins.KalturaV3.prototype.getPlayerVersion = function () {
  return 'KalturaPlaykitJS ' + _playkitJs.VERSION;
};

_youboraLib2.default.plugins.KalturaV3.prototype.getBitrate = function () {
  var activeVideo = this.player.getActiveTracks().video;
  if (activeVideo && activeVideo.bandwidth) {
    return activeVideo.bandwidth / 1024;
  }
  return -1;
};

_youboraLib2.default.plugins.KalturaV3.prototype.getTitle = function () {
  return this.player.config.name;
};

_youboraLib2.default.plugins.KalturaV3.prototype.getRendition = function () {
  var activeVideo = this.player.getActiveTracks().video;
  if (activeVideo) {
    return _youboraLib2.default.utils.buildRenditionString(activeVideo.width, activeVideo.height, activeVideo.bandwidth);
  }
};

_youboraLib2.default.plugins.KalturaV3.prototype.getIsLive = function () {
  return this.player.config.type === "Live";
};

/**
 * Register Listeners.
 * @returns {void}
 */
_youboraLib2.default.plugins.KalturaV3.prototype.registerListeners = function () {
  // save context
  var context = this;
  var Event = this.player.Event;
  var State = this.player.State;

  // Play is clicked (/start)
  this.player.addEventListener(Event.PLAY, function () {
    context.setMetadata();
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
    context.setMetadata();
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
    var newState = e.payload.newState.type;
    var oldState = e.payload.oldState.type;
    if (newState === State.BUFFERING) {
      context.bufferingHandler();
    }
    if (oldState === State.BUFFERING) {
      context.bufferedHandler();
    }
  });
};

_youboraLib2.default.plugins.KalturaV3.prototype.setMetadata = function () {
  this.setOptions({
    properties: {
      kalturaInfo: {
        entryId: this.player.config.id,
        sessionId: this.player.config.session ? this.player.config.session.id : "",
        uiConfigId: this.player.config.session ? this.player.config.session.uiConfID : ""
      }
    }
  });
};

module.exports = _youboraLib2.default.plugins.KalturaV3;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license
 * youboralib 5.4.5 <http://youbora.com/>
 * Copyright NicePeopleAtWork <http://nicepeopleatwork.com/>
 */
var $YB = $YB || { version: "5.4.5", plugins: {}, adnalyzers: {}, utils: {}, managers: {}, comm: {}, data: {} };$YB.comm.Communication = function (e, t) {
  try {
    this.host = e, this.httpSecure = t, this.pingTime = 5, this.prefix = "U", this.code = "", this.view = -1, this.preloaders = [], this._requests = {}, this.addPreloader("FastData");
  } catch (r) {
    $YB.error(r);
  }
}, $YB.comm.Communication.prototype.extraOperationsCallback = null, $YB.comm.Communication.prototype.getViewCode = function () {
  return this.code ? this.prefix + this.code + "_" + this.view : "nocode";
}, $YB.comm.Communication.prototype.nextView = function (e) {
  return this.view++, e === !0 ? this.prefix = "L" : e === !1 ? this.prefix = "V" : this.prefix = "U", this.getViewCode();
}, $YB.comm.Communication.prototype.requestData = function (e, t) {
  try {
    e = e || {}, e.outputformat = "jsonp", delete e.code;var r = this,
        i = new $YB.comm.AjaxRequest(this._parseServiceHost(this.host), "/data", e);i.load(function () {
      r.receiveData(i);
    }), i.load(t), i.send(), $YB.noticeRequest("Request: NQS /data " + e.system);
  } catch (n) {
    $YB.error(n);
  }
}, $YB.comm.Communication.prototype.receiveData = function (e) {
  try {
    var t = e.getXHR(),
        r = t.response || t.responseText,
        i = JSON.parse(r.slice(r.indexOf("(") + 1, r.lastIndexOf(")"))),
        n = i.q.h,
        s = i.q.c,
        o = i.q.pt,
        a = i.q.b;n.length > 0 && s.length > 0 && o.length > 0 && a.length > 0 ? (this.prefix = s.slice(0, 1), this.code = s.slice(1), this.host = n, this.pingTime = o, this.balancerEnabled = a, $YB.noticeRequest("FastData '" + s + "' is ready."), this._requests.nocode && this._requests.nocode.length > 0 && (this._requests[this.getViewCode()] = this._requests.nocode, delete this._requests.nocode), this.removePreloader("FastData")) : $YB.error("Error: FastData response is wrong.");
  } catch (d) {
    $YB.error(d);
  }
}, $YB.comm.Communication.prototype.sendRequest = function (e, t, r) {
  try {
    t = t || {}, delete t.code;var i = new $YB.comm.AjaxRequest("", e, t);i.load(r), this._registerRequest(i);
  } catch (n) {
    $YB.error(n);
  }
}, $YB.comm.Communication.prototype.sendService = function (e, t, r) {
  try {
    var i = new $YB.comm.AjaxRequest(this._parseServiceHost(e), "", t);i.load(r), this._registerRequest(i);
  } catch (n) {
    $YB.error(n);
  }
}, $YB.comm.Communication.prototype.addPreloader = function (e) {
  try {
    this.preloaders.push(e);
  } catch (t) {
    $YB.error(t);
  }
}, $YB.comm.Communication.prototype.removePreloader = function (e) {
  try {
    var t = this.preloaders.indexOf(e);if (t !== -1) {
      if (this.preloaders.splice(t, 1), 0 === this.preloaders.length) {
        var r;for (var i in this._requests) {
          for (; r = this._requests[i].shift();) {
            r.setParam("code", i), r.host || (r.host = this._parseServiceHost(this.host)), "function" == typeof this.extraOperationsCallback && this.extraOperationsCallback(r.params), r.send();
          }
        }
      }
    } else $YB.warn("Warning: trying to remove unexisting preloader '" + e + "'.");
  } catch (n) {
    $YB.error(n);
  }
}, $YB.comm.Communication.prototype._registerRequest = function (e) {
  try {
    return "undefined" == typeof this._requests[this.getViewCode()] && (this._requests[this.getViewCode()] = []), e.setParam("timemark", new Date().getTime()), this._requests[this.getViewCode()].push(e), this._sendRequests(), e;
  } catch (t) {
    $YB.error(t);
  }
}, $YB.comm.Communication.prototype._sendRequests = function () {
  try {
    if (0 === this.preloaders.length) {
      var e;for (var t in this._requests) {
        for (; e = this._requests[t].shift();) {
          e.setParam("code", t), e.host || (e.host = this._parseServiceHost(this.host)), e.send();
        }
      }
    }
  } catch (r) {
    $YB.error(r);
  }
}, $YB.comm.Communication.prototype._parseServiceHost = function (e) {
  try {
    return 0 === e.indexOf("//") ? e = e.slice(2) : 0 === e.indexOf("http://") ? e = e.slice(7) : 0 === e.indexOf("https://") && (e = e.slice(8)), e = this.httpSecure === !0 ? "https://" + e : 0 === window.location.protocol.indexOf("http") ? "//" + e : "http://" + e;
  } catch (t) {
    return $YB.error(t), "http://localhost";
  }
}, $YB.comm.AjaxRequest = function (e, t, r, i) {
  try {
    this.xhr = this.createXHR(), this.host = e, this.service = t || "", this.params = r, this.options = i || {}, this.options.method = this.options.method || $YB.comm.AjaxRequest.options.method, this.options.maxRetries = this.options.maxRetries || $YB.comm.AjaxRequest.options.maxRetries, "undefined" == typeof this.options.retryAfter && (this.options.retryAfter = $YB.comm.AjaxRequest.options.retryAfter), this.hasError = !1, this.retries = 1;
  } catch (n) {
    $YB.error(n);
  }
}, $YB.comm.AjaxRequest.onEverySuccess = null, $YB.comm.AjaxRequest.options = { method: "GET", requestHeaders: {}, maxRetries: 3, retryAfter: 5e3 }, $YB.comm.AjaxRequest.prototype.getUrl = function () {
  try {
    return this.host + this.service + this.getParams();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.comm.AjaxRequest.prototype.getParams = function () {
  try {
    switch (_typeof(this.params)) {case "object":
        return "?" + this._parseParams(this.params);case "string":
        return this.params ? "?" + this.params : "";default:
        return "";}
  } catch (e) {
    $YB.error(e);
  }
}, $YB.comm.AjaxRequest.prototype.setParam = function (e, t) {
  try {
    switch (_typeof(this.params)) {case "string":
        this.params.length > 0 && (this.params += "&"), this.params += e + "=" + t;break;case "object":default:
        this.params[e] = t;}return this;
  } catch (r) {
    return $YB.error(r), this;
  }
}, $YB.comm.AjaxRequest.prototype.on = function (e, t) {
  try {
    "error" == e && (this.hasError = !0), "function" == typeof t ? this.xhr.addEventListener(e, t, !1) : "undefined" != typeof t && $YB.warn("Warning: Request '" + this.getUrl() + "' has a callback that is not a function.");
  } catch (r) {
    $YB.error(r);
  } finally {
    return this;
  }
}, $YB.comm.AjaxRequest.prototype.load = function (e) {
  return this.on("load", e);
}, $YB.comm.AjaxRequest.prototype.error = function (e) {
  return this.on("error", e);
}, $YB.comm.AjaxRequest.prototype.send = function () {
  try {
    if (this.xhr.open(this.options.method, this.getUrl(), !0), this.options.requestHeaders) for (var e in this.options.requestHeaders) {
      this.options.requestHeaders.hasOwnProperty(e) && this.xhr.setRequestHeader(e, this.options.requestHeaders[e]);
    }if (!this.hasError && this.options.retryAfter > 0 && this.options.maxRetries > 0) {
      var t = this;this.error(function () {
        if (t.retries > t.options.maxRetries) $YB.error("Error: Aborting failed request. Max retries reached.");else {
          $YB.warn("Error: Request " + t.service + " failed. Retry " + t.retries + " of " + t.options.maxRetries + " in " + t.options.retryAfter + "ms.");var e = t;setTimeout(function () {
            e.retries += 1, e.send();
          }, t.options.retryAfter);
        }
      });
    }$YB.debugLevel >= 5 && $YB.verbose("XHR Req: " + this.getUrl()), "function" == typeof $YB.comm.AjaxRequest.onEverySuccess && this.load($YB.comm.AjaxRequest.onEverySuccess), this.xhr.send();
  } catch (r) {
    $YB.error(r);
  }
}, $YB.comm.AjaxRequest.prototype.createXHR = function () {
  try {
    return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e) {
    return $YB.error(e), {};
  }
}, $YB.comm.AjaxRequest.prototype.getXHR = function () {
  return this.xhr;
}, $YB.comm.AjaxRequest.prototype._parseParams = function (e) {
  try {
    if ("string" == typeof e) return e;if (null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
      var t = "";for (var r in e) {
        null !== e[r] && "object" == _typeof(e[r]) ? t += encodeURIComponent(r) + "=" + encodeURIComponent(JSON.stringify(e[r])) + "&" : null !== e[r] && "undefined" != typeof e[r] && "" !== e[r] && (t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]) + "&");
      }return t.slice(0, -1);
    }return "";
  } catch (i) {
    return $YB.error(i), "";
  }
}, $YB.data.Options = function (e) {
  try {
    this.setOptions(e);
  } catch (t) {
    $YB.error(t);
  }
}, $YB.data.Options.prototype = { enableAnalytics: !0, disabledRequests: [], parseHLS: !1, parseCDNNodeHost: !1, useCDNFromParser: !1, parseCDNNameFrom: "x-cdn-forward", haltOnError: !0, hashTitle: !0, httpSecure: void 0, enableNiceBuffer: !0, enableNiceSeek: !0, accountCode: "nicetest", service: "nqs.nice264.com", username: void 0, transactionCode: void 0, network: { ip: void 0, isp: void 0 }, device: { id: void 0 }, media: { isLive: void 0, resource: void 0, title: void 0, duration: void 0, cdn: void 0, isBalanced: 0, isResumed: 0 }, ads: { expected: !1, resource: void 0, campaign: void 0, title: void 0, position: void 0, duration: void 0 }, properties: { contentId: void 0, type: void 0, transaction_type: void 0, genre: void 0, language: void 0, year: void 0, cast: void 0, director: void 0, owner: void 0, parental: void 0, price: void 0, rating: void 0, audioType: void 0, audioChannels: void 0, device: void 0, quality: void 0 }, extraParams: { param1: void 0, param2: void 0, param3: void 0, param4: void 0, param5: void 0, param6: void 0, param7: void 0, param8: void 0, param9: void 0, param10: void 0, param11: void 0, param12: void 0, param13: void 0, param14: void 0, param15: void 0, param16: void 0, param17: void 0, param18: void 0, param19: void 0, param20: void 0 }, setOptions: function setOptions(e, t) {
    try {
      if (t = t || this, "undefined" != typeof e) for (var r in e) {
        "object" == _typeof(t[r]) && null !== t[r] ? this.setOptions(e[r], t[r]) : t[r] = e[r];
      }
    } catch (i) {
      $YB.error(i);
    }
  } }, $YB.adnalyzers.Generic = function () {}, $YB.adnalyzers.Generic.prototype = { adnalyzerVersion: "5.3.0-GENERIC", ads: void 0, plugin: void 0 }, $YB.adnalyzers.Generic.prototype.startMonitoring = function (e, t) {
  try {
    $YB.notice("Adnalyzer " + this.adnalyzerVersion + " is ready."), this.plugin = e, this.ads = t;
  } catch (r) {
    return $YB.error(r), null;
  }
}, $YB.adnalyzers.Generic.prototype.stopMonitoring = function () {
  this.ads = null, this.plugin.viewManager.timer.adPlayheadMonitor.stop();
}, $YB.adnalyzers.Generic.prototype.enableAdBufferMonitor = function () {
  this.plugin.infoManager.options.enableNiceBuffer && (this.plugin.viewManager.enableAdBufferMonitor = !0);
}, $YB.adnalyzers.Generic.prototype.enableAdSeekMonitor = function () {
  this.plugin.infoManager.options.enableNiceSeek && (this.plugin.viewManager.enableAdSeekMonitor = !0);
}, $YB.adnalyzers.Generic.prototype.playAdHandler = function () {
  try {
    this.plugin.viewManager.isAdStartSent || this.plugin.viewManager.sendAdStart();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.startJoinAdHandler = function () {
  try {
    this.plugin.viewManager.isAdStartSent || (this.plugin.viewManager.sendAdStart(), this.plugin.viewManager.isBuffering && (this.plugin.viewManager.chrono.joinTime.startTime = this.plugin.viewManager.chrono.buffer.startTime, this.plugin.viewManager.isBuffering = !1), this.plugin.viewManager.sendAdJoin());
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.joinAdHandler = function () {
  try {
    this.plugin.viewManager.sendAdJoin();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.pauseAdHandler = function () {
  try {
    this.plugin.viewManager.sendAdPause();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.pauseToggleAdHandler = function () {
  try {
    this.plugin.viewManager.isAdPaused ? this.plugin.viewManager.sendAdResume() : this.plugin.viewManager.sendAdPause();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.resumeAdHandler = function () {
  try {
    this.plugin.viewManager.sendAdResume();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.endedAdHandler = function () {
  try {
    this.plugin.viewManager.sendAdStop();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.skipAdHandler = function () {
  try {
    this.plugin.viewManager.sendAdStop({ skipped: !0 });
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.bufferingAdHandler = function () {
  try {
    this.plugin.viewManager.sendAdBufferStart();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.bufferedAdHandler = function () {
  try {
    this.plugin.viewManager.isAdStartSent && (this.plugin.viewManager.isAdJoinSent ? this.plugin.viewManager.isAdBuffering && this.plugin.viewManager.sendAdBufferEnd() : this.plugin.viewManager.sendAdJoin());
  } catch (e) {
    $YB.error(e);
  }
}, $YB.adnalyzers.Generic.prototype.errorAdHandler = function (e, t) {
  try {
    "undefined" == typeof e && (e = 0), t = t || e || "Unknown error", this.plugin.viewManager.sendAdError({ errorCode: e, msg: t });
  } catch (r) {
    $YB.error(r);
  }
}, $YB.adnalyzers.Generic.prototype.clickAdHandler = function (e) {
  try {
    this.plugin.viewManager.sendAdClick({ adUrl: e });
  } catch (t) {
    $YB.error(t);
  }
}, $YB.adnalyzers.Generic.prototype.getAdResource = function () {
  return "unknown";
}, $YB.adnalyzers.Generic.prototype.getMediaPlayhead = function () {
  return null;
}, $YB.adnalyzers.Generic.prototype.getAdPlayhead = function () {
  return 0;
}, $YB.adnalyzers.Generic.prototype.getAdPosition = function () {
  return this.plugin.viewManager.isJoinSent ? "mid" : "pre";
}, $YB.adnalyzers.Generic.prototype.getAdTitle = function () {
  return null;
}, $YB.adnalyzers.Generic.prototype.getAdDuration = function () {
  return 0;
}, $YB.adnalyzers.Generic.prototype.getAdBitrate = function () {
  return -1;
}, $YB.adnalyzers.Generic.prototype.getAdPlayerVersion = function () {
  return null;
}, $YB.plugins.Generic = function () {}, $YB.plugins.Generic.prototype = { pluginName: "GENERIC", pluginVersion: "5.1.0-GENERIC", playerId: "generic", player: null, tag: null, infoManager: void 0, viewManager: void 0, adnalyzer: null }, $YB.plugins.Generic.prototype.startMonitoring = function (e, t) {
  try {
    $YB.notice("Plugin " + this.pluginVersion + " (with YouboraJS " + $YB.version + ") is ready."), "string" == typeof e ? (this.playerId = e, this.player = document.getElementById(e)) : (this.player = e, e && e.id && (this.playerId = e.id)), this.tag = this.player, "undefined" == typeof this.infoManager ? this.infoManager = new $YB.managers.Info(this, t) : this.infoManager.setOptions(t), this.viewManager = new $YB.managers.View(this.infoManager);
  } catch (r) {
    return $YB.error(r), null;
  }
}, $YB.plugins.Generic.prototype.stopMonitoring = function () {
  this.player = null, this.tag = null, this.viewManager.stopTimers();
}, $YB.plugins.Generic.prototype.enableBufferMonitor = function () {
  this.infoManager.options.enableNiceBuffer && (this.viewManager.enableBufferMonitor = !0);
}, $YB.plugins.Generic.prototype.enableSeekMonitor = function () {
  this.infoManager.options.enableNiceSeek && (this.viewManager.enableSeekMonitor = !0);
}, $YB.plugins.Generic.prototype.setOptions = function (e) {
  try {
    this.infoManager.options.setOptions(e);
  } catch (t) {
    $YB.error(t);
  }
}, $YB.plugins.Generic.prototype.getOptions = function () {
  try {
    return this.infoManager.options || {};
  } catch (e) {
    return $YB.error(e), {};
  }
}, $YB.plugins.Generic.prototype.playHandler = function () {
  try {
    this.viewManager.sendStart();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.joinHandler = function () {
  try {
    this.viewManager.sendJoin();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.playingHandler = function () {
  try {
    this.viewManager.isStartSent && (this.viewManager.isJoinSent ? this.viewManager.isSeeking && this.viewManager.isPaused ? (this.viewManager.sendSeekEnd(), this.viewManager.sendResume()) : this.viewManager.isSeeking ? this.viewManager.sendSeekEnd() : this.viewManager.isBuffering ? this.viewManager.sendBufferEnd() : this.viewManager.isPaused && this.viewManager.sendResume() : this.viewManager.sendJoin());
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.pauseHandler = function () {
  try {
    this.viewManager.sendPause();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.pauseToggleHandler = function () {
  try {
    this.viewManager.isPaused ? this.viewManager.sendResume() : this.viewManager.sendPause();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.resumeHandler = function () {
  try {
    this.viewManager.sendResume();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.endedHandler = function () {
  try {
    this.viewManager.sendStop();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.errorHandler = function (e, t) {
  try {
    "undefined" == typeof e && (e = 0), t = t || e || "Unknown error", this.viewManager.sendError({ errorCode: e, msg: t });
  } catch (r) {
    $YB.error(r);
  }
}, $YB.plugins.Generic.prototype.seekingHandler = function () {
  try {
    this.viewManager.isBuffering ? this.viewManager.convertBufferToSeek() : this.viewManager.sendSeekStart();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.seekedHandler = function () {
  try {
    this.viewManager.sendSeekEnd();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.bufferingHandler = function () {
  try {
    this.viewManager.isSeeking || this.viewManager.sendBufferStart();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.bufferedHandler = function () {
  try {
    this.viewManager.isStartSent && (this.viewManager.isJoinSent ? this.viewManager.isSeeking ? this.viewManager.sendSeekEnd() : this.viewManager.isBuffering && this.viewManager.sendBufferEnd() : this.viewManager.sendJoin());
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.ignoringAdHandler = function () {
  try {
    this.viewManager.sendIgnoreAdStart();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.ignoredAdHandler = function () {
  try {
    this.viewManager.sendIgnoreAdEnd();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.plugins.Generic.prototype.getResource = function () {
  return "unknown";
}, $YB.plugins.Generic.prototype.getPlayhead = function () {
  return 0;
}, $YB.plugins.Generic.prototype.getMediaDuration = function () {
  return 0;
}, $YB.plugins.Generic.prototype.getIsLive = function () {
  return !1;
}, $YB.plugins.Generic.prototype.getRendition = function () {
  return null;
}, $YB.plugins.Generic.prototype.getBitrate = function () {
  return -1;
}, $YB.plugins.Generic.prototype.getThroughput = function () {
  return -1;
}, $YB.plugins.Generic.prototype.getPlayerVersion = function () {
  return null;
}, $YB.plugins.Generic.prototype.getTotalBytes = function () {
  return null;
}, $YB.plugins.Generic.prototype.getTitle = function () {
  return null;
}, $YB.managers.Info = function (e, t) {
  this.plugin = e, this.options = new $YB.data.Options(t), this.lastBitrate = 0, this.lastAdBitrate = 0;
}, $YB.managers.Info.prototype.getDataParams = function (e) {
  try {
    return e = e || {}, e.system = e.hasOwnProperty("system") ? e.system : this.options.accountCode, e.pluginName = e.hasOwnProperty("pluginName") ? e.pluginName : this.plugin.pluginName, e.pluginVersion = e.hasOwnProperty("pluginVersion") ? e.pluginVersion : this.plugin.pluginVersion, e.live = e.hasOwnProperty("live") ? e.live : this.options.media.isLive, e;
  } catch (t) {
    return $YB.error(t), e;
  }
}, $YB.managers.Info.prototype.setOptions = function (e) {
  this.options.setOptions(e);
}, $YB.managers.Info.prototype.getOptions = function (e) {
  return this.options;
}, $YB.managers.Info.prototype.getAdPlayhead = function () {
  try {
    return this.plugin.adnalyzer ? $YB.utils.parseNumber(this.plugin.adnalyzer.getAdPlayhead(), 0) : 0;
  } catch (e) {
    return $YB.warn(e), 0;
  }
}, $YB.managers.Info.prototype.getAdBitrate = function () {
  try {
    if (this.plugin.adnalyzer) {
      var e = Math.round(this.plugin.adnalyzer.getAdBitrate());if (e == -1 && this.plugin.adnalyzer.tag && "undefined" != typeof this.plugin.adnalyzer.tag.webkitVideoDecodedByteCount) {
        var t = this.plugin.adnalyzer.tag.webkitVideoDecodedByteCount;this.lastAdBitrate && (t = Math.round((this.plugin.adnalyzer.tag.webkitVideoDecodedByteCount - this.lastAdBitrate) / 5 * 8)), this.lastAdBitrate = this.plugin.adnalyzer.tag.webkitVideoDecodedByteCount, e = t;
      }return $YB.utils.parseNumber(e, -1);
    }return -1;
  } catch (r) {
    return $YB.warn(r), -1;
  }
}, $YB.managers.Info.prototype.getAdResource = function () {
  try {
    return "undefined" != typeof this.options.ads.resource ? this.options.ads.resource : this.plugin.adnalyzer.getAdResource();
  } catch (e) {
    return $YB.warn(e), "";
  }
}, $YB.managers.Info.prototype.getAdPosition = function () {
  try {
    return "undefined" != typeof this.options.ads.position ? this.options.ads.position : this.plugin.adnalyzer.getAdPosition();
  } catch (e) {
    return $YB.warn(e), "mid";
  }
}, $YB.managers.Info.prototype.getAdTitle = function () {
  try {
    return "undefined" != typeof this.options.ads.title ? this.options.ads.title : this.plugin.adnalyzer.getAdTitle();
  } catch (e) {
    return $YB.warn(e), "";
  }
}, $YB.managers.Info.prototype.getAdDuration = function () {
  try {
    var e = 0;return e = "undefined" != typeof this.options.ads.duration ? this.options.ads.duration : Math.round(this.plugin.adnalyzer.getAdDuration()), $YB.utils.parseNumber(e, 0);
  } catch (t) {
    return $YB.warn(t), 0;
  }
}, $YB.managers.Info.prototype.getAdPlayerVersion = function () {
  try {
    return this.plugin.adnalyzer.getAdPlayerVersion();
  } catch (e) {
    return $YB.warn(e), null;
  }
}, $YB.managers.Info.prototype.getAdStartParams = function (e, t) {
  try {
    return e = e || {}, e.position = "undefined" != typeof e.position ? e.position : this.getAdPosition(), e.resource = "undefined" != typeof e.resource ? e.resource : this.getAdResource(), e.campaign = "undefined" != typeof e.campaign ? e.campaign : this.options.ads.campaign, e.title = "undefined" != typeof e.title ? e.title : this.getAdTitle(), e.adDuration = "undefined" != typeof e.adDuration ? e.adDuration : this.getAdDuration(), e.playhead = "undefined" != typeof e.playhead ? e.playhead : Math.round(this.getPlayhead()), e.adnalyzerVersion = "undefined" != typeof e.adnalyzerVersion ? e.adnalyzerVersion : this.plugin.adnalyzer.adnalyzerVersion, e.adPlayerVersion = "undefined" != typeof e.adPlayerVersion ? e.adPlayerVersion : this.getAdPlayerVersion(), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getAdJoinParams = function (e, t) {
  try {
    return e = e || {}, e.adPlayhead = "undefined" != typeof e.adPlayhead ? e.adPlayhead : this.getAdPlayhead(), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getAdStopParams = function (e, t) {
  try {
    return e = e || {}, e.adPlayhead = "undefined" != typeof e.adPlayhead ? e.adPlayhead : Math.round(this.getAdPlayhead()), e.adBitrate = "undefined" != typeof e.adBitrate ? e.adBitrate : this.getAdBitrate(), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getAdPauseParams = function (e, t) {
  return e || {};
}, $YB.managers.Info.prototype.getAdResumeParams = function (e, t) {
  return e || {};
}, $YB.managers.Info.prototype.getAdBufferEndParams = function (e, t) {
  try {
    return e = e || {}, e.adPlayhead = "undefined" != typeof e.adPlayhead ? e.adPlayhead : Math.round(this.getAdPlayhead()), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getAdPingParams = function (e, t) {
  try {
    return e = e || {}, e.adBitrate = "undefined" != typeof e.adBitrate ? e.adBitrate : this.getAdBitrate(), e.adPlayhead = "undefined" != typeof e.adPlayhead ? e.adPlayhead : Math.round(this.getAdPlayhead()), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getAdErrorParams = function (e, t) {
  try {
    return e = e || {}, e.errorCode = e.hasOwnProperty("errorCode") ? e.errorCode : "9000", e.msg = e.hasOwnProperty("msg") ? e.msg : "Unknown Error", e.adPlayhead = "undefined" != typeof e.adPlayhead ? e.adPlayhead : Math.round(this.getAdPlayhead()), e.player = e.hasOwnProperty("player") ? e.player : this.plugin.pluginName, e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getAdClickParams = function (e, t) {
  try {
    return e = e || {}, e.adPlayhead = "undefined" != typeof e.adPlayhead ? e.adPlayhead : Math.round(this.getAdPlayhead()), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getResource = function () {
  try {
    return this.plugin.viewManager.resourceParser && this.plugin.viewManager.resourceParser.realResource ? this.plugin.viewManager.resourceParser.realResource : "undefined" != typeof this.options.media.resource ? this.options.media.resource : this.plugin.getResource();
  } catch (e) {
    return $YB.warn(e), "unknown";
  }
}, $YB.managers.Info.prototype.getCDN = function () {
  try {
    return this.plugin.viewManager.resourceParser && this.plugin.viewManager.resourceParser.cdn && this.options.useCDNFromParser ? this.plugin.viewManager.resourceParser.cdn : "undefined" != typeof this.options.media.cdn ? this.options.media.cdn : null;
  } catch (e) {
    return $YB.warn(e), null;
  }
}, $YB.managers.Info.prototype.getMediaDuration = function () {
  try {
    var e = 0;return e = "undefined" != typeof this.options.media.duration ? this.options.media.duration : this.plugin.getMediaDuration(), Math.round($YB.utils.parseNumber(e, 0));
  } catch (t) {
    return $YB.warn(t), 0;
  }
}, $YB.managers.Info.prototype.getIsLive = function () {
  try {
    return "undefined" != typeof this.options.media.isLive ? this.options.media.isLive : this.plugin.getIsLive();
  } catch (e) {
    return $YB.warn(e), !1;
  }
}, $YB.managers.Info.prototype.getPlayerVersion = function () {
  try {
    return this.plugin.getPlayerVersion();
  } catch (e) {
    return $YB.warn(e), "";
  }
}, $YB.managers.Info.prototype.getTitle = function () {
  try {
    return "undefined" != typeof this.options.media.title ? this.options.media.title : this.plugin.getTitle();
  } catch (e) {
    return $YB.warn(e), "";
  }
}, $YB.managers.Info.prototype.getRendition = function () {
  try {
    return "undefined" != typeof this.options.media.rendition ? this.options.media.rendition : this.plugin.getRendition();
  } catch (e) {
    return $YB.warn(e), "";
  }
}, $YB.managers.Info.prototype.getBitrate = function () {
  try {
    var e = Math.round(this.plugin.getBitrate());if (e == -1 && this.plugin.tag && "undefined" != typeof this.plugin.tag.webkitVideoDecodedByteCount) {
      var t = this.plugin.tag.webkitVideoDecodedByteCount;this.lastBitrate && (t = Math.round((this.plugin.tag.webkitVideoDecodedByteCount - this.lastBitrate) / 5 * 8)), this.lastBitrate = this.plugin.tag.webkitVideoDecodedByteCount, e = 0 != t ? t : -1;
    }return $YB.utils.parseNumber(e, -1);
  } catch (r) {
    return $YB.warn(r), -1;
  }
}, $YB.managers.Info.prototype.getThroughput = function () {
  try {
    return $YB.utils.parseNumber(Math.round(this.plugin.getThroughput()), -1);
  } catch (e) {
    return $YB.warn(e), -1;
  }
}, $YB.managers.Info.prototype.getTotalBytes = function () {
  try {
    return $YB.utils.parseNumber(this.plugin.getTotalBytes(), null);
  } catch (e) {
    return $YB.warn(e), null;
  }
}, $YB.managers.Info.prototype.getPlayhead = function () {
  try {
    var e = this.plugin.getPlayhead();return this.plugin.adnalyzer && null !== this.plugin.adnalyzer.getMediaPlayhead() && (e = this.plugin.adnalyzer.getMediaPlayhead()), $YB.utils.parseNumber(e, 0);
  } catch (t) {
    return $YB.warn(t), 0;
  }
}, $YB.managers.Info.prototype.getStartParams = function (e) {
  try {
    if (e = e || {}, e.system = e.hasOwnProperty("system") ? e.system : this.options.accountCode, e.player = e.hasOwnProperty("player") ? e.player : this.plugin.pluginName, e.user = e.hasOwnProperty("user") ? e.user : this.options.username, e.transcode = e.hasOwnProperty("transcode") ? e.transcode : this.options.transactionCode, e.hashTitle = e.hasOwnProperty("hashTitle") ? e.hashTitle : this.options.hashTitle, !e.hasOwnProperty("referer")) {
      e.referer = "";try {
        e.referer = top.window.location.href;
      } catch (t) {
        e.referer = window.location.href;
      }
    }return e.deviceId = e.hasOwnProperty("deviceId") ? e.deviceid : this.options.device.id, e.pluginVersion = e.hasOwnProperty("pluginVersion") ? e.pluginVersion : this.plugin.pluginVersion, e.playerVersion = e.hasOwnProperty("playerVersion") ? e.playerVersion : this.getPlayerVersion(), e.resource = e.hasOwnProperty("resource") ? e.resource : this.getResource(), e.duration = e.hasOwnProperty("duration") ? e.duration : this.getMediaDuration(), e.live = e.hasOwnProperty("live") ? e.live : this.getIsLive(), e.rendition = e.hasOwnProperty("rendition") ? e.rendition : this.getRendition(), e.title = e.hasOwnProperty("title") ? e.title : this.getTitle(), e.properties = e.hasOwnProperty("properties") ? e.properties : this.options.properties, e.cdn = e.hasOwnProperty("cdn") ? e.cdn : this.getCDN(), e.isp = e.hasOwnProperty("isp") ? e.isp : this.options.network.isp, e.ip = e.hasOwnProperty("ip") ? e.ip : this.options.network.ip, e.param1 = e.hasOwnProperty("param1") ? e.param1 : this.options.extraParams.param1, e.param2 = e.hasOwnProperty("param2") ? e.param2 : this.options.extraParams.param2, e.param3 = e.hasOwnProperty("param3") ? e.param3 : this.options.extraParams.param3, e.param4 = e.hasOwnProperty("param4") ? e.param4 : this.options.extraParams.param4, e.param5 = e.hasOwnProperty("param5") ? e.param5 : this.options.extraParams.param5, e.param6 = e.hasOwnProperty("param6") ? e.param6 : this.options.extraParams.param6, e.param7 = e.hasOwnProperty("param7") ? e.param7 : this.options.extraParams.param7, e.param8 = e.hasOwnProperty("param8") ? e.param8 : this.options.extraParams.param8, e.param9 = e.hasOwnProperty("param9") ? e.param9 : this.options.extraParams.param9, e.param10 = e.hasOwnProperty("param10") ? e.param10 : this.options.extraParams.param10, e.param11 = e.hasOwnProperty("param11") ? e.param11 : this.options.extraParams.param11, e.param12 = e.hasOwnProperty("param12") ? e.param12 : this.options.extraParams.param12, e.param13 = e.hasOwnProperty("param13") ? e.param13 : this.options.extraParams.param13, e.param14 = e.hasOwnProperty("param14") ? e.param14 : this.options.extraParams.param14, e.param15 = e.hasOwnProperty("param15") ? e.param15 : this.options.extraParams.param15, e.param16 = e.hasOwnProperty("param16") ? e.param16 : this.options.extraParams.param16, e.param17 = e.hasOwnProperty("param17") ? e.param17 : this.options.extraParams.param17, e.param18 = e.hasOwnProperty("param18") ? e.param18 : this.options.extraParams.param18, e.param19 = e.hasOwnProperty("param19") ? e.param19 : this.options.extraParams.param19, e.param20 = e.hasOwnProperty("param20") ? e.param20 : this.options.extraParams.param20, e.totalBytes = e.hasOwnProperty("totalBytes") ? e.totalBytes : this.getTotalBytes(), e.adsExpected = e.hasOwnProperty("adsExpected") ? e.adsExpected : this.options.ads.expected, 1 == this.options.isResumed && (e.isResumed = 1), 1 == this.options.isBalanced && (e.isBalanced = 1), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.Info.prototype.getJoinParams = function (e) {
  try {
    return e = e || {}, e.eventTime = e.hasOwnProperty("eventTime") ? e.eventTime : this.getPlayhead(), e.mediaDuration = e.hasOwnProperty("mediaDuration") ? e.mediaDuration : this.getMediaDuration(), e;
  } catch (t) {
    return $YB.error(t), e;
  }
}, $YB.managers.Info.prototype.getStopParams = function (e) {
  return e || {};
}, $YB.managers.Info.prototype.getPauseParams = function (e) {
  return e || {};
}, $YB.managers.Info.prototype.getResumeParams = function (e) {
  return e || {};
}, $YB.managers.Info.prototype.getBufferEndParams = function (e) {
  try {
    return e = e || {}, e.time = e.hasOwnProperty("time") ? e.time : this.getPlayhead(), e;
  } catch (t) {
    return $YB.error(t), e;
  }
}, $YB.managers.Info.prototype.getErrorParams = function (e) {
  try {
    return e = e || {}, e.errorCode = e.hasOwnProperty("errorCode") ? e.errorCode : "9000", e.msg = e.hasOwnProperty("msg") ? e.msg : "Unknown Error", e = this.getStartParams(e);
  } catch (t) {
    return $YB.error(t), e;
  }
}, $YB.managers.Info.prototype.getSeekEndParams = function (e) {
  return this.getBufferEndParams(e);
}, $YB.managers.Info.prototype.getPingParams = function (e, t) {
  try {
    return e = e || {}, e.time = "undefined" != typeof e.time ? e.time : this.getPlayhead(), e.bitrate = "undefined" != typeof e.bitrate ? e.bitrate : this.getBitrate(), e.throughput = "undefined" != typeof e.throughput ? e.throughput : this.getThroughput(), e.totalBytes = "undefined" != typeof e.totalBytes ? e.totalBytes : this.getTotalBytes(), e;
  } catch (r) {
    return $YB.error(r), e;
  }
}, $YB.managers.View = function (e) {
  this.infoManager = e, this.isStartSent = !1, this.isJoinSent = !1, this.isPaused = !1, this.isSeeking = !1, this.isBuffering = !1, this.isErrorSent = !1, this.isShowingAds = !1, this.isAdStartSent = !1, this.isAdJoinSent = !1, this.isAdPaused = !1, this.isAdBuffering = !1, this.chrono = { joinTime: new $YB.utils.Chrono(), seek: new $YB.utils.Chrono(), pause: new $YB.utils.Chrono(), buffer: new $YB.utils.Chrono(), adIgnore: new $YB.utils.Chrono(), adTotal: new $YB.utils.Chrono(), adJoinTime: new $YB.utils.Chrono(), adPause: new $YB.utils.Chrono(), adBuffer: new $YB.utils.Chrono() }, this.adCounter = { pre: 0, mid: 0, post: 0, unknown: 0 };var t = this;this.timer = { pinger: new $YB.utils.Timer(function (e) {
      t.sendPing({ diffTime: e });
    }), playheadMonitor: new $YB.utils.Timer(function (e) {
      t.checkPlayhead();
    }, $YB.managers.View.monitoringInterval), adPlayheadMonitor: new $YB.utils.Timer(function (e) {
      t.checkAdPlayhead();
    }, $YB.managers.View.monitoringInterval) }, this.enableBufferMonitor = !1, this.enableSeekMonitor = !1, this.enableAdBufferMonitor = !1, this.enableAdSeekMonitor = !1, this.lastDuration = 0, this.lastPlayhead = 0, this.lastAdPosition = "", this.lastRendition = "", this.lastResume = 0, this.changedEntities = [], this.resourceParser = new $YB.utils.ResourceParser(this), this.comm = new $YB.comm.Communication(this.infoManager.options.service, this.infoManager.options.httpSecure), this.comm.requestData(this.infoManager.getDataParams(), function () {
    t.timer.pinger.interval = Math.max(1e3, 1e3 * t.comm.pingTime);
  });
}, $YB.managers.View.prototype.sendRequest = function (e, t, r) {
  try {
    this.isAllowed(e) && this.comm.sendRequest(e, t, r);
  } catch (i) {
    $YB.error(i);
  }
}, $YB.managers.View.prototype.isAllowed = function (e) {
  return this.infoManager.options.enableAnalytics && !(e in this.infoManager.options.disabledRequests);
}, $YB.managers.View.prototype.isHalted = function () {
  return this.infoManager.options.haltOnError && this.isErrorSent;
}, $YB.managers.View.prototype.sendAdStart = function (e, t) {
  try {
    this.isHalted() || this.isAdStartSent || (this.isShowingAds = !0, this.isAdStartSent = !0, this.chrono.adTotal.start(), this.chrono.adJoinTime.start(), this.sendSeekEnd(), this.sendBufferEnd(), e = this.infoManager.getAdStartParams(e), e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position, !0), this.lastAdPosition = e.position, this.sendRequest("/adStart", e, t), $YB.noticeRequest("Request: NQS /adStart " + e.position + e.number));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdJoin = function (e, t) {
  try {
    this.isHalted() || this.isAdStartSent && !this.isAdJoinSent && (this.isAdJoinSent = !0, (this.enableAdBufferMonitor || this.enableAdSeekMonitor) && (this.timer.adPlayheadMonitor.start(), this.lastPlayhead = 0), e = this.infoManager.getAdJoinParams(e), e.duration = "undefined" != typeof e.duration ? e.duration : this.chrono.adJoinTime.getDeltaTime(), e.position = "undefined" != typeof e.position ? e.position : this.lastAdPosition, e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position), this.sendRequest("/adJoinTime", e, t), $YB.noticeRequest("Request: NQS /adJoinTime " + e.duration + "ms"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdStop = function (e, t) {
  try {
    this.isHalted() || this.isAdStartSent && (this.isAdStartSent = !1, this.isAdJoinSent = !1, this.isAdPaused = !1, this.isAdBuffering = !1, this.isShowingAds = !1, this.timer.adPlayheadMonitor.stop(), e = this.infoManager.getAdStopParams(e), e.totalDuration = "undefined" != typeof e.totalDuration ? e.totalDuration : this.chrono.adTotal.getDeltaTime(), e.position = "undefined" != typeof e.position ? e.position : this.lastAdPosition, e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position), e.adPlayhead || delete e.adPlayhead, this.isJoinSent || (this.chrono.joinTime.startTime += this.chrono.adTotal.getDeltaTime(), this.chrono.joinTime.startTime = Math.min(this.chrono.joinTime.startTime, new Date().getTime())), this.sendRequest("/adStop", e, t), $YB.noticeRequest("Request: NQS /adStop " + e.totalDuration + "ms"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdPause = function (e, t) {
  try {
    this.isHalted() || this.isAdJoinSent && !this.isAdPaused && (this.isAdPaused = !0, this.chrono.adPause.start(), e = this.infoManager.getAdPauseParams(e), e.position = "undefined" != typeof e.position ? e.position : this.lastAdPosition, e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position), this.sendRequest("/adPause", e, t), $YB.noticeRequest("Request: NQS /adPause"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdResume = function (e, t) {
  try {
    this.isHalted() || this.isAdJoinSent && this.isAdPaused && (this.isAdPaused = !1, this.chrono.adPause.stop(), e = this.infoManager.getAdResumeParams(e), e.position = "undefined" != typeof e.position ? e.position : this.lastAdPosition, e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position), this.sendRequest("/adResume", e, t), $YB.noticeRequest("Request: NQS /adResume"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdBufferStart = function () {
  try {
    this.isHalted() || this.isAdJoinSent && !this.isAdBuffering && (this.isAdBuffering = !0, this.chrono.adBuffer.start(), $YB.noticeRequest("Method: /adBufferStart"));
  } catch (e) {
    $YB.error(e);
  }
}, $YB.managers.View.prototype.sendAdBufferEnd = function (e, t) {
  try {
    this.isHalted() || this.isAdJoinSent && this.isAdBuffering && (this.isAdBuffering = !1, e = this.infoManager.getAdBufferEndParams(e), e.duration = "undefined" != typeof e.duration ? e.duration : this.chrono.adBuffer.getDeltaTime(), e.position = "undefined" != typeof e.position ? e.position : this.lastAdPosition, e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position), this.sendRequest("/adBufferUnderrun", e, t), $YB.noticeRequest("Request: NQS /adBufferUnderrun " + e.duration + "ms"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdError = function (e, t) {
  try {
    this.isHalted() || (e = this.infoManager.getAdErrorParams(e), "undefined" == typeof e.position && (this.isAdStartSent ? (e.position = this.lastAdPosition, e.number = this.getAdNumber(e.position)) : (e.position = this.infoManager.getAdPosition(), e.number = this.getAdNumber(e.position, !0))), this.sendRequest("/adError", e, t), $YB.noticeRequest("Request: NQS /adError"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendAdClick = function (e, t) {
  try {
    this.isHalted() || (e = this.infoManager.getAdClickParams(e), e.position = "undefined" != typeof e.position ? e.position : this.lastAdPosition, e.number = "undefined" != typeof e.number ? e.number : this.getAdNumber(e.position), this.sendRequest("/adClick", e, t), $YB.noticeRequest("Request: NQS /adClick"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.getAdNumber = function (e, t) {
  switch (e) {case "pre":
      return t ? ++this.adCounter.pre : this.adCounter.pre;case "mid":
      return t ? ++this.adCounter.mid : this.adCounter.mid;case "post":
      return t ? ++this.adCounter.post : this.adCounter.post;default:
      return t ? ++this.adCounter.unknown : this.adCounter.unknown;}
}, $YB.managers.View.prototype.resetAdNumbers = function () {
  this.adCounter = { pre: 0, mid: 0, post: 0, unknown: 0 };
}, $YB.managers.View.prototype.sendIgnoreAdStart = function () {
  try {
    this.isHalted() || this.isStartSent && !this.isShowingAds && (this.isShowingAds = !0, this.chrono.adIgnore.start(), this.sendBufferEnd(), this.sendSeekEnd(), $YB.noticeRequest("Method: /genericAdStart"));
  } catch (e) {
    $YB.error(e);
  }
}, $YB.managers.View.prototype.sendIgnoreAdEnd = function () {
  try {
    this.isHalted() || this.isStartSent && this.isShowingAds && (this.isShowingAds = !1, this.chrono.adIgnore.stop(), this.isJoinSent || (this.chrono.joinTime.startTime += this.chrono.adIgnore.getDeltaTime(), this.chrono.joinTime.startTime = Math.min(this.chrono.joinTime.startTime, new Date().getTime())), $YB.noticeRequest("Method: /genericAdEnd " + this.chrono.adIgnore.getDeltaTime() + "ms"));
  } catch (e) {
    $YB.error(e);
  }
}, $YB.managers.View.prototype.sendStart = function (e, t) {
  try {
    this.isHalted() || this.isStartSent || ((this.infoManager.options.parseCDNNodeHost || this.infoManager.options.parseHLS) && this.resourceParser.init(), this.isStartSent = !0, this.chrono.joinTime.start(), $YB.noticeRequest("Sending pings every " + this.comm.pingTime + "s."), this.timer.pinger.interval = Math.max(1e3, 1e3 * this.comm.pingTime), this.timer.pinger.start(), e = this.infoManager.getStartParams(e), e.pingTime = "undefined" != typeof e.pingTime ? e.pingTime : this.comm.pingTime, this.infoManager.options.parseCDNNodeHost && (e.nodeHost = "undefined" != typeof e.nodeHost ? e.nodeHost : "undefined" != typeof this.resourceParser.nodeHost ? this.resourceParser.nodeHost : "", e.nodeType = "undefined" != typeof e.nodeType ? e.nodeType : "undefined" != typeof this.resourceParser.nodeType ? this.resourceParser.nodeType : ""), this.comm.nextView(e.live), this.sendRequest("/start", e, t), $YB.noticeRequest("Request: NQS /start " + e.resource), this.lastDuration = e.duration, this.lastRendition = e.rendition);
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendJoin = function (e, t) {
  try {
    this.isHalted() || !this.isStartSent || this.isJoinSent || this.isShowingAds || (this.isJoinSent = !0, (this.enableBufferMonitor || this.enableSeekMonitor) && (this.timer.playheadMonitor.start(), this.lastPlayhead = 0), e = this.infoManager.getJoinParams(e), e.time = "undefined" != typeof e.time ? e.time : this.chrono.joinTime.getDeltaTime(), e.mediaDuration === this.lastDuration && delete e.mediaDuration, this.sendRequest("/joinTime", e, t), $YB.noticeRequest("Request: NQS /joinTime " + e.time + "ms"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendStop = function (e, t) {
  try {
    this.isHalted() || this.isStartSent && (this.isStartSent = !1, this.isPaused = !1, this.isJoinSent = !1, this.isSeeking = !1, this.isBuffering = !1, this.isErrorSent = !1, this.resourceParser.clear(), this.resetAdNumbers(), this.stopTimers(), e = this.infoManager.getStopParams(e), e.diffTime = "undefined" != typeof e.diffTime ? e.diffTime : this.timer.pinger.chrono.getDeltaTime(), this.sendRequest("/stop", e, t), $YB.noticeRequest("Request: NQS /stop"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendPause = function (e, t) {
  try {
    this.isHalted() || this.isJoinSent && !this.isPaused && (this.isPaused = !0, this.chrono.pause.start(), e = this.infoManager.getPauseParams(e), this.sendRequest("/pause", e, t), $YB.noticeRequest("Request: NQS /pause"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendResume = function (e, t) {
  try {
    this.isHalted() || this.isJoinSent && this.isPaused && (this.isPaused = !1, this.chrono.pause.stop(), this.lastResume = new Date().getTime(), e = this.infoManager.getResumeParams(e), this.sendRequest("/resume", e, t), $YB.noticeRequest("Request: NQS /resume"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendBufferStart = function () {
  try {
    this.isHalted() || this.isJoinSent && !this.isBuffering && (this.isBuffering = !0, this.chrono.buffer.start(), $YB.noticeRequest("Method: /bufferStart"));
  } catch (e) {
    $YB.error(e);
  }
}, $YB.managers.View.prototype.sendBufferEnd = function (e, t) {
  try {
    this.isHalted() || this.isJoinSent && this.isBuffering && (this.isBuffering = !1, this.lastResume = new Date().getTime(), e = this.infoManager.getBufferEndParams(e), e.duration = "undefined" != typeof e.duration ? e.duration : this.chrono.buffer.getDeltaTime(), this.sendRequest("/bufferUnderrun", e, t), $YB.noticeRequest("Request: NQS /bufferUnderrun " + e.duration + "ms"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendSeekStart = function () {
  try {
    this.isHalted() || this.isJoinSent && !this.isSeeking && (this.isSeeking = !0, this.chrono.seek.start(), $YB.noticeRequest("Method: /seekStart"));
  } catch (e) {
    $YB.error(e);
  }
}, $YB.managers.View.prototype.sendSeekEnd = function (e, t) {
  try {
    this.isHalted() || this.isJoinSent && this.isSeeking && (this.isSeeking = !1, this.lastResume = new Date().getTime(), e = this.infoManager.getSeekEndParams(e), e.duration = "undefined" != typeof e.duration ? e.duration : this.chrono.seek.getDeltaTime(), this.sendRequest("/seek", e, t), $YB.noticeRequest("Request: NQS /seek " + e.duration + "ms"));
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.sendError = function (e, t) {
  try {
    this.isErrorSent = !0, !this.infoManager.options.parseCDNNodeHost && !this.infoManager.options.parseHLS || this.resourceParser.realResource || this.resourceParser.init(), this.infoManager.options.haltOnError && this.stopTimers(), e = this.infoManager.getErrorParams(e), e.pingTime = "undefined" != typeof e.pingTime ? e.pingTime : this.comm.pingTime, this.infoManager.options.parseCDNNodeHost && (e.nodeHost = "undefined" != typeof e.nodeHost ? e.nodeHost : "undefined" != typeof this.resourceParser.nodeHost ? this.resourceParser.nodeHost : "", e.nodeType = "undefined" != typeof e.nodeType ? e.nodeType : "undefined" != typeof this.resourceParser.nodeType ? this.resourceParser.nodeType : ""), this.sendRequest("/error", e, t), $YB.noticeRequest("Request: NQS /error " + e.msg);
  } catch (r) {
    $YB.error(r);
  }
}, $YB.managers.View.prototype.convertBufferToSeek = function () {
  try {
    $YB.noticeRequest("Converting buffer to seek"), this.chrono.seek.startTime = this.chrono.buffer.startTime, this.chrono.seek.lastTime = 0, this.chrono.buffer.stop(), this.isBuffering = !1, this.isSeeking = !0;
  } catch (e) {
    $YB.error(e);
  }
}, $YB.managers.View.monitoringInterval = 800, $YB.managers.View.prototype.jumpNextTick = !1, $YB.managers.View.prototype.checkPlayhead = function () {
  if (this.isJoinSent && !this.isShowingAds) {
    var e = 2 * $YB.managers.View.monitoringInterval,
        t = $YB.managers.View.monitoringInterval / 2,
        r = 1.1 * $YB.managers.View.monitoringInterval,
        i = this.infoManager.getPlayhead(),
        n = 1e3 * Math.abs(this.lastPlayhead - i);if (n < t) {
      var s = this.lastResume ? Math.abs(new Date().getTime() - this.lastResume) : 0;this.enableBufferMonitor && (0 == s || s > $YB.managers.View.monitoringInterval) && this.lastPlayhead > 0 && !this.isBuffering && !this.isPaused && !this.isSeeking && this.sendBufferStart();
    } else n > e ? this.enableSeekMonitor && this.lastPlayhead > 0 && !this.isSeeking && (this.isBuffering ? this.convertBufferToSeek() : this.sendSeekStart()) : this.isSeeking && this.enableSeekMonitor ? this.sendSeekEnd() : this.isBuffering && this.enableBufferMonitor && this.chrono.buffer.getDeltaTime(!1) > r && this.sendBufferEnd();this.lastPlayhead = i;
  }
}, $YB.managers.View.prototype.checkAdPlayhead = function () {
  if (this.isAdJoinSent) {
    var e = $YB.managers.View.monitoringInterval / 2,
        t = 1.1 * $YB.managers.View.monitoringInterval,
        r = this.infoManager.getAdPlayhead(),
        i = 1e3 * Math.abs(this.lastPlayhead - r);i < e ? this.enableAdBufferMonitor && this.lastPlayhead > 0 && !this.isAdBuffering && !this.isAdPaused && this.sendAdBufferStart() : this.isAdBuffering && this.chrono.adBuffer.getDeltaTime(!1) > t && this.sendAdBufferEnd(), this.lastPlayhead = r;
  }
}, $YB.managers.View.prototype.stopTimers = function () {
  this.timer.pinger.stop(), this.timer.playheadMonitor.stop(), this.timer.adPlayheadMonitor.stop();
}, $YB.managers.View.prototype.sendPing = function (e, t) {
  try {
    e = this.infoManager.getPingParams(e), this.isShowingAds && (e = this.infoManager.getAdPingParams(e)), e.pingTime = "undefined" != typeof e.pingTime ? e.pingTime : this.comm.pingTime, this.isSeeking && (e.seekDuration = "undefined" != typeof e.seekDuration ? e.seekDuration : this.chrono.seek.getDeltaTime(!1)), this.isBuffering && (e.bufferDuration = "undefined" != typeof e.bufferDuration ? e.bufferDuration : this.chrono.buffer.getDeltaTime(!1)), this.isAdBuffering && (e.adBufferDuration = "undefined" != typeof e.adBufferDuration ? e.adBufferDuration : this.chrono.adBuffer.getDeltaTime(!1));var r = this.infoManager.getRendition();if (r && this.lastRendition != r && (this.sendChangedEntity("rendition", r), this.lastRendition = r), 1 == this.changedEntities.length) {
      var i = this.changedEntities.shift();e.entityType = i.key, e.entityValue = i.value;
    } else if (this.changedEntities.length > 1) {
      e.entityType = null, e.entityValue = null, e.entities = {};for (var n = 0; n < this.changedEntities.length; n++) {
        e.entities[this.changedEntities[n].key] = this.changedEntities[n].value;
      }this.changedEntities = [];
    }this.sendRequest("/ping", e, t);
  } catch (s) {
    $YB.error(s);
  }
}, $YB.managers.View.prototype.sendChangedEntity = function (e, t) {
  try {
    this.changedEntities.push({ key: e, value: t });
  } catch (r) {
    $YB.error(r);
  }
}, $YB.utils.Chrono = function () {
  try {
    this.startTime = 0, this.lastTime = 0;
  } catch (e) {
    $YB.error(e);
  }
}, $YB.utils.Chrono.prototype.getDeltaTime = function (e) {
  try {
    return this.startTime ? 0 === this.lastTime ? e !== !1 ? this.stop() : new Date().getTime() - this.startTime : this.lastTime - this.startTime : -1;
  } catch (t) {
    $YB.error(t);
  }
}, $YB.utils.Chrono.prototype.start = function () {
  try {
    this.startTime = new Date().getTime(), this.lastTime = 0;
  } catch (e) {
    $YB.error(e);
  }
}, $YB.utils.Chrono.prototype.stop = function () {
  try {
    return this.lastTime = new Date().getTime(), this.getDeltaTime();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.utils.parseNumber = function (e, t) {
  return !isNaN(e) && e >= 0 && e != 1 / 0 && null !== e && "undefined" != typeof e ? e : t;
}, $YB.utils.listenAllEvents = function (e, t, r) {
  try {
    if ($YB.debugLevel >= 4) {
      r = r || function (e) {
        var t = "";"undefined" != typeof e.target && "undefined" != typeof e.target.id && (t = e.target.id), $YB.debug("Event: " + t + " > " + e.type);
      };var i = ["canplay", "buffering", "waiting", "ended", "play", "playing", "pause", "resume", "error", "abort", "seek", "seeking", "seeked", "stalled", "dispose", "loadeddata", "loadstart"];t && (null === t[0] ? (t.shift(), i = t) : i = i.concat(t));for (var n = 0; n < i.length; n++) {
        "function" == typeof e ? e.call(window, i[n], r) : e.on ? e.on(i[n], r) : e.addEventListener && e.addEventListener(i[n], r);
      }
    }
  } catch (s) {
    $YB.error(s);
  }
}, $YB.utils.buildRenditionString = function (e, t, r) {
  1 == arguments.length && (r = e, e = null, t = null);var i = "";return e && t && (i = e + "x" + t, r > 0 && (i += "@")), r < 1 ? i : (r < 1e3 ? i += Math.round(r) + "bps" : r < 1e6 ? (r = Math.round(r / 1e3), i += r + "Kbps") : (r = Math.round(r / 1e4) / 100, i += r + "Mbps"), i);
}, $YB.debugLevel = 2, $YB.messageLevels = { 1: "e", 2: "w", 3: "n", 4: "d", 5: "v" }, $YB.plainConsole = !1, $YB.report = function (e, t, r) {
  if (console && console.log) {
    t = t || 4, r = r || "darkcyan";var i = $YB.messageLevels[t],
        n = $YB.getCurrentTime() + "[Youbora] " + i + ":";if ("undefined" != typeof $YB.remoteLog && $YB.remoteLog.enabled === !0 && $YB.remoteLog(n + e), $YB.debugLevel >= t) if ($YB.plainConsole || document.documentMode) $YB.plainReport(e, n);else {
      var s = console.log;1 == t && console.error ? s = console.error : 2 == t && console.warn ? s = console.warn : t >= 4 && console.debug && (s = console.debug), n = "%c" + n, e instanceof Array ? (e.splice(0, 0, n, "color: " + r), s.apply(console, e)) : s.call(console, n, "color: " + r, e);
    }
  }
}, $YB.getCurrentTime = function (e) {
  var t = new Date();return "[" + ("0" + t.getDate()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2) + "." + ("00" + t.getMilliseconds()).slice(-3) + "]";
}, $YB.plainReport = function (e, t) {
  if (e instanceof Array) for (var r in e) {
    $YB.plainReport(e[r], t);
  } else "string" == typeof e ? console.log(t + " " + e) : (console.log(t + " <next line>"), console.log(e));
}, $YB.error = function () {
  $YB.report([].slice.call(arguments), 1, "darkred");
}, $YB.warn = function () {
  $YB.report([].slice.call(arguments), 2, "darkorange");
}, $YB.notice = function () {
  $YB.report([].slice.call(arguments), 3, "darkcyan");
}, $YB.noticeRequest = function () {
  $YB.report([].slice.call(arguments), 3, "darkgreen");
}, $YB.debug = function () {
  $YB.report([].slice.call(arguments), 4, "indigo");
}, $YB.verbose = function () {
  $YB.report([].slice.call(arguments), 5, "navy");
}, function () {
  function e(e) {
    switch (e) {case "plain":
        $YB.plainConsole = !0;break;case "remote":
        $YB.remoteLog.forced = !0;break;case "plain+remote":case "remote+plain":
        $YB.remoteLog.forced = !0, $YB.plainConsole = !0;}
  }try {
    if ("undefined" != typeof window) {
      var t = document.getElementsByTagName("script");for (var r in t) {
        if (t[r].getAttribute) {
          var i = t[r].getAttribute("youbora-debug");i && ($YB.debugLevel = i), i = t[r].getAttribute("youbora-console"), i && e(i);
        }
      }var n = /\?.*\&*youbora-debug=(.+)/i.exec(window.location.search);null !== n && ($YB.debugLevel = n[1]), n = /\?.*\&*youbora-console=(.+)/i.exec(window.location.search), null !== n && e(n[1]);
    }
  } catch (s) {
    $YB.error(s);
  }
}(), $YB.utils.ResourceParser = function (e) {
  try {
    this.viewManager = e, this.parseTimeout = null, this.realResource = "", this.nodeHost = void 0, this.nodeType = void 0, this.cdn, this.cdnRequests = {}, this.cdns = $YB.utils.ResourceParser.cdnsEnabled.slice();
  } catch (t) {
    $YB.error(t);
  }
}, $YB.utils.ResourceParser.prototype.init = function () {
  try {
    this.realResource && this.clear(), this.viewManager.comm.addPreloader("ResourceParser");var e = this;this.viewManager.comm.extraOperationsCallback = function (t) {
      "undefined" != typeof t.resource && e.realResource && (t.resource = e.realResource), "undefined" != typeof t.nodeHost && e.nodeHost && (t.nodeHost = e.nodeHost, t.nodeType = e.nodeType), !t.cdn && e.viewManager.infoManager.options.useCDNFromParser && (t.cdn = e.cdn);
    }, this.parseTimeout = setTimeout(function () {
      "ResourceParser" in e.viewManager.comm.preloaders && (e.realResource = e.viewManager.infoManager.getResource(), e.viewManager.comm.removePreloader("ResourceParser"), $YB.warn("ResourceParser has exceded the maximum execution time (3s) and will be aborted."));
    }, 3e3), this.realResource = this.viewManager.infoManager.getResource(), this.viewManager.infoManager.options.parseHLS ? this._parseRealResourceAsync(this.realResource) : this._parseCDNAsync();
  } catch (t) {
    $YB.error(t);
  }
}, $YB.utils.ResourceParser.prototype.clear = function () {
  this.realResource = "", this.nodeHost = void 0, this.nodeType = void 0, this.cdnRequests = {}, this.cdns = $YB.utils.ResourceParser.cdnsEnabled.slice();
}, $YB.utils.ResourceParser.prototype._parseRealResourceAsync = function (e, t) {
  try {
    var r = /(\S*?(\.m3u8|\.m3u|\.ts|\.mp4)(\?\S*|\n|\r|$))/i.exec(e);if (null !== r) {
      var i = r[1].trim();if (0 !== i.indexOf("http") && 0 !== i.indexOf("//") && (i = t.slice(0, t.lastIndexOf("/")) + "/" + i), ".m3u8" == r[2] || ".m3u" == r[2]) {
        var n = this;new $YB.comm.AjaxRequest(i).load(function () {
          n._parseRealResourceAsync(this.responseText, i);
        }).error(function () {
          n._parseCDNAsync();
        }).send();
      } else this.realResource = i, this._parseCDNAsync();
    } else this._parseCDNAsync();
  } catch (s) {
    $YB.error(s), this._parseCDNAsync();
  }
}, $YB.utils.ResourceParser.cdnsEnabled = ["Level3", "Akamai", "Highwinds", "Fastly"], $YB.utils.ResourceParser.cdnsAvailable = { Level3: { code: "LEVEL3", parsers: [{ type: "host+type", name: "X-WR-DIAG", regex: /Host:(.+)\sType:(.+)/ }], headers: { "X-WR-DIAG": "host" } }, Akamai: { code: "AKAMAI", parsers: [{ type: "host+type", name: "X-Cache", regex: /(.+)\sfrom\s.+\(.+\/(.+)\).+/ }] }, Highwinds: { code: "HIGHNEGR", parsers: [{ type: "host+type", name: "X-HW", regex: /.+,[0-9]+\.(.+)\.(.+)/ }] }, Fastly: { code: "FASTLY", parsers: [{ type: "host", name: "X-Served-By", regex: /([^,\s]+)$/ }, { type: "type", name: "X-Cache", regex: /([^,\s]+)$/ }] }, Telefonica: { code: "TELEFO", parsers: [{ type: "host+type", name: "X-TCDN", regex: /Host:(.+)\sType:(.+)/ }] }, CustomCDN: { code: null, parsers: [{ type: "name", regex: /(.+)/ }] } }, $YB.utils.ResourceParser.prototype._parseCDNAsync = function () {
  try {
    if (this.viewManager.infoManager.options.parseCDNNodeHost) {
      if (this.cdns.length > 0 && !this.nodeHost) {
        var e = this.cdns.shift();if ("undefined" != typeof $YB.utils.ResourceParser.cdnsAvailable[e]) {
          var t = $YB.utils.ResourceParser.cdnsAvailable[e],
              r = JSON.stringify(t.headers);if (this.cdnRequests.hasOwnProperty(r)) this._parseNode(t, this.cdnRequests[r]);else {
            var i = this,
                n = new $YB.comm.AjaxRequest(this.realResource, "", "", { method: "HEAD", maxRetries: 0, requestHeaders: t.headers });n.load(function () {
              i.cdnRequests[r] = n.getXHR(), i._parseNode(t, n.getXHR());
            }), n.error(function () {
              i._parseCDNAsync();
            }), n.send();
          }
        } else this._parseCDNAsync();
      } else this.viewManager.comm.removePreloader("ResourceParser");
    } else this.viewManager.comm.removePreloader("ResourceParser");
  } catch (s) {
    $YB.error(s);
  }
}, $YB.utils.ResourceParser.prototype._parseNode = function (e, t) {
  try {
    var r = e.parsers;for (var i in r) {
      "name" == r[i].type && (r[i].name = this.viewManager.infoManager.options.parseCDNNameFrom);var n = t.getResponseHeader(r[i].name);if (null === n) return void this._parseCDNAsync();var s = r[i].regex.exec(n);if (null === s) return void this._parseCDNAsync();switch (r[i].type) {case "host":
          this.nodeHost = s[1];break;case "type":
          this.nodeType = this._parseNodeType(s[1]);break;case "host+type":
          this.nodeHost = s[1], this.nodeType = this._parseNodeType(s[2]);break;case "type+host":
          this.nodeType = this._parseNodeType(s[1]), this.nodeHost = s[2];break;case "name":
          this.cdn = s[1].toUpperCase();}e.code && (this.cdn = e.code);
    }this._parseCDNAsync();
  } catch (o) {
    $YB.error(o), this._parseCDNAsync();
  }
}, $YB.utils.ResourceParser.prototype._parseNodeType = function (e) {
  try {
    switch (e) {case "TCP_HIT":case "HIT":case "c":
        return 1;case "TCP_MISS":case "MISS":case "p":case "i":case "m":
        return 2;case "TCP_MEM_HIT":
        return 3;case "TCP_IMS_HIT":
        return 4;default:
        return 0;}
  } catch (t) {
    return $YB.error(t), 0;
  }
}, $YB.utils.Timer = function (e, t) {
  try {
    this.callback = e, this.interval = t || 5e3, this.isRunning = !1, this.timer = null, this.chrono = new $YB.utils.Chrono();
  } catch (r) {
    $YB.error(r);
  }
}, $YB.utils.Timer.prototype.start = function () {
  try {
    this.isRunning = !0, this._setPing();
  } catch (e) {
    $YB.error(e);
  }
}, $YB.utils.Timer.prototype.stop = function () {
  try {
    this.isRunning = !1, clearTimeout(this.timer);
  } catch (e) {
    $YB.error(e);
  }
}, $YB.utils.Timer.prototype._setPing = function () {
  try {
    if (this.isRunning) {
      this.chrono.start();var e = this;this.timer = setTimeout(function () {
        e.callback(e.chrono.stop()), e._setPing();
      }, this.interval);
    }
  } catch (t) {
    $YB.error(t);
  }
}, "undefined" != typeof module && module.exports ? module.exports = $YB : window.$YB = $YB;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	"name": "playkit-js-youbora",
	"version": "0.0.1",
	"main": "dist/playkit-youbora.js",
	"scripts": {
		"clean": "rm -rf ./dist",
		"prebuild": "npm run clean",
		"build:prod": "NODE_ENV=production webpack",
		"build": "webpack",
		"dev": "webpack --progress --colors --watch",
		"test": "NODE_ENV=test karma start --color",
		"test:chrome": "NODE_ENV=test karma start --color --browsers Chrome",
		"test:chrome:dots": "NODE_ENV=test karma start --color --browsers Chrome --reporters dots",
		"test:firefox": "NODE_ENV=test karma start --color --browsers Firefox",
		"test:safari": "NODE_ENV=test karma start --color --browsers Safari",
		"test:watch": "NODE_ENV=test karma start --color --auto-watch",
		"start": "webpack-dev-server",
		"release": "npm run build:prod && npm run commit:dist && standard-version",
		"publish": "git push --follow-tags --no-verify origin develop",
		"eslint": "eslint . --color",
		"flow": "flow check",
		"eslint:flow:test": "npm run eslint && npm run flow && npm run test",
		"commit:dist": "git add --all dist && (git commit -m 'chore: update dist' || exit 0)",
		"prepush-msg:build": "echo '\nRunning build before push...\n' && exit 0",
		"prepush-msg:dist": "echo '\nAdding dist files to a seperate commit...\n' && exit 0",
		"prepush-msg:done": "echo '\nPre push tasks are done.\n' && exit 0"
	},
	"pre-push": [
		"prepush-msg:build",
		"prebuild",
		"build",
		"build:prod",
		"prepush-msg:dist",
		"commit:dist",
		"prepush-msg:done"
	],
	"devDependencies": {
		"babel-cli": "^6.18.0",
		"babel-core": "^6.18.2",
		"babel-eslint": "^7.1.1",
		"babel-loader": "^6.2.7",
		"babel-plugin-istanbul": "^4.0.0",
		"babel-plugin-transform-class-properties": "^6.22.0",
		"babel-plugin-transform-flow-strip-types": "^6.22.0",
		"babel-preset-es2015": "^6.18.0",
		"babel-register": "^6.23.0",
		"chai": "^3.5.0",
		"cross-env": "^3.1.4",
		"css-loader": "^0.28.4",
		"eslint": "^3.10.0",
		"eslint-loader": "^1.6.1",
		"eslint-plugin-flowtype": "^2.30.0",
		"eslint-plugin-import": "^2.2.0",
		"eslint-plugin-mocha-no-only": "^0.0.5",
		"flow-bin": "latest",
		"istanbul": "^0.4.5",
		"karma": "^1.5.0",
		"karma-chai": "^0.1.0",
		"karma-chrome-launcher": "^2.0.0",
		"karma-cli": "^1.0.1",
		"karma-coverage": "^1.1.1",
		"karma-firefox-launcher": "^1.0.1",
		"karma-ie-launcher": "^1.0.0",
		"karma-mocha": "^1.3.0",
		"karma-safari-launcher": "^1.0.0",
		"karma-sourcemap-loader": "^0.3.7",
		"karma-webpack": "^2.0.2",
		"mocha": "^3.2.0",
		"mocha-cli": "^1.0.1",
		"playkit-js": "https://github.com/kaltura/playkit-js.git#develop",
		"pre-push": "^0.1.1",
		"sinon": "^2.0.0",
		"sinon-chai": "^2.8.0",
		"standard-version": "^4.0.0",
		"style-loader": "^0.18.2",
		"uglifyjs-webpack-plugin": "^0.4.3",
		"webpack": "latest",
		"webpack-dev-server": "latest"
	},
	"peerDependencies": {
		"playkit-js": "https://github.com/kaltura/playkit-js.git#develop"
	},
	"keywords": [],
	"license": "AGPL-3.0",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/kaltura/playkit-js-youbora.git"
	},
	"bugs": {
		"url": "https://github.com/kaltura/playkit-js-youbora/issues"
	},
	"homepage": "https://github.com/kaltura/playkit-js-youbora#readme"
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-youbora.js.map