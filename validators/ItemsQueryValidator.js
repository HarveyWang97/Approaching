const QueryValidator = require('./QueryValidator');
const config = require('../config').databaseModels;

class ItemsQueryValidator extends QueryValidator{
  static _getConfig() {
    return config.Item;
  }
}

module.exports = ItemsQueryValidator;