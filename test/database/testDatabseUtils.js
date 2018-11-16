const { success, failure, authorize, insert, insertIfNotExisting, 
  update, remove, getItems, getEvents, reformatEvents, _save } 
  = require('../../src/database/DatabaseUtils');
const assert = require('assert');

module.exports = () => {
  describe('DatabaseUtils', function() {
    describe('#success(id)', function() {
      it('return correct response used for success', function() {
        assert.deepStrictEqual(success('testid'), { success: true, id: 'testid' });
      });
    });
    describe('#failure(error)', function() {
      it('return correct response used for failure', function() {
        assert.deepStrictEqual(failure({ code: 123, msg: 'error message' }), {
          success: false,
          message: { code: 123, msg: 'error message' }
        });
      });
    });
  });
}