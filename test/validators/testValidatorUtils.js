const { hasAuth, arrayEqual, arraySubsetOf } = require('../../validators/ValidatorUtils');
const assert = require('assert');

module.exports = () => {
  describe('ValidatorUtils', function() {
    describe('#hasAuth(query)', function() {
      it('return true if the input is not null and has all authorization fields', function() {
        assert.deepEqual(hasAuth(null), false);
        assert.deepEqual(hasAuth({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          otherfields: 'otherfields'
        }), true);
        assert.deepEqual(hasAuth({
          facebookId: 'facebookId',
          otherfields: 'otherfields'
        }), false);
        assert.deepEqual(hasAuth({
          accessToken: 'accessToken',
          otherfields: 'otherfields'
        }), false);
        assert.deepEqual(hasAuth({
          otherfields: 'otherfields'
        }), false);
      });
    });

    describe('#arrayEqual(arr1, arr2)', function() {
      it('return false if any of the two inputs is null or is not an array', function() {
        assert.deepEqual(arrayEqual(null, null), false);
        assert.deepEqual(arrayEqual('non-array', null), false);
        assert.deepEqual(arrayEqual([ 1, 2, 3, 4 ], null), false);
        assert.deepEqual(arrayEqual([ 1, 2, 3, 4 ], 'non-array'), false);
      });
      it('return false if the two input arrays have different lengths', function() {
        assert.deepEqual(arrayEqual([ 1, 2 ], [ 1, 2, 3, 4 ]), false);
      });
      it('return true if the inputs are two identical arrays after sorting, false otherwise', function() {
        const arr = [ 1, 2, 3, 4 ];
        assert.deepEqual(arrayEqual(arr, [ 2, 4, 1, 3 ]), true);
        assert.deepEqual(arrayEqual(arr, [ 0, 2, 3, 4 ]), false);
        assert.deepEqual(arrayEqual(arr, [ 1, 2, 4, 4 ]), false);
      });
    });

    describe('#arraySubsetOf(arr1, arr2)', function() {
      it('return false if any of the two inputs is null or is not an array', function() {
        assert.deepEqual(arraySubsetOf(null, null), false);
        assert.deepEqual(arraySubsetOf('non-array', null), false);
        assert.deepEqual(arraySubsetOf([ 1, 2, 3, 4 ], null), false);
        assert.deepEqual(arraySubsetOf([ 1, 2, 3, 4 ], 'non-array'), false);
      });
      it('return true if every entry in the first array is also in the second array, false otherwise', function() {
        assert.deepEqual(arraySubsetOf([ ], [ 1, 2, 3, 4 ]), true);
        assert.deepEqual(arraySubsetOf([ 1, 2 ], [ 1, 2, 3, 4 ]), true);
        assert.deepEqual(arraySubsetOf([ 2, 1, 2 ], [ 1, 2, 3, 4 ]), true);
        assert.deepEqual(arraySubsetOf([ 1, 2, 5 ], [ 1, 2, 3, 4 ]), false);
      });
    });
  });
}
