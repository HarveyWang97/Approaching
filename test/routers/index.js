const testEventsRouter = require('./testEventsRouter');
const testItemsRouter = require('./testItemsRouter');
const testUsersRouter = require('./testUsersRouter');
const testIndexRouter = require('./testIndexRouter');

module.exports = () => {
  describe('Routers', function() {
    //testUsersRouter();
    //testItemsRouter();
    testEventsRouter();
    //testIndexRouter();
  });
}