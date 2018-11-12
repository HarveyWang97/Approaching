class Utils {
  constructor() {}

  static getAuth(query) {
    return {
      facebookId: query.facebookId,
      accessToken: query.accessToken
    };
  }

  static getDetails(query) {
    const details = {};
    for (let param in query) {
      if (param !== 'facebookId' && param !== 'accessToken') {
        details[param] = query[param];
      }
    }
    return details;
  }
}

module.exports = Utils;