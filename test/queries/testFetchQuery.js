const FetchQuery = require('../../src/queries/FetchQuery');
const assert = require('assert');

module.exports = () => {
  describe('FetchQuery', function() {
    describe('#isValid()', function() {
      it('return false if the input doesn\'t contain enough auth info', function() {
        assert.strictEqual((new FetchQuery(null, {})).isValid(), false);
        assert.strictEqual((new FetchQuery(null, {
          facebookId: 'facebookId'
        })).isValid(), false);
        assert.strictEqual((new FetchQuery(null, {
          accessToken: 'accessToken'
        })).isValid(), false);
      });
    });
  });
}