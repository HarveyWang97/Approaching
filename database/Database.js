const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');
const config = require('../config');

class Database {
  constructor() {
    // initialize connection status
    this.connected = false;

    // connect to db
    mongoose.connect(config.databaseUrl, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', () => {
      // set connection status to be successful
      this.connected = true;
      debug('connected to mongodb: ', config.databaseUrl);
    });
  }

  _response(id) {
    return {
      success: (id !== undefined),
      id: id
    };
  }

  _save(doc, callback) {
    doc.save((err, doc) => {
      if (err) {
        callback(this._response());
      } else {
        callback(this._response(doc._id));
      }
    });
  }

  insert(schema, object, callback = () => {}) {
    const doc = new schema(object);
    this._save(doc, callback);
  }

  insertIfNotExisting(schema, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    schema.findOne(conditions, (err, doc) => {
      if (err) {
        callback(this._response());
      }
      if (doc) {
        callback(this._response(doc._id));
      } else {
        this.insert(schema, object, callback);
      }
    });
  }

  update(schema, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    schema.findOne(conditions, (err, doc) => {
      if (err || !doc) {
        callback(this._response());
      } else {
        for (let field in object) {
          if (object.hasOwnProperty(field)) {
            doc[field] = object[field];
          }
        }
        this._save(doc, callback);
      }
    });
  }

  remove(schema, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    schema.findOneAndDelete(conditions, (err, doc) => {
      if (err || !doc) {
        callback(this._response());
      } else {
        callback(this._response(doc._id));
      }
    });
  }

  insertUser(user, callback = () => {}) {
    this.insertIfNotExisting(models.User, 
      config.databaseModels.User.primaryKey, user, callback);
  }

  insertItem() {
    
  }

  insertEvent() {

  }

  updateUser(user, callback = () => {}) {
    this.update(models.User, 
      config.databaseModels.User.primaryKey, user, callback);
  }

  updateItem() {
    
  }

  updateEvent() {
    
  }

  removeUser(user, callback = () => {}) {
    this.remove(models.User, 
      config.databaseModels.User.primaryKey, user, callback);
  }

  removeItem() {
    
  }

  removeEvent() {
    
  }
}

module.exports = new Database();

