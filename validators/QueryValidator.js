const utils = require('./ValidatorUtils');
const getDetails = require('../Utils').getDetails;

class QueryValidator {
  constructor() {}

  static isInsert(query) {
    if (!(utils.hasAuth(query))) return false;
    return utils.arrayEqual(Object.keys(getDetails(query)), this._getConfig().insert);
  }

  static isUpdate(query) {
    if (!(utils.hasAuth(query))) return false;
    const queryParams = Object.keys(getDetails(query));
    const config = this._getConfig();
    return utils.arraySubsetOf(config.updateRequired, queryParams) &&
           utils.arraySubsetOf(queryParams, config.updateOptional);
  }

  static isRemove(query) {
    if (!(utils.hasAuth(query))) return false;
    return utils.arrayEqual(Object.keys(getDetails(query)), this._getConfig().remove);
  }

  static _getConfig() {
    throw new Error('No implementation found for the method _getConfig().');
  }
}

module.exports = QueryValidator;