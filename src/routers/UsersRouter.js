const { Router } = require('express');
const Database = require('../database/Database');
const InsertQuery = require('../queries/InsertQuery');
const RemoveQuery = require('../queries/RemoveQuery');
const UpdateQuery = require('../queries/UpdateQuery');

class UsersRouter extends Router {
  constructor() {
    super();

    this.get('/insert', (req, res, next) => {
      const query = new InsertQuery(null, req.query);
      if (query.isValid()) {
        Database.insertUser(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });

    this.get('/update', (req, res, next) => {
      const query = new UpdateQuery(null, req.query);
      if (query.isValid()) {
        Database.updateUser(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });

    this.get('/remove', (req, res, next) => {
      const query = new RemoveQuery(null, req.query);
      if (query.isValid()) {
        Database.removeUser(query, response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });
  }
}

module.exports = new UsersRouter();
