//@flow
import {registerPlugin, BasePlugin} from 'playkit-js'
import YouboraPlugin from './youbora/youbora-plugin'
//eslint-disable-next-line no-unused-vars
import sample from '../samples/index.js'

/**
 *
 * @type {string}
 */
const pluginName = "youbora";

/**
 *
 */
class Youbora extends BasePlugin {

  /**
   *
   * @type {Object}
   */
  static defaultConfig: Object = {
    accountCode: 'powerdev'
  };

  /**
   *
   * @returns {boolean}
   */
  static isValid(): boolean {
    return true;
  }

  /**
   *
   * @param name
   * @param player
   * @param config
   */
  constructor(name, player, config) {
    super(name, player, config);
    this._youbora = new YouboraPlugin(this.player, this.config);
    this._addBindings();
    this._setup();
  }

  /**
   *
   * @private
   */
  _addBindings(): void {
    YouboraPlugin.bindLogger(this.logger);
  }

  /**
   *
   * @private
   */
  _setup(): void {
    this._youbora.registerListeners();
  }

  /**
   *
   */
  destroy(): void {
    if (this._youbora) {
      this._youbora.endedHandler();
    }
  }
}

/**
 *
 */
registerPlugin(pluginName, Youbora);
