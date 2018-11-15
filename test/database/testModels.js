const { User, Item, Event } = require('../../database/models');
const config = require('../../config').databaseModels;
const assert = require('assert');

module.exports = () => {
  describe('Models', function() {
    // The method "modelGenerator" is used as a generator / constructor
    // to build models User, Item, and Event which are used to communicate
    // with the mongoose datebase.Instead of feeding arbitrary test inputs
    // to "modelGenerator" and check the return value, we assert that the
    // mongoose models we build with this function are the same as expected,
    // because :
    //  1. The only three occurrences of "modelGenerator" is when we build
    //     User, Item, and Event models. It's very unlikely that we will add
    //     a new model and thus addd a new Collection to the database if the
    //     project mission is not changed significantly.
    //  2. "modelGenerator" fetches model schema from configuration(config.js).
    //     We don't want to add test case into config.js to mess it up.
    describe('#modelGenerator(name)', function() {
      const mongooseUser = User.schema.paths;
      const mongooseItem = Item.schema.paths;
      const mongooseEvent = Event.schema.paths;
      const configUser = config.User.fields;
      const configItem = config.Item.fields;
      const configEvent = config.Event.fields;
      it('the model should have correct fields', function() {
        const configUserKeys = Object.keys(configUser);
        const configItemKeys = Object.keys(configItem);
        const configEventKeys = Object.keys(configEvent);
        // Add mongoose default fields
        configUserKeys.push('_id', '__v');
        configItemKeys.push('_id', '__v');
        configEventKeys.push('_id', '__v');
        assert.deepStrictEqual(Object.keys(mongooseUser), configUserKeys);
        assert.deepStrictEqual(Object.keys(mongooseItem), configItemKeys);
        assert.deepStrictEqual(Object.keys(mongooseEvent), configEventKeys);
      });
      it('the model fields should meet the type and "required" constraints', function() {
        for (let key in configUser) {
          assert.strictEqual(mongooseUser[key].instance, configUser[key].type.name);
          assert.strictEqual(mongooseUser[key].isRequired, configUser[key].required);
        }
        for (let key in configItem) {
          assert.strictEqual(mongooseItem[key].instance, configItem[key].type.name);
          assert.strictEqual(mongooseItem[key].isRequired, configItem[key].required);
        }
        for (let key in configEvent) {
          assert.strictEqual(mongooseEvent[key].instance, configEvent[key].type.name);
          assert.strictEqual(mongooseEvent[key].isRequired, configEvent[key].required);
        }
      });
      it('the primary key should be set to unique, i.e., indexed', function() {
        for (let key in configUser) {
          if (key === config.User.primaryKey) {
            assert.notStrictEqual(mongooseUser[key]._index, null);
          } else {
            assert.strictEqual(mongooseUser[key]._index, null);
          }
        }
        for (let key in configItem) {
          if (key === config.Item.primaryKey) {
            assert.notStrictEqual(mongooseItem[key]._index, null);
          } else {
            assert.strictEqual(mongooseItem[key]._index, null);
          }
        }
        for (let key in configEvent) {
          if (key === config.Event.primaryKey) {
            assert.notStrictEqual(mongooseEvent[key]._index, null);
          } else {
            assert.strictEqual(mongooseEvent[key]._index, null);
          }
        }
      });
      it('the model should have the specified collection name', function() {
        assert.strictEqual(User.schema.options.collection, config.User.collection);
        assert.strictEqual(Item.schema.options.collection, config.Item.collection);
        assert.strictEqual(Event.schema.options.collection, config.Event.collection);
      });
    });
  });
}
