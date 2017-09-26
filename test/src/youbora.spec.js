//eslint-disable-next-line no-unused-vars
import youbora from '../../src/youbora.js'
import $YB from '../../src/youbora.lib.min'
import {loadPlayer} from 'playkit-js'
import * as TestUtils from 'playkit-js/test/src/utils/test-utils'
import * as pkg from '../../package.json'


describe('YouboraAdapter', function () {
  let player, sandbox, sendSpy, config;

  const playerName = 'player test';
  const playerVersion = '1.2.3';

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
    analyticsParams.system.should.equal('powerdev');
    analyticsParams.player.should.equal(playerName);
    analyticsParams.user.should.equal('user-id');
    analyticsParams.hashTitle.should.equal('true');
    (analyticsParams.referer === document.referrer || analyticsParams.referer === location.href).should.be.true;
    analyticsParams.pluginVersion.should.equal($YB.version + '-' + pkg.version + '-' + playerName);
    analyticsParams.playerVersion.should.equal(playerName + '-' + playerVersion);
    analyticsParams.resource.should.equal('https://www.w3schools.com/tags/movie.mp4');
    analyticsParams.duration.should.equal('13');
    analyticsParams.live.should.equal('false');
    analyticsParams.rendition.should.equal('200x100@10Kbps');
    analyticsParams.properties.should.equal('{"test":"test","kalturaInfo":{"entryId":"1_rwbj3j0a","sessionId":"7296b4fd-3fcb-666d-51fc-34065579334c","uiConfId":123456}}');
    analyticsParams.param1.should.equal('param-1');
    analyticsParams.param3.should.equal('param-3');
    analyticsParams.adsExpected.should.equal('false');
    analyticsParams.pingTime.should.equal('5');
  }

  /**
   * @param {Object} analyticsParams - params
   * @return {void}
   */
  function verifyPingProperties(analyticsParams) {
    analyticsParams.bitrate.should.equal('10000');
  }

  before(function () {
    config = {
      id: "1_rwbj3j0a",
      session: {
        "id": "7296b4fd-3fcb-666d-51fc-34065579334c",
        "partnerID": 1068292,
        "ks": "NTAwZjViZWZjY2NjNTRkNGEyMjU1MTg4OGE1NmUwNDljZWJkMzk1MXwxMDY4MjkyOzEwNjgyOTI7MTQ5MDE3NjE0NjswOzE0OTAwODk3NDYuMDIyNjswO3ZpZXc6Kix3aWRnZXQ6MTs7",
        "uiConfID": 123456
      },
      sources: {
        progressive: [{
          "mimetype": "video/mp4",
          "url": "https://www.w3schools.com/tags/movie.mp4",
          "id": "1_rwbj3j0a_11311,applehttp",
          "width": 200,
          "height": 100,
          "bandwidth": 10000
        }]
      },
      plugins: {
        youbora: {
          playerVersion: "1.2.3",
          playerName: "player test",
          options: {
            'accountCode': 'powerdev',
            'username': 'user-id',
            'properties': {
              test: 'test'
            },
            'extraParams' : {
              'param1': 'param-1',
              'param3': 'param-3'
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

  it('should send start', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      setTimeout(() => {
        let startParams = getJsonFromUrl(sendSpy.firstCall.thisValue.responseURL);
        verifyStartProperties(startParams);
        let pingParams = getJsonFromUrl(sendSpy.thirdCall.thisValue.responseURL);
        verifyPingProperties(pingParams);
        done();
      }, 7000);
    });
    player.play();
  });
});
