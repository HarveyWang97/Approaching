const EventsQueryValidator = require('../../validators/EventsQueryValidator');
const assert = require('assert');
const config = require('../../config').databaseModels;
const { _getConfig } = EventsQueryValidator;
let { isInsert, isUpdate, isRemove } = EventsQueryValidator;
isInsert = isInsert.bind(EventsQueryValidator);
isUpdate = isUpdate.bind(EventsQueryValidator);
isRemove = isRemove.bind(EventsQueryValidator);

module.exports = () => {
  describe('EventsQueryValidator', function() {
    describe('#_getConfig()', function() {
      it('return correct configuration', function() {
        assert.deepEqual(_getConfig(), config.Event);
      });
    });

    describe('#isInsert(query)', function() {
      it('return false is the input doesn\'t contain auth info', function() {
        assert.deepEqual(isInsert({}), false);
      });
      it('return true is the input has exactly the same fields as specified in config, false otherwise', function() {
        assert.deepEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          picture: 'picture',
          time: 'time',
          location: 'location',
          description: 'description'
        }), true);
        assert.deepEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          photo: 'photo',
          date: 'date',
          location: 'location',
          description: 'description'
        }), false);
        assert.deepEqual(isInsert({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          name: 'name',
          time: 'time',
        }), false);
      });
    });

    describe('#isUpdate(query)', function() {
      it('return false is the input doesn\'t contain auth info', function() {
        assert.deepEqual(isUpdate({}), false);
      });
      it('the input should contain all required fields', function() {
        assert.deepEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
        }), false);
        assert.deepEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        }), true);
      });
      it('the input fields should be a subset of all optional fields', function() {
        assert.deepEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          name: 'name',
          picture: 'picture',
          time: 'time',
          location: 'location',
          description: 'description'
        }), true);
        assert.deepEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          time: 'time',
          description: 'description'
        }), true);
        assert.deepEqual(isUpdate({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id',
          otherfield: 'otherfield'
        }), false);
      });      
    });

    describe('#isRemove(query)', function() {
      it('return false is the input doesn\'t contain auth info', function() {
        assert.deepEqual(isRemove({}), false);
      });
      it('return true is the input has exactly the same fields as specified in config, false otherwise', function() {
        assert.deepEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          _id: '_id'
        }), true);
        assert.deepEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken',
          id: 'id'
        }), false);
        assert.deepEqual(isRemove({
          facebookId: 'facebookId',
          accessToken: 'accessToken'
        }), false);
      });
    });
  });
}
