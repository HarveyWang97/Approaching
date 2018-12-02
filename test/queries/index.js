const testQuery = require('./testQuery');
const testQueryUtils = require('./testQueryUtils');
const testInsertQuery = require('./testInsertQuery');
const testRemoveQuery = require('./testRemoveQuery');
const testUpdateQuery = require('./testUpdateQuery');
const testFetchQuery = require('./testFetchQuery');

module.exports = () => {
  describe('Queries', function() {
    testQuery();
    testQueryUtils();
    testFetchQuery();
    testInsertQuery();
    testRemoveQuery();
    testUpdateQuery();
  });
}