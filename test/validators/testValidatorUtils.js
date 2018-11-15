const { hasAuth, arrayEqual, arraySubsetOf } = require('../../src/validators/ValidatorUtils');
const assert = require('assert');

module.exports = () => {
  describe('ValidatorUtils', function() {
    describe('#hasAuth(query)', function() {
      it('return true if the input is not null and has all authorization fields', function() {
        assert.strictEqual(hasAuth(null), false);
        assert.strictEqual(hasAuth({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          otherfields: 'otherfields'
        }), true);
        assert.strictEqual(hasAuth({
          facebookId: 'facebookId',
          otherfields: 'otherfields'
        }), false);
        assert.strictEqual(hasAuth({
          accessToken: 'accessToken',
          otherfields: 'otherfields'
        }), false);
        assert.strictEqual(hasAuth({
          otherfields: 'otherfields'
        }), false);
      });
    });

    describe('#arrayEqual(arr1, arr2)', function() {
      it('return false if any of the two inputs is null or is not an array', function() {
        assert.strictEqual(arrayEqual(null, null), false);
        assert.strictEqual(arrayEqual('non-array', null), false);
        assert.strictEqual(arrayEqual([ 1, 2, 3, 4 ], null), false);
        assert.strictEqual(arrayEqual([ 1, 2, 3, 4 ], 'non-array'), false);
      });
      it('return false if the two input arrays have different lengths', function() {
        assert.strictEqual(arrayEqual([ 1, 2 ], [ 1, 2, 3, 4 ]), false);
      });
      it('return true if the inputs are two identical arrays after sorting, false otherwise', function() {
        const arr = [ 1, 2, 3, 4 ];
        assert.strictEqual(arrayEqual(arr, [ 2, 4, 1, 3 ]), true);
        assert.strictEqual(arrayEqual(arr, [ 0, 2, 3, 4 ]), false);
        assert.strictEqual(arrayEqual(arr, [ 1, 2, 4, 4 ]), false);
      });
    });

    describe('#arraySubsetOf(arr1, arr2)', function() {
      it('return false if any of the two inputs is null or is not an array', function() {
        assert.strictEqual(arraySubsetOf(null, null), false);
        assert.strictEqual(arraySubsetOf('non-array', null), false);
        assert.strictEqual(arraySubsetOf([ 1, 2, 3, 4 ], null), false);
        assert.strictEqual(arraySubsetOf([ 1, 2, 3, 4 ], 'non-array'), false);
      });
      it('return true if every entry in the first array is also in the second array, false otherwise', function() {
        assert.strictEqual(arraySubsetOf([ ], [ 1, 2, 3, 4 ]), true);
        assert.strictEqual(arraySubsetOf([ 1, 2 ], [ 1, 2, 3, 4 ]), true);
        assert.strictEqual(arraySubsetOf([ 2, 1, 2 ], [ 1, 2, 3, 4 ]), true);
        assert.strictEqual(arraySubsetOf([ 1, 2, 5 ], [ 1, 2, 3, 4 ]), false);
      });
    });
  });
}
