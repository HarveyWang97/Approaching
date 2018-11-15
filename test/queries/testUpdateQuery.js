const UpdateQuery = require('../../src/queries/UpdateQuery');
const assert = require('assert');

module.exports = () => {
  describe('UpdateQuery', function() {
    describe('#isValid()', function() {
      it('return false if the input doesn\'t contain enough auth info', function() {
        assert.strictEqual((new UpdateQuery(null, {})).isValid(), false);
        assert.strictEqual((new UpdateQuery(null, {
          facebookId: 'facebookId'
        })).isValid(), false);
        assert.strictEqual((new UpdateQuery(null, {
          accessToken: 'accessToken'
        })).isValid(), false);
      });

      it('should contain the required properties -- Users', function() {
        assert.strictEqual((new UpdateQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        })).isValid(), true);
      });

      it('should contain the required properties -- Items', function() {
        assert.strictEqual((new UpdateQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        })).isValid(), false);
        assert.strictEqual((new UpdateQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        })).isValid(), true);
      });

      it('should contain the required properties -- Events', function() {
        assert.strictEqual((new UpdateQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        })).isValid(), false);
        assert.strictEqual((new UpdateQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        })).isValid(), true);
      });

      it('should select from the optional properties -- Users', function() {
        assert.strictEqual((new UpdateQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          email: 'email'
        })).isValid(), true);
        assert.strictEqual((new UpdateQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          email: 'email',
          otherfield: 'otherfield'
        })).isValid(), false);
      });

      it('should select from the optional properties -- Items', function() {
        assert.strictEqual((new UpdateQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          name: 'name',
          picture: 'picture',
          expireDate: 'expireDate',
          location: 'location',
          quantity: 'quantity',
          description: 'description'
        })).isValid(), true);
        assert.strictEqual((new UpdateQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          expireDate: 'expireDate',
          description: 'description'
        })).isValid(), true);
        assert.strictEqual((new UpdateQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          otherfield: 'otherfield'
        })).isValid(), false);
      });

      it('should select from the optional properties -- Events', function() {
        assert.strictEqual((new UpdateQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          name: 'name',
          picture: 'picture',
          time: 'time',
          location: 'location',
          description: 'description'
        })).isValid(), true);
        assert.strictEqual((new UpdateQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          time: 'time',
          description: 'description'
        })).isValid(), true);
        assert.strictEqual((new UpdateQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          otherfield: 'otherfield'
        })).isValid(), false);
      });
    });
  });
}
