const { Router } = require('express');
const Database = require('../database/Database').getInstance();
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
    this.get('/fetchProfile', IndexRouter.fetchProfile);
    this.get('/fetchItems', IndexRouter.fetchItems);
    this.get('/fetchEvents', IndexRouter.fetchEvents);
  }

  /**
   * Route the fetch user profile query from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static fetchProfile(req, res, next) {
    const query = new FetchQuery(null, req.query);
    if (query.isValid()) {
      Database.fetchProfile(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the fetch all items query from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static fetchItems(req, res, next) {
    const query = new FetchQuery(null, req.query);
    if (query.isValid()) {
      Database.fetchItems(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the fetch all events query from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static fetchEvents(req, res, next) {
    const query = new FetchQuery(null, req.query);
    if (query.isValid()) {
      Database.fetchEvents(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }
}

module.exports = IndexRouter;
