// @flow
import {registerPlugin} from 'playkit-js'
import Youbora from './youbora'

declare var __VERSION__: string;
declare var __NAME__: string;

export default Youbora;
export {__VERSION__ as VERSION, __NAME__ as NAME};

/**
 * The plugin name.
 * @type {string}
 * @const
 */
const pluginName = "youbora";
/**
 * Register the plugin in player's registry.
 */
registerPlugin(pluginName, Youbora);

