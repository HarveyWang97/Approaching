const express = require('express');
const router = express.Router();
const Validator = require('../validators/ValidatorUtils');
const Database = require('../database/Database');
const { getAuth } = require('./RouterUtils');

router.get('/', function(req, res, next) {
  res.send('hello! index.js here');
});

router.get('/fetchData', (req, res, next) => {
  if (Validator.hasAuth(req.query)) {
    Database.fetchData(getAuth(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

module.exports = router;
