// @flow
import {registerPlugin} from '@playkit-js/playkit-js';
import {Youbora as Plugin} from './youbora';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {Plugin, VERSION, NAME};

/**
 * The plugin name.
 * @type {string}
 * @const
 */
const pluginName = 'youbora';
/**
 * Register the plugin in player's registry.
 */
registerPlugin(pluginName, Plugin);
