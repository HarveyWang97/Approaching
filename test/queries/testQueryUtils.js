const { arrayEqual, arraySubsetOf }  = require('../../src/queries/QueryUtils');
const assert = require('assert');

module.exports = () => {
  describe('ValidatorUtils', function() {
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
