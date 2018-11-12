const express = require('express');
const router = express.Router();
const Validator = require('../validators/EventsQueryValidator');
const Database = require('../database/Database');
const Utils = require('../Utils');

router.get('/insert', (req, res, next) => {
  if (Validator.isInsert(req.query)) {
    const event = Utils.getDetails(req.query);
    event.owner = req.query.facebookId;
    Database.insertEvent(Utils.getAuth(req.query),
      event, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/update', (req, res, next) => {
  if (Validator.isUpdate(req.query)) {
    Database.updateEvent(Utils.getAuth(req.query),
      Utils.getDetails(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/remove', (req, res, next) => {
  if (Validator.isRemove(req.query)) {
    Database.removeEvent(Utils.getAuth(req.query),
      Utils.getDetails(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

module.exports = router;
