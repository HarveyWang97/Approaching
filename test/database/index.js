const Database = require('../../src/database/Database').getTestInstance();
const models = require('../../src/database/models');
const testDatabaseUtils = require('./testDatabaseUtils');
const testDatabase = require('./testDatabase');
const testModels = require('./testModels');

module.exports = () => {
  before(function (done) {
    this.timeout(10 * 1000);
    models.User.deleteMany({}, () =>
      models.Item.deleteMany({}, () =>
        models.Event.deleteMany({}, () => done())
      )
    );
  });

  after(function (done) {
    Database.db.close(() => done());
  });

  describe('Database', function() {
    testModels();
    testDatabaseUtils();
    testDatabase();
  });
}
