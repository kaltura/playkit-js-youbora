# Youbora Plugin Integration


Youbora provides a business intelligence solution for broadcasters, OTTs, telcos and media to support your business decisions and drive performance. 

The ability to harness data across various integrated capabilities and services has become increasingly important to support multiple organizations across a video business, including marketing, and to drive consumer engagement and loyalty.

The Youbora player plugin is integrated with the Kaltura player. The plugin listens and reports all the different player states in the current video session to Youbora Analytics. By taking all the data from inside the player, Youbora Analytics is capable of measuring the quality of the video experience from its source, the end user, and in turn analyzing the delivery process end to end.

Once you have a player instance you may want to be able to track playback behaviour and playback trends.
Using Youbora plugin you can achieve this easily.


## Youbora plugin options documentation
[Youbora Integration doc](https://documentation.npaw.com/integration-docs/docs/setting-options-and-metadata)


When an appication is integrating Youbora plugin to with Kaltura Player, it has to be aware of it's account conde on Youbora backend.

Without providing this account code to the pluing config, the plugin will not function as expected.

The Account code is the minimum config that is required by the plugin.


The Youbore plugin will work with or without IMA ads and report the playback lifecycle events according to the given configuration.

The Youbore plugin is tied to the player data model and the player events model, the player will send the required information to Youbora once it is reuired by the Youbora events or the Youbora pings.


* The Youbora plugin may receive many different types of configurations from the app, hence the app configuration will overide the player internal calculated data once there is conflict between the two.


### Simple Example:

```
"plugins": {
     "youbora": {
		  "options": {
		    "accountCode": "ACCOUNT_CODE",
		    "user.name": "qwas.xxxx",
		    "app.releaseVersion": "1.2.3",
		    "app.name": "com.kaltura.web",
		    "content.channel": "SBC HD",
		    "content.genre": "drama",
		    "content.title": "ABC",
		    "content.program": "BBC",
		    "content.customDimension.1": 12345,
		    "content.customDimension.2": "abcd"
		  }
	}
}
```

* [avaliable configuration options](https://bitbucket.org/npaw/lib-plugin-js/src/master/src/plugin/options.js)

Note: `content.customDimension` are values that can be reported as extra information by application and it will be stored in the Youbora reports.

Usually only 2 `content.customDimension` are available to use and customers can use up to 20 values but it may require extra charge from Youbora.

### Debug The events

* you can track the Youbora events which are fired in the dev tools on the network section by filtering the network section on `youbora` key word.

The Youbora will fire events related to player init, start, join, buffer, errors, user interactions and also keep alive pings every 5 seconds. In case IMA ads are playing it will also send ad playback related event 

### [Current Youbora library version which is in use by the kaltura player can be found here](https://github.com/kaltura/playkit-js-youbora/blob/4160a7f5990052cf3b5a05cfcbec01a62d1b26ea/package.json#L100)


### [Youbora library latest version can be found here](https://bitbucket.org/npaw/lib-plugin-js/src/master/CHANGELOG.md)

 
