const QueryValidator = require('./QueryValidator');
const config = require('../config').databaseModels;

class EventsQueryValidator extends QueryValidator{
  static _getConfig() {
    return config.Event;
  }
}

module.exports = EventsQueryValidator;