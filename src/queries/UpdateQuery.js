const Query = require('./Query');
const utils = require('./QueryUtils');
const config = require('../config').databaseModels;

/**
 * @classdesc Class representing an update query, extending {@link Query}.
 */
class UpdateQuery extends Query {
  /**
   * Check whether or not the query is valid.
   * @implements {Query#isValid}
   * @see config.js
   */
  isValid() {
    if (!(this._hasauth())) return false;

    const properties = Object.keys(this.getDetails());
    const { updateRequired, updateOptional } = config[this.target];

    return utils.arraySubsetOf(updateRequired, properties) &&
           utils.arraySubsetOf(properties, updateOptional);
  }
}

module.exports = UpdateQuery;
