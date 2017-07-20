//eslint-disable-next-line no-unused-vars
import youbora from '../../src/youbora.js'
import {loadPlayer, VERSION} from 'playkit-js'
import * as TestUtils from 'playkit-js/test/src/utils/test-utils'
import * as pkg from '../../package.json'

const targetId = 'player-placeholder_youbora.spec';

describe('YouboraPlugin', function () {
  let player, sandbox, sendSpy, config;

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
  function verifyProperties(analyticsParams) {
    analyticsParams.system.should.equal('powerdev');
    analyticsParams.player.should.equal('kalturaplaykit-js');
    analyticsParams.user.should.equal('user-id');
    analyticsParams.transcode.should.equal('Free');
    analyticsParams.hashTitle.should.equal('true');
    analyticsParams.referer.should.equal(document.referrer);
    analyticsParams.pluginVersion.should.equal('5.3.0-' + pkg.version + '-kalturaplaykit-js');
    analyticsParams.playerVersion.should.equal('KalturaPlaykitJS ' + VERSION);
    analyticsParams.resource.should.equal('https://www.w3schools.com/tags/movie.mp4');
    analyticsParams.duration.should.equal('13');
    analyticsParams.live.should.equal('false');
    analyticsParams.rendition.should.equal('200x100@10Kbps');
    analyticsParams.properties.should.equal('{"kalturaInfo":{"entryId":"1_rwbj3j0a","sessionId":"7296b4fd-3fcb-666d-51fc-34065579334c","uiConfigId":123456}}');
    analyticsParams.param1.should.equal('param-1');
    analyticsParams.param3.should.equal('param-3');
    analyticsParams.adsExpected.should.equal('false');
    analyticsParams.pingTime.should.equal('5');
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
          'param1': 'param-1',
          'param3': 'param-3',
          'userId': "user-id"
        }
      }
    };
    TestUtils.createElement('DIV', targetId);
  });

  beforeEach(function () {
    player = loadPlayer(targetId, config);
    sandbox = sinon.sandbox.create();
    sendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
  });

  afterEach(function () {
    sandbox.restore();
    player.destroy();
    TestUtils.removeVideoElementsFromTestPage();
  });

  after(function () {
    TestUtils.removeElement(targetId);
  });

  it('should send start', (done) => {
    player.addEventListener(player.Event.FIRST_PLAY, () => {
      setTimeout(() => {
        let analyticsParams = getJsonFromUrl(sendSpy.firstCall.thisValue.responseURL);
        verifyProperties(analyticsParams);
        done();
      }, 500);
    });
    player.play();
  });

});
