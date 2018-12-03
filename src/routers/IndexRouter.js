const { Router } = require('express');
const Database = require('../database/Database');
const FetchQuery = require('../queries/FetchQuery');

/**
 * @classdesc Router that handles requests to index url, 
 * extending {@link express.Router}.
 */
class IndexRouter extends Router {
  /**
   * Construct a router to handle fetchItems, fetchEvents requests.
   * @constructor
   */
  constructor() {
    super();
    const db = Database.getInstance();
    this.get('/fetchProfile', (req, res, next) => IndexRouter.fetchProfile(db, req, res, next));
    this.get('/fetchItems', (req, res, next) => IndexRouter.fetchItems(db, req, res, next));
    this.get('/fetchEvents', (req, res, next) => IndexRouter.fetchEvents(db, req, res, next));
  }

  /**
   * Route the fetch user profile query from front end to database.
   * @param {Object} db - The database instance that is used for this insert query,
   * created for testing purpose.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static fetchProfile(db, req, res, next) {
    const query = new FetchQuery(null, req.query);
    if (query.isValid()) {
      db.fetchProfile(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the fetch all items query from front end to database.
   * @param {Object} db - The database instance that is used for this insert query,
   * created for testing purpose.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static fetchItems(db, req, res, next) {
    const query = new FetchQuery(null, req.query);
    if (query.isValid()) {
      db.fetchItems(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the fetch all events query from front end to database.
   * @param {Object} db - The database instance that is used for this insert query,
   * created for testing purpose.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static fetchEvents(db, req, res, next) {
    const query = new FetchQuery(null, req.query);
    if (query.isValid()) {
      db.fetchEvents(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }
}

module.exports = IndexRouter;
