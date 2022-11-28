# Youbora sessions integration

## To integrate youbora sessions follow this documentation:
[Youbora Integration doc](https://documentation.npaw.com/npaw-integration/docs/application-analytics-custom-events-data-collection)


This means: create a youbora plugin instance that can be accessed globally, and call fireEvent() and fireNav() to report various events.

## Mix session analytics and video analytics
If the player is instantiated after the plugin tracking sessions, the connection between both will be done automatically.
To do that follow the standard guide for kaltura player with youbora.


### Step 1
* Include the youbora sdk code to the app using a script or npm
 
#### script
`<script  type="text/javascript" src="https://smartplugin.youbora.com/v6/js/adapters/html5/6.8.0/sp.min.js"></script>`

#### npm

`"youboralib": "6.8.0"`
 
### Step 2

* Create Youbora plugin and call `begin` before calling the player instance
 
```
window.plugin = new youbora.Plugin({

 accountCode: yourAccountCode,

'session.context': true // read context note

});
```
 
```
window.plugin.infinity.begin({

   'content.customDimension.1': 'my value 1',

   'content.customDimension.2': 'my value 2'

});
```
 

 

### Optional
 * repoert navigation

`window.plugin.infinity.fireNav("app-aabbb");`

### Step 3

* Initialize the Player youbora plugin with the relevant youbora config.

 
### Start Using the plugin to send events

* Send to youbora app events when needed
 
```
window.plugin.infinity.fireEvent('appEvent1');

       window.plugin.infinity.fireEvent( 'appEvent2', //Name of the event

      { // Dimensions Strings

         terms: 'searchedTerms'

      },

      { // Values numbers

         aaa: 'bbb'

     }

  );

  window.plugin.infinity.end();
```
 

### Example: 

* [Example](https://codepen.io/giladna/pen/dyKjXZz)
