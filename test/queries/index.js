const testQuery = require('./testQuery');
const testQueryUtils = require('./testQueryUtils');
const testInsertQuery = require('./testInsertQuery');
const testRemoveQuery = require('./testRemoveQuery');
const testUpdateQuery = require('./testUpdateQuery');

module.exports = () => {
  describe('Queries', function() {
    testQuery();
    testQueryUtils();
    testInsertQuery();
    testRemoveQuery();
    testUpdateQuery();
  });
}