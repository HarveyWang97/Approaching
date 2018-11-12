const { getAuth, getDetails } = require('../../routes/RouterUtils');
const assert = require('assert');

module.exports = () => {
  describe('RouterUtils', function() {
    const validTest = {
      query: {
        facebookId: 'facebookId',
        accessToken: 'accessToken',
        name: 'name',
        time: 'time',
        location: 'location'
      },
      auth: {
        facebookId: 'facebookId',
        accessToken: 'accessToken',
      },
      details: {
        name: 'name',
        time: 'time',
        location: 'location'
      }
    };
    const invalidTest = {
      query: {
        facebookId: 'facebookId'
      },
      auth: {
        facebookId: 'facebookId',
        accessToken: null,
      },
      details: {}
    }
    const nullTest = {
      query: null,
      auth: {
        facebookId: null,
        accessToken: null,
      },
      details: {}
    }

    describe('#getAuth(query)', function() {
      it('correctly extract auth info for valid inputs', function() {
        assert.deepEqual(getAuth(validTest.query), validTest.auth);
      });
      it('set an auth field to null if it\'s missing in the input', function() {
        assert.deepEqual(getAuth(invalidTest.query), invalidTest.auth);
      });
      it('return an object with auth fields being null if the input is null', function() {
        assert.deepEqual(getAuth(nullTest.query), nullTest.auth);
      });
    });

    describe('#getDetails(query)', function() {
      it('correctly extract details for valid inputs', function() {
        assert.deepEqual(getDetails(validTest.query), validTest.details);
      });
      it('if the input is null or doesn\'t have any field except auth info, return an empty object', function() {
        assert.deepEqual(getDetails(nullTest.query), nullTest.details);
      });
    });
  });
}
