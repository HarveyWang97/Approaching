const Query = require('./Query');
const utils = require('./QueryUtils');
const config = require('../config').databaseModels;

class InsertQuery extends Query {
  /**
   * Check whether or not the query is valid.
   * 
   * @implements {Query#isValid}
   */
  isValid() {
    if (!(this._hasauth())) return false;

    const properties = Object.keys(this.getDetails());
    const { insert } = config[this.target];

    return utils.arrayEqual(properties, insert);
  }
}

module.exports = InsertQuery;
