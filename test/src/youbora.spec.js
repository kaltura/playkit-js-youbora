//eslint-disable-next-line no-unused-vars
import youbora from '../../src/youbora.js'
import $YB from '../../src/youbora.lib.min'
import {loadPlayer} from 'playkit-js'
import * as TestUtils from 'playkit-js/test/src/utils/test-utils'
import * as pkg from '../../package.json'


describe('YouboraAdapter', function () {
  let player, sandbox, sendSpy, config, CMconfig;

  const playerName = 'player test';
  const playerVersion = '1.2.3';
  const system = 'powerdev';
  const user = 'user-id';
  const resource = 'https://www.w3schools.com/tags/movie.mp4';

  /**
   * @function getJsonFromUrl
   * @param {string} url - url
   * @returns {Object} - params
   */
  function getJsonFromUrl(url) {
    let result = {};
    url.replace('?', '&').split('&').forEach(function (part) {
      let item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

  /**
   * @param {Object} analyticsParams - params
   * @return {void}
   */
  function verifyStartProperties(analyticsParams) {
    analyticsParams.system.should.equal(system);
    analyticsParams.player.should.equal(playerName);
    analyticsParams.user.should.equal(user);
    analyticsParams.hashTitle.should.equal('true');
    (analyticsParams.referer === document.referrer || analyticsParams.referer === location.href).should.be.true;
    analyticsParams.pluginVersion.should.equal($YB.version + '-' + pkg.version + '-' + playerName);
    analyticsParams.playerVersion.should.equal(playerName + '-' + playerVersion);
    analyticsParams.resource.should.equal(resource);
    analyticsParams.duration.should.equal('13');
    analyticsParams.live.should.equal('false');
    analyticsParams.rendition.should.equal('200x100@10Kbps');
    analyticsParams.title.should.equal('entry name');
    analyticsParams.properties.should.equal('{"test":"test","kalturaInfo":{"entryId":"1_rwbj3j0a","sessionId":"7296b4fd-3fcb-666d-51fc-34065579334c","uiConfId":123456}}');
    analyticsParams.param1.should.equal('param-1');
    analyticsParams.param3.should.equal('param-3');
    analyticsParams.adsExpected.should.equal('false');
    analyticsParams.pingTime.should.equal('5');
  }

  /**
   * Verify change media start params
   * @param {Object} analyticsParams - params
   * @return {void}
   */
  function verifyCMStartProperties(analyticsParams) {
    analyticsParams.system.should.equal(system);
    analyticsParams.player.should.equal(playerName);
    analyticsParams.user.should.equal(user);
    analyticsParams.hashTitle.should.equal('true');
    (analyticsParams.referer === document.referrer || analyticsParams.referer === location.href).should.be.true;
    analyticsParams.pluginVersion.should.equal($YB.version + '-' + pkg.version + '-' + playerName);
    analyticsParams.playerVersion.should.equal(playerName + '-' + playerVersion);
    analyticsParams.resource.should.equal(resource);
    analyticsParams.duration.should.equal('13');
    analyticsParams.live.should.equal('true');
    analyticsParams.rendition.should.equal('400x200@20Kbps');
    analyticsParams.title.should.equal('change media');
    analyticsParams.properties.should.equal('{"test":"test change media","kalturaInfo":{"entryId":"34584t5874","sessionId":"6017d4cc-81a5-f21c-81da-f709f64ef558","uiConfId":654321}}');
    analyticsParams.param2.should.equal('param-2');
    analyticsParams.param4.should.equal('param-4');
    analyticsParams.adsExpected.should.equal('false');
    analyticsParams.pingTime.should.equal('5');
  }

  /**
   * @param {Object} analyticsParams - params
   * @return {void}
   */
  function verifyPingProperties(analyticsParams) {
    analyticsParams.bitrate.should.equal('20000');
  }

  before(function () {
    config = {
      sources: {
        progressive: [{
          "mimetype": "video/mp4",
          "url": resource,
          "id": "1_rwbj3j0a_11311,applehttp",
          "width": 200,
          "height": 100,
          "bandwidth": 10000
        }]
      },
      playback: {
        "preload": "auto"
      },
      plugins: {
        youbora: {
          playerVersion: playerVersion,
          playerName: playerName,
          options: {
            'accountCode': system,
            'username': user,
            'properties': {
              test: 'test'
            },
            'extraParams': {
              'param1': 'param-1',
              'param3': 'param-3'
            }
          }
        }
      }
    };
    CMconfig = {
      sources: {
        progressive: [{
          "mimetype": "video/mp4",
          "url": resource,
          "id": "1_rwbj3j0a_11311,applehttp",
          "width": 400,
          "height": 200,
          "bandwidth": 20000
        }]
      },
      playback: {
        "preload": "auto"
      },
      plugins: {
        youbora: {
          entryId: "34584t5874",
          entryName: "change media",
          entryType: "Live",
          sessionId: "6017d4cc-81a5-f21c-81da-f709f64ef558",
          uiConfId: 654321,
          playerVersion: playerVersion,
          playerName: playerName,
          options: {
            'accountCode': system,
            'username': user,
            'properties': {
              test: 'test change media'
            },
            'extraParams': {
              'param2': 'param-2',
              'param4': 'param-4'
            }
          }
        }
      }
    };
  });

  beforeEach(function () {
    player = loadPlayer(config);
    player.configure({
      plugins: {
        youbora: {
          entryId: "1_rwbj3j0a",
          entryName: "entry name",
          entryType: "vod",
          sessionId: "7296b4fd-3fcb-666d-51fc-34065579334c",
          uiConfId: 123456
        }
      }
    });
    sandbox = sinon.sandbox.create();
    sendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
  });

  afterEach(function () {
    sandbox.restore();
    player.destroy();
    TestUtils.removeVideoElementsFromTestPage();
  });

  it('should send start, join, stop, start and ping for change media', (done) => {
    setTimeout(() => {
      player.addEventListener(player.Event.CHANGE_SOURCE_ENDED, () => {
        setTimeout(() => {
          let startParams = getJsonFromUrl(sendSpy.getCall(0).thisValue.responseURL);
          verifyStartProperties(startParams);
          let joinRequest = sendSpy.getCall(1).thisValue.responseURL;
          (joinRequest.indexOf("join") > -1).should.be.true;
          let stopRequest = sendSpy.getCall(2).thisValue.responseURL;
          (stopRequest.indexOf("stop") > -1).should.be.true;
          let CMstartParams = getJsonFromUrl(sendSpy.getCall(3).thisValue.responseURL);
          verifyCMStartProperties(CMstartParams);
          setTimeout(() => {
            let pingParams = getJsonFromUrl(sendSpy.lastCall.thisValue.responseURL);
            verifyPingProperties(pingParams);
            done();
          }, 5000);
        }, 1000);
        player.ready().then(() => {
          player.play();
        });
      });
      player.configure(CMconfig);
    }, 1000);
    player.ready().then(() => {
      player.play();
    });
  });
});
