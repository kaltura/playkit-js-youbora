//@flow
import * as Playkit from 'playkit-js'
import YouboraPlugin from './youbora/youbora-plugin'

/**
 *
 * @type {string}
 */
const pluginName = "youbora";

/**
 *
 */
class Youbora extends Playkit.BasePlugin {

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
Playkit.registerPlugin(pluginName, Youbora);
