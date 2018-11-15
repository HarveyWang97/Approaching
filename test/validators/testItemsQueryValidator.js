const ItemsQueryValidator = require('../../src/validators/ItemsQueryValidator');
const assert = require('assert');
const config = require('../../src/config').databaseModels;
const { _getConfig } = ItemsQueryValidator;
let { isInsert, isUpdate, isRemove } = ItemsQueryValidator;
isInsert = isInsert.bind(ItemsQueryValidator);
isUpdate = isUpdate.bind(ItemsQueryValidator);
isRemove = isRemove.bind(ItemsQueryValidator);

module.exports = () => {
  describe('ItemsQueryValidator', function() {
    describe('#_getConfig()', function() {
      it('return correct configuration', function() {
        assert.deepStrictEqual(_getConfig(), config.Item);
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
          picture: 'picture',
          expireDate: 'expireDate',
          location: 'location',
          quantity: 'quantity',
          description: 'description'
        }), true);
        assert.strictEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          photo: 'photo',
          expireDate: 'expireDate',
          place: 'place',
          description: 'description'
        }), false);
        assert.strictEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          expireDate: 'expireDate',
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
        }), false);
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        }), true);
      });
      it('the input fields should be a subset of all optional fields', function() {
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          name: 'name',
          picture: 'picture',
          expireDate: 'expireDate',
          location: 'location',
          quantity: 'quantity',
          description: 'description'
        }), true);
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          expireDate: 'expireDate',
          description: 'description'
        }), true);
        assert.strictEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
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
          _id: '_id'
        }), true);
        assert.strictEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          id: 'id'
        }), false);
        assert.strictEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken'
        }), false);
      });
    });
  });
}
