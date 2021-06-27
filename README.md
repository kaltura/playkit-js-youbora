# PlayKit JS Youbora - [Youbora analytics SDK] plugin for the [PlayKit JS Player]

[![Build Status](https://travis-ci.org/kaltura/playkit-js-youbora.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-youbora)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-youbora/latest.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-youbora)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-youbora/canary.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-youbora/v/canary)

PlayKit JS Youbora plugin integrates [Youbora analytics SDK] with the [PlayKit JS Player].

PlayKit JS Youbora is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[youbora analytics sdk]: https://nicepeopleatwork.com/youbora/
[npaw developer portal]: http://developer.nicepeopleatwork.com/
[flow]: https://flow.org/
[ecmascript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[babel]: https://babeljs.io

## Getting Started

### Prerequisites

The plugin requires [PlayKit JS Player] to be loaded first.

The plugin uses the [Youbora analytics SDK] for HTML5.

[playkit js player]: https://github.com/kaltura/playkit-js

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
<div id="player-placeholder" style="height:360px; width:640px">
  <script type="text/javascript">
    var playerContainer = document.querySelector("#player-placeholder");
    var config = {
     ...
     plugins: {
       youbora: {
         options: {
           accountCode: "YOUR_ACCOUNT_CODE"
         }
       }
     }
     ...
    };
    var player = playkit.core.loadPlayer(config);
    playerContainer.appendChild(player.getView());
    player.play();
  </script>
</div>
```

## Configuration

This plugin configuration reflects Youbora options,
For full Youbora options see: https://developer.nicepeopleatwork.com/apidocs/js6/Options.html

## Running the tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari

[karma]: https://karma-runner.github.io/1.0/index.html

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
