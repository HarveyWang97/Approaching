const config = require('./config').databaseModels;

class Validator {
  constructor() {}

  static _hasExactParams(query, params) {  
    if (!query || Object.keys(query).length !== params.length) {
      return false;
    }
    for (let param of params) {
      if (!query.hasOwnProperty(param)) {
        return false;
      }
    }
    return true;
  }

  static _isPrimaryKeyOrUpdatable(query, primaryKey, params) {
    if (!query || !query.hasOwnProperty(primaryKey)) {
      return false;
    }
    for (let field in query) {
      if (query.hasOwnProperty(field) && field !== primaryKey 
                                      && !params.includes(field)) {
        return false;
      }
    }
    return true;
  }

  static isUsersInsertQuery(query) {
    return this._hasExactParams(query, config.User.required);
  }

  static isUsersUpdateQuery(query) {
    return this._isPrimaryKeyOrUpdatable(
      query, 
      config.User.primaryKey,
      config.User.required
    );
  }

  static isUsersRemoveQuery(query) {
    return this._hasExactParams(query, [ config.User.primaryKey ]);
  }

  static isEventsInsertQuery(query) {
    //////// name, description, location, time
    
  }
}

module.exports = Validator;