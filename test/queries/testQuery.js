const Query = require('../../src/queries/Query');
const assert = require('assert');

module.exports = () => {
  describe('Query', function() {
    const validTest = {
      query: new Query(null, {
        facebookId: 'facebookId',
        accessToken: 'accessToken',
        name: 'name',
        time: 'time',
        location: 'location'
      }),
      auth: {
        facebookId: 'facebookId',
        accessToken: 'accessToken',
      },
      details: {
        name: 'name',
        time: 'time',
        location: 'location',
        owner: 'facebookId'
      }
    };
    const invalidTest = {
      query: new Query(null, {
        facebookId: 'facebookId'
      }),
      auth: {
        facebookId: 'facebookId',
        accessToken: undefined,
      },
      details: {
        owner: 'facebookId'
      }
    }

    describe('#_hasauth()', function() {
      it('return true if the Query object has all authorization fields', function() {
        assert.strictEqual((new Query(null, {
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          otherfields: 'otherfields'
        }))._hasauth(), true);
        assert.strictEqual((new Query(null, {
          facebookId: 'facebookId',
          otherfields: 'otherfields'
        }))._hasauth(), false);
        assert.strictEqual((new Query(null, {
          accessToken: 'accessToken',
          otherfields: 'otherfields'
        }))._hasauth(), false);
        assert.strictEqual((new Query(null, {
          otherfields: 'otherfields'
        }))._hasauth(), false);
      });
    });

    describe('#getAuth()', function() {
      it('correctly extract auth info for a valid query', function() {
        assert.deepStrictEqual(validTest.query.getAuth(), validTest.auth);
      });
      it('set an auth field to undefined if we don\'t have such a property', function() {
        assert.deepStrictEqual(invalidTest.query.getAuth(), invalidTest.auth);
      });
    });

    describe('#getDetails(query)', function() {
      it('correctly extract details for a query with properties besides auth info', function() {
        assert.deepStrictEqual(validTest.query.getDetails(), validTest.details);
      });
      it('if the Query object doesn\'t have any field besides auth info, return an empty object', function() {
        assert.deepStrictEqual(invalidTest.query.getDetails(), invalidTest.details);
      });
    });
  });
}
