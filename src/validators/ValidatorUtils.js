class ValidatorUtils {
  constructor() {}

  static hasAuth(query) {
    return (!!query && query.hasOwnProperty('facebookId') 
                    && query.hasOwnProperty('accessToken'));
  }

  static arrayEqual(arr1, arr2) {
    if (!arr1 || !Array.isArray(arr1)) return false;
    if (!arr2 || !Array.isArray(arr2)) return false;
    if (arr1.length !== arr2.length) return false;

    const a = arr1.slice(); a.sort();
    const b = arr2.slice(); b.sort();

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  static arraySubsetOf(arr1, arr2) {
    if (!arr1 || !Array.isArray(arr1)) return false;
    if (!arr2 || !Array.isArray(arr2)) return false;
    for (let entry of arr1) {
      if (!arr2.includes(entry)) return false;
    }
    return true;
  }
}

module.exports = ValidatorUtils;