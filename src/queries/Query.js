/**
 * @classdesc Class representing a query, wrapped from a client request.
 */
class Query {
  /**
   * Construct a query. Copy the properties of the input object if
   * it's not null, otherwise construct an empty query.
   * @constructor
   * @param {string} target - Name of the database collection that the query
   * is targeted on.
   * @param {*} object - The query parameters as a key-value object.
   */
  constructor(target, object) {
    this.target = target;
    this.query = {};
    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        this.query[property] = object[property];
      }
    }
  }

  /**
   * @typedef {Object} Auth
   * @property {string} facebookId - The user's facebook ID.
   * @property {string} accessToken - The accessToken used for client-server communication.
   */
  /**
   * Get the authorization informaion - facebookId and accessToken.
   * @returns {Auth}
   */
  getAuth() {
    return {
      facebookId: this.query.facebookId,
      accessToken: this.query.accessToken
    };
  }

  /**
   * Get the properties of the query that are not authorization informaion.
   * @returns {Object}
   */
  getDetails() {
    const details = {};
    for (let property in this.query) {
      if (property !== 'facebookId' && property !== 'accessToken') {
        details[property] = this.query[property];
      }
    }
    return details;
  }

  /**
   * Return the original query object.
   * @returns {Object}
   */
  getQuery() {
    return this.query;
  }

  /**
   * Return the name of the database collection that the query
   * is targeted on.
   * @returns {string}
   */
  getTarget() {
    return this.target;
  }

  /**
   * Check if the query contains all authorization informaion.
   * @private
   * @returns {boolean}
   */
  _hasauth() {
    return this.query.hasOwnProperty('facebookId')
        && this.query.hasOwnProperty('accessToken');
  }

  /**
   * Check whether or not the query is valid.
   * @abstract
   * @throws Will throw an error if the abstract method is called without 
   * implementation.
   */
  isValid() {
    throw new Error('No implementation found for method isValid() in class Query.');
  }
}

module.exports = Query;