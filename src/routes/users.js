const express = require('express');
const router = express.Router();
const Validator = require('../validators/UsersQueryValidator');
const Database = require('../database/Database');

router.get('/insert', (req, res, next) => {
  if (Validator.isInsert(req.query)) {
    Database.insertUser(req.query, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/update', (req, res, next) => {
  if (Validator.isUpdate(req.query)) {
    Database.updateUser(req.query, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/remove', (req, res, next) => {
  if (Validator.isRemove(req.query)) {
    Database.removeUser(req.query, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

module.exports = router;
