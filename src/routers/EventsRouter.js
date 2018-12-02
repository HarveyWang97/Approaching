const { Router } = require('express');
const Database = require('../database/Database').getInstance();
const InsertQuery = require('../queries/InsertQuery');
const RemoveQuery = require('../queries/RemoveQuery');
const UpdateQuery = require('../queries/UpdateQuery');

/**
 * @classdesc Router that handles Events requests, 
 * extending {@link express.Router}.
 */
class EventsRouter extends Router {
  /**
   * Construct a router to handle insert, update, and remove requests
   * targeted on Events.
   * @constructor
   */
  constructor() {
    super();
    this.get('/insert', EventsRouter.insertEvent);
    this.get('/update', EventsRouter.updateEvent);
    this.get('/remove', EventsRouter.removeEvent);
  }

  /**
   * Route the insert query on Events from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static insertEvent(req, res, next) {
    const query = new InsertQuery('Event', req.query);
    if (query.isValid()) {
      Database.insert(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  };

  /**
   * Route the update query on Events from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static updateEvent(req, res, next) {
    const query = new UpdateQuery('Event', req.query);
    if (query.isValid()) {
      console.log(">>>>>>");
      Database.update(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }

  /**
   * Route the remove query on Events from front end to database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - We do not have anything to do with next here, 
   * but it is a required input argument.
   */
  static removeEvent(req, res, next) {
    const query = new RemoveQuery('Event', req.query);
    if (query.isValid()) {
      Database.remove(query, response => res.send(response));
    } else {
      res.status(400);
      res.send({ success: false, message: 'invalid parameters' });
    }
  }
}

module.exports = EventsRouter;
