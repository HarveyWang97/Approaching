const express = require('express');
const router = express.Router();
const Validator = require('../validators/ItemsQueryValidator');
const Database = require('../database/Database');
const { getAuth, getDetails } = require('./RouterUtils');

router.get('/insert', (req, res, next) => {
  if (Validator.isInsert(req.query)) {
    const item = getDetails(req.query);
    item.owner = req.query.facebookId;
    Database.insertItem(getAuth(req.query),
      item, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/update', (req, res, next) => {
  if (Validator.isUpdate(req.query)) {
    Database.updateItem(getAuth(req.query),
      getDetails(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/remove', (req, res, next) => {
  if (Validator.isRemove(req.query)) {
    Database.removeItem(getAuth(req.query),
      getDetails(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

module.exports = router;
