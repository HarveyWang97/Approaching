const Query = require('./Query');

class FetchDataQuery extends Query {
  /**
   * Check whether or not the query is valid.
   * 
   * @implements {Query#isValid}
   */
  isValid() {
    return this._hasauth();
  }
}

module.exports = FetchDataQuery;
