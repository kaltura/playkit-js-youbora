//eslint-disable-next-line no-unused-vars
import youbora from '../../src'
//import { youbora as yblib } from 'youboralib'
import { loadPlayer } from 'playkit-js'
import * as TestUtils from 'playkit-js/test/src/utils/test-utils'

describe('YouboraAdapter', function () {
  let player, sandbox, sendSpy, config, CMconfig;
  const playerName = 'player test';
  const playerVersion = '1.2.3';
  const system = 'powerdev';
  const user = 'user-id';
  const householdId = 'householdCode'
  const resource = 'https://www.w3schools.com/tags/movie.mp4';

  /**
   * @function getJsonFromUrl
   * @param {string} url - url
   * @returns {Object} - params
   */
  function getJsonFromUrl (url) {
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
  function verifyStartProperties (analyticsParams) {
    analyticsParams.accountCode.should.equal(system);
    analyticsParams.player.should.equal(playerName);
    analyticsParams.username.should.equal(user);
    (analyticsParams.referer === document.referrer || analyticsParams.referer === location.href).should.be.true;
    analyticsParams.pluginVersion.should.equal('6.3.2' + '-' + __VERSION__ + '-' + __NAME__);
    analyticsParams.playerVersion.should.equal(playerVersion);
    analyticsParams.mediaResource.should.equal(resource);
    analyticsParams.mediaDuration.should.equal('13');
    analyticsParams.live.should.equal('false');
    analyticsParams.rendition.should.equal('200x100@10Kbps');
    analyticsParams.title.should.equal('entry name');
    analyticsParams.properties.should.equal('{"test":"test"}');
    analyticsParams.householdId.should.equal('householdCode');
    analyticsParams.param1.should.equal('param-1');
    analyticsParams.param3.should.equal('param-3');
  }

  /**
   * Verify change media start params
   * @param {Object} analyticsParams - params
   * @return {void}
   */
  function verifyCMStartProperties (analyticsParams) {
    analyticsParams.accountCode.should.equal(system);
    analyticsParams.player.should.equal(playerName);
    analyticsParams.username.should.equal(user);
    (analyticsParams.referer === document.referrer || analyticsParams.referer === location.href).should.be.true;
    analyticsParams.pluginVersion.should.equal('6.3.2' + '-' + __VERSION__ + '-' + __NAME__);
    analyticsParams.playerVersion.should.equal(playerVersion);
    analyticsParams.mediaResource.should.equal(resource);
    analyticsParams.mediaDuration.should.equal('13');
    analyticsParams.live.should.equal('false');
    analyticsParams.rendition.should.equal('400x200@20Kbps');
    analyticsParams.title.should.equal('change media');
    analyticsParams.properties.should.equal('{"test":"test change media"}');
    analyticsParams.householdId.should.equal('householdCode');
    analyticsParams.param2.should.equal('param-2');
    analyticsParams.param4.should.equal('param-4');
  }

  /**
   * @param {Object} analyticsParams - params
   * @return {void}
   */
  function verifyPingProperties (analyticsParams) {
    analyticsParams.playrate.should.equal('1');
    analyticsParams.pingTime.should.equal('5');
    // no bitrate, safari limitation
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
        "preload": "auto",
        "autoplay": true
      },
      plugins: {
        youbora: {
          playerVersion: playerVersion,
          playerName: playerName,
          householdId: householdId,
          options: {
            accountCode: system,
            username: user,
            'content.metadata': {
              test: 'test'
            },
            'extraparam.1': 'param-1',
            'extraparam.3': 'param-3'
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
          entryType: "Vod",
          sessionId: "6017d4cc-81a5-f21c-81da-f709f64ef558",
          uiConfId: 654321,
          playerVersion: playerVersion,
          playerName: playerName,
          householdId: householdId,
          options: {
            accountCode: system,
            username: user,
            'content.metadata': {
              test: 'test change media'
            },
            'extraparam.2': 'param-2',
            'extraparam.4': 'param-4'
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
          uiConfId: 123456,
          playerVersion: playerVersion,
          playerName: playerName,
          householdId: householdId,
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

  it('should send init, start, join, stop, start and ping for change media', (done) => {
    setTimeout(() => {
      player.addEventListener(player.Event.CHANGE_SOURCE_ENDED, () => {
        setTimeout(() => {
          var positionIncrease = 0
          if (sendSpy.getCall(0).thisValue.responseURL.includes('/init')) {
            positionIncrease += 1
          }
          let startParams = getJsonFromUrl(sendSpy.getCall(0 + positionIncrease).thisValue.responseURL);
          verifyStartProperties(startParams);
          let joinRequest = sendSpy.getCall(1 + positionIncrease).thisValue.responseURL;
          (joinRequest.indexOf("join") > -1).should.be.true;
          if (sendSpy.getCall(2 + positionIncrease).thisValue.responseURL.includes('/pause')) {
            positionIncrease += 1
          }
          let stopRequest = sendSpy.getCall(2 + positionIncrease).thisValue.responseURL;
          (stopRequest.indexOf("stop") > -1).should.be.true;
          if (sendSpy.getCall(3 + positionIncrease).thisValue.responseURL.includes('/init')) {
            positionIncrease += 1
          }
          let CMstartParams = getJsonFromUrl(sendSpy.getCall(3 + positionIncrease).thisValue.responseURL);
          verifyCMStartProperties(CMstartParams);
          setTimeout(() => {
            let pingParams = getJsonFromUrl(sendSpy.lastCall.thisValue.responseURL);
            verifyPingProperties(pingParams);
            done();
          }, 5000);
        }, 2000);
        player.ready().then(() => {
          player.play();
        });
      });
      player.configure(CMconfig);
    }, 2850);
    player.ready().then(() => {
      player.play();
    });
  });
});
