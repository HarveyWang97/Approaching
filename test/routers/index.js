const Database = require('../../src/database/Database').getTestInstance();
const models = require('../../src/database/models');
const testEventsRouter = require('./testEventsRouter');
const testItemsRouter = require('./testItemsRouter');
const testUsersRouter = require('./testUsersRouter');
const testIndexRouter = require('./testIndexRouter');

module.exports = () => {
  before(function (done) {
    this.timeout(10 * 1000);
    models.User.deleteMany({}, () =>
      models.Item.deleteMany({}, () =>
        models.Event.deleteMany({}, () => done())
      )
    );
  });

  describe('Routers', function() {
    testUsersRouter();
    testItemsRouter();
    testEventsRouter();
    testIndexRouter();
  });

  after(function (done) {
    if (Database.db) Database.db.close(() => done());
  });
}