const RemoveQuery = require('../../src/queries/RemoveQuery');
const assert = require('assert');

module.exports = () => {
  describe('RemoveQuery', function() {
    describe('#isValid()', function() {
      it('return false if the input doesn\'t contain enough auth info', function() {
        assert.strictEqual((new RemoveQuery(null, {})).isValid(), false);
        assert.strictEqual((new RemoveQuery(null, {
          facebookId: 'facebookId'
        })).isValid(), false);
        assert.strictEqual((new RemoveQuery(null, {
          accessToken: 'accessToken'
        })).isValid(), false);
      });

      it('should have exact properties as specified -- Users', function() {
        assert.strictEqual((new RemoveQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        })).isValid(), true);
        assert.strictEqual((new RemoveQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        })).isValid(), false);
      });

      it('should have exact properties as specified -- Items', function() {
        assert.strictEqual((new RemoveQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        })).isValid(), true);
        assert.strictEqual((new RemoveQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          id: 'id'
        })).isValid(), false);
        assert.strictEqual((new RemoveQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken'
        })).isValid(), false);
      });

      it('should have exact properties as specified -- Events', function() {
        assert.strictEqual((new RemoveQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        })).isValid(), true);
        assert.strictEqual((new RemoveQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          id: 'id'
        })).isValid(), false);
        assert.strictEqual((new RemoveQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken'
        })).isValid(), false);
      });
    });
  });
}
