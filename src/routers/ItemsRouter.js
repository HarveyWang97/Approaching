const { Router } = require('express');
const Database = require('../database/Database').getInstance();
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
    this.get('/insert', ItemsRouter.insertItem);
    this.get('/update', ItemsRouter.updateItem);
    this.get('/remove', ItemsRouter.removeItem);
  }

  /**
   * Route the insert query on Items from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static insertItem(req, res, next) {
    const query = new InsertQuery('Item', req.query);
    if (query.isValid()) {
      Database.insert(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the update query on Items from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static updateItem(req, res, next) {
    const query = new UpdateQuery('Item', req.query);
    if (query.isValid()) {
      Database.update(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the remove query on Items from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static removeItem(req, res, next) {
    const query = new RemoveQuery('Item', req.query);
    if (query.isValid()) {
      Database.remove(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }
}

module.exports = ItemsRouter;
