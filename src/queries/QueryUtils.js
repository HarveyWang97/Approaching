/**
 * @classdesc Utility class for {@link Query}.
 */
class QueryUtils {
  /**
   * Return whether or not arr1 and arr2 are two identical arrays.
   * @param {*} arr1 
   * @param {*} arr2 
   */
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

  /**
   * Return whether or not arr1 and arr2 are arrays and 
   * arr1 is a subset of arr2.
   * @param {*} arr1 
   * @param {*} arr2 
   */
  static arraySubsetOf(arr1, arr2) {
    if (!arr1 || !Array.isArray(arr1)) return false;
    if (!arr2 || !Array.isArray(arr2)) return false;
    for (let entry of arr1) {
      if (!arr2.includes(entry)) return false;
    }
    return true;
  }
}

module.exports = QueryUtils;