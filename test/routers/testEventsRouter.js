const Database = require('../../src/database/Database').getTestInstance();
const EventsRouter = require('../../src/routers/EventsRouter');
const utils = require('../../src/database/DatabaseUtils');
const { User, Event } = require('../../src/database/models');
const assert = require('assert');

const user = { 
  facebookId: 'test',
  accessToken: 'test',
  name: 'user',
  email: 'testing@email.com'
};

let event = { 
  facebookId: user.facebookId,
  accessToken: user.accessToken,
  name: 'event',
  picture: '',
  time: '1545740663411',
  location: 'Paris',
  description: '',
  itemList: '',
};

module.exports = () => {
  describe('EventsRouter', function() {
    describe('#insertIfNotExisting(model, primaryKey, object, callback)', function() {
      it ('checks proper user account is set up', function(done) {
        utils.insertIfNotExisting(User, user.facebookId, user, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });
    });

    describe('#insertEvent(db, req, res, next)', function() {
      it('checks insert event router behavior', function(done) {
        const req = {query: event};
        EventsRouter.insertEvent(Database, req, {
          status: status => {},
          send: res => {
            assert.strictEqual(res.success, true);
            Event.find(res.id, (err, docs) => {
              assert.strictEqual(err, null);
              assert.notStrictEqual(docs, null);
              assert.strictEqual(docs.length, 1);
              EventsRouter.insertEvent(Database, { query: null }, {
                status: status => {},
                send: res => {
                  assert.strictEqual(res.success, false);
                  Event.deleteMany({}, () => done());
                }
              });
            });
          }
        });
      });
    });

    describe('#updateEvent(db, req, res, next)', function() {
      it('checks update event router behavior', function(done) {
        event.owner = event.facebookId;
        utils.insert(Event, event, res => {
          event.location = 'LA';
          event._id = res.id;

          const req = {query: {
            facebookId: event.facebookId,
            accessToken: event.accessToken,
            _id: event._id,
            location: event.location,
          }};

          EventsRouter.updateEvent(Database, req, {
            status: status => {},
            send: res => {
              assert.strictEqual(res.success, true);
              Event.find(event._id, (err, docs) => {
                assert.strictEqual(err, null);
                assert.notStrictEqual(docs, null);
                assert.strictEqual(docs.length, 1);
                assert.strictEqual(docs[0].location, event.location);
                EventsRouter.updateEvent(Database, { query: null }, {
                  status: status => {},
                  send: res => {
                    assert.strictEqual(res.success, false);
                    Event.deleteMany({}, () => done());
                  }
                });
              });
            }
          });
        });
      });
    });

    describe('#removeEvent(db, req, res, next)', function() {
      it('checks remove event router behavior', function(done) {
        utils.insert(Event, event, res => {
          event._id = res.id;

          const req = {query: {
            facebookId: event.facebookId,
            accessToken: event.accessToken,
            _id: event._id,
          }};

          EventsRouter.removeEvent(Database, req, {
            status: status => {},
            send: res => {
              assert.strictEqual(res.success, true);
              Event.find(event._id, (err, docs) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(docs, []);
                EventsRouter.removeEvent(Database, { query: null }, {
                  status: status => {},
                  send: res => {
                    assert.strictEqual(res.success, false);
                    Event.deleteMany({}, () => done());
                  }
                });
              });
            }
          });
        });
      });
    });

    describe('#remove(model, primaryKey, object, callback)', function() {
      it ('removes the user account', function(done) {
        utils.remove(User, user.facebookId, user, res => {
          assert.strictEqual(res.success, true);
          done();
        });
      });
    });
  });
}