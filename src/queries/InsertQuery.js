const Query = require('./Query');
const utils = require('./QueryUtils');
const config = require('../config').databaseModels;

/**
 * @classdesc Class representing an insert query, extending {@link Query}.
 */
class InsertQuery extends Query {
  /**
   * Check whether or not the query is valid.
   * @implements {Query#isValid}
   * @see config.js
   */
  isValid() {
    if (!(this._hasauth())) return false;

    const properties = Object.keys(this.getQuery());
    const { insert } = config[this.target];

    return utils.arrayEqual(properties, insert);
  }
}

module.exports = InsertQuery;
