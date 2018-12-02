const { Router } = require('express');
const Database = require('../database/Database').getInstance();
const InsertQuery = require('../queries/InsertQuery');
const RemoveQuery = require('../queries/RemoveQuery');
const UpdateQuery = require('../queries/UpdateQuery');

/**
 * @classdesc Router that handles Users requests, 
 * extending {@link express.Router}.
 */
class UsersRouter extends Router {
  /**
   * Construct a router to handle insert, update, and remove requests
   * targeted on Users.
   * @constructor
   */
  constructor() {
    super();
    this.get('/insert', UsersRouter.insertUser);
    this.get('/update', UsersRouter.updateUser);
    this.get('/remove', UsersRouter.removeUser);
  }

  /**
   * Route the insert query on User from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static insertUser(req, res, next) {
    const query = new InsertQuery('User', req.query);
    if (query.isValid()) {
      Database.insert(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the update query on User from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static updateUser(req, res, next) {
    const query = new UpdateQuery('User', req.query);
    if (query.isValid()) {
      Database.update(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the remove query on User from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static removeUser(req, res, next) {
    const query = new RemoveQuery('User', req.query);
    if (query.isValid()) {
      Database.remove(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }
}

module.exports = UsersRouter;
