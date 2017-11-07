//@flow
import {registerPlugin, BasePlugin} from 'playkit-js'
import YouboraAdapter from './youbora-adapter'

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
export default class Youbora extends BasePlugin {

  /**
   * The default configuration of the plugin.
   * @type {Object}
   * @static
   */
  static defaultConfig: Object = {
    options: {
      haltOnError: false
    }
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
  constructor(name: string, player: Player, config: Object) {
    super(name, player, config);
    this._youbora = new YouboraAdapter(this.player, this.config);
    this._addBindings();
    this._setup();
  }

  /**
   * Updates the configuration of the plugin.
   * @param {Object} update - The updated configuration.
   * @override
   * @returns {void}
   */
  updateConfig(update: Object): void {
    super.updateConfig(update);
    this._youbora.setOptions(update.options);
    this._addPlayerMetadata();
  }

  /**
   * Reset the plugin
   * @return {void}
   */
  reset(): void {
    if (this._youbora) {
      this._youbora.reset();
    }
  }

  /**
   * Add the player metadata to the plugin config.
   * @function
   * @private
   * @returns {void}
   */
  _addPlayerMetadata(): void {
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
  _addBindings(): void {
    // Bind the plugin logger to the youbora sdk logger
    YouboraAdapter.bindLogger(this.logger);
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

declare var __VERSION__: string;
declare var __NAME__: string;

export {__VERSION__ as VERSION, __NAME__ as NAME};

/**
 * Register the plugin in player's registry.
 */
registerPlugin(pluginName, Youbora);
