const InsertQuery = require('../../src/queries/InsertQuery');
const assert = require('assert');

module.exports = () => {
  describe('InsertQuery', function() {
    describe('#isValid()', function() {
      it('return false if the input doesn\'t contain enough auth info', function() {
        assert.strictEqual((new InsertQuery(null, {})).isValid(), false);
        assert.strictEqual((new InsertQuery(null, {
          facebookId: 'facebookId'
        })).isValid(), false);
        assert.strictEqual((new InsertQuery(null, {
          accessToken: 'accessToken'
        })).isValid(), false);
      });

      it('should have exact properties as specified -- Users', function() {
        assert.strictEqual((new InsertQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          email: 'email'
        })).isValid(), true);
        assert.strictEqual((new InsertQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          emailAddress: 'emailAddress'
        })).isValid(), false);
        assert.strictEqual((new InsertQuery('User', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
        })).isValid(), false);
      });

      it('should have exact properties as specified -- Items', function() {
        assert.strictEqual((new InsertQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          picture: 'picture',
          expireDate: 'expireDate',
          location: 'location',
          quantity: 'quantity',
          description: 'description'
        })).isValid(), true);
        assert.strictEqual((new InsertQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          photo: 'photo',
          expireDate: 'expireDate',
          place: 'place',
          description: 'description'
        })).isValid(), false);
        assert.strictEqual((new InsertQuery('Item', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          expireDate: 'expireDate',
        })).isValid(), false);
      });
      
      it('should have exact properties as specified -- Events', function() {
        assert.strictEqual((new InsertQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          picture: 'picture',
          time: 'time',
          location: 'location',
          description: 'description'
        })).isValid(), true);
        assert.strictEqual((new InsertQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          photo: 'photo',
          date: 'date',
          location: 'location',
          description: 'description'
        })).isValid(), false);
        assert.strictEqual((new InsertQuery('Event', {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          time: 'time',
        })).isValid(), false);
      });
    });
  });
}
