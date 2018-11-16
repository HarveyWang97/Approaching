const { Router } = require('express');
const Database = require('../database/Database');
const InsertQuery = require('../queries/InsertQuery');
const RemoveQuery = require('../queries/RemoveQuery');
const UpdateQuery = require('../queries/UpdateQuery');

/**
 * @classdesc Router that handles Items requests, 
 * extending {@link express.Router}.
 */
class ItemsRouter extends Router {
  /**
   * Construct a router to handle insert, update, and remove requests
   * targeted on Items.
   * @constructor
   */
  constructor() {
    super();

    this.get('/insert', (req, res, next) => {
      const query = new InsertQuery('Item', req.query);
      if (query.isValid()) {
        const item = query.getDetails();
        item.owner = req.query.facebookId;
        Database.insert(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });

    this.get('/update', (req, res, next) => {
      const query = new UpdateQuery('Item', req.query);
      if (query.isValid()) {
        Database.update(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });

    this.get('/remove', (req, res, next) => {
      const query = new RemoveQuery('Item', req.query);
      if (query.isValid()) {
        Database.remove(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });
  }
}

module.exports = new ItemsRouter();
