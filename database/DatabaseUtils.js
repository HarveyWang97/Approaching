const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');
const config = require('../config');

class DatabaseUtils {
  constructor() {}

  static success(id) {
    return { success: true, id: id };
  }

  static failure(err) {
    return { success: false, message: err };
  }

  static _save(doc, callback = () => {}) {
    doc.save((err, doc) => {
      if (err) {
        callback(this.failure(err));
      } else {
        callback(this.success(doc._id));
      }
    });
  }

  static authorize(object, callback = () => {}, onSuccess = () => {}) {
    if (!object || !(object.facebookId) || !(object.accessToken)) {
      callback(this.failure('Authorization failed.'));
    }
    const conditions = { facebookId: object.facebookId };
    models.User.findOne(conditions, (err, doc) => {
      if (err || !doc || doc.accessToken !== object.accessToken) {
        callback(this.failure('Authorization failed.'));
      } else {        
        onSuccess();
      }
    });
  }

  static insert(schema, object, callback = () => {}) {    
    const doc = new schema(object);    
    this._save(doc, callback);
  }

  static insertIfNotExisting(schema, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    schema.findOne(conditions, (err, doc) => {
      if (err) {
        callback(this.failure(err));
      }
      if (doc) {
        for (let field in object) {
          if (object.hasOwnProperty(field)) {
            doc[field] = object[field];
          }
        }
        this._save(doc, callback);
      } else {
        this.insert(schema, object, callback);
      }
    });
  }

  static update(schema, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    schema.findOne(conditions, (err, doc) => {      
      if (err || !doc) {
        callback(this.failure(err ? err : "Entry not found."));
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

  static remove(schema, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    schema.findOneAndDelete(conditions, (err, doc) => {
      if (err || !doc) {
        callback(this.failure(err ? err : "Entry not found."));
      } else {
        callback(this.success(doc._id));
      }
    });
  }
}

module.exports = DatabaseUtils;

