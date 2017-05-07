//@flow
import * as Playkit from 'playkit-js'
// Import the plugin framework from Playkit system
import YouboraPlugin from './youbora/plugin'

// Define the plugin name
const pluginName = "youbora";
// Define the plugin class
// Important: plugin must derived from BasePlugin
class Youbora extends Playkit.BasePlugin {

  // You can define private members for your plugin

  // You can override and define your default configuration for the plugin

  // Your plugin must implement isValid method
  static isValid() {
    return true;
  }

  /**
   * Your plugin constructor gets out of the box 3 params:
   * @param name Plugin name
   * @param player Player reference
   * @param config Plugin config
   */
  constructor(name, player, config) {
    // Step 1: call the super with the constructor params
    super(name, player, config);

    this.logger.info("in constructor");

    // Now you have access to the BasePlugin members:
    // 1. config: The runtime configuration of the plugin
    // 2. name: The name of the plugin
    // 3. logger: The logger of the plugin
    // 4. player: Reference to the actual player
    // 5. eventManager: The event manager of the plugin

    // Step 2: do any necessary setup actions
    this._configure();
    this._setup();
    this._addBindings();
  }

  _configure() {
    // The config already holds the runtime configuration which is merging between the default config and the user config
    YouboraPlugin.bindLogger(this.logger)
    this.youbora = new YouboraPlugin(this.player, this.config)
  }


  _setup() {

  }

  _addBindings() {
    // Register to the play event
    this.youbora.registerListeners()
  }

  // Your plugin must implement destroy method
  destroy() {
    // Do any necessary destroy actions

  }
}

// Register the plugin in Playkit system
Playkit.registerPlugin(pluginName, Youbora);

window.Playkit = Playkit;
