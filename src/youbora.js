//@flow
import {registerPlugin, BasePlugin} from 'playkit-js'
import YouboraPlugin from './youbora/youbora-plugin'
//eslint-disable-next-line no-unused-vars
import sample from '../samples/index.js'

/**
 * The plugin name.
 * @type {string}
 * @const
 */
const pluginName = "youbora";

/**
 * Youbora plugin for analytics.
 * @classdesc
 */
class Youbora extends BasePlugin {

  /**
   * The default configuration of the plugin.
   * @type {Object}
   * @static
   */
  static defaultConfig: Object = {
    accountCode: 'powerdev'
  };

  /**
   * Define under what conditions the youbora plugin is valid.
   * @returns {boolean} - Whether the plugin is valid or not.
   * @static
   */
  static isValid(): boolean {
    return true;
  }

  /**
   * @constructor
   * @param {string} name - The name of the plugin.
   * @param {Player} player - Access to the player reference.
   * @param {Object} config - The plugin configuration.
   */
  constructor(name, player, config) {
    super(name, player, config);
    this._youbora = new YouboraPlugin(this.player, this.config);
    this._addBindings();
    this._setup();
  }

  /**
   * Add the necessary bindings.
   * @function
   * @private
   * @returns {void}
   */
  _addBindings(): void {
    // Bind the plugin logger to the youbora sdk logger
    YouboraPlugin.bindLogger(this.logger);
  }

  /**
   * Plugin setup operations.
   * @function
   * @private
   * @returns {void}
   */
  _setup(): void {
    this._youbora.registerListeners();
  }

  /**
   * Plugin destroy operations.
   * @function
   * @public
   * @returns {void}
   */
  destroy(): void {
    if (this._youbora) {
      this._youbora.endedHandler();
    }
  }
}

/**
 * Register the plugin in player's registry.
 */
registerPlugin(pluginName, Youbora);
