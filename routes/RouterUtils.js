class RouterUtils {
  constructor() {}

  static getAuth(query) {
    return {
      facebookId: query && query.facebookId,
      accessToken: query && query.accessToken
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

module.exports = RouterUtils;