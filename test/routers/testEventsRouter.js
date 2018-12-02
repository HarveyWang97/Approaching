const EventsRouter = require('../../src/routers/EventsRouter');
const utils = require('../../src/database/DatabaseUtils');
const { Event } = require('../../src/database/models');
const assert = require('assert');

let event = { 
  facebookId: 'test',
  accessToken: 'test',
  name: 'event',
  picture: '',
  time: '1545740663411',
  location: 'Paris',
  description: '',
  itemList: '',
};

module.exports = () => {
  describe('EventsRouter', function() {
    describe('#insertEvent(req, res, next)', function() {
      it('checks insert event router behavior', function() {
        let checkErrorResponse = {
          status: status => { assert.strictEqual(status, 400); },
          send: () => {},
        };
        let checkCorrectResponse = {
          status: status => { },
          send: () => {},
        };
        EventsRouter.insertEvent({query: event}, checkCorrectResponse);
        assert.notStrictEqual(checkCorrectResponse.status, 400);
        EventsRouter.insertEvent({query: null}, checkErrorResponse);
        Event.deleteMany({}, () => {});
      });
    });

    describe('#updateEvent(req, res, next)', function() {
      it('checks update event router behavior', function(done) {
        event.location = 'LA';
        event.owner = event.facebookId;
        let checkErrorResponse = {
          status: status => { assert.strictEqual(status, 400); },
          send: () => {},
        };
        let checkCorrectResponse = {
          status: status => { },
          send: () => {},
        };
        utils.insert(Event, event, res => {
          const req = {query: {
            facebookId: event.facebookId,
            accessToken: event.accessToken,
            _id: res.id.toString(),
            location: event.location,
          }};
          EventsRouter.updateEvent(req, checkCorrectResponse);
          assert.notStrictEqual(checkCorrectResponse, 400);
          EventsRouter.updateEvent({query: null}, checkErrorResponse);
          Event.deleteMany({}, () => {done()});
        });
      });
    });

    describe('#removeEvent(req, res, next)', function() {
      it('checks update event router behavior', function() {
        let checkErrorResponse = {
          status: status => { assert.strictEqual(status, 400); },
          send: () => {},
        };
        let checkCorrectResponse = {
          status: status => { },
          send: () => {},
        };
        utils.insert(Event, event, res => {
          event.id = res.id.toString(); 
          const req = {query: {
            facebookId: event.facebookId,
            accessToken: event.accessToken,
            _id: event.id,
          }};
          EventsRouter.updateEvent(req, checkCorrectResponse);
          assert.notStrictEqual(checkCorrectResponse, 400);
          EventsRouter.updateEvent({query: null}, checkErrorResponse);
          Event.deleteMany({}, () => {done()});
        });
      });
    });
  });
}