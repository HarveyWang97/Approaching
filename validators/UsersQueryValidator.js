const QueryValidator = require('./QueryValidator');
const config = require('../config').databaseModels;

class UsersQueryValidator extends QueryValidator{
  static _getConfig() {
    return config.User;
  }
}

module.exports = UsersQueryValidator;