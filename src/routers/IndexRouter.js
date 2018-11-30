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

    this.get('/fetchProfile', (req, res, next) => {
      const query = new FetchQuery(null, req.query);
      if (query.isValid()) {
        Database.fetchProfile(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });

    this.get('/fetchItems', (req, res, next) => {
      const query = new FetchQuery(null, req.query);
      if (query.isValid()) {
        Database.fetchItems(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });

    this.get('/fetchEvents', (req, res, next) => {
      const query = new FetchQuery(null, req.query);
      if (query.isValid()) {
        Database.fetchEvents(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });
  }
}

module.exports = new IndexRouter();
