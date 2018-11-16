const Query = require('./Query');
const utils = require('./QueryUtils');
const config = require('../config').databaseModels;

/**
 * @classdesc Class representing a remove query, extending {@link Query}.
 */
class RemoveQuery extends Query {
  /**
   * Check whether or not the query is valid.
   * @implements {Query#isValid}
   * @see config.js
   */
  isValid() {
    if (!(this._hasauth())) return false;

    const properties = Object.keys(this.getDetails());
    const { remove } = config[this.target];

    return utils.arrayEqual(properties, remove);
  }
}

module.exports = RemoveQuery;
