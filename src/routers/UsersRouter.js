const { Router } = require('express');
const Database = require('../database/Database');
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
    const db = Database.getInstance();
    this.get('/insert', (req, res, next) => UsersRouter.insertUser(db, req, res, next));
    this.get('/update', (req, res, next) => UsersRouter.updateUser(db, req, res, next));
    this.get('/remove', (req, res, next) => UsersRouter.removeUser(db, req, res, next));
  }

  /**
   * Route the insert query on User from front end to database.
   * @param {Object} db - The database instance that is used for this insert query,
   * created for testing purpose.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static insertUser(db, req, res, next) {
    const query = new InsertQuery('User', req.query);
    if (query.isValid()) {
      db.insert(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the update query on User from front end to database.
   * @param {Object} db - The database instance that is used for this update query,
   * created for testing purpose.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static updateUser(db, req, res, next) {
    const query = new UpdateQuery('User', req.query);
    if (query.isValid()) {
      db.update(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the remove query on User from front end to database.
   * @param {Object} db - The database instance that is used for this insert query,
   * created for testing purpose.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static removeUser(db, req, res, next) {
    const query = new RemoveQuery('User', req.query);
    if (query.isValid()) {
      db.remove(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }
}

module.exports = UsersRouter;
