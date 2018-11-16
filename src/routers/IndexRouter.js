const { Router } = require('express');
const Database = require('../database/Database');
const FetchDataQuery = require('../queries/FetchDataQuery');

class IndexRouter extends Router {
  constructor() {
    super();

    this.get('/', (req, res, next) => res.send('hello! index.js here'));

    this.get('/fetchData', (req, res, next) => {
      const query = new FetchDataQuery(null, req.query);
      if (query.isValid()) {
        Database.fetchData(query.getAuth(), response => res.send(response));
      } else {
        res.status(400);
        res.send({ success: false, message: 'invalid parameters' });
      }
    });
  }
}

module.exports = new IndexRouter();
