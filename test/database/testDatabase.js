const Database = require('../../src/database/Database');
const Query = require('../../src/queries/Query');
const { User, Item, Event } = require('../../src/database/models');
const { arrayEqual } = require('../../src/queries/QueryUtils'); // for assertion
const assert = require('assert');
const DbInstance = Database.getTestInstance();
const clonedeep = require('lodash/cloneDeep')

const facebookId = 'test';
const accessToken = 'test';

let user = { 
  facebookId: facebookId,
  accessToken: accessToken,
  name: 'test user',
  email: 'sample@email.com'
};

let itemList = [];
let eventList = [];

module.exports = () => {
  describe('Database', function() {
    // getInstance and getTestInstance are identical except they use different 
    // databaseUrl, so only test one function is enough.
    // describe('#getInstance()', function() {
    //   it('return a correct Database instance', function(done) {
    //     const instance = Database.getInstance();
    //     const checkType = (instance instanceof Database);
    //     assert.strictEqual(checkType, true);
    //     instance.db.close(() => done());
    //   });
    // });

    describe('#getTestInstance()', function() {
      it('return a correct Database test instance', function() {
        const checkType = (Database.getTestInstance() instanceof Database);
        assert.strictEqual(checkType, true);
      });
    });

    describe('#insert(query, callback)', function() {
      it('correctly insert a user into the database', function(done) {
        const input = new Query('User', user);
        DbInstance.insert(input, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          done();
        });
      });

      it('correctly insert an item into the database', function(done) {
        itemList[0] = { 
          object: {
            facebookId: facebookId,
            accessToken: accessToken,
            name: 'item0',
            picture: '',
            expireDate: '1545740663411',
            location: JSON.stringify(['home']),
            description: '',
            eventList: '',
            owner: facebookId,
          },
          id: '',
        };
        const input = new Query('Item', itemList[0].object);
        DbInstance.insert(input, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          itemList[0].id = res.id.toString();
          done();
        });
      });

      it('correctly insert an event into the database', function(done) {
        eventList[0] = { 
          object: {
            facebookId: facebookId,
            accessToken: accessToken,
            name: 'event0',
            picture: '',
            time: '1545740663411',
            location: 'Paris',
            description: '',
            itemList: '',
            owner: facebookId,
          },
          id: '',
        };
        const input = new Query('Event', eventList[0].object);
        DbInstance.insert(input, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          eventList[0].id = res.id.toString();
          done();
        });
      });
    });

    describe('#update(query, callback)', function() {
      it('correctly update existing user\'s name, email and notification time', function(done) {
        user.name = 'test account';
        user.email = 'testing@gmail.com';
        user.notifyTime = '3600000';
        const input = new Query('User', user);
        DbInstance.update(input, res => {
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          User.find(res.id, (err, docs) => {
            assert.strictEqual(err, null);
            assert.notStrictEqual(docs, null);
            assert.strictEqual(docs.length, 1);
            assert.strictEqual(docs[0].name, user.name);
            assert.strictEqual(docs[0].email, user.email);
            assert.strictEqual(docs[0].notifyTime, user.notifyTime);
            done();
          });
        });
      });

      it('correctly update details for an existing item', function(done) {
        itemList[1] = clonedeep(itemList[0]);
        const input = new Query('Item', itemList[1].object);
        DbInstance.insert(input, res => {
          const resId = res.id.toString();
          itemList[1].object.name = 'item1';
          itemList[1].id = resId;
          const update = new Query('Item', {facebookId: facebookId, accessToken: accessToken, name: 'item1', _id: resId});
          DbInstance.update(update, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            Item.find(res.id, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 1);
              assert.strictEqual(docs[0].name, itemList[1].object.name);
              done();
            });
          });
        });
      });

      it('correctly update details for an existing event', function(done) {
        eventList[1] = clonedeep(eventList[0]);
        const input = new Query('Event', eventList[1].object);
        DbInstance.insert(input, res => {
          const resId = res.id.toString();
          eventList[1].object.name = 'event1';
          eventList[1].id = resId;
          const update = new Query('Event', {facebookId: facebookId, accessToken: accessToken, name: 'event1', _id: resId});
          DbInstance.update(update, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            Event.find(res.id, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 1);
              assert.strictEqual(docs[0].name, eventList[1].object.name);
              done();
            });
          });
        });
      });
    });

    describe('#remove(query, callback)', function() {
      it('correctly remove a user from database', function(done) {
        const removeThisUser = Object.assign({}, user);
        removeThisUser.facebookId = 'test1';
        removeThisUser.accessToken = 'test1';
        const input = new Query('User', removeThisUser);
        DbInstance.insert(input, res => {
          const resId = res.id.toString();
          const remove = new Query('User', {facebookId: removeThisUser.facebookId, accessToken: removeThisUser.accessToken, _id: resId});
          DbInstance.remove(remove, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            done();
          });
        });
      });

      it('correctly remove an item from database', function(done) {
        const input = new Query('Item', itemList[0].object);
        DbInstance.insert(input, res => {
          const resId = res.id.toString();
          const remove = new Query('Item', {facebookId: facebookId, accessToken: accessToken, _id: resId});
          DbInstance.remove(remove, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            done();
          });
        });
      });

      it('correctly remove an event from database', function(done) {
        const input = new Query('Event', eventList[0].object);
        DbInstance.insert(input, res => {
          const resId = res.id.toString();
          const remove = new Query('Event', {facebookId: facebookId, accessToken: accessToken, _id: resId});
          DbInstance.remove(remove, res => {
            assert.notStrictEqual(res, null);
            assert.strictEqual(res.success, true);
            done();
          });
        });
      });
    });

    describe('#fetchProfile(query, callback)', function() {
      it ('fetch a specific user\'s profile from database', function(done) {
        const input = new Query('User', user);
        DbInstance.fetchProfile(input, res =>{
          assert.notStrictEqual(res, null);
          assert.strictEqual(res.success, true);
          const resName = res.userProfile.name;
          const resEmail = res.userProfile.email;
          const resTime = res.userProfile.notifyTime;
          assert.strictEqual(arrayEqual([resName, resEmail, resTime], [user.name, user.email, user.notifyTime]), true);
          done();
        });
      });
    });

    describe('#fetchItems(query, callback)', function() {
      it ('fetch the raw item list and the structured item list for a given user', function(done) {
        // set up
        itemList[2] = clonedeep(itemList[0]);
        itemList[2].object.name = 'item2';
        itemList[2].object.location = JSON.stringify(['home', 'kitchen']);
        itemList[2].object.expireDate = '1555740663411';

        itemList[3] = clonedeep(itemList[0]);
        itemList[3].object.name = 'item3';
        itemList[3].object.location = JSON.stringify(['home', 'bathroom']);
        itemList[3].object.expireDate = '';

        DbInstance.insert(new Query('Item', itemList[2].object), res => {
          itemList[2].id = res.id.toString();
          DbInstance.insert(new Query('Item', itemList[3].object), res => {
            itemList[3].id = res.id.toString();
            const fetch = new Query('Item', {facebookId: facebookId, accessToken: accessToken});
            DbInstance.fetchItems(fetch, res => {
              assert.strictEqual(res.success, true);
              assert.notStrictEqual(res.items, null);
              assert.strictEqual(res.items.rawItems.length, 4);
              const resId0 = res.items.rawItems[0]._id.toString();
              const resId1 = res.items.rawItems[1]._id.toString();
              const resId2 = res.items.rawItems[2]._id.toString();
              const resId3 = res.items.rawItems[3]._id.toString();
              assert.strictEqual(arrayEqual([resId0, resId1, resId2, resId3], 
                [itemList[0].id, itemList[1].id, itemList[2].id, itemList[3].id]), true);
              const expectStructure = {
                name: 'home',
                sublayers: [
                  { name: 'kitchen', sublayers: [], items: [res.items.rawItems[2]] },
                  { name: 'bathroom', sublayers: [], items: [res.items.rawItems[3]] },
                ],
                items: [res.items.rawItems[0], res.items.rawItems[1]],
              };
              assert.deepStrictEqual(res.items.structuredItems, expectStructure);
              Item.deleteMany({}, () => done());
            });
          });
        });
      });
    });

    describe('#fetchEvents(query, callback)', function() {
      it ('fetch the raw event list and the structured event list for a given user', function(done) {
        // set up
        eventList[2] = clonedeep(eventList[0]);
        eventList[2].object.name = 'event2';
        eventList[2].object.location = 'LA';
        eventList[2].object.time = '1555740663411';

        eventList[3] = clonedeep(itemList[0]);
        eventList[3].object.name = 'event3';
        eventList[3].object.location = 'Shanghai';
        eventList[3].object.time = '1547740663411';

        DbInstance.insert(new Query('Event', eventList[2].object), res => {
          eventList[2].id = res.id.toString();
          DbInstance.insert(new Query('Event', eventList[3].object), res => {
            eventList[3].id = res.id.toString();
            const fetch = new Query('Event', {facebookId: facebookId, accessToken: accessToken});
            DbInstance.fetchEvents(fetch, res => {
              assert.strictEqual(res.success, true);
              assert.notStrictEqual(res.events, null);
              assert.strictEqual(res.events.rawEvents.length, 4);
              const resId0 = res.events.rawEvents[0]._id.toString();
              const resId1 = res.events.rawEvents[1]._id.toString();
              const resId2 = res.events.rawEvents[2]._id.toString();
              const resId3 = res.events.rawEvents[3]._id.toString();
              assert.strictEqual(arrayEqual([resId0, resId1, resId2, resId3], 
                 [eventList[0].id, eventList[1].id, eventList[2].id, eventList[3].id]), true);
              const expectStructure = { 
                '2018': { '12': { '25': [res.events.rawEvents[0], res.events.rawEvents[1]]}},
                '2019': { '1': { '17': [res.events.rawEvents[3]] }, 
                          '4': { '19': [res.events.rawEvents[2]] }
                        },
              }
              assert.deepStrictEqual(res.events.structuredEvents, expectStructure);
              Event.deleteMany({}, () => {
                User.deleteMany({}, () => done());
              });
            });
          });
        });
      });
    });

  });
}