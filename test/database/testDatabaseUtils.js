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
          location: JSON.stringify(['home']),
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
      it('insert a document if there\'s no existing document with the same primaryKey', function(done) {
        const object = {
          facebookId: 'test',
          accessToken: 'test',
          name: 'test account',
          email: 'test@abc.com',
        };
        utils.insertIfNotExisting(User, object.facebookId, object, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          User.find(res.id, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 1);
            assert.strictEqual(docs[0].name, object.name);
            assert.strictEqual(docs[0].email, object.email);
            done();
          });
        });
      });

      it('update the document if there\'s an existing document with the same primaryKey', function(done) {
        const object = {
          facebookId: 'test',
          accessToken: 'test',
          name: 'test update',
          email: 'test123@abc.com',
        };
        utils.insertIfNotExisting(User, object.facebookId, object, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          User.find(res.id, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 1);
            assert.strictEqual(docs[0].name, object.name);
            // we do not update email upon login for existing user
            assert.notStrictEqual(docs[0].email, object.email);
            User.deleteMany({}, () => done());
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

      it('call callback with failure response if there\'s no existing document with the same primaryKey', function(done) {
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
      it('get all items for a given user', function(done) {
        const item1 = { name: 'item 1', location: JSON.stringify(['home']), owner: 'test user'};
        const item2 = { name: 'item 2', location: JSON.stringify(['home','kitchen']), owner: 'test user'};
        const item3 = { name: 'item 3', location: JSON.stringify(['home']), owner: 'test user 2'};
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
      it('get all events for a given user', function(done) {
        const event1 = { name: 'event 1', time: '1530000000000', owner: 'test user' };
        const event2 = { name: 'event 2', time: '1540000000000', owner: 'test user'};
        const event3 = { name: 'event 3', time: '1550000000000', owner: 'test user2'};
        utils.insert(Event, event1, res => {
          const id1 = res.id.toString();
          utils.insert(Event, event2, res => {
            const id2 = res.id.toString();
            utils.insert(Event, event3, res => {
              const id3 = res.id.toString();
              utils.getEvents('test user', res => {
                assert.strictEqual(res.success, true);
                assert.notStrictEqual(res.events, null);
                assert.strictEqual(res.events.length, 2);
                const resId1 = res.events[0]._id.toString();
                const resId2 = res.events[1]._id.toString();
                assert.strictEqual(arrayEqual([resId1, resId2], [id1, id2]), true);
                utils.getEvents('test user2', res => {
                  assert.strictEqual(res.success, true);
                  assert.notStrictEqual(res.events, null);
                  assert.strictEqual(res.events.length, 1);
                  assert.strictEqual(res.events[0]._id.toString(), id3);
                  Event.deleteMany({}, () => done());
                })
              });
            });
          });
        });
      });
    });

    describe('#sendNotification(itemList, eventList, name, email, callback)', function() {
      // setup
      const item1 = { name: 'item 1', location: JSON.stringify(['home'])};
      const item2 = { name: 'item 2', location: JSON.stringify(['home','kitchen'])};
      const item3 = { name: 'item 3', location: JSON.stringify(['home'])};
      const itemList = [item1, item2, item3];

      const event1 = { name: 'event 1', location: 'Paris'};
      const event2 = { name: 'event 2', location: 'LA'};
      const event3 = { name: 'event 3'};
      const eventList = [event1, event2, event3];

      const name = 'Test Account';
      const email = 'cs130.approaching@gmail.com';
      
      const correctMessage = {
        attachments: [],
        alternative: null,
        content: 'text/plain; charset=utf-8',
        text:
        'Hello Test Account,\n\nSome items in your home are approaching expiration dates: '
        +'\n\titem 1 stored at home\n\titem 2 stored at home/kitchen\n\titem 3 stored at home\n\n'
        +'Some events are approaching their deadlines: \n\tevent 1 at Paris\n\tevent 2 at LA\n\tevent 3\n\n'
        +'Best Regards,\nTeam Chaoz - Project Approaching'
      }
      it('send the notification email in correct format to a given user', function(done) {
        utils.sendNotification(itemList, eventList, name, email, (err, message) => {
          assert.strictEqual(err, null);
          assert.deepStrictEqual(message.attachments, correctMessage.attachments);
          assert.deepStrictEqual(message.alternative, correctMessage.alternative);
          assert.deepStrictEqual(message.content, correctMessage.content);
          assert.deepStrictEqual(message.text, correctMessage.text);
          done();
        });
      });
    });
  });
}

/*
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
 */