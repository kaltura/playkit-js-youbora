# PlayKit JS Youbora - [Youbora analytics SDK] plugin for the [PlayKit JS Player]

[![Build Status](https://travis-ci.com/kaltura/playkit-js-youbora.svg?token=s2ZQw18ukx9Q6ePzDX3F&branch=master)](https://travis-ci.com/kaltura/playkit-js-youbora)

PlayKit JS Youbora plugin integrates [Youbora analytics SDK] with the [PlayKit JS Player].
 
PlayKit JS Youbora is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[Youbora analytics SDK]: https://nicepeopleatwork.com/youbora/
[NPAW developer portal]: http://developer.nicepeopleatwork.com/
[Flow]: https://flow.org/
[ECMAScript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[Babel]: https://babeljs.io

## Getting Started

### Prerequisites
The plugin requires [PlayKit JS Player] to be loaded first.

The plugin uses the [Youbora analytics SDK] for HTML5.

[Playkit JS Player]: https://github.com/kaltura/playkit-js

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/kaltura/playkit-js-youbora.git
cd playkit-js-youbora
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the library in your test page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/playkit.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/playkit-youbora.js"></script>
<div id="videoContainer" style="height:360px;width:640px">
<script type="text/javascript">
var config = {
 plugins: {
   youbora: {
     adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&cmsid=496&vid=short_onecue&correlator='
   }
 }
};
var player = playkit.loadPlayer("videoContainer", config);
player.play();
</script>
```

## Configuration

//TODO

## Running the tests

Tests can be run localy via [Karma], which will run on Chrome, Firefox and Safari

[Karma]: https://karma-runner.github.io/1.0/index.html
```
yarn run test
```

You can test individual browsers:
```
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

### And coding style tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.


## Compatibility

TBD

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kaltura/playkit-js-youbora/tags). 

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
