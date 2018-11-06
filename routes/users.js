const express = require('express');
const router = express.Router();
const Validator = require('../Validator');
const Database = require('../database/Database');
const database = new Database();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/insert', (req, res, next) => {
  if (Validator.isUsersInsertQuery(req.query)) {
    database.insertUser(req.query, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/update', (req, res, next) => {
  if (Validator.isUsersUpdateQuery(req.query)) {
    database.updateUser(req.query, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/remove', (req, res, next) => {
  if (Validator.isUsersRemoveQuery(req.query)) {
    database.removeUser(req.query, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

module.exports = router;
