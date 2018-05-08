//@flow
import { BasePlugin } from 'playkit-js'
import youbora from 'youboralib'
import { YouboraAdapter } from './adapter/adapter'
import { NativeAdsAdapter } from './adapter/ads/nativeads'

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
    options: {}
  };

  /**
   * Define under what conditions the youbora plugin is valid.
   * @returns {boolean} - Whether the plugin is valid or not.
   * @static
   */
  static isValid (): boolean {
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
    this._youbora = new youbora.Plugin(this.config.options);
    this._youbora.setAdapter(new YouboraAdapter(player, config))
    if (player.config.plugins.ima) {
      this._youbora.setAdsAdapter(new NativeAdsAdapter(player))
    }
    this._addBindings();
    this._setup();
  }

  /**
   * Updates the configuration of the plugin.
   * @param {Object} update - The updated configuration.
   * @override
   * @returns {void}
   */
  updateConfig (update: Object): void {
    super.updateConfig(update);
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
  reset (): void {

  }

  /**
   * Add the player metadata to the plugin config.
   * @function
   * @private
   * @returns {void}
   */
  _addPlayerMetadata (): void {
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
  _addBindings (): void {
    // Bind the plugin logger to the youbora sdk logger
    this._youbora.getAdapter().bindLogger(this.logger);
  }

  /**
   * Plugin setup operations.
   * @function
   * @private
   * @returns {void}
   */
  _setup (): void {

  }

  /**
   * Plugin destroy operations.
   * @function
   * @public
   * @returns {void}
   */
  destroy (): void {
    this._youbora.fireStop()
  }
}
