const utils = require('../../src/database/DatabaseUtils');
const { User, Item, Event } = require('../../src/database/models');
const { arrayEqual } = require('../../src/queries/QueryUtils'); // for assertion
const assert = require('assert');

module.exports = () => {
  describe('DatabaseUtils', function() {
    describe('#success(id)', function() {
      it('return correct response used for success', function() {
        assert.deepStrictEqual(utils.success('testid'), { success: true, id: 'testid' });
      });
    });

    describe('#failure(error)', function() {
      it('return correct response used for failure', function() {
        assert.deepStrictEqual(utils.failure({ code: 123, msg: 'error message' }), {
          success: false,
          message: { code: 123, msg: 'error message' }
        });
      });
    });

    describe('#insert(model, object, callback)', function() {
      it('insert a document no matter it exists or not', function(done) {
        const object = {
          name: 'test item',
          quantity: '2',
          owner: 'test user',          
        }
        utils.insert(Item, object, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          utils.insert(Item, object, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            Item.find(object, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 2);
              Item.deleteMany({}, () => done());
            });
          });
        });
      });
    });

    describe('#insertIfNotExisting(model, primaryKey, object, callback)', function() {
      it('insert a document if there\'s not existing document with the same primaryKey', function(done) {
        const object = {
          name: 'test item',
          quantity: '2',
          owner: 'test user',
        };
        utils.insertIfNotExisting(Item, 'name', object, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          Item.find(object, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 1);
            assert.strictEqual(docs[0].name, object.name);
            assert.strictEqual(docs[0].quantity, object.quantity);
            assert.strictEqual(docs[0].owner, object.owner);
            done();
          });
        });
      });

      it('update the document if there\'s an existing document with the same primaryKey', function(done) {
        const object = {
          name: 'test item',
          quantity: '5',
          owner: 'test user 2',
        };
        utils.insertIfNotExisting(Item, 'name', object, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          Item.find(object, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 1);
            assert.strictEqual(docs[0].name, object.name);
            assert.strictEqual(docs[0].quantity, object.quantity);
            assert.strictEqual(docs[0].owner, object.owner);
            Item.deleteMany({}, () => done());
          });
        });
      });
    });

    describe('#authorize(user, callback, onSuccess)', function() {
      it('call callback with failure response if user\'s facebookId is not found', function(done) {
        const object = {
          facebookId: 'test',
          accessToken: 'test',
          name: 'test user',
          email: 'sample@email.com'
        };
        utils.insertIfNotExisting(User, 'facebookId', object, res => {
          utils.authorize({ facebookId: 'not existing id', accessToken: 'test' }, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, false);
            done();
          });
        });
      });

      it('call callback with failure response if user\'s accessToken is incorrect', function(done) {
        utils.authorize({ facebookId: 'test', accessToken: 'wrong accessToken' }, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, false);
          done();
        });
      });

      it('call onSuccess if user\'s authorization info is correct', function(done) {
        utils.authorize({ facebookId: 'test', accessToken: 'test' }, () => {}, () => {
          User.deleteMany({}, () => done());
        });
      });
    });

    describe('#update(model, primaryKey, object, callback)', function() {
      const object = {
        name: 'test event',
        time: 'test time',
        owner: 'test user',
      };
      const newObject = {
        name: 'test event',
        time: 'test time',
        owner: 'test user 2',
      };

      it('call callback with failure response if there\'s not existing document with the same primaryKey', function(done) {
        utils.update(Event, 'name', newObject, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, false);
          Event.find(newObject, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 0);
            done();
          });
        });
      });

      it('update the document if there\'s an existing document with the same primaryKey', function(done) {
        utils.insert(Event, object, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          utils.update(Event, 'name', newObject, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            Event.find(newObject, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 1);
              assert.strictEqual(docs[0].name, newObject.name);
              assert.strictEqual(docs[0].quantity, newObject.quantity);
              assert.strictEqual(docs[0].owner, newObject.owner);
              done();
            });
          });
        });
      });
    });

    describe('#remove(model, primaryKey, object, callback)', function() {
      const existingObject = { name: 'test event' };
      const nonExistingObject = { name: 'wrong name' };

      it('call callback with failure response if there\'s not existing document with the same primaryKey', function(done) {
        utils.remove(Event, 'name', nonExistingObject, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, false);
          done();
        });
      });

      it('remove the document if there\'s an existing document with the same primaryKey', function(done) {
        utils.remove(Event, 'name', existingObject, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          Event.find(existingObject, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 0);
            Event.deleteMany({}, () => done());
          });
        });
      });
    });

    describe('#getItems(owner, callback)', function() {
      it('get and reformat all items for a given user', function(done) {
        const item1 = { name: 'item 1', quantity: '2', owner: 'test user'};
        const item2 = { name: 'item 2', quantity: '5', owner: 'test user'};
        const item3 = { name: 'item 3', quantity: '1', owner: 'test user 2'};
        utils.insert(Item, item1, res => {
          const id1 = res.id.toString();
          utils.insert(Item, item2, res => {
            const id2 = res.id.toString();
            utils.insert(Item, item3, res => {
              const id3 = res.id.toString();
              utils.getItems('test user', res => {
                assert.strictEqual(res.success, true);
                assert.notStrictEqual(res.items, null);
                assert.strictEqual(res.items.length, 2);
                const resId1 = res.items[0]._id.toString();
                const resId2 = res.items[1]._id.toString();
                assert.strictEqual(arrayEqual([resId1, resId2], [id1, id2]), true);
                utils.getItems('test user 2', res => {
                  assert.strictEqual(res.success, true);
                  assert.notStrictEqual(res.items, null);
                  assert.strictEqual(res.items.length, 1);
                  assert.strictEqual(res.items[0]._id.toString(), id3);
                  Item.deleteMany({}, () => done());
                })
              })
            });
          });
        });
      });
    });
    
    describe('#getEvents(owner, callback)', function() {
      it('get and reformat all events for a given user', function(done) {
        const event1 = { name: 'event 1', time: '1530000000000', owner: 'test user' };
        const event2 = { name: 'event 2', time: '1540000000000', owner: 'test user'};
        const event3 = { name: 'event 3', time: '1550000000000', owner: 'test user'};
        const event4 = { name: 'event 4', time: '1550010000000', owner: 'test user'};
        utils.insert(Event, event1, res => {
          const id1 = res.id.toString();
          utils.insert(Event, event2, res => {
            const id2 = res.id.toString();
            utils.insert(Event, event3, res => {
              const id3 = res.id.toString();
              utils.insert(Event, event4, res => {
                const id4 = res.id.toString();
                utils.getEvents('test user', res => {
                  assert.strictEqual(res.success, true);
                  assert.notStrictEqual(res.events, null);
                  assert.strictEqual(arrayEqual(Object.keys(res.events), ['2018', '2019']), true);
                  assert.strictEqual(arrayEqual(Object.keys(res.events['2018']), ['6', '10']), true);
                  assert.strictEqual(arrayEqual(Object.keys(res.events['2018']['6']), ['26']), true);
                  assert.strictEqual(res.events['2018']['6']['26'].length, 1);
                  const resId1 = res.events['2018']['6']['26'][0]._id.toString();
                  assert.strictEqual(resId1, id1);
                  assert.strictEqual(arrayEqual(Object.keys(res.events['2018']['10']), ['19']), true);
                  assert.strictEqual(res.events['2018']['10']['19'].length, 1);
                  const resId2 = res.events['2018']['10']['19'][0]._id.toString();
                  assert.strictEqual(resId2, id2);
                  assert.strictEqual(arrayEqual(Object.keys(res.events['2019']), ['2']), true);
                  assert.strictEqual(arrayEqual(Object.keys(res.events['2019']['2']), ['12']), true);
                  assert.strictEqual(res.events['2019']['2']['12'].length, 2);
                  const resId3 = res.events['2019']['2']['12'][0]._id.toString();
                  const resId4 = res.events['2019']['2']['12'][1]._id.toString();
                  assert.strictEqual(resId3, id3);
                  assert.strictEqual(resId4, id4);
                  Event.deleteMany({}, () => done());
                });
              });
            });
          });
        });
      });
    });
  });
}