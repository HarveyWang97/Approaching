const Query = require('./Query');
const utils = require('./QueryUtils');
const config = require('../config').databaseModels;

class RemoveQuery extends Query {
  isValid() {
    if (!(this._hasauth())) return false;

    const properties = Object.keys(this.getDetails());
    const { remove } = config[this.target];

    return utils.arrayEqual(properties, remove);
  }
}

module.exports = RemoveQuery;
