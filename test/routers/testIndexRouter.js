const Database = require('../../src/database/Database').getTestInstance();
const IndexRouter = require('../../src/routers/IndexRouter');
const utils = require('../../src/database/DatabaseUtils');
const { User, Event, Item } = require('../../src/database/models');
const { arrayEqual } = require('../../src/queries/QueryUtils'); // for assertion
const assert = require('assert');

const user = { 
    facebookId: 'test',
    accessToken: 'test',
    name: 'user',
    email: 'testing@email.com'
};

const item = { 
    facebookId: user.facebookId,
    accessToken: user.accessToken,
    name: 'item',
    picture: '',
    expireDate: '1545740663411',
    location: JSON.stringify(['home']),
    description: '',
    eventList: '',
    owner: user.facebookId,
};

const event = { 
    facebookId: user.facebookId,
    accessToken: user.accessToken,
    name: 'event',
    picture: '',
    time: '1545740663411',
    location: 'Paris',
    description: '',
    itemList: '',
    owner: user.facebookId,
};

module.exports = () => {
  describe('IndexRouter', function() {
    describe('set up testing environment', function() {
      it ('checks proper user account is set up', function(done) {
        utils.insertIfNotExisting(User, user.facebookId, user, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });

      it ('checks item is inserted', function(done) {
        utils.insert(Item, item, res => {
            assert.strictEqual(res.success, true);
            item.id = res.id;
            done();
        });
      });

      it ('checks event is inserted', function(done) {
        utils.insert(Event, event, res => {
            assert.strictEqual(res.success, true);
            event.id = res.id;
            done();
        });
      });
    });

    describe('#fetchProfile(db, req, res, next)', function() {
      it('checks user profile is fetched properly', function(done) {
        const req = {query: {facebookId: user.facebookId, accessToken: user.accessToken}};
        IndexRouter.fetchProfile(Database, req, {
        status: status => {},
          send: res => {
            assert.strictEqual(res.success, true);
            assert.deepStrictEqual(arrayEqual([res.userProfile.name, res.userProfile.email], [user.name, user.email]), true);
            IndexRouter.fetchProfile(Database, { query: null }, {
              status: status => {},
              send: res => {
                assert.strictEqual(res.success, false);
                done();
              }
            });
          }
        });
      });
    });

    describe('#fetchItems(db, req, res, next)', function() {
      it('checks item is fetched properly', function(done) {
        const req = {query: {facebookId: user.facebookId, accessToken: user.accessToken}};
        IndexRouter.fetchItems(Database, req, {
        status: status => {},
          send: res => {
            assert.strictEqual(res.success, true);
            assert.notDeepStrictEqual(res.items, null);
            assert.notDeepStrictEqual(res.items.rawItems, null);
            assert.notDeepStrictEqual(res.items.structuredItems, null);
            IndexRouter.fetchItems(Database, { query: null }, {
              status: status => {},
              send: res => {
                assert.strictEqual(res.success, false);
                done();
              }
            });
          }
        });
      });
    });

    describe('#fetchEvents(db, req, res, next)', function() {
      it('checks event is fetched properly', function(done) {
        const req = {query: {facebookId: user.facebookId, accessToken: user.accessToken}};
        IndexRouter.fetchEvents(Database, req, {
        status: status => {},
          send: res => {
            assert.strictEqual(res.success, true);
            assert.strictEqual(res.success, true);
            assert.notDeepStrictEqual(res.events, null);
            assert.notDeepStrictEqual(res.events.rawEvents, null);
            assert.notDeepStrictEqual(res.events.structuredEvents, null);
            IndexRouter.fetchEvents(Database, { query: null }, {
              status: status => {},
              send: res => {
                assert.strictEqual(res.success, false);
                done();
              }
            });
          }
        });
      });
    });

    describe('clean up testing environment', function() {
      it ('removes the user account', function(done) {
        utils.remove(User, user.facebookId, user, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });

      it ('removes the inserted item', function(done) {
        utils.remove(Item, item.facebookId, item, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });

      it ('removes the inserted event', function(done) {
        utils.remove(Event, event.facebookId, event, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });
    });
  });
}