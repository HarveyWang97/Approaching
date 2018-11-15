const UsersQueryValidator = require('../../validators/UsersQueryValidator');
const assert = require('assert');
const config = require('../../config').databaseModels;
const { _getConfig } = UsersQueryValidator;
let { isInsert, isUpdate, isRemove } = UsersQueryValidator;
isInsert = isInsert.bind(UsersQueryValidator);
isUpdate = isUpdate.bind(UsersQueryValidator);
isRemove = isRemove.bind(UsersQueryValidator);

module.exports = () => {
  describe('UsersQueryValidator', function() {
    describe('#_getConfig()', function() {
      it('return correct configuration', function() {
        assert.deepStrictEqual(_getConfig(), config.User);
      });
    });

    describe('#isInsert(query)', function() {
      it('return false is the input doesn\'t contain auth info', function() {
        assert.strictEqual(isInsert({}), false);
      });
      it('return true is the input has exactly the same fields as specified in config, false otherwise', function() {
        assert.strictEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          email: 'email'
        }), true);
        assert.strictEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          emailAddress: 'emailAddress'
        }), false);
        assert.strictEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
        }), false);
      });
    });

    describe('#isUpdate(query)', function() {
      it('return false is the input doesn\'t contain auth info', function() {
        assert.strictEqual(isUpdate({}), false);
      });
      it('the input should contain all required fields', function() {
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        }), true);
      });
      it('the input fields should be a subset of all optional fields', function() {
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          email: 'email'
        }), true);
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          email: 'email',
          otherfield: 'otherfield'
        }), false);
      });      
    });

    describe('#isRemove(query)', function() {
      it('return false is the input doesn\'t contain auth info', function() {
        assert.strictEqual(isRemove({}), false);
      });
      it('return true is the input has exactly the same fields as specified in config, false otherwise', function() {
        assert.strictEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        }), true);
        assert.strictEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        }), false);
      });
    });
  });
}
