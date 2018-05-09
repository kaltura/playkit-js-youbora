(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("playkit-js"));
	else if(typeof define === 'function' && define.amd)
		define(["playkit-js"], factory);
	else if(typeof exports === 'object')
		exports["youbora"] = factory(require("playkit-js"));
	else
		root["playkit"] = root["playkit"] || {}, root["playkit"]["youbora"] = factory(root["playkit"]["core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)
var isArray = __webpack_require__(11)

/**
 * Static Log class for YouboraLib
 *
 * @class
 * @static
 * @memberof youbora
 */
var Log = {

  _emitter: new Emitter(),

  /** Exposes {@link youbora.EvenfulObject.on} */
  on: function () { Log._emitter.on.apply(Log._emitter, arguments) },
  /** Exposes {@link youbora.EvenfulObject.off} */
  off: function () { Log._emitter.off.apply(Log._emitter, arguments) },
  /** Exposes {@link youbora.EvenfulObject.emit} */
  emit: function () { Log._emitter.emit.apply(Log._emitter, arguments) },

  /**
   * Enum for log levels
   * @enum
   */
  Level: {
    /** No console outputs */
    SILENT: 6,
    /** Console will show errors */
    ERROR: 5,
    /** Console will show warnings */
    WARNING: 4,
    /** Console will show notices (ie: life-cyrcle logs) */
    NOTICE: 3,
    /** Console will show debug messages (ie: player events) */
    DEBUG: 2,
    /** Console will show verbose messages (ie: Http Requests) */
    VERBOSE: 1
  },

  /**
   * Enum for events
   * @enum
   */
  Event: {
    /** Sent each time a messaged is issued, even if log level does not handle it. */
    LOG: 'log'
  },

  /**
   * Only logs of this imporance or higher will be shown.
   * @default youbora.Log.Levels.ERROR
   * @see {@link youbora.Log.Levels}
   */
  logLevel: 5,

  /**
   * If true, console logs will always be outputed without colors (for debbugin in devices).
   * @default false
   */
  plainLogs: false,

  /**
   * Returns a console message
   *
   * @private
   * @param {(string|error|array)} msg Message string, error object or array of messages.
   * @param {Log.Levels} [level=Log.Levels.NOTICE] Defines the level of the error sent.
   * Only errors with higher or equal level than Log.logLevel will be displayed.
   * @param {string} [color=darkcyan] Color of the header
   * @see {@link Youbora.Log.debugLevel}
   */
  report: function (msg, level, color) {
    if (console && console.log) {
      level = level || Log.Level.NOTICE
      color = color || 'darkcyan'

      var letters = {
        5: 'e', // Error
        4: 'w', // Warning
        3: 'n', // Notice
        2: 'd', // Debug
        1: 'v' // Verbose
      }

      var letter = letters[level]
      var prefix = '[Youbora]' + Log._getCurrentTime() + ' ' + letter + ':'

      this.emit('log', { level: level, msg: msg, prefix: prefix })

      // Show messages in actual console if level is enought
      if (Log.logLevel <= level) {
        if (Log.plainLogs || document.documentMode) { // document.documentMode exits only in IE
          // Plain log for IE and devices
          Log._plainReport(msg, prefix)
        } else {
          // choose log method
          var logMethod
          if (level === Log.Level.ERROR && console.error) {
            logMethod = console.error
          } else if (level === Log.Level.WARNING && console.warn) {
            logMethod = console.warn
          } else if (level === Log.Level.DEBUG && console.debug) {
            logMethod = console.debug
          } else {
            logMethod = console.log
          }

          // print message
          prefix = '%c' + prefix
          if (isArray(msg)) {
            msg.splice(0, 0, prefix, 'color: ' + color)
            logMethod.apply(console, msg)
          } else {
            logMethod.call(console, prefix, 'color: ' + color, msg)
          }
        }
      }
    }
  },

  /**
   * Returns the current time in format hh:mm:ss.mmm (with trailing 0s)
   * @private
   * @return {string} Current time.
   */
  _getCurrentTime: function () {
    var d = new Date()
    var hh = ('0' + d.getDate()).slice(-2)
    var mm = ('0' + d.getMinutes()).slice(-2)
    var ss = ('0' + d.getSeconds()).slice(-2)
    var mmm = ('00' + d.getMilliseconds()).slice(-3)
    return '[' + hh + ':' + mm + ':' + ss + '.' + mmm + ']'
  },

  /**
   * Returns a console message without style
   *
   * @private
   * @param {(string|object|array)} msg Message string, object or array of messages.
   * @param {string} prefix Prefix of the message.
   */
  _plainReport: function (msg, prefix) {
    if (msg instanceof Array) {
      for (var m in msg) {
        Log._plainReport(msg[m], prefix)
      }
    } else {
      if (typeof msg === 'string') {
        console.log(prefix + ' ' + msg)
      } else {
        console.log(prefix + ' <next line>')
        console.log(msg)
      }
    }
  },

  /**
   * Sends an error (level 1) console log.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  error: function () {
    Log.report([].slice.call(arguments), Log.Level.ERROR, 'darkred')
  },

  /**
   * Sends a warning (level 2) console log.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  warn: function () {
    Log.report([].slice.call(arguments), Log.Level.WARNING, 'darkorange')
  },

  /**
   * Sends a notice (level 3) console log.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  notice: function () {
    Log.report([].slice.call(arguments), Log.Level.NOTICE, 'darkgreen')
  },

  /**
   * Sends a debug message (level 4) to console.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  debug: function () {
    Log.report([].slice.call(arguments), Log.Level.DEBUG, 'indigo')
  },

  /**
   * Sends a verbose message (level 5) to console.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  verbose: function () {
    Log.report([].slice.call(arguments), Log.Level.VERBOSE, 'navy')
  },

  /**
   * This function is automatically executed at youboralib's init.
   * Will search inside window.location.search for attribute 'youbora-debug=X'.
   * X can have one of these values, that will modify LogLevel.
   * 6: SILENT,
   * 5: ERROR,
   * 4: WARNING,
   * 3: NOTICE,
   * 2: DEBUG,
   * 1: VERBOSE
   *
   * If youbora-console=plain is present, plainLogs will be set to true.
   */
  loadLevelFromUrl: function () {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      var m = /\?.*&*youbora-debug=(.+)/i.exec(window.location.search)
      if (m !== null) {
        Log.logLevel = m[1]
      }

      var m2 = /\?.*&*youbora-debug=plain/i.exec(window.location.search)
      if (m2 !== null) {
        Log.plainLogs = true
      }
    }
  }
}

module.exports = Log


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(16)
var createObject = __webpack_require__(33)

var YouboraObject = function () { }

YouboraObject.prototype = {
  /**
   * A base class that other Classes should inherit from.
   * It has a no-op constructor intended to be overridden by classes that extend from this.
   *
   * @constructs YouboraObject
   * @abstract
   * @memberof youbora
   */
  constructor: function () { }
}

/**
 * This method allows the extension of the current class, emulating 1-level inheritance.
 * It is inspired by Backbone's extend, but removing all references to underscore.
 *
 * @see http://backbonejs.org/#Model-extend
 *
 * @example
 * var A = YouboraObject.extend({ a: 1, b: 1, c: { d: 0 } });
 * var a = new A(); // { a: 1, b: 1, c: { d: 0 } }
 *
 * var B = A.extend({ b: 2, c: { e: 3 } });
 * var b = new B(); // { a: 1, b: 2, c: { e: 3 } }
 *
 * @param  {Object} protoProps  Prototype properties (available on the instances)
 * @param  {Object} staticProps Static properties (available on the contructor)
 * @return {Object}             New sub class
 */
YouboraObject.extend = function (protoProps, staticProps) {
  var parent = this
  var child

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent constructor.
  if (protoProps && protoProps.hasOwnProperty('constructor')) {
    child = protoProps.constructor
  } else {
    child = function () { return parent.apply(this, arguments) }
  }

  // Add static properties to the constructor function, if supplied.
  assign(child, parent, staticProps)

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  child.prototype = createObject(parent.prototype)
  if (protoProps) assign(child.prototype, protoProps)
  child.prototype.constructor = child

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype

  return child
}


module.exports = YouboraObject


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)

/**
 * This static class provides utility methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var Util = {
  /**
   * Strip {protocol}:// and // from the begining of the string.
   *
   * @param {string} url
   * @returns {string} stripped url
   */
  stripProtocol: function(url) {
    try {
      return url.replace(/^(.*?:\/\/|\/\/)/i, '')
    } catch (err) {
      Log.warn(err)
      return url
    }
  },

  /**
   * Adds specific protocol. ie: [http://]nqs.nice264.com
   *
   * @param {string} url Domain of the service. Without protocol. ie: 'nqs.nice264.com'.
   * @param {boolean|null} [httpSecure]
   * If true will add https, if false http.
   * Otherwise will add //
   * @return Return the complete service URL.
   */
  addProtocol: function(url, httpSecure) {
    try {
      if (httpSecure === true) {
        return 'https://' + url
      } else if (window.location.protocol.indexOf('http') === 0) {
        return '//' + url
      } else {
        return 'http://' + url
      }
    } catch (err) {
      Log.warn(err)
      return 'http://localhost/'
    }
  },

  /**
   * Return n if it isn't NaN, negative, Infinity, null or undefined.
   * In any other case, return def.
   *
   * @param {mixed} n Number to be parsed.
   * @param {number} def Number to return if n is not correct.
   */
  parseNumber: function(n, def) {
    if (!isNaN(n) &&
      n >= 0 &&
      n !== Infinity &&
      n !== -Infinity &&
      n !== null &&
      typeof n !== 'undefined'
    ) {
      return n
    } else {
      return def
    }
  },

  /**
   * This utility method will add most of the HTML5 common event listeners to the player sent.
   * This common events will be listened: 'canplay', 'buffering', 'waiting', 'ended', 'play',
   * 'playing', 'pause', 'resume', 'error', 'abort', 'seek', 'seeking', 'seeked', 'stalled',
   * 'dispose', 'loadeddata', 'loadstart'.
   *
   * Events will be reported as DEBUG level messages.
   *
   * @param {object|function} o Object to attach the events.
   * @param {array} [extraEvents]
   * An array of extra events to watch. ie:  ['timeupdate', 'progress'].
   * If the first item is null, no common events will be added.
   * @param {function} [report] Callback function called to report events.
   * Default calls Log.debug()
   */
  logAllEvents: function(o, extraEvents, report) {
    try {
      if (Log.logLevel <= Log.Level.DEBUG) {
        report = report || function(e) {
          Log.debug('Event: ' + e.type)
        }

        var playerEvents = [
          'canplay', 'buffering', 'waiting', 'ended', 'play', 'playing',
          'pause', 'resume', 'error', 'abort', 'seek', 'seeking', 'seeked',
          'stalled', 'dispose', 'loadeddata', 'loadstart'
        ]
        if (extraEvents) {
          if (extraEvents[0] === null) {
            extraEvents.shift()
            playerEvents = extraEvents
          } else {
            playerEvents = playerEvents.concat(extraEvents)
          }
        }

        for (var i = 0; i < playerEvents.length; i++) {
          if (typeof o === 'function') {
            o.call(window, playerEvents[i], report)
          } else if (o.on) {
            o.on(playerEvents[i], report)
          } else if (o.addEventListener) {
            o.addEventListener(playerEvents[i], report)
          }
        }
      }
    } catch (err) {
      Log.error(err)
    }
  },

  /**
   * Builds a string that represents the rendition.
   *
   * The returned string will have the following format: <width>x<height>@bitrate<suffix?>.
   * If either the width or height are < 1, only the bitrate will be returned.
   * If bitrate is < 1, only the dimensions will be returned.
   * If bitrate is < and there is no dimensions, a null will be returned.
   * The bitrate will also have one of the following suffixes dependin on its
   * magnitude: bps, Kbps, Mbps
   *
   * @param {any} width The width of the asset. If only 1 argument is sent, it will be treated
   * as bitrate.
   * @param {any} height The height of the asset.
   * @param {any} bitrate The indicated bitrate (in the manifest) of the asset.
   * @returns {string} A string with the following format: <width>x<height>@<bitrate><suffix>
   */
  buildRenditionString: function(width, height, bitrate) {
    if (arguments.length === 1) {
      bitrate = width
      width = null
      height = null
    }

    var ret = ''
    if (width && height) {
      ret = width + 'x' + height
      if (bitrate > 0) {
        ret += '@'
      }
    }

    if (bitrate < 1) {
      return ret
    } else if (bitrate < 1e3) {
      ret += Math.round(bitrate) + 'bps'
    } else if (bitrate < 1e6) {
      bitrate = Math.round(bitrate / 1e3)
      ret += bitrate + 'Kbps'
    } else {
      bitrate = Math.round(bitrate / 1e4) / 1e2
      ret += bitrate + 'Mbps'
    }

    return ret || null
  },

  /**
   * Returns a params dictionary with the error values.
   *
   * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
   * @param {String} [msg] Error Message
   * @param {Object} [metadata] Object defining error metadata
   * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
   * @returns {Object} Key:value params.
   */
  buildErrorParams: function(code, msg, metadata, level) {
    if (typeof code === 'object') {
      return code
    } else {
      var params = {}
      params.errorCode = code || 'FAILURE'
      params.msg = msg || params.errorCode
      params.errorMetadata = metadata
      params.errorLevel = level
      return params
    }
  },

  // The following methods replace core js functionallity to ensure compatibility in old versions.

  assign: __webpack_require__(16),

  isArray: __webpack_require__(11)
}

module.exports = Util

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * This static class englobes youbora constants.
 *
 * @class
 * @static
 * @memberof youbora
 */
var Constants = {
  /**
   * List of youbora services.
   *
   * @enum
   */
  Service: {
    DATA: '/data',

    // Video
    INIT: '/init',
    START: '/start',
    JOIN: '/joinTime',
    PAUSE: '/pause',
    RESUME: '/resume',
    SEEK: '/seek',
    BUFFER: '/bufferUnderrun',
    ERROR: '/error',
    STOP: '/stop',
    PING: '/ping',

    // Ads
    AD_INIT: '/adInit',
    AD_START: '/adStart',
    AD_JOIN: '/adJoin',
    AD_PAUSE: '/adPause',
    AD_RESUME: '/adResume',
    AD_BUFFER: '/adBufferUnderrun',
    AD_STOP: '/adStop',
    AD_CLICK: '/adClick',
    AD_ERROR: '/adError',
    AD_BLOCKED: '/adBlocked',

    // Infinity
    EVENT: '/infinity/event',
    SESSION_START: '/infinity/session/start',
    SESSION_STOP: '/infinity/session/stop',
    NAV: '/infinity/session/nav',
    BEAT: '/infinity/session/beat'
  },

  /**
   * List of will-send events.
   *
   * @memberof youbora.Plugin
   * @enum
   * @event
   */
  WillSendEvent: {
    WILL_SEND_INIT: 'will-send-init',
    WILL_SEND_START: 'will-send-start',
    WILL_SEND_JOIN: 'will-send-join',
    WILL_SEND_PAUSE: 'will-send-pause',
    WILL_SEND_RESUME: 'will-send-resume',
    WILL_SEND_SEEK: 'will-send-seek',
    WILL_SEND_BUFFER: 'will-send-buffer',
    WILL_SEND_ERROR: 'will-send-error',
    WILL_SEND_FATAL_ERROR: 'will-send-fatal-error',
    WILL_SEND_STOP: 'will-send-stop',
    WILL_SEND_PING: 'will-send-ping',

    WILL_SEND_AD_START: 'will-send-ad-start',
    WILL_SEND_AD_JOIN: 'will-send-ad-join',
    WILL_SEND_AD_PAUSE: 'will-send-ad-pause',
    WILL_SEND_AD_RESUME: 'will-send-ad-resume',
    WILL_SEND_AD_BUFFER: 'will-send-ad-buffer',
    WILL_SEND_AD_STOP: 'will-send-ad-stop',
    WILL_SEND_AD_CLICK: 'will-send-ad-click',
    WILL_SEND_AD_ERROR: 'will-send-ad-error',
    WILL_SEND_AD_BLOCKED: 'will-send-ad-blocked',

    WILL_SEND_SESSION_START: 'will-send-session-start',
    WILL_SEND_SESSION_STOP: 'will-send-session-stop',
    WILL_SEND_NAV: 'will-send-nav',
    WILL_SEND_BEAT: 'will-send-beat',
    WILL_SEND_EVENT: 'will-send-event'
  }
}

module.exports = Constants


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var isArray = __webpack_require__(11)

/**
 * This class extends YouboraObject, adding event emitting/listening functionalities.
 *
 * @constructs Emitter
 * @extends youbora.YouboraObject
 * @memberof youbora
 */
var Emitter = YouboraObject.extend(
  /** @lends youbora.Emitter.prototype */
  {
    /**
     * Sets a listener to a given event. Use {@link emit} to trigger those events.
     * Pass '*' to listen ALL events.
     *
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event. Receives event and data.
     * @return this
     */
    on: function (event, callback) {
      this._listeners = this._listeners || {}
      if (typeof callback === 'function') {
        this._listeners[event] = this._listeners[event] || []
        this._listeners[event].push(callback)
        return this
      }
    },

    /**
     * Removes given callback from the listeners of this object.
     *
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event.
     * @return this
     */
    off: function (event, callback) {
      this._listeners = this._listeners || {}

      if (this._listeners[event]) {
        var index = this._listeners[event].indexOf(callback)
        if (index !== -1) {
          this._listeners[event].splice(index, 1)
        }
      }
      return this
    },

    /**
     * Emits given event, triggering all the associated callbacks.
     *
     * @param {string} event Name of the event.
     * @param {object} [data] Custom data to be sent to the callbacks.
     * @return this
     */
    emit: function (event, data) {
      this._listeners = this._listeners || {}
      data = data || {}

      if (isArray(this._listeners[event])) {
        this._listeners[event].forEach(this._eachCallback.bind(this, event, data))
      }
      if (isArray(this._listeners['*'])) {
        this._listeners['*'].forEach(this._eachCallback.bind(this, event, data))
      }

      return this
    },

    /**
     * Travels through the listener list and executes them them.
     *
     * @private
     */
    _eachCallback: function (event, data, callback) {
      if (typeof callback === 'function') {
        callback({ type: event, data: data, target: this })
      }
    }
  }
)

module.exports = Emitter


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Log = __webpack_require__(0)
var Util = __webpack_require__(2)

var YBRequest = YouboraObject.extend(
  /** @lends youbora.YBRequest.prototype */
  {
    /**
     * YBYBRequest class will wrap XmlHttpRequest and extend its functionality, allowing youbora
     * to manage queues, blockers and retries.
     *
     * @constructs YBRequest
     * @extends youbora.Object
     * @memberof youbora
     *
     * @param {string} host URL of the request. ie: nqs.nice264.com
     * @param {string} [service] Name of the service. ie '/start'
     * @param {Object} [params] Object of key:value params.
     * @param {Object} [options] Object with custom options.
     * @param {string} [options.method="GET"] Specifies the method of the request. ie: "GET", "HEAD".
     * @param {string} [options.requestHeaders] Object with options of requestHeaders.
     * ie: { header: value }.
     * @param {number} [options.retryAfter=5000] Time in ms before sending a failed request again.
     * 0 to disable.
     * @param {number} [options.maxRetries=3] Max number of retries. 0 to disable.
     * @param {bool} [options.cache=false] If false, timestamp will be added to each request to
     * prevent caching.
     */
    constructor: function (host, service, params, options) {
      /** Instance of XmlHttpRequest (or the item returned by createXHR method). */
      this.xhr = this.createXHR()

      /** Host of the request */
      this.host = host || ''

      /** Service of the request */
      this.service = service || ''

      /** Object of params of the request */
      this.params = params || {}

      /** Options of the current request */
      this.options = Util.assign({}, YBRequest.defaultOptions, options)

      /** Number of times this request has failed and retried. */
      this.retries = 0

      // Add timemark
      if (!this.options.cache) {
        this.setParam('timemark', new Date().getTime())
      }
    },

    /**
     * Creates XMLHttpRequest if it is available in the browser.
     * If not, it tries to create an ActiveXObject XMLHTTP item.
     * Override this function for custom environments.
     *
     * @return YBRequest handler.
     */
    createXHR: function () {
      try {
        if (XMLHttpRequest) {
          return new XMLHttpRequest()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      } catch (err) {
        Log.error(err)
        return {}
      }
    },

    /**
     * Returns xhr object.
     *
     * @return {XmlHttpRequest} object.
     */
    getXHR: function () {
      return this.xhr
    },

    /** Returns the complete formed url of the request url+service+params. */
    getUrl: function () {
      return this.host + this.service + this.getParamString()
    },

    /**
     * Wraps this.getHXR.addEventListener.
     * Accepts a callback that receives (this YBRequest, event)
     */
    on: function (event, callback) {
      this.xhr.addEventListener(event, callback.bind(this, this))
      return this
    },

    /** Wraps this.getHXR.removeEventListener */
    off: function (event, callback) {
      this.xhr.removeEventListener(event, callback)
      return this
    },

    /**
     * Returns the params of the request, stringified.
     * ie: '?pluginVersion=5.1.0&systemCode=nicetv'.
     * @return {string} Concatenated Params
     */
    getParamString: function () {
      try {
        var params = '?'
        for (var key in this.params) {
          var param = this.params[key]
          if (param !== null && typeof param === 'object') {
            var string = JSON.stringify(param)
            if (string !== '{}') {
              params += encodeURIComponent(key) + '=' + encodeURIComponent(string) + '&'
            }
          } else if (param !== null && typeof param !== 'undefined' && param !== '') {
            params += encodeURIComponent(key) + '=' + encodeURIComponent(param) + '&'
          }
        }
        return params.slice(0, -1)
      } catch (err) {
        Log.error(err)
        return ''
      }
    },

    /**
     * Returns the value of the given param, or undefined.
     * @param {string} key Name of the param.
     * @return {any}
     */
    getParam: function (key) {
      return this.params[key]
    },

    /**
     * Add or set a parameter for the request.
     * ie: if you want to add 'username=user' use setParam('username', 'user').
     * @param {string} key Name of the param.
     * @param {string} value Name of the param.
     * @return this
     */
    setParam: function (key, value) {
      this.params[key] = value
      return this
    },

    /**
     * Sends the request.
     *
     * @return returns xhr.send()
     */
    send: function () {
      try {
        this.xhr.open(this.options.method, this.getUrl(), true)

        // Add custom headers
        if (this.options.requestHeaders) {
          for (var key in this.options.requestHeaders) {
            if (this.options.requestHeaders.hasOwnProperty(key)) {
              this.xhr.setRequestHeader(key, this.options.requestHeaders[key])
            }
          }
        }

        // Add retries system
        if (this.options.retryAfter > 0 && this.options.maxRetries > 0) {
          var genericError = function () {
            if (this.retries >= this.options.maxRetries) {
              Log.error('Aborting failed request "' + this.service + '". Max retries reached.')
            } else {
              Log.warn('YBRequest "' + this.service + '" failed. Retry ' + (this.retries + 1) + ' of ' +
                this.options.maxRetries + ' in ' + this.options.retryAfter + 'ms.')

              setTimeout(function () {
                this.retries += 1
                this.send()
              }.bind(this), this.options.retryAfter)
            }
          }
          if (this.retries === 0) {
            this.on(YBRequest.Event.ERROR, genericError.bind(this))
          }
        }

        // Log XHR
        if (Log.logLevel <= Log.Level.VERBOSE) {
          Log.verbose('XHR Req: ' + this.getUrl())
        }

        // Register 'on every' listeners
        for (var event in YBRequest._globalListeners) {
          YBRequest._globalListeners[event].forEach(function (callback) {
            this.on(event, callback)
          }.bind(this))
        }

        // Send
        return this.xhr.send()
      } catch (err) {
        Log.error(err)
      }
    }
  },

  /** @lends youbora.YBRequest */
  {
    /**
     * List of events that could be fired from XHR
     * @enum
     */
    Event: {
      /** Request successful */
      SUCCESS: 'load',
      /** Request successful */
      LOAD: 'load', // Native JS
      /** Request returned error */
      ERROR: 'error',
      /** Request aborted */
      ABORT: 'abort'
    },

    /**
     * This static property includes the default values for the options. In case you do not define
     * one of them in the constructor, these values will be used instead.
     *
     * @param {string} [defaultOptions.method="GET"] Specifies the method of the request.
     * ie: "GET", "HEAD".
     * @param {string} [defaultOptions.requestHeaders] Object with options of requestHeaders.
     * ie: { header: value }.
     * @param {number} [defaultOptions.retryAfter=5000] Time in ms before sending a failed request
     * again. 0 to disable.
     * @param {number} [defaultOptions.maxRetries=3] Max number of retries. 0 to disable.
     * @param {bool} [defaultOptions.cache=false] If false, timemark will be added to each request
     * to prevent caching.
     */
    defaultOptions: {
      method: 'GET',
      requestHeaders: {},
      maxRetries: 3,
      retryAfter: 5000,
      cache: false
    },

    /** @private */
    _globalListeners: {},

    /**
     * Adds a callback to every instance.
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event.
     */
    onEvery: function (event, callback) {
      YBRequest._globalListeners[event] = YBRequest._globalListeners[event] || []
      YBRequest._globalListeners[event].push(callback)
    },

    /**
     * Removes a global callback
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event.
     */
    offEvery: function (event, callback) {
      if (YBRequest._globalListeners[event]) {
        var index = YBRequest._globalListeners[event].indexOf(callback)
        if (index !== -1) {
          YBRequest._globalListeners[event].splice(index, 1)
        }
      }
    }
  })

module.exports = YBRequest


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)

var Transform = Emitter.extend(
  /** @lends youbora.Transform.prototype */
  {
    /**
     * Transform classes in YOUBORA help the library parse and work with data.
     *
     * A Transform makes some kind of task that may block requests until it's done, or applies changes
     * to the requests right before they're finally sent.
     *
     * {@link ResourceTransform}, {@link ViewTransform}... all extend from this class.
     *
     * @constructs Transform
     * @extends youbora.Emitter
     * @memberof youbora
     * @abstract
     */
    constructor: function () {
      /**
       * Whether the Transform is currently working or not.
       * @private
       */
      this._isBusy = true
    },

    /**
     * Override this method to transform info.
     *
     * @param {YBRequest} request Request to transform.
     */
    parse: function (request) { },

    /**
     * By default this will return true until {@link #done()} is called. This can be overridden
     * in order to block {@link Request}s based on any criteria. For instance its
     * {@link Request#getService()}.
     *
     * @param {YBRequest} request Request to transform.
     * @return {bool} True if queue shall be blocked.
     */
    isBlocking: function (request) {
      return this._isBusy
    },

    /**
     * Emits DONE event
     */
    done: function () {
      this._isBusy = false
      this.emit(Transform.Event.DONE)
    }
  },

  /** @lends youbora.Transform */
  {
    // Static members

    /**
     * List of events that could be fired from this class.
     * @enum
     */
    Event: {
      /** Notifies that this Transform is done processing. */
      DONE: 'done'
    }
  }
)

module.exports = Transform


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)

var Chrono = YouboraObject.extend(
  /** @lends youbora.Chrono.prototype */
  {
    /**
     * This class calculates time lapses between two points in time.
     *
     * @constructs Chrono
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function () {
      this.reset()
    },

    /** Reset chrono values. */
    reset: function () {
      /** Start time */
      this.startTime = 0

      /** Stop time */
      this.stopTime = 0

      /** Pause time */
      this.pauseTime = 0

      /** Offset to be added to deltaTime and stop. in ms. */
      this.offset = 0
    },

    /**
     * Returns the time between start() and the last stop() in ms. Returns -1 if start wasn't
     * called.
     * @param {boolean} [stop=true] If true, it will force a stop() if it wasn't called before.
     * @return {number} Time lapse in ms.
     */
    getDeltaTime: function (stop) {
      var now = new Date().getTime()
      if (this.startTime) {
        if (stop && !this.stopTime) {
          this.stopTime = now
        }
        var tempOffset = this.pausetime ? now - this.pausetime : 0
        var tempStop = this.stopTime ? this.stopTime : now
        return (this.offset - tempOffset) + (tempStop - this.startTime)
      } else {
        return -1
      }
    },

    /**
     * Starts the chrono.
     */
    start: function () {
      this.startTime = new Date().getTime()
      this.stopTime = 0
      this.offset = 0
    },

    /**
     * Stops the timer and returns current delta time.
     * @return {number} Returns the delta time
     */
    stop: function () {
      if (this.pausetime) this.resume()
      this.stopTime = new Date().getTime()
      return this.startTime ? this.offset + (this.stopTime - this.startTime) : -1
    },

    pause: function () {
      this.pauseTime = new Date().getTime()
    },

    resume: function () {
      this.offset -= (new Date().getTime() - this.pauseTime)
      this.pauseTime = 0
    },

    /**
     * Creates a copy of the chrono.
     */
    clone: function () {
      var chrono = new Chrono()
      chrono.startTime = this.startTime
      chrono.stopTime = this.stopTime
      chrono.offset = this.offset
      return chrono
    }
  }
)

module.exports = Chrono


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31).version


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// No-Conflict
var previousYoubora = youbora
var youbora = {}

/**
 * This allows you to run multiple instances of YouboraLib on the same webapp.
 * After loading the new version, call `noConflict()` to get a reference to it.
 * At the same time the old version will be returned to Youbora.
 */
youbora.noConflict = function () {
  youbora = previousYoubora
  return this
}

// Info
youbora.VERSION = __webpack_require__(8)

// Polyfills
youbora.polyfills = __webpack_require__(32)

// Base Classes
youbora.Object = __webpack_require__(1)
youbora.Emitter = __webpack_require__(4)

// Log
youbora.Log = __webpack_require__(0)
youbora.Log.loadLevelFromUrl()

// General classes
youbora.Util = __webpack_require__(2)
youbora.HybridNetwork = __webpack_require__(17)
youbora.Chrono = __webpack_require__(7)
youbora.Timer = __webpack_require__(12)
youbora.Constants = __webpack_require__(3)

// Comm classes
youbora.Request = __webpack_require__(5)
youbora.Communication = __webpack_require__(13)

// Resource Transform classes
youbora.Transform = __webpack_require__(6)
youbora.ViewTransform = __webpack_require__(18)
youbora.Nqs6Transform = __webpack_require__(34)
youbora.ResourceTransform = __webpack_require__(19)
youbora.CdnParser = __webpack_require__(21)
youbora.HlsParser = __webpack_require__(20)
youbora.LocationheaderParser = __webpack_require__(22)

// Plugin Classes
youbora.Options = __webpack_require__(23)
youbora.Plugin = __webpack_require__(41)
youbora.Storage = __webpack_require__(24)
youbora.RequestBuilder = __webpack_require__(25)

// Adapters
youbora.PlayheadMonitor = __webpack_require__(28)
youbora.Adapter = __webpack_require__(15)
youbora.adapters = {}

// Infinity
youbora.Infinity = __webpack_require__(14)

// Detector classes
youbora.BackgroundDetector = __webpack_require__(26)
youbora.DeviceDetector = __webpack_require__(27)

/**
 * Register the given adapter in <youbora>.adapters.
 *
 * @param {string} key Unique adapter identifier.
 * @param {youbora.Adapter} Adapter Adapter class.
 *
 * @memberof youbora
 */
youbora.registerAdapter = function (key, Adapter) {
  this.adapters[key] = Adapter
}.bind(youbora)

/**
 * Remove the given adapter in <youbora>.adapters.
 *
 * @param {string} key Unique adapter identifier.
 *
 * @memberof youbora
 */
youbora.unregisterAdapter = function (key) {
  this.adapters[key] = null
}.bind(youbora)

module.exports = youbora


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * See Array.isArray.
 * @memberof youbora.Util
 */
module.exports = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Chrono = __webpack_require__(7)

var Timer = YouboraObject.extend(
  /** @lends youbora.Timer.prototype */
  {
    /**
     * An Utility class that provides timed events in a defined time interval.
     *
     * @param {function} callback The callback to call every due interval.
     * Callback will receive lapsed ms between calls.
     * @param {int} [interval=5000] Milliseconds between each call.
     *
     * @constructs Timer
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function (callback, interval) {
      this.callback = callback
      this.interval = interval || 5000
      this.isRunning = false
      this._timer = null

      this.chrono = new Chrono()
    },

    /**
     * Starts the timer.
     */
    start: function () {
      this.isRunning = true
      this._setTick()
    },

    /**
     * Stops the timer.
     */
    stop: function () {
      this.isRunning = false
      if (this._timer) clearTimeout(this._timer)
    },

    /**
     * Sets the next tick execution.
     * @private
     */
    _setTick: function () {
      this.chrono.start()
      this._timer = setTimeout(function () {
        this.callback(this.chrono.stop())
        this._setTick()
      }.bind(this), this.interval)
    }
  }
)

module.exports = Timer


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Log = __webpack_require__(0)
var YBRequest = __webpack_require__(5)
var Transform = __webpack_require__(6)

var Communication = YouboraObject.extend(
  /** @lends youbora.Communication.prototype */
  {
    /**
     * Youbora Communication implements an abstraction layer over API requests.
     * Internally, Communication implements queues of {@link Request} objects.
     * This queue can be blocked using {@link Transform}
     *
     * @constructs Communication
     * @extends youbora.YouboraObject
     * @memberof youbora
     *
     * @param {string} host The fastdata host address.
     * @param {boolean} httpSecure True for https, false for http, undefined for //.
     */
    constructor: function () {
      /** Array of {@link Transform}, only when the array is empty the request Queues will begin sending. */
      this.transforms = []

      /**
       * Queue of {@link YBRequest}
       * @private
       */
      this._requests = []
    },

    /**
     * Enqueues the request provided.
     *
     * @param {YBRequest} request Request to be enqueued
     * @param {function} [callback] The defined load callback to the Request
     */
    sendRequest: function (request, callback) {
      if (request) {
        if (typeof callback === 'function') request.on(YBRequest.Event.SUCCESS, callback)
        this._registerRequest(request)
      }
    },

    /**
     * Build a generic request to the given host.
     *
     * @param {string} host Host of the service called.
     * @param {string} service A string with the service to be called. ie: '/data', '/joinTime'...
     * @param {Object} [params] Object of key:value params.
     * @param {function} [callback] The defined load callback to the Request
     */
    buildRequest: function (host, service, params, callback) {
      params = params || {}
      var request = new YBRequest(host, service, params)
      if (typeof callback === 'function') request.on(YBRequest.Event.SUCCESS, callback)
      this._registerRequest(request)
    },

    /**
     * Adds a Transform to the queue. See {@link Transform}.
     *
     * @param {RequestTransform} transform
     */
    addTransform: function (transform) {
      if (transform.parse && transform.isBlocking) {
        this.transforms.push(transform)
        transform.on(Transform.Event.DONE, this._processRequests.bind(this))
      } else {
        Log.warn(transform + ' is not a valid RequestTransform.')
      }
    },

    /**
     * Removes a {@link Transform}.
     *
     * @param {RequestTransform} transform Transform object to remove.
     */
    removeTransform: function (transform) {
      var pos = this.transforms.indexOf(transform)
      if (pos !== -1) {
        this.transforms.splice(pos, 1)
      } else {
        Log.warn('Trying to remove unexisting Transform \'' + transform + '\'.')
      }
    },

    /**
     * Adds an {@link YBRequest} to the queue of requests.
     *
     * @private
     * @param {YBRequest} request The Request to be queued.
     */
    _registerRequest: function (request) {
      this._requests.push(request)
      this._processRequests()
    },

    /**
     * Execute pending requests in the queue. Returns rejected ones to the queue.
     * @private
     */
    _processRequests: function () {
      var workingQueue = this._requests
      this._requests = []

      var rejected = []
      while (workingQueue.length) {
        var request = workingQueue.shift()
        if (this._transform(request)) {
          request.send()
        } else {
          rejected.push(request)
        }
      }

      while (rejected.length) {
        this._requests.push(rejected.shift())
      }
    },

    /**
     * Pass the given request to each transform.
     * @private
     * @returns {bool} True if everything is right. False if some parser rejected it.
     */
    _transform: function (request) {
      var ret = true
      this.transforms.forEach(function (transform) {
        if (transform.isBlocking(request)) {
          ret = false
          return // break foreach loop
        } else {
          transform.parse(request)
        }
      })
      return ret
    }
  })

module.exports = Communication


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)
var Comm = __webpack_require__(13)

var YouboraInfinity = Emitter.extend(
  /** @lends youbora.Infinity.prototype */
  {

    /**
     * This class is the base of youbora infinity. Every plugin will have an instance.
     *
     * @param {youbora.Plugin} plugin Parent plugin.
     *
     * @constructs youbora.Infinity
     * @extends youbora.Emitter
     * @memberof youbora
     */
    constructor: function (plugin) {
      /** Parent {@link youbora.Plugin} reference. */
      this._plugin = plugin
    },

    /**
     * @alias youbora.Infinity.prototype.begin.
     */
    andBeyond: function () {
      YouboraInfinity.prototype.begin.apply(this, arguments)
    },

    /**
     * This method will start infinity logic, setting storage as needed.
     * Will call fireSessionStart the first time and fireNav for every subsequent route change.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    begin: function (params) {
      this._comm = new Comm()
      this._comm.addTransform(this._plugin.viewTransform)

      if (this._plugin.getContext()) {
        this.fireNav(params) // returning
      } else {
        this.fireSessionStart(params) // first time
      }
    },

    _generateNewContext: function () {
      var context = btoa(new Date().getTime())
      this._plugin.storage.setSession('context', context)
    },

    _setLastActive: function () {
      this._plugin.storage.setSession('lastactive', new Date().getTime())
    },

    /**
     * Returns the current {@link youbora.Communication} instance.
     *
     * @returns {youbora.Communication} communication instance
     */
    getComm: function () {
      return this._comm
    },

    // Fire
    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireSessionStart: function (params) {
      this._generateNewContext()
      this.emit(YouboraInfinity.Event.SESSION_START, { params: params })
      this._setLastActive()
    },

    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireSessionStop: function (params) {
      this.emit(YouboraInfinity.Event.SESSION_STOP, { params: params })
      this._setLastActive()
    },

    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireNav: function (params) {
      this.emit(YouboraInfinity.Event.NAV, { params: params })
      this._setLastActive()
    },

    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireEvent: function (params) {
      this.emit(YouboraInfinity.Event.EVENT, { params: params })
      this._setLastActive()
    }
  },
  /** @lends youbora.Plugin */
  {
    // Static Memebers //
    /**
     * List of events that could be fired
     * @enum
     * @event
     */
    Event: {
      NAV: 'nav',
      SESSION_START: 'sessionStart',
      SESSION_STOP: 'sessionStop',
      BEAT: 'beat',
      EVENT: 'event'
    }
  }
)

module.exports = YouboraInfinity


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)
var Log = __webpack_require__(0)
var Util = __webpack_require__(2)
var HybridNetwork = __webpack_require__(17)
var version = __webpack_require__(8)
var PlaybackChronos = __webpack_require__(44)
var PlaybackFlags = __webpack_require__(45)
var PlayheadMonitor = __webpack_require__(28)

var Adapter = Emitter.extend(
  /** @lends youbora.Adapter.prototype */
  {
    /**
     * Main Adapter class. All specific player adapters should extend this class specifying a player
     * class.
     *
     * The Adapter works as the 'glue' between the player and YOUBORA acting both as event
     * translator and as proxy for the {@link Plugin} to get info from the player.
     *
     * @constructs Adapter
     * @extends youbora.Emitter
     * @memberof youbora
     *
     * @param {object|string} player Either an instance of the player or a string containing an ID.
     */
    constructor: function (player) {
      /** An instance of {@link FlagStatus} */
      this.flags = new PlaybackFlags()

      /** An instance of {@link ChronoStatus} */
      this.chronos = new PlaybackChronos()

      /** Reference to {@link PlayheadMonitor}. Helps the plugin detect buffers/seeks. */
      this.monitor = null

      /** Reference to {@link Plugin}. */
      this.plugin = null

      /** Reference to the player tag */
      this.player = null

      // Register player and event listeners
      this.setPlayer(player)

      /** Reference to the video/object tag, could be the same as the player. */
      this.tag = this.player

      Log.notice('Adapter ' + this.getVersion() + ' with Lib ' + version + ' is ready.')
    },

    /**
     * Sets a new player, removes the old listeners if needed.
     *
     * @param {Object} player Player to be registered.
     */
    setPlayer: function (player) {
      if (this.player) this.unregisterListeners()

      if (typeof player === 'string') {
        this.player = document.getElementById(player)
      } else {
        this.player = player
      }

      if (this.player) this.registerListeners()
    },

    /**
     * Override to create event binders.
     * It's a good practice when implementing a new Adapter to create intermediate methods and call
     * those when player events are detected instead of just calling the `fire*` methods. This
     * will allow future users of the Adapter to customize its behaviour by overriding these
     * methods.
     *
     * @example
     * registerListeners: function () {
     *  this.player.addEventListener('start', this.onStart.bind(this))
     * },
     *
     * onStart: function (e) {
     *  this.emit('start')
     * }
     */
    registerListeners: function () { },

    /**
     * Override to create event de-binders.
     *
     * @example
     * registerListeners: function () {
     *  this.player.removeEventListener('start', this.onStart)
     * }
     */
    unregisterListeners: function () { },

    /**
     * This function disposes the currend adapter, removes player listeners and drops references.
     */
    dispose: function () {
      if (this.monitor) this.monitor.stop()
      this.fireStop()
      this.unregisterListeners()
      this.player = null
      this.tag = null
    },

    /**
     * Creates a new {@link PlayheadMonitor} at this.monitor.
     *
     * @param {bool} monitorBuffers If true, it will monitor buffers.
     * @param {bool} monitorSeeks If true, it will monitor seeks.
     * @param {number} [interval=800] The interval time in ms.
     */
    monitorPlayhead: function (monitorBuffers, monitorSeeks, interval) {
      var type = 0
      if (monitorBuffers) type |= PlayheadMonitor.Type.BUFFER
      if (monitorSeeks) type |= PlayheadMonitor.Type.SEEK

      this.monitor = new PlayheadMonitor(this, type, interval)
    },

    // GETTERS //

    /** Override to return current playhead of the video */
    getPlayhead: function () {
      return null
    },

    /** Override to return current playrate */
    getPlayrate: function () {
      return !this.flags.isPaused ? 1 : 0
    },

    /** Override to return Frames Per Secon (FPS) */
    getFramesPerSecond: function () {
      return null
    },

    /** Override to return dropped frames since start */
    getDroppedFrames: function () {
      return null
    },

    /** Override to return video duration */
    getDuration: function () {
      return null
    },

    /** Override to return current bitrate */
    getBitrate: function () {
      return null
    },

    /** Override to return user bandwidth throughput */
    getThroughput: function () {
      if (this.getCdnTraffic() && this.getCdnTraffic() !== 0) {
        if (!this.lastDataValue) {
          this.lastDataValue = 0
        }
        var prevDataValue = this.lastDataValue
        this.lastDataValue = this.getCdnTraffic() + this.getP2PTraffic()
        return Math.round((this.lastDataValue - prevDataValue) / (this.plugin._ping.interval / 1000))
      }
      return null
    },

    /** Override to return rendition */
    getRendition: function () {
      return null
    },

    /** Override to return title */
    getTitle: function () {
      return null
    },

    /** Override to return title2 */
    getTitle2: function () {
      return null
    },

    /** Override to recurn true if live and false if VOD */
    getIsLive: function () {
      return null
    },

    /** Override to return resource URL. */
    getResource: function () {
      return null
    },

    /** Override to return player version */
    getPlayerVersion: function () {
      return null
    },

    /** Override to return player's name */
    getPlayerName: function () {
      return null
    },

    /** Override to return adapter version. */
    getVersion: function () {
      return version + '-generic-js'
    },

    /** Override to return current ad position (only ads) */
    getPosition: function () {
      return null
    },

    /** Override to return CDN traffic bytes not using streamroot or peer5. */
    getCdnTraffic: function () {
      return HybridNetwork.getCdnTraffic()
    },

    /** Override to return P2P traffic bytes not using streamroot or peer5. */
    getP2PTraffic: function () {
      return HybridNetwork.getP2PTraffic()
    },

    /** Override to return P2P traffic sent in bytes, not using streamroot or peer5. */
    getUploadTraffic: function () {
      return HybridNetwork.getUploadTraffic()
    },

    /** Override to return if P2P is enabled not using streamroot or peer5. */
    getIsP2PEnabled: function () {
      return HybridNetwork.getIsP2PEnabled()
    },

    /** Override to return household id */
    getHouseholdId: function () {
      return null
    },

    /** Override to return the latency */
    getLatency: function () {
      return null
    },

    /** Override to return the number of packets lost */
    getPacketLoss: function () {
      return null
    },

    /** Override to return the number of packets sent */
    getPacketSent: function () {
      return null
    },

    // FLOW //

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent init if isStarted or isInited are already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireInit: function (params) {
      if (this.plugin && this.plugin.backgroundDetector && this.plugin.backgroundDetector.canBlockStartCalls()) {
        return null
      }
      if (!this.flags.isStarted && !this.flags.isInited) {

        this.chronos.total.start()
        this.chronos.join.start()

        this.emit(Adapter.Event.INIT, { params: params })
        this.flags.isInited = true
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireStart: function (params) {
      if (this.plugin && this.plugin.backgroundDetector && this.plugin.backgroundDetector.canBlockStartCalls()) {
        return null
      }
      if (!this.flags.isStarted) {
        this.flags.isStarted = true

        if (!this.flags.isInited) {
          this.chronos.total.start()
          this.chronos.join.start()
        }
        this.emit(Adapter.Event.START, { params: params })
        this.flags.isInited = false
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireJoin: function (params) {
      if ((this.flags.isStarted || this.flags.isInited) && !this.flags.isJoined) {
        this.flags.isStarted = true
        if (this.monitor) this.monitor.start()

        this.flags.isJoined = true

        this.chronos.join.stop()

        this.emit(Adapter.Event.JOIN, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    firePause: function (params) {
      if (this.flags.isJoined && !this.flags.isPaused) {
        this.flags.isPaused = true

        this.chronos.pause.start()

        this.emit(Adapter.Event.PAUSE, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireResume: function (params) {
      if (this.flags.isJoined && this.flags.isPaused) {
        this.flags.isPaused = false

        this.chronos.pause.stop()

        if (this.monitor) this.monitor.skipNextTick()

        this.emit(Adapter.Event.RESUME, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     * @param {bool} [convertFromSeek=false] If true, will convert current seek to buffer.
     */
    fireBufferBegin: function (params, convertFromSeek) {
      if (this.flags.isJoined && !this.flags.isBuffering) {
        if (this.flags.isSeeking) {
          if (convertFromSeek) {
            Log.notice('Converting current buffer to seek')

            this.chronos.buffer = this.chronos.seek.clone()
            this.chronos.seek.reset()

            this.flags.isSeeking = false
          } else {
            return
          }
        } else {
          this.chronos.buffer.start()
        }

        this.flags.isBuffering = true
        this.emit(Adapter.Event.BUFFER_BEGIN, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireBufferEnd: function (params) {
      if (this.flags.isJoined && this.flags.isBuffering) {
        this.flags.isBuffering = false

        this.chronos.buffer.stop()

        if (this.monitor) this.monitor.skipNextTick()

        this.emit(Adapter.Event.BUFFER_END, { params: params })
      }
    },

    /**
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    cancelBuffer: function (params) {
      if (this.flags.isJoined && this.flags.isBuffering) {
        this.flags.isBuffering = false

        this.chronos.buffer.stop()

        if (this.monitor) this.monitor.skipNextTick()

      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     * @param {bool} [convertFromBuffer=true] If false, will convert current buffer to seek.
     */
    fireSeekBegin: function (params, convertFromBuffer) {
      if (this.plugin && this.plugin.getIsLive() && this.plugin.options['content.isLive.noSeek']) return null
      if (this.flags.isJoined && !this.flags.isSeeking) {
        if (this.flags.isBuffering) {
          if (convertFromBuffer !== false) {
            Log.notice('Converting current buffer to seek')

            this.chronos.seek = this.chronos.buffer.clone()
            this.chronos.buffer.reset()

            this.flags.isBuffering = false
          } else {
            return
          }
        } else {
          this.chronos.seek.start()
        }

        this.flags.isSeeking = true
        this.emit(Adapter.Event.SEEK_BEGIN, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireSeekEnd: function (params) {
      if (this.plugin && this.plugin.getIsLive() && this.plugin.options['content.isLive.noSeek']) return null
      if (this.flags.isJoined && this.flags.isSeeking) {
        this.flags.isSeeking = false

        this.chronos.seek.stop()

        if (this.monitor) this.monitor.skipNextTick()

        this.emit(Adapter.Event.SEEK_END, { params: params })
      }
    },

    /**
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    cancelSeek: function (params) {
      if (this.flags.isJoined && this.flags.isSeeking) {
        this.flags.isSeeking = false

        this.chronos.seek.stop()

        if (this.monitor) this.monitor.skipNextTick()
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireStop: function (params) {
      if (this.flags.isStarted) {
        if (this.monitor) this.monitor.stop()

        this.flags.reset()
        this.chronos.total.stop()
        this.chronos.join.reset()
        this.chronos.pause.stop()
        this.chronos.buffer.stop()
        this.chronos.seek.stop()

        this.emit(Adapter.Event.STOP, { params: params })

        if (this.plugin._adapter && this.plugin._adapter.flags.isEnded && !this.plugin._adapter.flags.isStopped) {
          if (this.plugin.options['ad.afterStop'] === 0) {
            this.plugin.fireStop()
          } else {
            this.plugin.options['ad.afterStop']--
          }
        }

        this.chronos.pause.reset()
        this.chronos.buffer.reset()
        this.chronos.seek.reset()
      }
    },

    /**
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireCasted: function (params) {
      if (!params) params = {}
      params.casted = true
      this.fireStop(params)
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
     * @param {String} [msg] Error Message
     * @param {Object} [metadata] Object defining error metadata
     * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
     */
    fireError: function (code, msg, metadata, level) {
      var params = Util.buildErrorParams(code, msg, metadata, level)
      this.emit(Adapter.Event.ERROR, { params: params })
    },

    /**
     * ONLY ADS.
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
     * @param {String} [msg] Error Message
     * @param {Object} [metadata] Object defining error metadata
     * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
     */
    fireNoServedAd: function (code, msg, metadata, level) {
      var params = Util.buildErrorParams(code, msg, metadata, level)
      params.errorSeverity = "AdsNotServed"
      this.emit(Adapter.Event.ERROR, { params: params })
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
     * @param {String} [msg] Error Message
     * @param {Object} [metadata] Object defining error metadata
     */
    fireFatalError: function (code, msg, metadata) {
      if (this.monitor) this.monitor.stop()

      this.fireError(code, msg, metadata, 'fatal')
      this.fireStop()
    },

    /**
     * ONLY ADS.
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireClick: function (params) {
      this.emit(Adapter.Event.CLICK, { params: params })
    },

    /**
     * ONLY ADS.
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireBlocked: function (params) {
      this.emit(Adapter.Event.BLOCKED, { params: params })
    }
  },

  /** @lends youbora.Adapter */
  {
    // Static Memebers //

    /**
     * List of events that could be fired
     * @enum
     * @event
     */
    Event: {
      START: 'start',
      JOIN: 'join',
      PAUSE: 'pause',
      RESUME: 'resume',
      SEEK_BEGIN: 'seek-begin',
      SEEK_END: 'seek-end',
      BUFFER_BEGIN: 'buffer-begin',
      BUFFER_END: 'buffer-end',
      ERROR: 'error',
      STOP: 'stop',
      CLICK: 'click',
      BLOCKED: 'blocked'
    },

    AdPosition: {
      PRE: 'pre',
      MID: 'mid',
      POST: 'post',
      UNKNOWN: 'unknown'
    }
  }
)

module.exports = Adapter


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * See Object.assign.
 *
 * @memberof youbora.Util
 */
module.exports = function (target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * This static class provides p2p and cdn network traffic information for
 * Streamroot, Peer5 and EasyBroadcast
 *
 * @class
 * @static
 * @memberof youbora
 */
var HybridNetowrk = {
  /** Returns CDN traffic bytes using streamroot or peer5. Otherwise null */
  getCdnTraffic: function () {
    if (typeof Streamroot !== 'undefined' && Streamroot.p2pAvailable && Streamroot.peerAgents) {
      var acum = 0
      for (agent in Streamroot.peerAgents) {
        acum += Streamroot.peerAgents[agent].stats.cdn
      }
      return acum
    }
    if (typeof peer5 !== 'undefined' && peer5.getStats) {
      return peer5.getStats().totalHttpDownloaded
    }
    return null
  },

  /** Returns P2P traffic bytes using streamroot or peer5. Otherwise null */
  getP2PTraffic: function () {
    if (typeof Streamroot !== 'undefined' && Streamroot.p2pAvailable && Streamroot.peerAgents) {
      var acum = 0
      for (agent in Streamroot.peerAgents) {
        if (Streamroot.peerAgents[agent].isP2PEnabled)
          acum += Streamroot.peerAgents[agent].stats.p2p
      }
      return acum
    }
    if (typeof peer5 !== 'undefined' && peer5.getStats) {
      return peer5.getStats().totalP2PDownloaded
    }
    return null
  },

  /** Returns P2P traffic sent in bytes, using streamroot or peer5. Otherwise null*/
  getUploadTraffic: function () {
    if (typeof Streamroot !== 'undefined' && Streamroot.p2pAvailable && Streamroot.peerAgents) {
      var acum = 0
      for (agent in Streamroot.peerAgents) {
        if (Streamroot.peerAgents[agent].isP2PEnabled)
          acum += Streamroot.peerAgents[agent].stats.upload
      }
      return acum
    }
    if (typeof peer5 !== 'undefined' && peer5.getStats) {
      return peer5.getStats().totalP2PUploaded
    }
    return null
  },


  /** Returns if P2P is enabled, using streamroot or peer5. Otherwise null*/
  getIsP2PEnabled: function () {
    if (typeof Streamroot !== 'undefined' && Streamroot.p2pAvailable && Streamroot.peerAgents) {
      var acum = false
      for (agent in Streamroot.peerAgents) { // if at least one agent is enabled
        acum = acum || Streamroot.peerAgents[agent].isP2PEnabled
      }
      return acum
    }
    if (typeof peer5 !== 'undefined' && peer5.isEnabled) {
      return peer5.isEnabled()
    }
    return null
  }
}

module.exports = HybridNetowrk


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var YBRequest = __webpack_require__(5)
var Transform = __webpack_require__(6)
var Log = __webpack_require__(0)
var Util = __webpack_require__(2)
var Constants = __webpack_require__(3)

var ViewTransform = Transform.extend(
  /** @lends youbora.ViewTransform.prototype */
  {
    /**
     * This class manages Fastdata service and view index.
     *
     * @constructs
     * @extends youbora.Transform
     * @memberof youbora
     *
     * @param {Plugin} plugin Instance of {@link Plugin}
     * @param {string} session If provided, plugin will use this as a FD response.
     */
    constructor: function (plugin, session) {
      Transform.prototype.constructor.apply(this, arguments)

      /** /data response */
      this.response = {}

      this._viewIndex = -1

      this._session = session

      this._httpSecure = plugin.options.httpSecure

      this._plugin = plugin
    },

    /**
     * Starts the 'FastData' fetching. This will send the initial request to YOUBORA in order to get
     * the needed info for the rest of the requests.
     *
     * This is an asynchronous process.
     *
     * When the fetch is complete, {@link #fastDataConfig} will contain the parsed info.
     * @see FastDataConfig
     */
    init: function () {
      var service = Constants.Service.DATA
      var params = {
        apiVersion: 'v7',
        outputformat: 'json'
      }

      params = this._plugin.requestBuilder.buildParams(params, service)
      if (params !== null) {
        Log.notice(service + ' ' + params.system)
        if (params.system === 'nicetest') {
          // "nicetest" is the default accountCode.
          // If found here, it's very likely that the customer has forgotten to set it.
          Log.error(
            'No accountCode has been set. Please set your accountCode inside plugin\'s options.'
          )
        }

        new YBRequest(this._plugin.getHost(), service, params)
          .on(YBRequest.Event.SUCCESS, this._receiveData.bind(this))
          .on(YBRequest.Event.ERROR, this._failedData.bind(this))
          .send()
      }
    },

    /**
     * Uses given response to set fastdata response.
     *
     * @param {String} response Fastdata response as json string.
     */
    setData: function (response) {
      try {
        var resp = JSON.parse(response)
        this.response.msg = response
        this.response.host = Util.addProtocol(resp.q.h, this._httpSecure)
        this.response.code = resp.q.c
        this.response.pingTime = resp.q.pt || 5
        this.response.beatTime = resp.q.bt || 30

        this.done()
      } catch (err) {
        Log.error('Fastdata response is invalid.')
      }
    },

    /**
     * Parse the response from the fastData service.
     *
     * @private
     */
    _receiveData: function (req, e) {
      var msg = req.getXHR().response
      this.setData(msg)
    },

    _failedData: function (req, e) {
      Log.error('Fastdata request has failed.')
    },

    /**
     * This method will increment the view index (_0, _1, _2...). The library handles this
     * automatically, but some error flow might need calling this manually.
     * @return {string} new viewcode
     */
    nextView: function () {
      this._viewIndex += 1
      return this.getViewCode()
    },

    /**
     * Returns current viewcode
     * @return {string} viewcode
     */
    getViewCode: function () {
      return this.response.code + '_' + this._viewIndex
    },

    /**
     * Returns the current sessionId
     *
     * @returns {string} SessionId
     */
    getSessionId: function () {
      return this._session
    },

    /**
     * Sets the sessionId
     *
     * @param {String} sessionId Sets the session id.
     */
    setSessionId: function (sessionId) {
      this._session = sessionId
    },

    /**
     * Transform requests
     * @param {youbora.comm.YBRequest} request YBRequest to transform.
     */
    parse: function (request) {
      request.host = request.host || this.response.host
      request.params.sessionId = request.params.sessionId || this.getSessionId()
      if (request.service === Constants.Service.PING ||
        request.service === Constants.Service.START) {
        request.params.pingTime = request.params.pingTime || this.response.pingTime
      }

      if ([ // Unless infinity event
        Constants.Service.NAV,
        Constants.Service.SESSION_START,
        Constants.Service.SESSION_STOP,
        Constants.Service.EVENT
      ].indexOf(request.service) === -1) {
        request.params.code = request.params.code || this.getViewCode()
      }
    }
  })

module.exports = ViewTransform


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(6)
var HlsParser = __webpack_require__(20)
var CdnParser = __webpack_require__(21)
var LocationheaderParser = __webpack_require__(22)
var Log = __webpack_require__(0)
var Constants = __webpack_require__(3)

var ResourceTransform = Transform.extend(
  /** @lends youbora.ResourceTransform.prototype */
  {
    /**
     * This class parses resource to fetch HLS transportstreams and CDN-related info.
     *
     * @constructs ResourceTransform
     * @extends youbora.Transform
     * @memberof youbora
     *
     * @param {Plugin} plugin Instance of {@link Plugin}
     */
    constructor: function (plugin) {
      ResourceTransform.__super__.constructor.apply(this, arguments)

      /** Defines if resourcetransform has finished working. */
      this.isDone = false

      this._plugin = plugin

      this._realResource = null
      this._initResource = null
      this._cdnName = null
      this._cdnNodeHost = null
      this._cdnNodeTypeString = null
      this._cdnNodeType = null
      this._responses = {}

      this._isBusy = false
    },

    /**
     * Get the resource. If the transform is done, the real (parsed) resource will be returned
     * Otherwise the initial one is returned.
     *
     * @return {string} The initial or parsed resource
     */
    getResource: function () {
      if (this._plugin && this._plugin.options && this._plugin.options['content.resource']) {
        return this._plugin.options['content.resource']
      }
      return this._realResource || this._initResource
    },

    /**
     * Get the parsed CDN name.
     *
     * @return {string} The CDN name or null if unknown
     */
    getCdnName: function () {
      return this._cdnName
    },

    /**
     * Get the parsed CDN node.
     *
     * @return {string} The CDN node or null if unknown
     */
    getNodeHost: function () {
      return this._cdnNodeHost
    },

    /**
     * Get the parsed CDN type string, as returned in the cdn header response.
     *
     * @return {string} The CDN type string
     */
    getNodeTypeString: function () {
      return this._cdnNodeTypeString
    },

    /**
     * Get the parsed CDN type, parsed from the type string.
     *
     * @return {string} The CDN type
     */
    getNodeType: function () {
      return this._cdnNodeType
    },

    /**
     * Start the execution. Can be called more than once. If already running, it will be ignored,
     * if ended it will restart.
     * @param {string} resource the original resource
     */
    init: function (resource) {
      if (!this._isBusy && !this.isDone) {
        this._isBusy = true

        this._initResource = resource

        this._hlsEnabled = this._plugin.isParseHls()
        this._cdnEnabled = this._plugin.isParseCdnNode()
        this._locHeaderEnabled = this._plugin.isLocHeader()
        this._cdnList = this._plugin.getParseCdnNodeList().slice() // clone
        this._cdnNameHeader = this._plugin.getParseCdnNodeNameHeader()
        CdnParser.setBalancerHeaderName(this._cdnNameHeader)

        this._setTimeout()

        if (this._locHeaderEnabled) {
          this._parseLocHeader()
        }

        if (this._hlsEnabled) {
          this._parseHLS()
        } else if (this._cdnEnabled) {
          this._parseCDN()
        } else {
          this.done()
        }
      }
    },

    done: function () {
      this.isDone = false
      Transform.prototype.done.apply(this, arguments) // super
    },

    _setTimeout: function () {
      // Abort operation after 3s
      this._parseTimeout = setTimeout(function () {
        if (this._isBusy) {
          this.done()
          Log.warn(
            'ResourceTransform has exceded the maximum execution time (3s) and will be aborted.'
          )
        }
      }.bind(this), 3000)
    },

    _parseLocHeader: function () {
      var headerParser = new LocationheaderParser()
      headerParser.parse(this._initResource)
      headerParser.on(LocationheaderParser.Event.DONE, function () {
        this._realResource = headerParser.getResource()
        this.done()
      }.bind(this))
    },

    _parseHLS: function () {
      var hlsTransform = new HlsParser()
      hlsTransform.on(HlsParser.Event.DONE, function () {
        this._realResource = hlsTransform.getResource()
        if (this._cdnEnabled) {
          this._parseCDN()
        } else {
          this.done()
        }
      }.bind(this))
      hlsTransform.parse(this._initResource)
    },

    _parseCDN: function () {
      if (this._cdnList.length > 0) {
        var cdn = this._cdnList.shift()

        if (this.getNodeHost()) return // abort

        var cdnParser = CdnParser.create(cdn)

        if (cdnParser) {
          cdnParser.on(CdnParser.Event.DONE, function () {
            this._responses = cdnParser.getResponses()
            this._cdnName = cdnParser.getParsedCdnName()
            this._cdnNodeHost = cdnParser.getParsedNodeHost()
            this._cdnNodeTypeString = cdnParser.getParsedNodeTypeString()
            this._cdnNodeType = cdnParser.getParsedNodeType()

            if (this.getNodeHost()) {
              this.done()
            } else {
              this._parseCDN()
            }
          }.bind(this))

          // Run parse
          cdnParser.parse(this.getResource(), this._responses)
        } else {
          this._parseCDN()
        }
      } else {
        this.done()
      }
    },

    /**
     * Replaces the resource and/or Cdn info for the /start service.
     *
     * @param {YBRequest} request YBRequest to transform.
     */
    parse: function (request) {
      if (request.service === Constants.Service.START) {
        var lastSent = this._plugin.requestBuilder.lastSent
        lastSent.mediaResource = request.params.mediaResource = this.getResource()

        if (this._cdnEnabled) {
          lastSent.cdn = request.params.cdn = request.params.cdn || this.getCdnName()
          lastSent.nodeHost = request.params.nodeHost = this.getNodeHost()
          lastSent.nodeType = request.params.nodeType = this.getNodeType()
          lastSent.nodeTypeString = request.params.nodeTypeString = this.getNodeTypeString()
        }
      }
    }
  })

module.exports = ResourceTransform


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var YBRequest = __webpack_require__(5)
var Emitter = __webpack_require__(4)
var Log = __webpack_require__(0)

var HlsParser = Emitter.extend(
  /** @lends youbora.HlsParser.prototype */
  {
    /**
     * Class that asynchronously parses an HLS resource in order to get to the transportstream URL.
     *
     * The point behind this class is that some customers do not host the HLS manifest in the same
     * host or even CDN where the actual content chunks are located.
     *
     * Since the CDN detection is performed with the resource url, it is essential that this
     * resource url is pointing to the CDN that is actually hosting the chunks.
     *
     * HLS manifests can be multi-level so this class uses a recursive approach to get to the final
     * chunk file.
     *
     * @constructs HlsParser
     * @extends youbora.Emitter
     * @memberof youbora
     */
    constructor: function () {
      this._realResource = null
    },

    /**
     * Emits DONE event
     */
    done: function () {
      this.emit(HlsParser.Event.DONE)
    },

    /**
     * Starts the HLS parsing from the given resource. The first (outside) call should set the
     * parentResource to null.
     *
     * @param {string} resource Either the resource url or the manifest body.
     * @param {string} parentResource Parent resource in case relative paths are sent.
     */
    parse: function (resource, parentResource) {
      parentResource = parentResource || ''

      try {
        var matches = /((\S*?)(\.m3u8|\.m3u|\.ts|\.mp4)((\?|\;)\S*|\n|\r|$))/i.exec(resource)
      } catch (err) {
        Log.warn('Parse HLS Regex failed', err)
        this.done()
      }

      if (matches !== null) { // get first line ending in .m3u8, .m3u, .mp4 or .ts
        var res = matches[1].trim()

        var index = parentResource.lastIndexOf('/')
        if (res.indexOf('http') !== 0 && index !== -1) {
          // If does not start with http, add parentResource relative route.
          res = parentResource.slice(0, index) + '/' + res
        }

        if (matches[3] === '.m3u8' || matches[3] === '.m3u') { // It is m3u8 or m3u...
          var request = new YBRequest(res, null, null, { cache: true })

          request.on(YBRequest.Event.SUCCESS, function (resp) {
            this.parse(resp.getXHR().responseText, matches[2])
          }.bind(this))

          request.on(YBRequest.Event.ERROR, function (resp) {
            this.done()
          }.bind(this))

          request.send()
        } else { // It is mp4 or ts...
          this._realResource = res
          this.done()
        }
      } else {
        this.done()
      }
    },

    /**
     * Get the parsed resource. Will be null/undefined if parsing is not yet started and can be a partial
     * (an intermediate manifest) result if the parser is still running.
     *
     * @return {string} The parsed resource.
     */
    getResource: function () {
      return this._realResource
    }
  },

  /** @lends youbora.HlsParser */
  {
    // Static members

    /**
     * List of events that could be fired from this class.
     * @enum
     */
    Event: {
      /** Notifies that this HlsParser is done processing. */
      DONE: 'done'
    }
  }
)

module.exports = HlsParser


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)
var Log = __webpack_require__(0)
var Util = __webpack_require__(2)
var YBRequest = __webpack_require__(5)

var CdnParser = Emitter.extend(
  /** @lends youbora.CdnParser.prototype */
  {
    /**
     * Class that asynchronously tries to get information about the CDN where a given resource is
     * hosted.
     *
     * The info we care about is the CDN code itself, the node host and node type.
     *
     * The CDN is queried with http HEAD requests. This only will work if the CDN has been properly
     * configured.
     *
     * When HEAD requests are performed against the resources, the CDN returns a set of headers that
     * contain info about the cdn header and/or cdn type.
     *
     * Each CDN is different; some require special headers to be set when the HEAD request is
     * performed and others don't. Also, the info can come back in any fashion of ways, sometimes
     * both type and host come in the same response header while sometimes they're in different
     * headers. The format of these response headers is also different from CDN to CDN, so a
     * different regex is used for each CDN.
     *
     * Lastly, as the values indicating the CDN type are also different, we need a specific mapping
     * for each one.
     *
     * Every instance of this class will represent a 'way' of parsing the HEAD response. So an
     * instance should be created for Level3, Akamai, Highwinds, etc...
     *
     * @constructs CdnParser
     * @extends youbora.Emitter
     * @memberof youbora
     *
     * @param {object} options This object represents the configuration of a certain CDN parsing
     * methodology.
     * @param {string} options.cdnName see {@link CdnParser#setCdnName}.
     * @param {array} options.parsers see {@link CdnParser#addParser}.
     * @param {array} options.requestHeaders see {@link CdnParser#setRequestHeader}.
     * @param {function} options.parseType see {@link CdnParser#setParseType}.
     */
    constructor: function (options) {
      this._options = Util.assign({
        cdnName: null,
        parsers: [],
        requestHeaders: {},
        parseType: function () { return 0 }
      }, options)

      this._responses = {}
    },

    /**
     * Emits DONE event
     */
    done: function () {
      this.emit(CdnParser.Event.DONE)
    },

    /**
     * Adds an object that represents a parse step of the headers.
     *
     * Each parser item will define the element parsed (whether if it is a host, a type, both...)
     * a headerName to parse (ie: x-cache) and a regex to execute over that header.
     *
     * @param {object} parser
     * @param {string} parser.element Which element will be parsed from the request.
     * Use {@link CdnParser.ElementType} enum.
     * @param {string} parser.headerName Name of the header to parse.
     * @param {regex} parser.regex Regex to match against the header content.
     *
     * @return itself to chain method calls
     */
    addParser: function (parser) {
      this._options.parsers.push(parser)
      return this
    },

    /**
     * Sets the cdn name. Note that this names are provided by Youbora and must coincede with the
     * ones offered here: {@link http://mapi.youbora.com:8081/cdns}.
     *
     * @return itself to chain method calls
     */
    setCdnName: function (name) {
      this._options.cdnName = name
      return this
    },

    /**
     * if this CDN requires special headers to be set in order to respond with the info we want,
     * add them using this method.
     *
     * @param {string} key Name of the header.
     * @param {string} value Content of the header.
     *
     * @return itself to chain method calls
     */
    setRequestHeader: function (key, value) {
      this._options.requestHeaders[key] = value
      return this
    },

    /**
     * Adds a parsing function for parsing the type (hit or miss) of the request.
     *
     * Parser fucntion will receive a string parsed from a type header (see
     * {@link CdnParser#addParser}). Should return 1 in case of HIT, 2 in case of MISS and
     * 0 otherwise.
     *
     * @param {function} parser Parsing function
     *
     * @return itself to chain method calls
     */
    setParseType: function (parser) {
      this._options.parseType = parser
      return this
    },

    /**
     * Get parsed CDN name.
    *
    * @return {string} The CDN name or null if unknown
    */
    getParsedCdnName: function () {
      return this._cdnName
    },

    /**
     * Get the parsed CDN node.
     *
     * @return {string} The CDN node or null if unknown
     */
    getParsedNodeHost: function () {
      return this._cdnNodeHost
    },

    /**
     * Get the parsed CDN type string, as returned in the cdn header response.
     *
     * @return {string} The CDN type string
     */
    getParsedNodeTypeString: function () {
      return this._cdnNodeTypeString
    },

    /**
     * Get the parsed CDN type, parsed from the type string.
     *
     * @return {string} The CDN type
     */
    getParsedNodeType: function () {
      return this._cdnNodeType
    },

    /**
     * Returns the request responses from this CdnParser.
     * This is filled with the responses from the constructor, or created empty if null.
     * Then the performed request response (if any) is added to this map.
     * Call this method after "using" the CdnParser and pass the responses to the following
     * CdnParser so it can use the responses if it applies.
     * @return the request responses
     */
    getResponses: function () {
      return this._responses
    },

    /**
     * Parses given headers to check for matches.
     */
    parse: function (url, responses) {
      this._responses = responses || {}
      var headerString = JSON.stringify(this._options.requestHeaders)
      if (this._responses[headerString]) {
        this._parseResponse(this._responses[headerString])
      } else {
        this._requestResponse(url)
      }
    },

    _requestResponse: function (url) {
      var headerString = JSON.stringify(this._options.requestHeaders)

      var request = new YBRequest(url, null, null, {
        method: 'HEAD',
        maxRetries: 0,
        requestHeaders: this._options.requestHeaders
        // cache: true
      })

      request.on(YBRequest.Event.SUCCESS, function (resp) {
        this._responses[headerString] = resp.getXHR().getAllResponseHeaders()
        this._parseResponse(this._responses[headerString])
      }.bind(this))

      request.on(YBRequest.Event.ERROR, function (resp) {
        this.done()
      }.bind(this))

      request.send()
    },

    _parseResponse: function (headers) {
      this._options.parsers.forEach(function (parser) {
        headers.split('\n').forEach(function (line) {
          var index = line.indexOf(':')
          if (index !== -1) {
            var key = line.slice(0, index)
            if (key === parser.headerName) {
              this._executeParser(parser, line.slice(index + 1))
            }
          }
        }.bind(this))
      }.bind(this))
      this.done()
    },

    _executeParser: function (parser, value) {
      try {
        var matches = parser.regex.exec(value.trim())
        if (matches !== null) {
          if (this._options.cdnName) this._cdnName = this._options.cdnName
          switch (parser.element) {
            case CdnParser.ElementType.HOST:
              this._cdnNodeHost = matches[1]
              break
            case CdnParser.ElementType.TYPE:
              this._cdnNodeTypeString = matches[1]
              this._cdnNodeType = this._options.parseType(this._cdnNodeTypeString)
              break
            case CdnParser.ElementType.HOST_AND_TYPE:
              this._cdnNodeHost = matches[1]
              this._cdnNodeTypeString = matches[2]
              this._cdnNodeType = this._options.parseType(this._cdnNodeTypeString)
              break
            case CdnParser.ElementType.TYPE_AND_HOST:
              this._cdnNodeTypeString = matches[1]
              this._cdnNodeType = this._options.parseType(this._cdnNodeTypeString)
              this._cdnNodeHost = matches[2]
              break
            case CdnParser.ElementType.NAME:
              this._cdnName = matches[1].toUpperCase()
              break
          }
        }
      } catch (err) {
        Log.warn('CDN parsing for ' + this._options.cdnName +
          ' could not parse header value ' + value)
      }
    }

  },

  /** @lends youbora.CdnParser */
  {
    // Static members

    /**
     * List of events that could be fired from this class.
     *
     * @enum
     */
    Event: {
      /** Notifies that this CdnParser is done processing. */
      DONE: 'done'
    },

    /**
     * Possible different bits of info we can get from a header.
     *
     * @enum
     */
    ElementType: {
      HOST: 'host',
      TYPE: 'type',
      HOST_AND_TYPE: 'host+type',
      TYPE_AND_HOST: 'type+host',
      NAME: 'name'
    },

    /**
     * List of available CDN parsers.
     * @private
     */
    _cdnConfigs: {},

    /**
     * This is a special case. The BalancerCdnParser is a custom CDN definition
     * that tries to get the CDN name directly from one of the headers. This method can be used
     * as a shortcut to creating a new CDN definition.
     *
     * This is usually used with DNS-based load balance services, such as Cedexis.
     *
     * Youboralib will use this method by itself using the configuration passed in the
     * {@link Options}.
     *
     * @param {string} cdnNameHeader the header response name where to get the CDN name from.
     */
    setBalancerHeaderName: function (name) {
      CdnParser._cdnConfigs.Balancer.parsers[0].headerName = name
    },

    /**
     * Create one of the pre-defined CDN parsers. This method will be called with the keys passed
     * to {@link Options#'parse.CdnNode.list'}.
     *
     * Before using this method, configs must be added first using {@link CdnParser.add}.
     *
     * @param {string} cdnName Name of the CDN
     * @return {CdnParser} An instance or undefined if the names does not match any CDN.
     */
    create: function (key) {
      if (CdnParser._cdnConfigs[key]) {
        return new CdnParser(CdnParser._cdnConfigs[key])
      } else {
        Log.warn('Tried to create an unexisting CdnParser named ' + key)
      }
    },

    /**
     * Adds the given CdnParser's config to the available list. Objects sent must comply with
     * CdnParser constructor.
     *
     * @param {string} key The name that will identify the CDN.
     * @param {Object} config The parser that defines the CDN.
     */
    add: function (key, config) {
      CdnParser._cdnConfigs[key] = config
    }
  }
)

// Adding built-in parsers
CdnParser.add('Level3', __webpack_require__(35))
CdnParser.add('Cloudfront', __webpack_require__(36))
CdnParser.add('Akamai', __webpack_require__(37))
CdnParser.add('Highwinds', __webpack_require__(38))
CdnParser.add('Fastly', __webpack_require__(39))
CdnParser.add('Balancer', __webpack_require__(40))

module.exports = CdnParser


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)
var Log = __webpack_require__(0)
var Util = __webpack_require__(2)
var YBRequest = __webpack_require__(5)

var LocationheaderParser = Emitter.extend(
  /** @lends youbora.LocationheaderParser.prototype */
  {

    constructor: function () {
      this._realResource = null
    },

    /**
     * Emits DONE event
     */
    done: function () {
      this.emit(LocationheaderParser.Event.DONE)
    },

    /**
     * Parses given header to check.
     */
    parse: function (url) {
      var request = new YBRequest(url, null, null, {
        method: 'HEAD',
        maxRetries: 0,
        requestHeaders: {},
        // cache: true
      })

      request.on(YBRequest.Event.SUCCESS, function (resp) {
        this._response = resp.getXHR().getAllResponseHeaders()
        this._parseResponse(this._response)
      }.bind(this))

      request.on(YBRequest.Event.ERROR, function (resp) {
        this.done()
      }.bind(this))

      request.send()
    },

    _parseResponse: function (headers) {
      headers.split('\n').forEach(function (line) {
        if (line.startsWith('Location:')) {
          this._realResource = line.slice(10)
        }
      }.bind(this))
      this.done()
    },

    /**
   * Get the parsed resource. Will be null/undefined if parsing is not yet started
   *
   * @return {string} The parsed resource.
   */
    getResource: function () {
      return this._realResource
    }
  },

  /** @lends youbora.CdnParser */
  {
    // Static members

    /**
     * List of events that could be fired from this class.
     *
     * @enum
     */
    Event: {
      /** Notifies that this CdnParser is done processing. */
      DONE: 'done'
    },
  }
)

module.exports = LocationheaderParser


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)

var Options = YouboraObject.extend(
  /** @lends youbora.Options.prototype */
  {
    /**
     * This Class store youbora configuration settings.
     * Any value specified in this class, if set, will override the info the plugin is able to get
     * on its own.
     *
     * @constructs Options
     * @param {Object|Options} [options] A literal containing values.
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function (options) {
      /** @prop {boolean} [enabled=true] If false, the plugin won't send NQS requests. */
      this['enabled'] = true

      /**
       * @prop {boolean} [httpSecure=null]
       * Define the security of NQS calls.
       * If true it will use 'https://',
       * if false it will use 'http://',
       * if null/undefined it will use '//'.
       */
      this['httpSecure'] = null

      /** @prop {string} [host='nqs.nice264.com'] Host of the Fastdata service. */
      this['host'] = 'nqs.nice264.com'

      /**
       * @prop {string} [accountCode='nicetest']
       * NicePeopleAtWork account code that indicates the customer account.
       */
      this['accountCode'] = 'nicetest'

      /** @prop {string} [username] User ID value inside your system. */
      this['username'] = null

      /**
       *  @prop {boolean} [obfuscateIp=false]
       * If true, the view will have the IP obfuscated
       */
      this['obfuscateIp'] = false

      /** @prop {string} [userType] User type. */
      this['userType'] = null

      /** @prop {string} [referer] Site url.
       *  By default window.location.href */
      this['referer'] = null

      /**
       * @prop {array<string>} [experiments]
       * Experiment id list
       */
      this['experiments'] = []

      // PARSERS

      /**
       * @prop {boolean} [parse.Hls=false]
       * If true the plugin will parse HLS files to use the first .ts file found as resource.
       * It might slow performance down.
       */
      this['parse.hls'] = false

      /**
       * @prop {string} [parse.CdnNameHeader]
       * If defined, resource parse will try to fetch the CDN code from the custom header defined
       * by this property. ie: 'x-cdn-forward'
       */
      this['parse.cdnNameHeader'] = 'x-cdn-forward'

      /**
       * @prop {boolean} [parse.CdnNode=false]
       * If true the plugin will query the CDN to retrieve the node name.
       * It might slow performance down.
       */
      this['parse.cdnNode'] = false

      /**
       * @prop {array<string>} [parse.CdnNode.list=false]
       * If true the plugin will query the CDN to retrieve the node name.
       * It might slow performance down.
       */
      this['parse.cdnNode.list'] = ['Akamai', 'Cloudfront', 'Level3', 'Fastly', 'Highwinds']

      /**
       * @prop {boolean} [parse.CdnNode=false]
       * If true the plugin will look for location value in manifest header to retrieve the actual resource
       * It might slow performance down.
       */
      this['parse.locationHeader'] = false

      // NETWORK

      /** @prop {string} [network.ip] IP of the viewer/user. ie= '100.100.100.100'. */
      this['network.ip'] = null

      /** @prop {string} [network.isp] Name of the internet service provider of the viewer/user. */
      this['network.isp'] = null

      /**
       * @prop {string} [network.connectionType]
       * See a list of codes in {@link http://mapi.youbora.com:8081/connectionTypes}
       */
      this['network.connectionType'] = null

      // DEVICE

      /**
       * @prop {string} [device.code]
       * Youbora's device code. If specified it will rewrite info gotten from user agent.
       * See a list of codes in {@link http://mapi.youbora.com:8081/devices}
       */
      this['device.code'] = null

      // CONTENT

      /** @prop {string} [content.transactionCode] Custom unique code to identify the view. */
      this['content.transactionCode'] = null

      /** @prop {string} [content.resource] URL/path of the current media resource. */
      this['content.resource'] = null

      /** @prop {boolean} [content.isLive] True if the content is live false if VOD. */
      this['content.isLive'] = null

      /** @prop {boolean} [content.isLive.noSeek] True if the player seeks automatically when resumed or ending buffer. Only for live content */
      this['content.isLive.noSeek'] = false

      /** @prop {string} [content.title] Title of the media. */
      this['content.title'] = null

      /** @prop {string} [content.title2] Secondary title of the media. */
      this['content.title2'] = null

      /** @prop {number} [content.duration] Duration of the media. */
      this['content.duration'] = null

      /** @prop {int} [content.fps] Frames per second of the content in the current moment. */
      this['content.fps'] = null

      /** @prop {int} [content.bitrate] Bitrate of the content in bits per second. */
      this['content.bitrate'] = null

      /** @prop {int} [content.throughput] Throughput of the client bandwith in bits per second. */
      this['content.throughput'] = null

      /** @prop {string} [content.rendition] Name of the current rendition of the content. */
      this['content.rendition'] = null

      /**
       * @prop {string} [content.cdn]
       * Codename of the CDN where the content is streaming from.
       * See a list of codes in {@link http://mapi.youbora.com:8081/cdns}
       * */
      this['content.cdn'] = null

      /** @prop {string} [content.cdnNode] CDN node id */
      this['content.cdnNode'] = null

      /** @prop {int} [content.cdnType] CDN node type
       * TCP_HIT / HIT: 1
       * TCP_MISS / MISS: 2
       * TCP_MEM_HIT: 3
       * TCP_IMS_HIT: 4
       */
      this['content.cdnType'] = null

      /**
       * @prop {object} [content.metadata]
       * Item containing mixed extra information about the content like: director, parental rating,
       * device info or the audio channels.This object may store any serializable key:value info.
       */
      this['content.metadata'] = {}

      /** @prop {string} [content.streamingProtocol] Name of the streaming media protocol.
       * Can be:
       *   - HDS	(Adobe HDS)
       *   - HLS	(Apple HLS)
       *   - MSS	(Microsoft Smooth Streaming)
       *   - DASH	(MPEG-DASH)
       *   - RTMP	(Adobe RTMP)
       *   - RTP	(RTP)
       *   - RTSP	(RTSP)
       */
      this['content.streamingProtocol'] = null

      // ADS

      /**
       * @prop {object} [ad.metadata]
       * Item containing mixed extra information about ads like: request url.
       * This object may store any serializable key:value info.
       */
      this['ad.metadata'] = {}

      /**
       * @prop {string} [ad.campaign]
       * String containing the name of the campaign
       */
      this['ad.campaign'] = null

      /**
       * @prop {string} [ad.resource]
       * String containing the ad resource
       */
      this['ad.resource'] = null

      /**
       * @prop {string} [ad.title]
       * String containing the title of the campaign
       */
      this['ad.title'] = null

      /**
       * @prop {boolean} [ad.ignore]
       * False by default.
       * If true, youbora blocks ad events and calculates jointime ignoring ad time.
       */
      this['ad.ignore'] = false

      /**
       * @prop {int} [ad.afterStop]
       * 0 by default.
       * Set to integer positive value indicating how many ads
       * will be shown as post-rolls if they do it after content player triggers stop event.
       * Set to -1 to block automatic fireStop, manual call required.
       * Manual call using fireStop({end: true})
       */
      this['ad.afterStop'] = 0

      // BACKGROUND

      /**
       *  @prop {boolean} [background.enabled=false]
       * If true, plugin will send background/foreground events
       * Different device behaviour is settable in background.settings
       */
      this['background.enabled'] = true

      /**
       *  @prop {string} [background.settings]
       * Action to do when the browser goes to background.
       * Options are 'stop', 'pause', and '' for no action.
       * stop will be used to stop the view and track post-foreground events in a new view
       * pause will be used when after foreground event, an action like pressing play button is expected to resume the content
       * '' will be used if the content can be played in background
       * If not defined, specific device options will be used
       * background.setings.android / background.settings.iphone / background.settings.desktop / background.settings.tv
       * Default specific device values are stop for android and iphone, nothing for desktop.
       */
      this['background.settings'] = null

      /**
       *  @prop {string} [background.settings.android='stop']
       * If background.settings is not defined, action to do when the browser goes to background if
       * the device is android type.
       * Options are 'stop', 'pause', and '' or not defined for no action.
       * bg by default
       */
      this['background.settings.android'] = 'stop'

      /**
       *  @prop {string} [background.settings.iphone='stop']
       * If background.settings is not defined, action to do when the browser goes to background if
       * the device is iphone type.
       * Options are 'stop', 'pause', and '' or not defined for no action.
       * bg by default
       */
      this['background.settings.iphone'] = 'stop'

      /**
       *  @prop {string} [background.settings.desktop=null]
       * If background.settings is not defined, action to do when the browser goes to background if
       * the device is desktop type.
       * Options are 'stop', 'pause', and '' or not defined for no action.
       * Null by default
       */
      this['background.settings.desktop'] = null

      /**
       *  @prop {string} [background.settings.tv='stop']
       * If background.settings is not defined, action to do when the browser goes to background if
       * the device is smartTV type.
       * Options are 'stop', 'pause', and '' or not defined for no action.
       * bg by default
       */
      this['background.settings.tv'] = 'stop'

      // EXTRAPARAMS

      /** @prop {string} [extraparam.1] Custom parameter 1. */
      this['extraparam.1'] = null

      /** @prop {string} [extraparam.2] Custom parameter 2. */
      this['extraparam.2'] = null

      /** @prop {string} [extraparam.3] Custom parameter 3. */
      this['extraparam.3'] = null

      /** @prop {string} [extraparam.4] Custom parameter 4. */
      this['extraparam.4'] = null

      /** @prop {string} [extraparam.5] Custom parameter 5. */
      this['extraparam.5'] = null

      /** @prop {string} [extraparam.6] Custom parameter 6. */
      this['extraparam.6'] = null

      /** @prop {string} [extraparam.7] Custom parameter 7. */
      this['extraparam.7'] = null

      /** @prop {string} [extraparam.8] Custom parameter 8. */
      this['extraparam.8'] = null

      /** @prop {string} [extraparam.9] Custom parameter 9. */
      this['extraparam.9'] = null

      /** @prop {string} [extraparam.10] Custom parameter 10. */
      this['extraparam.10'] = null

      /** @prop {string} [extraparam.11] Custom parameter 11. */
      this['extraparam.11'] = null

      /** @prop {string} [extraparam.12] Custom parameter 12. */
      this['extraparam.12'] = null

      /** @prop {string} [extraparam.13] Custom parameter 13. */
      this['extraparam.13'] = null

      /** @prop {string} [extraparam.14] Custom parameter 14. */
      this['extraparam.14'] = null

      /** @prop {string} [extraparam.15] Custom parameter 15. */
      this['extraparam.15'] = null

      /** @prop {string} [extraparam.16] Custom parameter 16. */
      this['extraparam.16'] = null

      /** @prop {string} [extraparam.17] Custom parameter 17. */
      this['extraparam.17'] = null

      /** @prop {string} [extraparam.18] Custom parameter 18. */
      this['extraparam.18'] = null

      /** @prop {string} [extraparam.19] Custom parameter 19. */
      this['extraparam.19'] = null

      /** @prop {string} [extraparam.20] Custom parameter 20. */
      this['extraparam.20'] = null

      /** @prop {string} [ad.extraparam.1] Ad custom parameter 1. */
      this['ad.extraparam.1'] = null

      /** @prop {string} [ad.extraparam.2] Ad custom parameter 2. */
      this['ad.extraparam.2'] = null

      /** @prop {string} [ad.extraparam.3] Ad custom parameter 3. */
      this['ad.extraparam.3'] = null

      /** @prop {string} [ad.extraparam.4] Ad custom parameter 4. */
      this['ad.extraparam.4'] = null

      /** @prop {string} [ad.extraparam.5] Ad custom parameter 5. */
      this['ad.extraparam.5'] = null

      /** @prop {string} [ad.extraparam.6] Ad custom parameter 6. */
      this['ad.extraparam.6'] = null

      /** @prop {string} [ad.extraparam.7] Ad custom parameter 7. */
      this['ad.extraparam.7'] = null

      /** @prop {string} [ad.extraparam.8] Ad custom parameter 8. */
      this['ad.extraparam.8'] = null

      /** @prop {string} [ad.extraparam.9] Ad custom parameter 9. */
      this['ad.extraparam.9'] = null

      /** @prop {string} [ad.extraparam.10] Ad custom parameter 10. */
      this['ad.extraparam.10'] = null

      /** @prop {number} [session.expire=21600000] Time until infinity session expires in ms. */
      this['session.expire'] = 21600000

      this.setOptions(options)
    },

    /**
     * Recursively sets the properties present in the params object.
     * ie: this.username = params.username.
     *
     * @param {Object} options A literal or another Data containing values.
     * @param {Object} [base=this] Start point for recursion.
     */
    setOptions: function (options, base) {
      base = base || this
      if (typeof options !== 'undefined') {
        for (var key in options) {
          if (typeof base[key] === 'object' && base[key] !== null) {
            this.setOptions(options[key], base[key])
          } else {
            base[key] = options[key]
          }
        }
      }
    }
  }
)

module.exports = Options


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Log = __webpack_require__(0)

var prefix = 'youbora'

/**
 * This class manages data sotrage in the browser memory.
 *
 * @extends youbora.Emitter
 * @memberof youbora
 */
var YouboraStorage = YouboraObject.extend(
  /** @lends youbora.YouboraStorage.prototype */
  {
    /**
     * Saves in localStorage or equivalent
     *
     * @param {string} key Key of the value. 'youbora.' will be appended.
     * @param {string} value Value.
     */
    setLocal: function (key, value) {
      try {
        if (!localStorage) {
          Log.error('Youbora Infinity needs localStorage which is not supported by your browser.')
          // TO-DO: develop alternative based on cookies
        } else {
          return localStorage.setItem('youbora.' + key, value)
        }
      }
      catch (err) {
        Log.error('Youbora Infinity needs localStorage which is not supported by your browser.')
      }
      return null
    },

    /**
     * Reads from localStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     */
    getLocal: function (key) {
      try {
        if (!localStorage) {
          Log.error('Youbora Infinity needs localStorage which is not supported by your browser.')
          // TO-DO: develop alternative based on cookies
        } else {
          return localStorage.getItem(prefix + '.' + key)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs localStorage which is not supported by your browser.')
      }
      return null
    },

    /**
     * Saves in sessionStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     * @param {string} value Value.
     */
    setSession: function (key, value) {
      try {
        if (!sessionStorage) {
          Log.error('Youbora Infinity needs sessionStorage which is not supported by your browser.')
          // TO-DO: develop alternative based on cookies
        } else {
          return sessionStorage.setItem(prefix + '.' + key, value)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs sessionStorage which is not supported by your browser.')
      }
      return null
    },

    /**
     * Reads from sessionStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     */
    getSession: function (key) {

      try {
        if (!sessionStorage) {
          Log.error('Youbora Infinity needs sessionStorage which is not supported by your browser.')
          // TO-DO: develop alternative based on cookies
        } else {
          return sessionStorage.getItem(prefix + '.' + key)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs sessionStorage which is not supported by your browser.')
      }
      return null
    }
  }
)

module.exports = YouboraStorage


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Log = __webpack_require__(0)

var startParams = [
  'accountCode',
  'username',
  'rendition',
  'player',
  'title',
  'title2',
  'live',
  'mediaDuration',
  'mediaResource',
  'transactionCode',
  'properties',
  'cdn',
  'playerVersion',
  'param1',
  'param2',
  'param3',
  'param4',
  'param5',
  'param6',
  'param7',
  'param8',
  'param9',
  'param10',
  'param11',
  'param12',
  'param13',
  'param14',
  'param15',
  'param16',
  'param17',
  'param18',
  'param19',
  'param20',
  'obfuscateIp',
  'p2pEnabled',
  'pluginVersion',
  'pluginInfo',
  'isp',
  'connectionType',
  'ip',
  'deviceCode',
  'preloadDuration',
  'referer',
  'userType',
  'streamingProtocol',
  'householdId',
  'experiments'
]

var adStartParams = [
  'playhead',
  'adTitle',
  'adPosition',
  'adDuration',
  'adCampaign',
  'adResource',
  'adPlayerVersion',
  'adProperties',
  'adAdapterVersion',
  'extraparam1',
  'extraparam2',
  'extraparam3',
  'extraparam4',
  'extraparam5',
  'extraparam6',
  'extraparam7',
  'extraparam8',
  'extraparam9',
  'extraparam10'
]

var RequestBuilder = YouboraObject.extend(
  /** @lends youbora.RequestBuilder.prototype */
  {
    /**
     * This class helps building params associated with each event: /start, /joinTime...
     *
     * @constructs RequestBuilder
     * @extends youbora.YouboraObject
     * @memberof youbora
     *
     * @param {Plugin} plugin A Plugin instance
     */
    constructor: function (plugin) {
      this._plugin = plugin
      this._adNumber = 0

      /** Stores a list of the last params fetched */
      this.lastSent = {}
    },

    /**
     * Adds to params all the entities specified in paramList, unless they are already set.
     *
     * @param {Object} params Object of params key:value.
     * @param {Array.string} paramList A list of params to fetch.
     * @param {bool} onlyDifferent If true, only fetches params that have changed
     */
    fetchParams: function (params, paramList, onlyDifferent) {
      params = params || {}
      paramList = paramList || []
      for (var i = 0; i < paramList.length; i++) {
        var param = paramList[i]

        if (params[param]) { continue }
        var getterName = RequestBuilder.getters[param]

        if (this._plugin[getterName]) {
          var value = this._plugin[getterName]()
          if (value !== null && (!onlyDifferent || this.lastSent[param] !== value)) {
            params[param] = value
            this.lastSent[param] = value
          }
        } else {
          Log.warn('Trying to call undefined getter ' + param + ':' + getterName)
        }
      }

      return params
    },

    /**
     * Adds to params object all the entities specified in paramList, unless they are already set.
     *
     * @param {Object} params Object of params key:value.
     * @param {string} service The name of the service. Use {@link Plugin.Service} enum.
     */
    buildParams: function (params, service) {
      params = params || {}
      this.fetchParams(params, RequestBuilder.params[service], false)
      this.fetchParams(params, RequestBuilder.differentParams[service], true)
      return params
    },

    /**
     * Creates an adnumber if it does not exist and stores it in lastSent. If it already exists,
     * it is incremented by 1.
     *
     * @returns {number} adNumber
     */
    getNewAdNumber: function () {
      var adNumber = this.lastSent.adNumber
      if (adNumber && this.lastSent.adPosition === this._plugin.getAdPosition()) {
        adNumber += 1
      } else {
        adNumber = 1
      }
      this.lastSent.adNumber = adNumber
      return adNumber
    },

    /**
     * Return changed entities since last check
     *
     * @returns {Object} params
     */
    getChangedEntities: function () {
      return this.fetchParams({}, RequestBuilder.differentParams['entities'], true)
    }
  },
  /** @lends youbora.RequestBuilder */
  {
    // Static Members

    /** List of params used by each service */
    params: {
      '/data': ['system', 'pluginVersion', 'requestNumber'],

      '/init': startParams,
      '/start': startParams,
      '/joinTime': ['joinDuration', 'playhead', 'mediaDuration'],
      '/pause': ['playhead'],
      '/resume': ['pauseDuration', 'playhead'],
      '/seek': ['seekDuration', 'playhead'],
      '/bufferUnderrun': ['bufferDuration', 'playhead'],
      '/error': ['player'].concat(startParams),
      '/stop': ['bitrate', 'playhead', 'pauseDuration'],

      '/adInit': adStartParams,
      '/adStart': adStartParams,
      '/adJoin': ['playhead', 'adPosition', 'adJoinDuration', 'adPlayhead'],
      '/adPause': ['playhead', 'adPosition', 'adPlayhead'],
      '/adResume': ['playhead', 'adPosition', 'adPlayhead', 'adPauseDuration'],
      '/adBufferUnderrun': ['playhead', 'adPosition', 'adPlayhead', 'adBufferDuration'],
      '/adStop': ['playhead', 'adPosition', 'adPlayhead', 'adBitrate', 'adTotalDuration', 'pauseDuration'],
      '/adClick': ['playhead', 'adPosition', 'adPlayhead'],
      '/adError': adStartParams,
      '/adBlocked': adStartParams,
      '/ping': ['droppedFrames', 'playrate', 'cdnDownloadedTraffic', 'p2pDownloadedTraffic', 'uploadTraffic', 'latency', 'packetLoss', 'packetSent'],

      '/infinity/session/start': [
        'accountCode',
        'username',
        'navContext',
        'route',
        'page'
      ],
      '/infinity/session/stop': [],
      '/infinity/session/nav': ['navContext', 'username', 'route', 'page'],
      '/infinity/session/beat': [],
      '/infinity/event': ['accountCode']
    },

    /** List of params used by each service (only if they are different) */
    differentParams: {
      '/join': [
        'title',
        'title2',
        'live',
        'mediaDuration',
        'mediaResource'
      ],
      '/adJoin': ['adTitle', 'adDuration', 'adResource'],
      'entities': [
        'rendition',
        'title',
        'title2',
        'live',
        'param1',
        'param2',
        'param3',
        'param4',
        'param5',
        'param6',
        'param7',
        'param8',
        'param9',
        'param10',
        'param11',
        'param12',
        'param13',
        'param14',
        'param15',
        'param16',
        'param17',
        'param18',
        'param19',
        'param20',
        'connectionType',
        'deviceCode',
        'ip',
        'username',
        'cdn',
        'nodeHost',
        'nodeType',
        'nodeTypeString'
      ]
    },

    /** List of params and its related getter */
    getters: {
      requestNumber: 'getRequestNumber',
      playhead: 'getPlayhead',
      playrate: 'getPlayrate',
      fps: 'getFramesPerSecond',
      droppedFrames: 'getDroppedFrames',
      mediaDuration: 'getDuration',
      bitrate: 'getBitrate',
      throughput: 'getThroughput',
      rendition: 'getRendition',
      title: 'getTitle',
      title2: 'getTitle2',
      live: 'getIsLive',
      mediaResource: 'getResource',
      transactionCode: 'getTransactionCode',
      properties: 'getMetadata',
      playerVersion: 'getPlayerVersion',
      player: 'getPlayerName',
      cdn: 'getCdn',
      pluginVersion: 'getPluginVersion',
      userType: 'getUserType',
      streamingProtocol: 'getStreamingProtocol',
      obfuscateIp: 'getObfuscateIp',
      householdId: 'getHouseholdId',
      latency: 'getLatency',
      packetLoss: 'getPacketLoss',
      packetSent: 'getPacketSent',

      param1: 'getExtraparam1',
      param2: 'getExtraparam2',
      param3: 'getExtraparam3',
      param4: 'getExtraparam4',
      param5: 'getExtraparam5',
      param6: 'getExtraparam6',
      param7: 'getExtraparam7',
      param8: 'getExtraparam8',
      param9: 'getExtraparam9',
      param10: 'getExtraparam10',
      param11: 'getExtraparam11',
      param12: 'getExtraparam12',
      param13: 'getExtraparam13',
      param14: 'getExtraparam14',
      param15: 'getExtraparam15',
      param16: 'getExtraparam16',
      param17: 'getExtraparam17',
      param18: 'getExtraparam18',
      param19: 'getExtraparam19',
      param20: 'getExtraparam20',

      extraparam1: 'getAdExtraparam1',
      extraparam2: 'getAdExtraparam2',
      extraparam3: 'getAdExtraparam3',
      extraparam4: 'getAdExtraparam4',
      extraparam5: 'getAdExtraparam5',
      extraparam6: 'getAdExtraparam6',
      extraparam7: 'getAdExtraparam7',
      extraparam8: 'getAdExtraparam8',
      extraparam9: 'getAdExtraparam9',
      extraparam10: 'getAdExtraparam10',

      adPosition: 'getAdPosition',
      adPlayhead: 'getAdPlayhead',
      adDuration: 'getAdDuration',
      adCampaign: 'getAdCampaign',
      adBitrate: 'getAdBitrate',
      adTitle: 'getAdTitle',
      adResource: 'getAdResource',
      adPlayerVersion: 'getAdPlayerVersion',
      adProperties: 'getAdMetadata',
      adAdapterVersion: 'getAdAdapterVersion',

      pluginInfo: 'getPluginInfo',

      isp: 'getIsp',
      connectionType: 'getConnectionType',
      ip: 'getIp',

      deviceCode: 'getDeviceCode',

      system: 'getAccountCode',
      accountCode: 'getAccountCode',
      username: 'getUsername',

      preloadDuration: 'getPreloadDuration',

      joinDuration: 'getJoinDuration',
      bufferDuration: 'getBufferDuration',
      seekDuration: 'getSeekDuration',
      pauseDuration: 'getPauseDuration',

      adJoinDuration: 'getAdJoinDuration',
      adBufferDuration: 'getAdBufferDuration',
      adPauseDuration: 'getAdPauseDuration',
      adTotalDuration: 'getAdTotalDuration',

      referer: 'getReferer',

      nodeHost: 'getNodeHost',
      nodeType: 'getNodeType',
      nodeTypeString: 'getNodeTypeString',

      route: 'getReferer',
      sessionId: 'getSessionId',
      navContext: 'getContext',
      page: 'getPageName',

      cdnDownloadedTraffic: 'getCdnTraffic',
      p2pDownloadedTraffic: 'getP2PTraffic',
      p2pEnabled: 'getIsP2PEnabled',
      uploadTraffic: 'getUploadTraffic',

      experiments: 'getExperiments'
    }

  }
)

module.exports = RequestBuilder


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
/**
 * This static class provides device detection methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var BackgroundDetector = YouboraObject.extend({
  constructor: function (plugin) {
    this.plugin = plugin
    this.isInBackground = false
    this.listenerReference = this._visibilityListener.bind(this)
    this._reset()
  },

  startDetection: function (windowRef) {
    if (!this.isBackgroundDetectorStarted) {
      if (windowRef) this.windowObject = windowRef
      if (this.windowObject && this.windowObject.document) {
        this.isBackgroundDetectorStarted = true
        this.windowObject.document.addEventListener("visibilitychange", this.listenerReference)
      }
    } else {
      if (windowRef != this.windowObject) {
        this.stopDetection()
        this.isBackgroundDetectorStarted = false
        this.startDetection(windowRef)
      }
    }
  },

  stopDetection: function () {
    if (this.isBackgroundDetectorStarted) {
      this.windowObject.document.removeEventListener("visibilitychange", this.listenerReference)
      this._reset()
    }
  },

  _reset: function () {
    this.isBackgroundDetectorStarted = false
    this.windowObject = typeof window !== 'undefined' ? window : undefined
  },

  _visibilityListener: function (e) {
    if (this.windowObject.document.visibilityState === 'hidden') { // to Background
      this.isInBackground = true
      var settings = this._getSettings()
      if (typeof settings === "string") {
        switch (settings) {
          case 'stop':
            this._fireStop()
            break
          case 'pause':
            this._firePause()
            break
        }
      }
    } else if (this.windowObject.document.visibilityState === 'visible') { // to Foreground
      this.isInBackground = false
      // nothing yet
    }
  },

  _getSettings: function () {
    if (typeof this.plugin.options['background.settings'] === "string" && this.plugin.options['background.settings']) {
      return this.plugin.options['background.settings']
    }
    if (this.plugin.deviceDetector.isSmartTV()) {
      return this.plugin.options['background.settings.tv']
    }
    if (this.plugin.deviceDetector.isDesktop()) {
      return this.plugin.options['background.settings.desktop']
    }
    if (this.plugin.deviceDetector.isAndroid()) {
      return this.plugin.options['background.settings.android']
    }
    if (this.plugin.deviceDetector.isIphone()) {
      return this.plugin.options['background.settings.iphone']
    }
  },

  _firePause: function () {
    this.adsAdapter = this.plugin.getAdsAdapter()
    this.contentAdapter = this.plugin.getAdapter()
    if (this.adsAdapter && this.adsAdapter.flags.isStarted && !this.adsAdapter.flags.isEnded) {
      this.adsAdapter.firePause()
    } else if (this.contentAdapter && this.contentAdapter.flags.isStarted && !this.contentAdapter.flags.isEnded) {
      this.contentAdapter.firePause()
    }
  },

  _fireStop: function () {
    this.adsAdapter = this.plugin.getAdsAdapter()
    this.contentAdapter = this.plugin.getAdapter()
    if (this.adsAdapter && this.adsAdapter.flags.isStarted && !this.adsAdapter.flags.isEnded) {
      this.adsAdapter.fireStop()
    }
    if (this.contentAdapter) {
      this.contentAdapter.fireStop({ end: true })
    } else {
      this.plugin.fireStop({ end: true })
    }
  },

  canBlockStartCalls: function () {
    return (
      this.plugin.backgroundDetector.isInBackground &&
      this.plugin.options['background.enabled'] === true &&
      this.plugin.backgroundDetector._getSettings() // it is stop or pause
    )
  }
})

module.exports = BackgroundDetector


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
/**
 * This static class provides device detection methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var DeviceDetector = YouboraObject.extend({
  constructor: function () {
    if (typeof navigator !== 'undefined' && navigator.userAgent) {
      this._isSmartTV = navigator.userAgent.toLowerCase().match(/smarttv/) ||
        navigator.userAgent.toLowerCase().match(/smart-tv/) ||
        navigator.userAgent.toLowerCase().match(/appletv/) ||
        navigator.userAgent.toLowerCase().match(/apple tv/)
      this._isIphoneDevice = navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null
      this._isAndroidDevice = navigator.userAgent.match(/Android/) !== null
      this._isSmartphoneDevice = !this._isSmartTV && (this._isIphoneDevice || this._isAndroidDevice)
      this._isDesktopDevice = !this._isSmartphoneDevice && !this._isSmartTV
    }
  },

  isIphone: function () {
    return this._isIphoneDevice
  },

  isAndroid: function () {
    return this._isAndroidDevice
  },

  isSmartphone: function () {
    return this._isSmartphoneDevice
  },

  isDesktop: function () {
    return this._isDesktopDevice
  },

  isSmartTV: function () {
    return this._isSmartTV
  }
})

module.exports = DeviceDetector


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Timer = __webpack_require__(12)
var Chrono = __webpack_require__(7)

var PlayheadMonitor = YouboraObject.extend(
  /** @lends youbora.PlayheadMonitor.prototype */
  {
    /**
     * This class periodically checks the player's playhead in order to infer buffer and/or seek
     * events.
     *
     * Instances of this class are bounded to an {@link Adapter} and fires its buffer and seek
     * start and end methods.
     *
     * In order to use this feature, {@link Adapter#monitorPlayhead} should be used.
     *
     * @constructs PlayheadMonitor
     * @extends youbora.YouboraObject
     * @memberof youbora
     *
     * @param {Adapter} adapter Adapter to monitor. Must have getPlayhead defined.
     * @param {PlayheadMonitor.Type} [type=NONE]
     * Which metric to monitor seek and/or buffer.
     * Use bitwise operators to join both values (Type.BUFFER | Type.SEEK)
     * @param {int} [interval=800] How many ms will wait between progress. -1 to disable.
     */
    constructor: function (adapter, type, interval) {
      this._adapter = adapter
      this._seekEnabled = type & PlayheadMonitor.Type.SEEK
      this._bufferEnabled = type & PlayheadMonitor.Type.BUFFER
      interval = interval || 800

      this._chrono = new Chrono()
      this._lastPlayhead = 0

      if (interval > 0) {
        this._timer = new Timer(this.progress.bind(this), interval)
      }
    },

    /**
     * Start interval checks.
     */
    start: function () {
      this._timer.start()
    },

    /**
     * Stop interval checks.
     */
    stop: function () {
      if (this._timer) this._timer.stop()
    },

    skipNextTick: function () {
      this._lastPlayhead = 0
    },

    /**
     * Call this method at every tick of timeupdate/progress.
     * If you defined an interval, do not fire this method manually.
     */
    progress: function () {
      // Reset timer
      var deltaTime = this._chrono.stop()
      this._chrono.start()

      // Define thresholds
      var bufferThreshold = deltaTime * PlayheadMonitor.kBUFFER_THRESHOLD_RATIO
      var seekThreshold = deltaTime * PlayheadMonitor.kSEEK_THRESHOLD_RATIO

      if (this._adapter.getPlayrate && this._adapter.getPlayrate() && this._adapter.getPlayrate() != 1) {
        bufferThreshold *= this._adapter.getPlayrate()
        seekThreshold *= this._adapter.getPlayrate()
      }

      // Calculate diff playhead
      var currentPlayhead = this._getPlayhead()
      var diffPlayhead = Math.abs(this._lastPlayhead - currentPlayhead) * 1000

      // youbora.Log.debug('curr: ' + currentPlayhead + ' last: ' + this._lastPlayhead + ' diff: ' + diffPlayhead)

      if (diffPlayhead < bufferThreshold) {
        // Playhead is stalling > buffer
        if (this._bufferEnabled &&
          this._lastPlayhead > 0 &&
          !this._adapter.flags.isPaused &&
          !this._adapter.flags.isSeeking
        ) {
          this._adapter.fireBufferBegin(null, false)
        }
      } else if (diffPlayhead > seekThreshold) {
        // Playhead has jumped > seek
        if (this._seekEnabled && this._lastPlayhead > 0) {
          this._adapter.fireSeekBegin(null, false)
        }
      } else {
        // Healthy
        if (this._seekEnabled) {
          this._adapter.fireSeekEnd()
        }
        if (this._bufferEnabled) {
          this._adapter.fireBufferEnd()
        }
      }

      // Update Playhead
      this._lastPlayhead = currentPlayhead
    },
    /**
     * Returns adapter's playhead. Override to add a custom playhead getter.
     * @private
     * @returns {double} Playhead in seconds
     */
    _getPlayhead: function () {
      return this._adapter.getPlayhead()
    }
  },
  /** @lends youbora.PlayheadMonitor */
  {
    // Static methods

    /**
     * Enum for monitoring type
     * @enum
     */
    Type: {
      /** Would not monitor */
      NONE: 0,
      /** Sends buffer-begin/end */
      BUFFER: 1,
      /** Sends seek-begin/end */
      SEEK: 2
    },

    /** Buffer threshold */
    kBUFFER_THRESHOLD_RATIO: 0.5,

    /** Seek threshold */
    kSEEK_THRESHOLD_RATIO: 2
  })

module.exports = PlayheadMonitor


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = exports.VERSION = undefined;

var _playkitJs = __webpack_require__(9);

var _youbora = __webpack_require__(30);

var _youbora2 = _interopRequireDefault(_youbora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _youbora2.default;
exports.VERSION = "0.3.3";
exports.NAME = "playkit-js-youbora";

/**
 * The plugin name.
 * @type {string}
 * @const
 */

var pluginName = "youbora";
/**
 * Register the plugin in player's registry.
 */
(0, _playkitJs.registerPlugin)(pluginName, _youbora2.default);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playkitJs = __webpack_require__(9);

var _youboralib = __webpack_require__(10);

var _youboralib2 = _interopRequireDefault(_youboralib);

var _adapter = __webpack_require__(54);

var _nativeads = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    _this._youbora = new _youboralib2.default.Plugin(_this.config.options);
    _this._youbora.setAdapter(new _adapter.YouboraAdapter(player, config));
    _this._youbora.setAdsAdapter(new _nativeads.NativeAdsAdapter(player));
    _this._addBindings();
    return _this;
  }

  /**
   * Updates the configuration of the plugin.
   * @param {Object} update - The updated configuration.
   * @override
   * @returns {void}
   */


  _createClass(Youbora, [{
    key: 'updateConfig',
    value: function updateConfig(update) {
      _get(Youbora.prototype.__proto__ || Object.getPrototypeOf(Youbora.prototype), 'updateConfig', this).call(this, update);
      this._youbora.setOptions(update.options);
      if (this._youbora.getAdapter()) {
        this._youbora.getAdapter().config = update;
      }
      this._addPlayerMetadata();
    }

    /**
     * Reset the plugin
     * @return {void}
     */

  }, {
    key: 'reset',
    value: function reset() {
      this._youbora.fireStop();
    }

    /**
     * Add the player metadata to the plugin config.
     * @function
     * @private
     * @returns {void}
     */

  }, {
    key: '_addPlayerMetadata',
    value: function _addPlayerMetadata() {
      this._youbora.setOptions({
        properties: {
          kalturaInfo: {
            entryId: this.config.entryId,
            sessionId: this.config.sessionId,
            uiConfId: this.config.uiConfId
          }
        }
      });
    }

    /**
     * Add the necessary bindings.
     * @function
     * @private
     * @returns {void}
     */

  }, {
    key: '_addBindings',
    value: function _addBindings() {
      // Bind the plugin logger to the youbora sdk logger
      this._youbora.getAdapter().bindLogger(this.logger);
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
      this._youbora.fireStop();
    }
  }]);

  return Youbora;
}(_playkitJs.BasePlugin);

Youbora.defaultConfig = {
  options: {}
};
exports.default = Youbora;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {"name":"youboralib","type":"lib","tech":"js","author":"Jordi Aguilar","version":"6.2.4","built":"2018-05-08","repo":"https://bitbucket.org/npaw/lib-plugin-js.git"}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

/* eslint no-extend-native: "off" */

/**
 * When executed, this function applies polyfills to the following functionalities:
 * Function.prototype.bind and
 * Array.prototype.forEach.
 *
 * @memberof youbora
 */
var applyPolyfills = function () {
  // Bind
  Function.prototype.bind = Function.prototype.bind || function (b) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
    }
    var a = Array.prototype.slice
    var f = a.call(arguments, 1)
    var e = this
    var C = function () { }
    var d = function () {
      return e.apply(this instanceof C ? this : b || window, f.concat(a.call(arguments)))
    }
    C.prototype = this.prototype
    d.prototype = new C()
    return d
  }

  // Foreach
  Array.prototype.forEach = Array.prototype.forEach || function (callback, thisArg) {
    if (typeof (callback) !== 'function') {
      throw new TypeError(callback + ' is not a function!')
    }
    var len = this.length
    for (var i = 0; i < len; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

module.exports = applyPolyfills


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var F = function () { }

/** See Object.create. */
module.exports = function (o) {
  if (arguments.length > 1) {
    throw Error('Second argument not supported')
  }
  if (o === null) {
    throw Error('Cannot set a null [[Prototype]]')
  }
  if (typeof o !== 'object') {
    throw TypeError('Argument must be an object')
  }
  F.prototype = o
  return new F()
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(6)
var Constants = __webpack_require__(3)

var Nqs6Transform = Transform.extend(
  /** @lends youbora.Nqs6Transform.prototype */
  {
    /**
     * This class ensures NQS6 backwards compatibility.
     * Deprecated since NQS6 clusters are essentialy gone.
     *
     * @deprecated
     * @constructs
     * @extends youbora.Transform
     * @memberof youbora
     */
    constructor: function () {
      this.done()
    },

    /**
     * Transform requests
     * @param {YBRequest} request YBRequest to transform.
     */
    parse: function (request) {
      this._cloneParam(request, 'accountCode', 'system')
      this._cloneParam(request, 'transactionCode', 'transcode')
      this._cloneParam(request, 'username', 'user')
      this._cloneParam(request, 'mediaResource', 'resource')
      this._cloneParam(request, 'msg', 'msg')

      if (request.service !== Constants.Service.JOIN) {
        this._cloneParam(request, 'playhead', 'time')
      }

      switch (request.service) {
        case Constants.Service.START:
          this._cloneParam(request, 'mediaDuration', 'duration')
          break

        case Constants.Service.JOIN:
          this._cloneParam(request, 'joinDuration', 'time')
          this._cloneParam(request, 'playhead', 'eventTime')
          break

        case Constants.Service.SEEK:
          this._cloneParam(request, 'seekDuration', 'duration')
          break

        case Constants.Service.BUFFER:
          this._cloneParam(request, 'bufferDuration', 'duration')
          break

        case Constants.Service.PING:
          for (var key in request.params.entities) {
            request.params.entityType = key
            request.params.entityValue = request.params.entities[key]
            break
          }
          break
      }
    },

    _cloneParam: function (request, from, to) {
      request.params[to] = request.params[from]
    }
  })

module.exports = Nqs6Transform


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'LEVEL3',
  parsers: [{
    element: 'host+type',
    headerName: 'X-WR-Diag',
    regex: /Host:(.+)\sType:(.+)/
  }],
  requestHeaders: {
    'X-WR-Diag': 'host'
  },
  parseType: function (type) {
    if (type) {
      if (
        type.indexOf('TCP_HIT') === 0 ||
        type.indexOf('TCP_MEM_HIT') === 0 ||
        type.indexOf('TCP_IMS_HIT') === 0
      ) {
        return 1
      } else if (type.indexOf('TCP_MISS') === 0) {
        return 2
      }
    }

    return 0
  }
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'CLOUDFRT',
  parsers: [{
    element: 'host',
    headerName: 'X-Amz-Cf-Id',
    regex: /(.+)/
  }, {
    element: 'type',
    headerName: 'X-Cache',
    regex: /(\S+)\s.+/
  }],
  parseType: function (type) {
    switch (type) {
      case 'Hit':
        return 1
      case 'Miss':
        return 2
      default:
        return 0
    }
  }
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'AKAMAI',
  parsers: [{
    element: 'type+host',
    headerName: 'X-Cache',
    regex: /(.+)\sfrom\s.+\(.+\/(.+)\).*/
  }],
  parseType: function (type) {
    switch (type) {
      case 'TCP_HIT':
        return 1
      case 'TCP_MISS':
        return 2
      default:
        return 0
    }
  }
}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'HIGHNEGR',
  parsers: [{
    element: 'host+type',
    headerName: 'X-HW',
    regex: /.+,[0-9]+\.(.+)\.(.+)/
  }],
  parseType: function (type) {
    switch (type) {
      case 'c':
      case 'x':
        return 1
      default:
        return 2
    }
  }
}


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'FASTLY',
  parsers: [{
    element: 'host',
    headerName: 'X-Served-By',
    regex: /([^,\s]+)$/
  }, {
    element: 'type',
    headerName: 'X-Cache',
    regex: /([^,\s]+)$/
  }],
  parseType: function (type) {
    switch (type) {
      case 'HIT':
        return 1
      case 'MISS':
        return 2
      default:
        return 0
    }
  }
}


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  parsers: [{
    element: 'name',
    headerName: null,
    regex: /(.+)/
  }]
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(4)
var Timer = __webpack_require__(12)
var Chrono = __webpack_require__(7)
var Constants = __webpack_require__(3)
var Util = __webpack_require__(2)

var YBRequest = __webpack_require__(5)
var Communication = __webpack_require__(13)
var FlowTransform = __webpack_require__(42)
var ViewTransform = __webpack_require__(18)
var ResourceTransform = __webpack_require__(19)

var Options = __webpack_require__(23)
var YouboraStorage = __webpack_require__(24)
var RequestBuilder = __webpack_require__(25)

var YouboraInfinity = __webpack_require__(14)

var BackgroundDetector = __webpack_require__(26)
var DeviceDetector = __webpack_require__(27)

var Plugin = Emitter.extend(
  /** @lends youbora.Plugin.prototype */
  {
    /**
     * This is the main class of video analytics. You may want to have one instance for each video
     * you want to track. Will need {@link Adapter}s for both content and ads.
     *
     * @constructs Plugin
     * @extends youbora.Emitter
     * @memberof youbora
     *
     * @param {Options} [options] An object complying with {@link Options} constructor.
     * @param {Adapter} [adapter] If an adapter is provided, setAdapter will be immediately called.
     */
    constructor: function (options, adapter) {
      /** Instance of youbora infinity. */
      this.infinity = new YouboraInfinity(this)

      /** This flags indicates that /init has been called. */
      this.isInitiated = false

      /** This flags indicate that the content is preloading. */
      this.isPreloading = false

      /** Chrono for preload times. */
      this.preloadChrono = new Chrono()
      this.initChrono = new Chrono()

      /** Reference to {@link youbora.YouboraStorage} */
      this.storage = new YouboraStorage()

      /** Stored {@link Options} of the session. */
      this.options = new Options(options)
      this._adapter = null
      this._adsAdapter = null
      this._ping = new Timer(this._sendPing.bind(this), 5000)
      this._beat = new Timer(this._sendBeat.bind(this), 30000)

      this.requestBuilder = new RequestBuilder(this)

      this.resourceTransform = new ResourceTransform(this)

      this.lastEventTime = null

      if (adapter) this.setAdapter(adapter)

      // FastData
      this.viewTransform = new ViewTransform(this)
      this.viewTransform.on(ViewTransform.Event.DONE, this._receiveData.bind(this))

      if (this.getIsDataExpired()) {
        this.viewTransform.init() // request a new data
      } else {
        this.viewTransform.setData(this.getStoredData()) // use stored data
      }

      this._initInfinity()

      this.deviceDetector = new DeviceDetector()
      this.backgroundDetector = new BackgroundDetector(this)
      if (this.options['background.enabled']) this.backgroundDetector.startDetection()
    },

    /**
     * This callback is called when a correct data response is received.
     *
     * @param {any} e Response from fastdata
     */
    _receiveData: function (e) {
      this._ping.interval = e.target.response.pingTime * 1000
      this._beat.interval = e.target.response.beatTime * 1000
      this.storage.setSession('data', e.target.response.msg)

      if (this.getIsSessionExpired()) {
        this.viewTransform.setSessionId(this.viewTransform.response.code)
        this.storage.setLocal('session', this.viewTransform.response.code)
      } else {
        this.viewTransform.setSessionId(this.getSessionId())
      }
    },

    /**
     * Reset all variables and stop all timers
     * @private
     */
    _reset: function () {
      this._stopPings()
      this.resourceTransform = new ResourceTransform(this)

      this.isInitiated = false
      this.isStarted = false
      this.isPreloading = false
      this.preloadChrono.reset()
      this.initChrono.reset()
    },

    /**
     * Creates and enqueues related request using {@link Communication#sendRequest}.
     * It will fire will-send-events.
     *
     * @param {string} willSendEvent Name of the will-send event. Use {@link Plugin.Event} enum.
     * @param {string} service Name of the service. Use {@link Constants.Service} enum.
     * @param {Object} params Params of the request
     * @private
     */
    _send: function (willSendEvent, service, params) {
      var now = new Date().getTime()
      if (this.lastEventTime && (now > (this.lastEventTime + 600000))) { // 600000ms = 10 minutes
        // if last event was sent more than 10 minutes ago, it will use new view code
        this.viewTransform.nextView()
      }
      this.lastEventTime = now
      if (service === Constants.Service.STOP) {
        this.lastEventTime = null
      }

      params = this.requestBuilder.buildParams(params, service)

      if (this.getIsLive()) {
        params.mediaDuration = undefined
        params.playhead = undefined
      }

      var data = {
        params: params,
        plugin: this,
        adapter: this.getAdapter(),
        adsAdapter: this.getAdsAdapter()
      }

      this.emit(willSendEvent, data)

      if (this._comm && params !== null && this.options.enabled) {
        this.lastServeiceSent = service
        this._comm.sendRequest(new YBRequest(null, service, params))
      }
    },

    /**
     * Initializes comm and its transforms.
     * @private
     */
    _initComm: function () {
      this.resourceTransform.init(this.getResource())

      this._comm = new Communication()
      this._comm.addTransform(new FlowTransform())
      this._comm.addTransform(this.viewTransform)
      this._comm.addTransform(this.resourceTransform)
      // this._comm.addTransform(new Nqs6Transform())
    },

    /**
     * Returns the current {@link youbora.Communication} instance.
     *
     * @returns {youbora.Communication} communication instance
     */
    getComm: function () {
      return this._comm
    },

    /**
     * Modifies current options. See {@link Options.setOptions}.
     *
     * @param {any} options
     */
    setOptions: function (options) {
      if (options) {
        this.options.setOptions(options)
        if (typeof options['background.enabled'] === "boolean") {
          if (options['background.enabled']) {
            this.backgroundDetector.startDetection()
          } else {
            this.backgroundDetector.stopDetection()
          }
        }
      }
    },

    /**
     * Disable request sending.
     */
    disable: function () {
      this.setOptions({ 'enabled': false })
    },

    /**
     * Re-enable request sending.
     */
    enable: function () {
      this.setOptions({ 'enabled': true })
    }
  },

  /** @lends youbora.Plugin */
  {
    // Static Memebers //
    /**
     * List of events that could be fired
     * @enum
     * @event
     */
    Event: Constants.WillSendEvent
  }
)

// Apply Mixins
// Plugin is actually a big class, I decided to separate the logic into
// different mixin files to ease the maintainability of each file.
// Filename convention will be plugin+xxxxx.js where xxxxx is the added functionality.
Util.assign(Plugin.prototype, __webpack_require__(43))
Util.assign(Plugin.prototype, __webpack_require__(46))
Util.assign(Plugin.prototype, __webpack_require__(47))
Util.assign(Plugin.prototype, __webpack_require__(48))
Util.assign(Plugin.prototype, __webpack_require__(49))
Util.assign(Plugin.prototype, __webpack_require__(50))
Util.assign(Plugin.prototype, __webpack_require__(51))
Util.assign(Plugin.prototype, __webpack_require__(52))
Util.assign(Plugin.prototype, __webpack_require__(53))

module.exports = Plugin


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(6)
var Constants = __webpack_require__(3)

/**
 * This transform ensures that no requests will be sent before an /init or /start request.
 * As these are the two possible first requests that the API expects for a view.
 *
 * @constructs
 * @extends youbora.Transform
 * @memberof youbora
 * @name FlowTransform
 *
 * @param {Plugin} plugin Instance of {@link Plugin}
 */
var FlowTransform = Transform.extend(
  /** @lends youbora.FlowTransform.prototype */
  {
    _services: [Constants.Service.INIT, Constants.Service.START],

    /**
     * Returns if transform is blocking.
     *
     * @param {YBRequest} request Request to transform.
     * @return {bool} True if queue shall be blocked.
     */
    isBlocking: function (request) {
      if (this._isBusy && request != null) {
        if (this._services.indexOf(request.service) !== -1) {
          this.done()
        } else if (request.service === Constants.Service.ERROR) {
          return false
        }
      }

      return Transform.prototype.isBlocking.apply(this, arguments)
    }
  }
)

module.exports = FlowTransform


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)
var Constants = __webpack_require__(3)

var Adapter = __webpack_require__(15)

// This file is designed to add extra functionalities to Plugin class

/** @lends youbora.Plugin.prototype */
var PluginContentMixin = {
  /**
   * Sets an adapter for video content.
   *
   * @param {Adapter} adapter
   *
   * @memberof youbora.Plugin.prototype
   */
  setAdapter: function (adapter) {
    if (adapter.plugin) {
      Log.warn('Adapters can only be added to a single plugin')
    } else {
      this.removeAdapter()

      this._adapter = adapter
      adapter.plugin = this

      // Register listeners
      adapter.on(Adapter.Event.INIT, this._initListener.bind(this))
      adapter.on(Adapter.Event.START, this._startListener.bind(this))
      adapter.on(Adapter.Event.JOIN, this._joinListener.bind(this))
      adapter.on(Adapter.Event.PAUSE, this._pauseListener.bind(this))
      adapter.on(Adapter.Event.RESUME, this._resumeListener.bind(this))
      adapter.on(Adapter.Event.SEEK_BEGIN, this._seekBeginListener.bind(this))
      adapter.on(Adapter.Event.SEEK_END, this._seekEndListener.bind(this))
      adapter.on(Adapter.Event.BUFFER_BEGIN, this._bufferBeginListener.bind(this))
      adapter.on(Adapter.Event.BUFFER_END, this._bufferEndListener.bind(this))
      adapter.on(Adapter.Event.ERROR, this._errorListener.bind(this))
      adapter.on(Adapter.Event.STOP, this._stopListener.bind(this))
      adapter.on(Adapter.Event.CLICK, this._clickListener.bind(this))
      adapter.on(Adapter.Event.BLOCKED, this._blockedListener.bind(this))
    }
  },

  /**
   * Returns current adapter or null.
   *
   * @returns {Adapter}
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdapter: function () {
    return this._adapter
  },

  /**
   * Removes the current adapter. Fires stop if needed. Calls adapter.dispose().
   *
   * @memberof youbora.Plugin.prototype
   * */
  removeAdapter: function () {
    if (this._adapter) {
      this._adapter.dispose()

      this._adapter.plugin = null

      this._adapter.off(Adapter.Event.INIT, this._initListener)
      this._adapter.off(Adapter.Event.START, this._startListener)
      this._adapter.off(Adapter.Event.JOIN, this._joinListener)
      this._adapter.off(Adapter.Event.PAUSE, this._pauseListener)
      this._adapter.off(Adapter.Event.RESUME, this._resumeListener)
      this._adapter.off(Adapter.Event.SEEK_BEGIN, this._seekBeginListener)
      this._adapter.off(Adapter.Event.SEEK_END, this._seekEndListener)
      this._adapter.off(Adapter.Event.BUFFER_BEGIN, this._bufferBeginListener)
      this._adapter.off(Adapter.Event.BUFFER_END, this._bufferEndListener)
      this._adapter.off(Adapter.Event.ERROR, this._errorListener)
      this._adapter.off(Adapter.Event.STOP, this._stopListener)

      this._adapter = null
    }
  },

  // ---------------------------------------- LISTENERS -----------------------------------------
  _initListener: function (e) {
    if (!this._adapter || !this._adapter.flags.isInited) {
      if (!this.isInitiated || this.lastServeiceSent === Constants.Service.ERROR) {
        this.viewTransform.nextView()
        this._initComm()
        this._startPings()
      }
      var params = e.data.params || {}
      this.isInitiated = true
      if (this._adapter) {
        this._adapter.flags.isInited = true
        this._adapter.chronos.join.start()
      } else {
        this.initChrono.start()
      }
      this._send(Constants.WillSendEvent.WILL_SEND_INIT, Constants.Service.INIT, params)
      Log.notice(Constants.Service.INIT + ' ' + (params.title || params.mediaResource))
    }
  },

  _startListener: function (e) {
    if (!this.isInitiated) {
      this.viewTransform.nextView()
      this._initComm()
      this._startPings()
    }
    var params = e.data.params || {}
    var allParamsReady = (!!this.options['content.resource'] || !!this._adapter.getResource()) &&
      (typeof this.options["content.isLive"] === 'boolean' || typeof this._adapter.getIsLive() === 'boolean') &&
      (typeof this.options['content.duration'] === 'number' || typeof this._adapter.getDuration() === 'number' || this._adapter.getIsLive() || this.options["content.isLive"]) &&
      (!!this.options['content.title'] || !!this._adapter.getTitle())
    if (allParamsReady && !this._adapter.flags.isInited && !this.isInitiated) { //start
      this._send(Constants.WillSendEvent.WILL_SEND_START, Constants.Service.START, params)
      Log.notice(Constants.Service.START + ' ' + (params.title || params.mediaResource))
      this.isStarted = true
      //chrono if had no adapter when inited
      if (this.isInitiated && this.initChrono.startTime != 0) {
        this._adapter.chronos.join.startTime = this.initChrono.startTime
      }
    } else if (!this._adapter.flags.isInited && !this.isInitiated) {//init
      this.isInitiated = true
      this._adapter.flags.isInited = true
      this._adapter.chronos.join.start()
      this._send(Constants.WillSendEvent.WILL_SEND_START, Constants.Service.INIT, params)
      Log.notice(Constants.Service.INIT + ' ' + (params.title || params.mediaResource))
    }
  },

  _joinListener: function (e) {
    var params = e.data.params || {}
    if (!this._adsAdapter || !this._adsAdapter.flags.isStarted) {
      if (this.isInitiated && !this.isStarted) { //start if just inited
        //chrono if had no adapter when inited
        if (this.initChrono.startTime != 0) {
          this._adapter.chronos.join.startTime = this.initChrono.startTime
        }
        this._send(Constants.WillSendEvent.WILL_SEND_START, Constants.Service.START, params)
        Log.notice(Constants.Service.START + ' ' + (params.title || params.mediaResource))
        this.isStarted = true
      }
      params = e.data.params || {}
      this._send(Constants.WillSendEvent.WILL_SEND_JOIN, Constants.Service.JOIN, params)
      Log.notice(Constants.Service.JOIN + ' ' + params.joinDuration + 'ms')
    } else { // If it is currently showing ads, join is invalidated
      if (this._adapter.monitor) this._adapter.monitor.stop()
      this._adapter.flags.isJoined = false
      this._adapter.chronos.join.stopTime = 0
    }
  },

  _pauseListener: function (e) {
    if (this._adapter) {
      if (this._adapter.flags.isBuffering ||
        this._adapter.flags.isSeeking ||
        (this._adsAdapter && this._adsAdapter.flags.isStarted)) {
        this._adapter.chronos.pause.reset()
      }
    }

    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_PAUSE, Constants.Service.PAUSE, params)
    Log.notice(Constants.Service.PAUSE + ' at ' + params.playhead + 's')
  },

  _resumeListener: function (e) {
    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_RESUME, Constants.Service.RESUME, params)
    Log.notice(Constants.Service.RESUME + ' ' + params.pauseDuration + 'ms')
  },

  _seekBeginListener: function (e) {
    if (this._adapter && this._adapter.flags.isPaused) this._adapter.chronos.pause.reset()
    Log.notice('Seek Begin')
  },

  _seekEndListener: function (e) {
    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_SEEK, Constants.Service.SEEK, params)
    Log.notice(Constants.Service.SEEK +
      ' to ' + params.playhead +
      ' in ' + params.seekDuration + 'ms'
    )
  },

  _bufferBeginListener: function (e) {
    if (this._adapter && this._adapter.flags.isPaused) this._adapter.chronos.pause.reset()
    Log.notice('Buffer Begin')
  },

  _bufferEndListener: function (e) {
    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_BUFFER, Constants.Service.BUFFER, params)
    Log.notice(Constants.Service.BUFFER +
      ' to ' + params.playhead +
      ' in ' + params.bufferDuration + 'ms'
    )
  },

  _errorListener: function (e) {
    this.fireError(e.data.params || {})
  },

  _stopListener: function (e) {
    this.fireStop(e.data.params || {})
  },

  _clickListener: function (e) {
    Log.warn(
      'You have sent a CLICK event from the content adapter. ' +
      'Such events must be fired from ads adapters, so it will be ignored.'
    )
  },

  _blockedListener: function (e) {
    Log.warn(
      'You have sent a BLOCKED event from the content adapter. ' +
      'Such events must be fired from ads adapters, so it will be ignored.'
    )
  }
}

module.exports = PluginContentMixin


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)
var Chrono = __webpack_require__(7)

var PlaybackChronos = YouboraObject.extend(
  /** @lends youbora.PlaybackChronos.prototype */
  {
    /**
     * This class contains all the {@link Chrono}s related to view status.
     * Chronos measure time lapses between events.
     * ie: between start and join, between seek-begin and seek-end, etc.
     * Each plugin will have an instance of this class.
     *
     * @constructs PlaybackChronos
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function () {
      this.reset()
    },

    /** Reset flag values */
    reset: function () {
      /** Chrono between start and joinTime. */
      this.join = new Chrono()

      /** Chrono between seek-begin and seek-end. */
      this.seek = new Chrono()

      /** Chrono between pause and resume. */
      this.pause = new Chrono()

      /** Chrono between buffer-begin and buffer-end. */
      this.buffer = new Chrono()

      /** Chrono for the totality of the view. */
      this.total = new Chrono()
    }
  }
)

module.exports = PlaybackChronos


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(1)

var PlaybackFlags = YouboraObject.extend(
  /** @lends youbora.PlaybackFlags.prototype */
  {
    /**
     * This class contains all the flags related to view status.
     * Each plugin will have an instance of this class.
     *
     * @constructs PlaybackFlags
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function () {
      this.reset()
    },

    /** Reset flag values */
    reset: function () {
      /** Flag when Init has been sent. */
      this.isInited = false

      /** Flag when Start has been sent. */
      this.isStarted = false

      /** Flag when Join has been sent. */
      this.isJoined = false

      /** Flag when Player is paused. */
      this.isPaused = false

      /** Flag when Player is seeking. */
      this.isSeeking = false

      /** Flag when Player is buffering. */
      this.isBuffering = false

      /** Flag when Player is ended */
      this.isEnded = false

      /** Flag when Player view ends and stop is already sent */
      this.isStopped = false
    }
  }
)

module.exports = PlaybackFlags


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(2)

var version = __webpack_require__(8)

// This file is designed to add extra functionalities to Plugin class

var PluginGetterMixin = {
  /**
   * Returns service host
   *
   * @memberof youbora.Plugin.prototype
   */
  getHost: function() {
    var host = this.options['host']
    if (this.viewTransform && this.viewTransform.response && this.viewTransform.response.host) {
      host = this.viewTransform.response.host
    }
    return Util.addProtocol(Util.stripProtocol(host), this.options['httpSecure'])
  },


  getUserType: function() {
    return this.options['userType']
  },

  /**
   * Returns parse HLS Flag
   *
   * @memberof youbora.Plugin.prototype
   */
  isParseHls: function() {
    return this.options['parse.hls']
  },

  /**
   * Returns parse CdnNode Flag
   *
   * @memberof youbora.Plugin.prototype
   */
  isParseCdnNode: function() {
    return this.options['parse.cdnNode']
  },

  /**
   * Returns parse location header
   *
   * @memberof youbora.Plugin.prototype
   */
  isLocHeader: function() {
    return this.options['parse.locationHeader']
  },

  /**
   * Returns Cdn list
   *
   * @memberof youbora.Plugin.prototype
   */
  getParseCdnNodeList: function() {
    return this.options['parse.cdnNode.list']
  },

  /**
   * Returns Cdn header name
   *
   * @memberof youbora.Plugin.prototype
   */
  getParseCdnNodeNameHeader: function() {
    return this.options['parse.cdnNameHeader']
  },

  /**
   * Returns obfuscateIp option
   *
   * @memberof youbora.Plugin.prototype
   */
  getObfuscateIp: function() {
    return this.options['obfuscateIp']
  },

  /**
   * Returns content's Extraparam1
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam1: function() {
    return this.options['extraparam.1']
  },

  /**
   * Returns content's Extraparam2
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam2: function() {
    return this.options['extraparam.2']
  },

  /**
   * Returns content's Extraparam3
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam3: function() {
    return this.options['extraparam.3']
  },

  /**
   * Returns content's Extraparam4
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam4: function() {
    return this.options['extraparam.4']
  },
  /**
   * Returns content's Extraparam5
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam5: function() {
    return this.options['extraparam.5']
  },

  /**
   * Returns content's Extraparam6
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam6: function() {
    return this.options['extraparam.6']
  },

  /**
   * Returns content's Extraparam7
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam7: function() {
    return this.options['extraparam.7']
  },

  /**
   * Returns content's Extraparam8
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam8: function() {
    return this.options['extraparam.8']
  },

  /**
   * Returns content's Extraparam9
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam9: function() {
    return this.options['extraparam.9']
  },

  /**
   * Returns content's Extraparam10
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam10: function() {
    return this.options['extraparam.10']
  },

  /**
   * Returns content's Extraparam11
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam11: function() {
    return this.options['extraparam.11']
  },

  /**
   * Returns content's Extraparam12
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam12: function() {
    return this.options['extraparam.12']
  },

  /**
   * Returns content's Extraparam13
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam13: function() {
    return this.options['extraparam.13']
  },

  /**
   * Returns content's Extraparam14
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam14: function() {
    return this.options['extraparam.14']
  },
  /**
   * Returns content's Extraparam15
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam15: function() {
    return this.options['extraparam.15']
  },

  /**
   * Returns content's Extraparam16
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam16: function() {
    return this.options['extraparam.16']
  },

  /**
   * Returns content's Extraparam17
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam17: function() {
    return this.options['extraparam.17']
  },

  /**
   * Returns content's Extraparam18
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam18: function() {
    return this.options['extraparam.18']
  },

  /**
   * Returns content's Extraparam19
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam19: function() {
    return this.options['extraparam.19']
  },

  /**
   * Returns content's Extraparam20
   *
   * @memberof youbora.Plugin.prototype
   */
  getExtraparam20: function() {
    return this.options['extraparam.20']
  },

  /**
   * Returns ad's Extraparam1
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam1: function() {
    return this.options['ad.extraparam.1']
  },

  /**
   * Returns ad's Extraparam2
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam2: function() {
    return this.options['ad.extraparam.2']
  },

  /**
   * Returns ad's Extraparam3
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam3: function() {
    return this.options['ad.extraparam.3']
  },

  /**
   * Returns ad's Extraparam4
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam4: function() {
    return this.options['ad.extraparam.4']
  },
  /**
   * Returns ad's Extraparam5
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam5: function() {
    return this.options['ad.extraparam.5']
  },

  /**
   * Returns ad's Extraparam6
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam6: function() {
    return this.options['ad.extraparam.6']
  },

  /**
   * Returns ad's Extraparam7
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam7: function() {
    return this.options['ad.extraparam.7']
  },

  /**
   * Returns ad's Extraparam8
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam8: function() {
    return this.options['ad.extraparam.8']
  },

  /**
   * Returns ad's Extraparam9
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam9: function() {
    return this.options['ad.extraparam.9']
  },

  /**
   * Returns ad's Extraparam10
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdExtraparam10: function() {
    return this.options['ad.extraparam.10']
  },

  /**
   * Returns PluginInfo
   *
   * @memberof youbora.Plugin.prototype
   */
  getPluginInfo: function() {
    var ret = {
      lib: version,
      adapter: this.getAdapterVersion(),
      adAdapter: this.getAdAdapterVersion()
    }
    return ret
  },

  /**
   * Returns Ip
   *
   * @memberof youbora.Plugin.prototype
   */
  getIp: function() {
    return this.options['network.ip']
  },

  /**
   * Returns Isp
   *
   * @memberof youbora.Plugin.prototype
   */
  getIsp: function() {
    return this.options['network.isp']
  },

  /**
   * Returns ConnectionType
   *
   * @memberof youbora.Plugin.prototype
   */
  getConnectionType: function() {
    return this.options['network.connectionType']
  },

  /**
   * Returns DeviceCode
   *
   * @memberof youbora.Plugin.prototype
   */
  getDeviceCode: function() {
    return this.options['device.code']
  },

  /**
   * Returns AccountCode
   *
   * @memberof youbora.Plugin.prototype
   */
  getAccountCode: function() {
    return this.options['accountCode']
  },

  /**
   * Returns Username
   *
   * @memberof youbora.Plugin.prototype
   */
  getUsername: function() {
    return this.options['username']
  },

  /**
   * Get URL referer.
   *
   * @memberof youbora.Plugin.prototype
   */
  getReferer: function() {
    if (this.options['referer']) return this.options['referer']
    var ret = ''
    if (typeof window !== 'undefined' && window.location) {
      ret = window.location.href
    }
    return ret
  },

  /**
   * Returns the nodehost
   *
   * @memberof youbora.Plugin.prototype
   */
  getNodeHost: function() {
    return this.options['content.cdnNode'] || this.resourceTransform.getNodeHost()
  },

  /**
   * Returns the node type id
   *
   * @memberof youbora.Plugin.prototype
   */
  getNodeType: function() {
    return this.options['content.cdnType'] || this.resourceTransform.getNodeType()
  },

  /**
   * Returns the node type string
   *
   * @memberof youbora.Plugin.prototype
   */
  getNodeTypeString: function() {
    return this.resourceTransform.getNodeTypeString()
  },

  /**
   * Returns requestNumber value, to prevent /data calls being cached
   *
   * @memberof youbora.Plugin.prototype
   */
  getRequestNumber: function() {
    return Math.random()
  },

  getExperiments: function() {
    if (this.options['experiments'].length > 0) return this.options['experiments']
    return null
  }
}

module.exports = PluginGetterMixin

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)
var Util = __webpack_require__(2)

var version = __webpack_require__(8)

// This file is designed to add extra functionalities to Plugin class

var PluginContentGetterMixin = {
  /**
   * Returns content's playhead
   *
   * @memberof youbora.Plugin.prototype
   */
  getPlayhead: function () {
    var ret = 0
    if (this._adapter) {
      try {
        ret = this._adapter.getPlayhead()
      } catch (err) {
        Log.warn('An error occurred while calling getPlayhead', err)
      }
    }
    return Util.parseNumber(ret, 0)
  },

  /**
   * Returns content's PlayRate
   *
   * @memberof youbora.Plugin.prototype
   */
  getPlayrate: function () {
    var ret = 0
    if (this._adapter) {
      try {
        ret = this._adapter.getPlayrate()
      } catch (err) {
        Log.warn('An error occured while calling getPlayrate', err)
      }
    }
    return ret
  },

  /**
   * Returns content's FramesPerSecond
   *
   * @memberof youbora.Plugin.prototype
   */
  getFramesPerSecond: function () {
    var ret = this.options['content.fps']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getFramesPerSecond()
      } catch (err) {
        Log.warn('An error occured while calling getFramesPerSecond', err)
      }
    }
    return ret
  },

  /**
   * Returns content's DroppedFrames
   *
   * @memberof youbora.Plugin.prototype
   */
  getDroppedFrames: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getDroppedFrames()
      } catch (err) {
        Log.warn('An error occured while calling getDroppedFrames', err)
      }
    }
    if (!ret) {
      ret = this.getWebkitDroppedFrames()
    }
    return Util.parseNumber(ret, 0)
  },

  /**
   * Returns dropped frames as per webkitDroppedFrameCount
   *
   * @returns {number}
   *
   * @memberof youbora.Plugin.prototype
   */
  getWebkitDroppedFrames: function () {
    if (this._adapter && this._adapter.tag && this._adapter.tag.webkitDroppedFrameCount) {
      return this._adapter.tag.webkitDroppedFrameCount
    }
    return null
  },

  /**
   * Returns content's Duration
   *
   * @memberof youbora.Plugin.prototype
   */
  getDuration: function () {
    var ret = this.options['content.duration']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getDuration()
      } catch (err) {
        Log.warn('An error occured while calling getDuration', err)
      }
    }
    if (ret === 0) ret = null
    return Util.parseNumber(Math.round(ret), null)
  },

  /**
   * Returns content's Bitrate
   *
   * @memberof youbora.Plugin.prototype
   */
  getBitrate: function () {
    var ret = this.options['content.bitrate']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getBitrate()
      } catch (err) {
        Log.warn('An error occured while calling getBitrate', err)
      }

      if (!ret || ret === -1) {
        ret = this.getWebkitBitrate()
      }
    }
    return Util.parseNumber(ret, -1)
  },

  /**
   * Returns bitrate as per webkitVideoDecodedByteCount
   *
   * @param {Object} tag Video tag DOM reference.
   * @returns {number}
   *
   * @memberof youbora.Plugin.prototype
   */
  getWebkitBitrate: function () {
    if (this._adapter && this._adapter.tag && this._adapter.tag.webkitVideoDecodedByteCount) {
      var bitrate = this._adapter.tag.webkitVideoDecodedByteCount
      if (this._lastWebkitBitrate) {
        var delta = this._adapter.tag.webkitVideoDecodedByteCount - this._lastWebkitBitrate
        bitrate = Math.round(((delta) / this.viewTransform.response.pingTime) * 8)
      }
      this._lastWebkitBitrate = this._adapter.tag.webkitVideoDecodedByteCount
      return bitrate !== 0 ? bitrate : -1
    }
  },

  /**
   * Returns content's Throughput
   *
   * @memberof youbora.Plugin.prototype
   */
  getThroughput: function () {
    var ret = this.options['content.throughput']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getThroughput()
      } catch (err) {
        Log.warn('An error occured while calling getThroughput', err)
      }
    }
    return Util.parseNumber(ret, -1)
  },

  /**
   * Returns content's Rendition
   *
   * @memberof youbora.Plugin.prototype
   */
  getRendition: function () {
    var ret = this.options['content.rendition']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getRendition()
      } catch (err) {
        Log.warn('An error occured while calling getRendition', err)
      }
    }
    return ret
  },

  /**
   * Returns content's Title
   *
   * @memberof youbora.Plugin.prototype
   */
  getTitle: function () {
    var ret = this.options['content.title']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getTitle()
      } catch (err) {
        Log.warn('An error occured while calling getTitle', err)
      }
    }
    return ret
  },

  /**
   * Returns content's Title2
   *
   * @memberof youbora.Plugin.prototype
   */
  getTitle2: function () {
    var ret = this.options['content.title2']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getTitle2()
      } catch (err) {
        Log.warn('An error occured while calling getTitle2', err)
      }
    }
    return ret
  },

  /**
   * Returns content's IsLive
   *
   * @memberof youbora.Plugin.prototype
   */
  getIsLive: function () {
    var ret = this.options['content.isLive']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getIsLive()
      } catch (err) {
        Log.warn('An error occured while calling getIsLive', err)
      }
    }
    return ret || false
  },

  /**
   * Returns content's Resource after being parsed by the resourceTransform
   *
   * @memberof youbora.Plugin.prototype
   */
  getResource: function () {
    var ret = null
    if (!this.resourceTransform.isBlocking() && this.resourceTransform.isDone) {
      ret = this.resourceTransform.getResource()
    }

    return ret || this.getOriginalResource()
  },

  /**
   * Returns content's original Resource
   *
   * @memberof youbora.Plugin.prototype
   */
  getOriginalResource: function () {
    var ret = null
    ret = this.options['content.resource']
    if (ret === null && this._adapter) {
      try {
        ret = this._adapter.getResource()
      } catch (err) {
        Log.warn('An error occured while calling getResource', err)
        ret = null
      }
    }
    return ret || null
  },

  /**
   * Returns content's TransactionCode
   *
   * @memberof youbora.Plugin.prototype
   */
  getTransactionCode: function () {
    return this.options['content.transactionCode']
  },

  /**
   * Returns content's Metadata
   *
   * @memberof youbora.Plugin.prototype
   */
  getMetadata: function () {
    return this.options['content.metadata']
  },

  /**
   * Returns content's PlayerVersion
   *
   * @memberof youbora.Plugin.prototype
   */
  getPlayerVersion: function () {
    var ret = ''
    if (this._adapter) {
      try {
        ret = this._adapter.getPlayerVersion()
      } catch (err) {
        Log.warn('An error occured while calling getPlayerVersion', err)
      }
    }
    return ret
  },

  /**
   * Returns content's PlayerName
   *
   * @memberof youbora.Plugin.prototype
   */
  getPlayerName: function () {
    var ret = ''
    if (this._adapter) {
      try {
        ret = this._adapter.getPlayerName()
      } catch (err) {
        Log.warn('An error occured while calling getPlayerName', err)
      }
    }
    return ret
  },

  /**
   * Returns content's Cdn
   *
   * @memberof youbora.Plugin.prototype
   */
  getCdn: function () {
    var ret = null
    if (!this.resourceTransform.isBlocking()) {
      ret = this.resourceTransform.getCdnName()
    }
    return ret || this.options['content.cdn']
  },

  /**
   * Returns content's PluginVersion
   *
   * @memberof youbora.Plugin.prototype
   */
  getPluginVersion: function () {
    var ret = this.getAdapterVersion()
    if (!ret) ret = version + '-adapterless'

    return ret
  },

  /**
   * Returns ads adapter getVersion or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdapterVersion: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getVersion()
      } catch (err) {
        Log.warn('An error occured while calling getPluginVersion', err)
      }
    }
    return ret
  },

  /**
   * Returns cdn traffic received in bytes or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getCdnTraffic: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getCdnTraffic()
      } catch (err) {
        Log.warn('An error occured while calling getCdnTraffic', err)
      }
    }
    return ret
  },

  /**
   * Returns p2p traffic received in bytes or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getP2PTraffic: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getP2PTraffic()
      } catch (err) {
        Log.warn('An error occured while calling getP2PTraffic', err)
      }
    }
    return ret
  },


  /**
   * Returns p2p traffic sent in bytes or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getUploadTraffic: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getUploadTraffic()
      } catch (err) {
        Log.warn('An error occured while calling getUploadTraffic', err)
      }
    }
    return ret
  },

  /**
 * Returns if p2p plugin is enabled or null
 *
 * @memberof youbora.Plugin.prototype
 */
  getIsP2PEnabled: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getIsP2PEnabled()
      } catch (err) {
        Log.warn('An error occured while calling getIsP2PEnabled', err)
      }
    }
    return ret
  },


  getStreamingProtocol: function () {
    var ret = this.options['content.streamingProtocol']
    if (typeof ret != 'string') return null
    ret = ret.toUpperCase()
    if (ret != 'HDS' && ret != 'HLS' && ret != 'MSS' && ret != 'DASH' && ret != 'RTMP' && ret != 'RTP' && ret != 'RTSP') {
      Log.warn('Streaming protocol ' + ret + ' is not a valid value')
      return null
    }
    return ret
  },

  /**Returns household id*/
  getHouseholdId: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getHouseholdId()
      } catch (err) {
        Log.warn('An error occurred while calling getHouseholdId', err)
      }
    }
    return ret
  },

  /**
* Returns latency of a live video, or null
*
* @memberof youbora.Plugin.prototype
*/
  getLatency: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getLatency()
      } catch (err) {
        Log.warn('An error occurred while calling getLatency', err)
      }
    }
    return ret
  },

  /**
* Returns the amount of packets lost, or null
*
* @memberof youbora.Plugin.prototype
*/
  getPacketLoss: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getPacketLoss()
      } catch (err) {
        Log.warn('An error occurred while calling getPacketLoss', err)
      }
    }
    return ret
  },

  /**
* Returns the amount of packets sent, or null
*
* @memberof youbora.Plugin.prototype
*/
  getPacketSent: function () {
    var ret = null
    if (this._adapter) {
      try {
        ret = this._adapter.getPacketSent()
      } catch (err) {
        Log.warn('An error occurred while calling getPacketSent', err)
      }
    }
    return ret
  },
  // ----------------------------------------- CHRONOS ------------------------------------------

  /**
   * Returns preload chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getPreloadDuration: function () {
    return this.preloadChrono.getDeltaTime(false)
  },

  /**
   * Returns JoinDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getJoinDuration: function () {
    return this._adapter ? this._adapter.chronos.join.getDeltaTime(false) : -1
  },

  /**
   * Returns BufferDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getBufferDuration: function () {
    return this._adapter ? this._adapter.chronos.buffer.getDeltaTime(false) : -1
  },

  /**
   * Returns SeekDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getSeekDuration: function () {
    return this._adapter ? this._adapter.chronos.seek.getDeltaTime(false) : -1
  },

  /**
   * Returns pauseDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getPauseDuration: function () {
    return this._adapter ? this._adapter.chronos.pause.getDeltaTime(false) : 0
  }
}

module.exports = PluginContentGetterMixin


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)
var Constants = __webpack_require__(3)

var Adapter = __webpack_require__(15)

// This file is designed to add extra functionalities to Plugin class

var PluginAdsMixin = {
  /**
   * Returns current adapter or null.
   *
   * @returns {Adapter}
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdsAdapter: function () {
    return this._adsAdapter
  },

  /**
   * Sets an adapter for ads.
   *
   * @param {Adapter} adsAdapter
   *
   * @memberof youbora.Plugin.prototype
   */
  setAdsAdapter: function (adsAdapter) {
    if (adsAdapter.plugin) {
      Log.warn('Adapters can only be added to a single plugin')
    } else {
      this.removeAdsAdapter()

      adsAdapter.plugin = this
      this._adsAdapter = adsAdapter
      this._adsAdapter.on(Adapter.Event.INIT, this._adInitListener.bind(this))
      this._adsAdapter.on(Adapter.Event.START, this._adStartListener.bind(this))
      this._adsAdapter.on(Adapter.Event.JOIN, this._adJoinListener.bind(this))
      this._adsAdapter.on(Adapter.Event.PAUSE, this._adPauseListener.bind(this))
      this._adsAdapter.on(Adapter.Event.RESUME, this._adResumeListener.bind(this))
      this._adsAdapter.on(Adapter.Event.BUFFER_BEGIN, this._adBufferBeginListener.bind(this))
      this._adsAdapter.on(Adapter.Event.BUFFER_END, this._adBufferEndListener.bind(this))
      this._adsAdapter.on(Adapter.Event.STOP, this._adStopListener.bind(this))
      this._adsAdapter.on(Adapter.Event.ERROR, this._adErrorListener.bind(this))
      this._adsAdapter.on(Adapter.Event.CLICK, this._adClickListener.bind(this))
      this._adsAdapter.on(Adapter.Event.BLOCKED, this._adBlockedListener.bind(this))
    }
  },

  /**
   * Removes the current adapter. Fires stop if needed. Calls adapter.dispose()
   *
   * @memberof youbora.Plugin.prototype
   */
  removeAdsAdapter: function () {
    if (this._adsAdapter) {
      this._adsAdapter.dispose()

      this._adsAdapter.plugin = null
      this._adsAdapter.off(Adapter.Event.INIT, this._adInitListener)
      this._adsAdapter.off(Adapter.Event.START, this._adStartListener)
      this._adsAdapter.off(Adapter.Event.JOIN, this._adJoinListener)
      this._adsAdapter.off(Adapter.Event.PAUSE, this._adPauseListener)
      this._adsAdapter.off(Adapter.Event.RESUME, this._adResumeListener)
      this._adsAdapter.off(Adapter.Event.BUFFER_BEGIN, this._adBufferBeginListener)
      this._adsAdapter.off(Adapter.Event.BUFFER_END, this._adBufferEndListener)
      this._adsAdapter.off(Adapter.Event.STOP, this._adStopListener)
      this._adsAdapter.off(Adapter.Event.ERROR, this._adErrorListener)
      this._adsAdapter.off(Adapter.Event.CLICK, this._adClickListener)
      this._adsAdapter.off(Adapter.Event.BLOCKED, this._adBlockedListener)

      this._adsAdapter = null
    }
  },

  // ---------------------------------------- LISTENERS -----------------------------------------
  _adInitListener: function (e) {
    if (this._adapter) {
      this._adapter.fireBufferEnd()
      this._adapter.fireSeekEnd()
    }
    this.adInitSent = true
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.getNewAdNumber()
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_START, Constants.Service.AD_INIT, params)
    Log.notice(
      Constants.Service.AD_INIT + ' ' +
      params.adPosition + params.adNumber +
      ' at ' + params.playhead + 's'
    )
  },

  _adStartListener: function (e) {
    if (this._adapter) {
      this._adapter.fireBufferEnd()
      this._adapter.fireSeekEnd()
      if (this._adapter.flags.isPaused) this._adapter.chronos.pause.reset()
    }

    var params = e.data.params || {}
    if (!this._adsAdapter.flags.isInited) {
      params.adNumber = this.requestBuilder.getNewAdNumber()
    } else {
      params.adNumber = this.requestBuilder.lastSent.adNumber
    }
    if (!this.options['ad.ignore']) {
      var allParamsReady = ((!!this._adsAdapter.getResource() || !!this._adsAdapter.getTitle())
        && typeof this._adsAdapter.getDuration() === 'number')
      if (allParamsReady) {
        this.adStartSent = true
        this._send(Constants.WillSendEvent.WILL_SEND_AD_START, Constants.Service.AD_START, params)
        Log.notice(
          Constants.Service.AD_START + ' ' +
          params.adPosition + params.adNumber +
          ' at ' + params.playhead + 's'
        )
      }
      else {
        if (!this._adsAdapter.flags.isInited) {
          this.adInitSent = true
          this._send(Constants.WillSendEvent.WILL_SEND_AD_INIT, Constants.Service.AD_INIT, params)
          Log.notice(
            Constants.Service.AD_INIT + ' ' +
            params.adPosition + params.adNumber +
            ' at ' + params.playhead + 's'
          )
        }
      }
    }
  },

  _adJoinListener: function (e) {
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.lastSent.adNumber
    if (!this.options['ad.ignore'] && this.adInitSent && !this.adStartSent) {
      this._send(Constants.WillSendEvent.WILL_SEND_AD_START, Constants.Service.AD_START, params)
      Log.notice(
        Constants.Service.AD_START + ' ' +
        params.adPosition + params.adNumber +
        ' at ' + params.playhead + 's'
      )
    }
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_JOIN, Constants.Service.AD_JOIN, params)
    Log.notice(Constants.Service.AD_JOIN + ' ' + params.adJoinDuration + 'ms')
    this.adInitSent = false
    this.adStartSent = false
  },

  _adPauseListener: function (e) {
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.lastSent.adNumber
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_PAUSE, Constants.Service.AD_PAUSE, params)
    Log.notice(Constants.Service.AD_PAUSE + ' at ' + params.adPlayhead + 's')
  },

  _adResumeListener: function (e) {
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.lastSent.adNumber
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_RESUME, Constants.Service.AD_RESUME, params)
    Log.notice(Constants.Service.AD_RESUME + ' ' + params.adPauseDuration + 'ms')
  },

  _adBufferBeginListener: function (e) {
    Log.notice('Ad Buffer Begin')
    if (this._adsAdapter && this._adsAdapter.flags.isPaused) {
      this._adsAdapter.chronos.pause.reset()
    }
  },

  _adBufferEndListener: function (e) {
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.lastSent.adNumber
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_BUFFER, Constants.Service.AD_BUFFER, params)
    Log.notice(Constants.Service.AD_BUFFER + ' ' + params.adBufferDuration + 'ms')
  },

  _adStopListener: function (e) {
    // remove time from joinDuration
    if (this._adapter && !this._adapter.flags.isJoined) {
      this._adapter.chronos.join.startTime = Math.min(
        this._adapter.chronos.join.startTime + this._adsAdapter.chronos.total.getDeltaTime(),
        new Date().getTime()
      )
    }

    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.lastSent.adNumber
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_STOP, Constants.Service.AD_STOP, params)
    Log.notice(Constants.Service.AD_STOP + ' ' + params.adTotalDuration + 'ms')
  },

  _adErrorListener: function (e) {
    var params = e.data.params || {}
    if (this._adapter && !this._adapter.flags.isStarted) {
      params.adNumber = this.requestBuilder.lastSent.adNumber
      this._adapter.fireStart()
    } else {
      params.adNumber = this.requestBuilder.getNewAdNumber()
    }
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_ERROR, Constants.Service.AD_ERROR, params)
    Log.notice(Constants.Service.AD_ERROR)
  },

  _adClickListener: function (e) {
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.lastSent.adNumber
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_CLICK, Constants.Service.AD_CLICK, params)
    Log.notice(Constants.Service.AD_CLICK)
  },

  _adBlockedListener: function (e) {
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.getNewAdNumber()
    if (!this.options['ad.ignore']) this._send(Constants.WillSendEvent.WILL_SEND_AD_BLOCKED, Constants.Service.AD_BLOCKED, params)
    Log.notice(Constants.Service.AD_BLOCKED)
  }
}

module.exports = PluginAdsMixin


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)
var Util = __webpack_require__(2)

// This file is designed to add extra functionalities to Plugin class

var PluginAdsGettersMixin = {
  /**
   * Returns ads's PlayerVersion
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPlayerVersion: function () {
    var ret = ''
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getPlayerVersion()
      } catch (err) {
        Log.warn('An error occured while calling getAdPlayerVersion', err)
      }
    }
    return ret
  },

  /**
   * Returns ad's position
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPosition: function () {
    var ret = 'pre'
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getPosition()
      } catch (err) {
        Log.warn('An error occured while calling getAdPosition', err)
      }
    }
    if (!ret && this._adapter) {
      ret = (this._adapter.flags.isJoined) ? 'mid' : 'pre'
    }
    return ret
  },

  /**
   * Returns ad's AdPlayhead
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPlayhead: function () {
    var ret = null
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getPlayhead()
      } catch (err) {
        Log.warn('An error occured while calling getAdPlayhead', err)
      }
    }
    return Util.parseNumber(ret, 0)
  },

  /**
   * Returns ad's AdDuration
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdDuration: function () {
    var ret = null
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getDuration()
      } catch (err) {
        Log.warn('An error occured while calling getAdDuration', err)
      }
    }
    return Util.parseNumber(ret, 0)
  },

  /**
   * Returns ad's AdBitrate
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdBitrate: function () {
    var ret = null
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getBitrate()
      } catch (err) {
        Log.warn('An error occured while calling getAdBitrate', err)
      }

      if (!ret || ret === -1) {
        ret = this.getWebkitAdBitrate()
      }
    }
    return Util.parseNumber(ret, -1)
  },

  /**
   * Returns bitrate as per webkitVideoDecodedByteCount
   *
   * @param {Object} tag Video tag DOM reference.
   * @returns {number}
   *
   * @memberof youbora.Plugin.prototype
   */
  getWebkitAdBitrate: function () {
    if (this._adapter && this._adapter.tag && this._adapter.tag.webkitVideoDecodedByteCount) {
      var bitrate = this._adapter.tag.webkitVideoDecodedByteCount
      if (this._lastWebkitAdBitrate) {
        var delta = this._adapter.tag.webkitVideoDecodedByteCount - this._lastWebkitAdBitrate
        bitrate = Math.round(((delta) / this.viewTransform.response.pingTime) * 8)
      }
      this._lastWebkitAdBitrate = this._adapter.tag.webkitVideoDecodedByteCount
      return bitrate !== 0 ? bitrate : -1
    }
  },

  /**
   * Returns ad's AdTitle
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdTitle: function () {
    var ret = null
    if (this.options['ad.title']) {
      return this.options['ad.title']
    }
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getTitle()
      } catch (err) {
        Log.warn('An error occured while calling getAdTitle', err)
      }
    }
    return ret
  },

  /**
   * Returns ad's AdResource
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdResource: function () {
    var ret = null
    if (this.options['ad.resource']) {
      return this.options['ad.resource']
    }
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getResource()
      } catch (err) {
        Log.warn('An error occured while calling getAdResource', err)
      }
    }
    return ret
  },

  /**
 * Returns ad's campaign
 *
 * @memberof youbora.Plugin.prototype
 */
  getAdCampaign: function () {
    if (this.options['ad.campaign']) {
      return this.options['ad.campaign']
    }
    return null
  },

  /**
   * Returns ads adapter getVersion or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdAdapterVersion: function () {
    var ret = null
    if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getVersion()
      } catch (err) {
        Log.warn('An error occured while calling getAdsAdapterVersion', err)
      }
    }
    return ret
  },

  /**
   * Returns ad's AdMetadata
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdMetadata: function () {
    return this.options['ad.metadata']
  },

  // ----------------------------------------- CHRONOS ------------------------------------------

  /**
   * Returns AdJoinDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdJoinDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.join.getDeltaTime(false) : -1
  },

  /**
   * Returns AdBufferDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdBufferDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.buffer.getDeltaTime(false) : -1
  },

  /**
   * Returns AdPauseDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPauseDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.pause.getDeltaTime(false) : 0
  },

  /**
   * Returns total totalAdDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdTotalDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.total.getDeltaTime(false) : -1
  }
}

module.exports = PluginAdsGettersMixin


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)
var Constants = __webpack_require__(3)

// This file is designed to add extra functionalities to Plugin class

var PluginPingMixin = {
  /**
   * Starts sending pings.
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _startPings: function () {
    if (!this._ping.isRunning) this._ping.start()
  },

  /**
   * Stops sending pings.
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _stopPings: function () {
    this._ping.stop()
  },


  /**
   * Sends ping request
   *
   * @param {number} diffTime Time since the last ping
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _sendPing: function (diffTime) {
    var params = {
      diffTime: diffTime,
      entities: this.requestBuilder.getChangedEntities()
    }
    if (this._adapter) {
      if (this._adapter.flags.isPaused) {
        params = this.requestBuilder.fetchParams(params, ['pauseDuration'])
      } else {
        params = this.requestBuilder.fetchParams(params, ['bitrate', 'throughput', 'fps'])
      }
      if (this._adapter.flags.isJoined) {
        params = this.requestBuilder.fetchParams(params, ['playhead'])
      }
      if (this._adapter.flags.isBuffering) {
        params = this.requestBuilder.fetchParams(params, ['bufferDuration'])
      }
      if (this._adapter.flags.isSeeking) {
        params = this.requestBuilder.fetchParams(params, ['seekDuration'])
      }

      if (this._adsAdapter && !this.options['ad.ignore']) {
        if (this._adsAdapter.flags.isStarted) {
          params = this.requestBuilder.fetchParams(params, ['adPlayhead'])
          if (this._adsAdapter.flags.isPaused) {
            params = this.requestBuilder.fetchParams(params, ['adPauseDuration'])
          } else {
            params = this.requestBuilder.fetchParams(params, ['adBitrate'])
          }
        }
        if (this._adsAdapter.flags.isBuffering) {
          params = this.requestBuilder.fetchParams(params, ['adBufferDuration'])
        }
      }
    }

    this._send(Constants.WillSendEvent.WILL_SEND_PING, Constants.Service.PING, params)
    Log.verbose(Constants.Service.PING)
  }
}

module.exports = PluginPingMixin


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(0)
var Util = __webpack_require__(2)
var Constants = __webpack_require__(3)

// This file is designed to add extra functionalities to Plugin class

/** @lends youbora.Plugin.prototype */
var PluginFireMixin = {
  /**
   * Starts preloading state and chronos.
   *
   * @memberof youbora.Plugin.prototype
   */
  firePreloadBegin: function() {
    if (!this.isPreloading) {
      this.isPreloading = true
      this.preloadChrono.start()
    }
  },

  /**
   * Ends preloading state and chronos.
   *
   * @memberof youbora.Plugin.prototype
   */
  firePreloadEnd: function() {
    if (this.isPreloading) {
      this.isPreloading = false
      this.preloadChrono.stop()
    }
  },

  /**
   * Sends /init. Should be called once the user has requested the content. Does not need
   * a working adapter or player to work. it won't sent start if isInitiated is true.
   *
   * @param {Object} [params] Object of key:value params.
   *
   * @memberof youbora.Plugin.prototype
   */
  fireInit: function(params) {
    if (!this.isInitiated) {
      if (!this.getAdapter() || (this.getAdapter() && !this.getAdapter().flags.isInited && !this.getAdapter().flags.isStarted)) {
        this.viewTransform.nextView()
        this._initComm()
        this._startPings()
        this.initChrono.start()
        this.isInitiated = true

        params = params || {}
        this._send(Constants.WillSendEvent.WILL_SEND_INIT, Constants.Service.INIT, params)
        Log.notice(Constants.Service.INIT + ' ' + (params.title || params.mediaResource))
      }
    }
  },

  /**
   * Sends /error. Should be used when the error is related to out-of-player errors: like async
   * resource load or player loading errors.
   *
   * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
   * @param {String} [msg] Error Message
   * @param {Object} [metadata] Object defining error metadata
   * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
   *
   * @memberof youbora.Plugin.prototype
   */
  fireError: function(object, msg, metadata, level) {
    if (!this.isInitiated && (!this.getAdapter() || (!this.getAdapter().flags.isStarted && !this.getAdapter().flags.isInited))) this.viewTransform.nextView()
    if (!this._comm) this._initComm()
    var params = Util.buildErrorParams(object, msg, metadata, level)

    this._send(Constants.WillSendEvent.WILL_SEND_ERROR, Constants.Service.ERROR, params)
    Log.notice(Constants.Service.ERROR +
      ' ' + params.errorLevel +
      ' ' + params.errorCode
    )

    if (params.errorLevel === 'fatal') {
      this._reset()
      this.viewTransform.nextView()
    }
  },

  /**
   * Calls fireErrors and then stops pings.
   *
   * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
   * @param {String} [msg] Error Message
   * @param {Object} [metadata] Object defining error metadata
   *
   * @memberof youbora.Plugin.prototype
   */
  fireFatalError: function(object, msg, metadata) {
    this.options['ad.afterStop'] = 0
    this.fireError(object, msg, metadata, 'fatal')
    if (this._adapter) { this._adapter.fireStop() } else { this.fireStop() }
  },

  /**
   * Fires /stop. Should be used to terminate sessions once the player is gone or if
   * plugin.fireError() is called.
   *
   * @param {Object} [params] Object of key:value params.
   *
   * @memberof youbora.Plugin.prototype
   */
  fireStop: function(params) {
    if (params && params.end !== undefined && params.end) {
      params.end = undefined
      this.options['ad.afterStop'] = 0
    }
    if (this._adapter) {
      this._adapter.flags.isEnded = true
      if (this._adapter.flags.isPaused) {
        if (!params) {
          params = {}
        }
        params.pauseDuration = this._adapter.chronos.pause.getDeltaTime()
      }
    }
    if (!this._adsAdapter) {
      this.options['ad.afterStop'] = 0
    }
    if (this.options['ad.afterStop'] === 0) {
      if (this._adapter) {
        this._adapter.flags.isStopped = true
      }
      params = params || {}
      this._send(Constants.WillSendEvent.WILL_SEND_STOP, Constants.Service.STOP, params)
      Log.notice(Constants.Service.STOP + ' at ' + params.playhead + 's')
      this._reset()
    }
  }
}

module.exports = PluginFireMixin

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Constants = __webpack_require__(3)
var Log = __webpack_require__(0)
var YBRequest = __webpack_require__(5)

var YouboraInfinity = __webpack_require__(14)

// This file is designed to add extra functionalities to Plugin class

var PluginInfinityMixin = {
  _initInfinity: function () {
    this.infinity.on(YouboraInfinity.Event.NAV, this._navListener.bind(this))
    this.infinity.on(YouboraInfinity.Event.SESSION_START, this._sessionStartListener.bind(this))
    this.infinity.on(YouboraInfinity.Event.SESSION_STOP, this._sessionStopListener.bind(this))
    this.infinity.on(YouboraInfinity.Event.EVENT, this._eventListener.bind(this))
  },

  _sendInfinity: function (willSendEvent, service, params) {
    params = this.requestBuilder.buildParams(params, service)

    var data = {
      params: params,
      plugin: this,
      adapter: this.getAdapter(),
      adsAdapter: this.getAdsAdapter()
    }

    this.emit(willSendEvent, data)

    if (this.infinity._comm && params !== null && this.options.enabled) {
      this.lastServeiceSent = service
      this.infinity._comm.sendRequest(new YBRequest(null, service, params))
    }
  },

  // ---------------------------------------- LISTENERS -----------------------------------------

  _navListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(Constants.WillSendEvent.WILL_SEND_NAV, Constants.Service.NAV, params)

    // start beats
    if (!this._beat.isRunning) this._beat.start()

    Log.notice(Constants.Service.NAV + ' ' + params.route)
  },

  _sessionStartListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(
      Constants.WillSendEvent.WILL_SEND_SESSION_START,
      Constants.Service.SESSION_START,
      params
    )

    // start beats
    if (!this._beat.isRunning) this._beat.start()

    Log.notice(Constants.Service.SESSION_START + ' ' + params.route)
  },

  _sessionStopListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(
      Constants.WillSendEvent.WILL_SEND_SESSION_STOP,
      Constants.Service.SESSION_STOP,
      params
    )

    // stop beats
    if (!this._beat.isRunning) this._beat.stop()

    Log.notice(Constants.Service.SESSION_STOP + ' ' + params.route)
  },

  _eventListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(Constants.WillSendEvent.WILL_SEND_EVENT, Constants.Service.EVENT, params)
    Log.notice(Constants.Service.EVENT + ' ' + params.name)
  },

  /**
   * Sends beat request
   *
   * @param {number} diffTime Time since the last ping
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _sendBeat: function (diffTime) {
    var params = {
      diffTime: diffTime,
      sessions: [this.getSessionId()]
    }

    this._sendInfinity(Constants.WillSendEvent.WILL_SEND_BEAT, Constants.Service.BEAT, params)
    Log.verbose(Constants.Service.BEAT)
  }
}

module.exports = PluginInfinityMixin


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// This file is designed to add extra functionalities to Plugin class

var PluginInfinityGettersMixin = {
  getSessionId: function () {
    return this.storage.getLocal('session')
  },

  getContext: function () {
    return this.storage.getSession('context')
  },

  getStoredData: function () {
    return this.storage.getSession('data')
  },

  getPageName: function () {
    if (document && document.title) {
      return document.title
    }
  },

  getIsSessionExpired: function () {
    var time = this.storage.getSession('lastactive') + this.options['session.expire']
    var now = new Date().getTime()
    return !(this.getSessionId() && (time > now))
  },

  getIsDataExpired: function () {
    var time = this.storage.getSession('lastactive') + this.options['session.expire']
    var now = new Date().getTime()
    return !(this.getStoredData() && (time > now))
  }
}

module.exports = PluginInfinityGettersMixin


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YouboraAdapter = undefined;

var _youboralib = __webpack_require__(10);

var _youboralib2 = _interopRequireDefault(_youboralib);

var _playkitJs = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YouboraAdapter = _youboralib2.default.Adapter.extend({

  constructor: function constructor(player, config) {
    this.config = config;
    YouboraAdapter.__super__.constructor.call(this, player);
  },

  /**  @returns {String} - current plugin version */
  getVersion: function getVersion() {
    return _youboralib2.default.VERSION + '-' + "0.3.3" + '-' + "playkit-js-youbora";
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function getPlayhead() {
    return this.player.currentTime;
  },

  /**  @returns {Number} - current playrate */
  getPlayrate: function getPlayrate() {
    return this.player.playbackRate;
  },

  /**  @returns {Number} - video duration */
  getDuration: function getDuration() {
    return this.player.duration || null;
  },

  /**  @returns {Number} - current bitrate */
  getBitrate: function getBitrate() {
    var activeVideo = this.player.getActiveTracks().video;
    if (activeVideo && activeVideo.bandwidth) {
      return activeVideo.bandwidth;
    }
    return null;
  },

  /**  @returns {String} - rendition */
  getRendition: function getRendition() {
    var activeVideo = this.player.getActiveTracks().video;
    if (activeVideo) {
      return _youboralib2.default.Util.buildRenditionString(activeVideo.width, activeVideo.height, activeVideo.bandwidth);
    }
    return null;
  },

  /**  @returns {String} - title */
  getTitle: function getTitle() {
    return this.config.entryName;
  },

  /**  @returns {Boolean} - true if live and false if VOD */
  getIsLive: function getIsLive() {
    return this.config.entryType === _playkitJs.MediaType.LIVE;
  },

  /**  @returns {String} - resource URL. */
  getResource: function getResource() {
    return this.player.src;
  },

  /**  @returns {String} - player version */
  getPlayerVersion: function getPlayerVersion() {
    return this.config.playerVersion;
  },

  /**  @returns {String} - player's name */
  getPlayerName: function getPlayerName() {
    return this.config.playerName;
  },

  /** @returns {String} - Household identifier */
  getHouseholdId: function getHouseholdId() {
    return this.config.householdId;
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function registerListeners() {
    var Event = this.player.Event;
    // References
    this.references = [];
    this.references[Event.PLAY] = this.playListener.bind(this);
    this.references[Event.LOAD_START] = this.loadListener.bind(this);
    this.references[Event.PAUSE] = this.pauseListener.bind(this);
    this.references[Event.PLAYING] = this.playingListener.bind(this);
    this.references[Event.ERROR] = this.errorListener.bind(this);
    this.references[Event.SEEKING] = this.seekingListener.bind(this);
    this.references[Event.SEEKED] = this.seekedListener.bind(this);
    this.references[Event.PLAYER_STATE_CHANGED] = this.stateChangeListener.bind(this);
    this.references[Event.ENDED] = this.endedListener.bind(this);
    this.references[Event.CHANGE_SOURCE_STARTED] = this.forceEndedListener.bind(this);

    // Register listeners
    for (var key in this.references) {
      this.player.addEventListener(key, this.references[key]);
    }
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function unregisterListeners() {

    // unregister listeners
    if (this.player && this.references) {
      for (var key in this.references) {
        this.player.removeEventListener(key, this.references[key]);
      }
      this.references = [];
    }
  },

  /** @returns {void}
   * @param {Object} logger - playkit logger object.
   * - Bind youbora logs to playkit ones */
  bindLogger: function bindLogger(logger) {
    _youboralib2.default.Log.error = logger.error.bind(logger);
    _youboralib2.default.Log.notice = logger.info.bind(logger);
    _youboralib2.default.Log.warn = logger.warn.bind(logger);
    _youboralib2.default.Log.debug = logger.debug.bind(logger);
    _youboralib2.default.Log.verbose = function () {};
  },

  /** @returns {void} - Listener for 'load_start' event. */
  loadListener: function loadListener() {
    if (this.player.config.playback.preload !== "auto") {
      this.playListener();
    }
  },

  /** @returns {void} - Listener for 'play' event. */
  playListener: function playListener() {
    if (!this.flags.isStarted) {
      this.fireStart();
      this.plugin.options['content.isLive.noSeek'] = !this.player.isDvr();
      this.initialPlayhead = this.getPlayhead();
    }
  },

  /** @returns {void} - Listener for 'pause' event. */
  pauseListener: function pauseListener() {
    this.firePause();
  },

  /** @returns {void} - Listener for 'playing' event. */
  playingListener: function playingListener() {
    this.fireResume();
    this.fireSeekEnd();
    this.fireBufferEnd();
    this.fireJoin();
  },

  /** @returns {void}
   * @param {Object} e - object with payload including severity, code and data.
   * - The name of the plugin.- Listener for 'error' event. */
  errorListener: function errorListener(e) {
    if (e.payload.severity === _playkitJs.Error.Severity.CRITICAL) {
      this.fireError(e.payload.code, e.payload.data);
      this.fireStop();
    }
  },

  /** @returns {void} - Listener for 'seeking' event. */
  seekingListener: function seekingListener() {
    if (!this.flags.isBuffering && this.initialPlayhead !== this.getPlayhead()) {
      this.fireSeekBegin();
    }
  },

  /** @returns {void} - Listener for 'seeked' event. */
  seekedListener: function seekedListener() {
    this.fireSeekEnd();
  },

  /** @returns {void}
   * @param {Object} e - object with the payload with states.
   * - Listener for 'player_state_changed' event. */
  stateChangeListener: function stateChangeListener(e) {
    if (e.payload.newState.type === this.player.State.BUFFERING) {
      if (this.initialPlayhead !== this.getPlayhead()) {
        if (!this.player.isDvr() && this.getIsLive() && this.flags.isPaused) {
          return null;
        }
        this.fireBufferBegin();
      }
    }
    if (e.payload.oldState.type === this.player.State.BUFFERING) {
      this.fireBufferEnd();
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  endedListener: function endedListener() {
    if (!this.stopBlockedByAds) {
      this.fireStop();
      this.reset();
    }
  },

  /** @returns {void} - Listener for 'ended' event. */
  forceEndedListener: function forceEndedListener() {
    this.fireStop();
    this.reset();
  },

  /** @returns {void} - Restores initial values to start new views */
  reset: function reset() {
    this.stopBlockedByAds = false;
    this.initialPlayhead = null;
  }
});
exports.YouboraAdapter = YouboraAdapter;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeAdsAdapter = undefined;

var _youboralib = __webpack_require__(10);

var _youboralib2 = _interopRequireDefault(_youboralib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NativeAdsAdapter = _youboralib2.default.Adapter.extend({

  /**  @returns {String} - current plugin version */
  getVersion: function getVersion() {
    return _youboralib2.default.VERSION + '-' + "0.3.3" + '-' + "playkit-js-youbora" + '-ads';
  },

  /**  @returns {Number} - current playhead of the video */
  getPlayhead: function getPlayhead() {
    return this.currentTime;
  },

  /**  @returns {Number} - video duration */
  getDuration: function getDuration() {
    return this.adObject.duration;
  },

  getTitle: function getTitle() {
    return this.adObject.title;
  },

  /**  @returns {String} - current ad position (only ads) */
  getPosition: function getPosition() {
    var PREROLL = "pre";
    var MIDROLL = "mid";
    var POSTROLL = "post";
    var returnValue = MIDROLL;
    switch (this.adPosition) {
      case "preroll":
        returnValue = PREROLL;
        break;
      case "postroll":
        returnValue = POSTROLL;
        break;
      case "midroll":
        break;
      default:
        if (!this.plugin.getAdapter().flags.isJoined) {
          returnValue = PREROLL;
        } else if (!this.plugin.getAdapter().isLive() && this.plugin.getAdapter().getPlayhead() > this.plugin.getAdapter().getDuration() - 1) {
          returnValue = POSTROLL;
        }
    }
    return returnValue;
  },

  /**  @returns {void} - Register listeners to this.player. */
  registerListeners: function registerListeners() {
    this.monitorPlayhead(true, false); //playhead monitor for bufferunderrun

    var Event = this.player.Event;
    // Register listeners
    this.references = [];
    this.references[Event.AD_LOADED] = this.loadedAdListener.bind(this);
    this.references[Event.AD_STARTED] = this.startAdListener.bind(this);
    this.references[Event.AD_RESUMED] = this.resumeAdListener.bind(this);
    this.references[Event.AD_PAUSED] = this.pauseAdListener.bind(this);
    this.references[Event.AD_CLICKED] = this.clickAdListener.bind(this);
    this.references[Event.AD_SKIPPED] = this.skipAdListener.bind(this);
    this.references[Event.AD_COMPLETED] = this.stopAdListener.bind(this);
    this.references[Event.AD_ERROR] = this.errorAdListener.bind(this);
    this.references[Event.AD_PROGRESS] = this.progressAdListener.bind(this);
    this.references[Event.ALL_ADS_COMPLETED] = this.allAdsCompletedListener.bind(this);

    for (var key in this.references) {
      this.player.addEventListener(key, this.references[key]);
    }
  },

  /**  @returns {void} - Unregister listeners to this.player. */
  unregisterListeners: function unregisterListeners() {
    // Disable playhead monitoring
    this.monitor.stop();

    // unregister listeners
    if (this.player && this.references) {
      for (var key in this.references) {
        this.player.removeEventListener(key, this.references[key]);
      }
      this.references = [];
    }
  },

  loadedAdListener: function loadedAdListener(e) {
    this.adObject = e.payload.extraAdData;
    this.adPosition = e.payload.adType;
  },

  startAdListener: function startAdListener() {
    this.plugin.getAdapter().stopBlockedByAds = true;
    this.plugin.getAdapter().fireStart();
    this.fireStart();
  },

  stopAdListener: function stopAdListener() {
    this.fireStop();
    this.currentTime = null;
    this.adObject = null;
  },

  resumeAdListener: function resumeAdListener() {
    this.fireResume();
  },

  pauseAdListener: function pauseAdListener() {
    this.firePause();
  },

  clickAdListener: function clickAdListener() {
    this.fireClick({ url: this.adObject.clickThroughUrl });
  },

  skipAdListener: function skipAdListener() {
    this.fireStop({ skipped: true });
    this.currentTime = null;
    this.adObject = null;
  },

  errorAdListener: function errorAdListener(e) {
    this.fireError(e.payload.error.code, e.payload.error.message);
  },

  allAdsCompletedListener: function allAdsCompletedListener() {
    this.fireStop();
    this.plugin.getAdapter().stopBlockedByAds = false;
    if (this.getPosition() === "post") this.plugin.getAdapter().fireStop();
  },

  progressAdListener: function progressAdListener(e) {
    this.currentTime = e.payload.adProgress.currentTime;
    this.fireJoin();
    this.monitor.skipNextTick();
  }
});
exports.NativeAdsAdapter = NativeAdsAdapter;

/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-youbora.js.map