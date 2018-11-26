const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');

/**
 * @classdesc Utility class for {@link Database}.
 */
class DatabaseUtils {
  static success(id) {
    return { success: true, id: id };
  }
  
  static failure(error) {
    return { success: false, message: error };
  }

  /**
   * The callback invoked when a database operation is done.
   * @callback DatabaseCallback
   * @param {Object} response
   */
  /**
   * The callback invoked when a database authorization succeeds.
   * @callback OnAuthSuccessCallback
   */
  /**
   * Check the user's authoriazation information. Exact 
   * facebookId-accessToken pair must be found in the database.
   * @param {Auth} user - User authoriazation information
   * @param {DatabaseCallback} callback - Called when authorization fails.
   * @param {OnAuthSuccessCallback} onSuccess - Called when authorization 
   * is successful.
   */
  static authorize(user, callback = () => {}, onSuccess = () => {}) {
    const conditions = { facebookId: user.facebookId };
    models.User.findOne(conditions, (err, doc) => {
      if (err || !doc || doc.accessToken !== user.accessToken) {
        callback(this.failure('Authorization failed.'));
      } else {
        onSuccess();
      }
    });
  }

  /**
   * Insert the object into the model and call the callback 
   * after the insertion is done.
   * @param {mongoose.Model} model - The database model that the operation 
   * targets on.
   * @param {Object} object
   * @param {DatabaseCallback} callback - Called when authorization fails.
   */
  static insert(model, object, callback = () => {}) {    
    const doc = new model(object);    
    this._save(doc, callback);
  }

  /**
   * If the object already exists in the model, update the record in the model.
   * Otherwise, insert the object into the model. In both cases, call the 
   * callback after the operation is done.
   * @param {mongoose.Model} model - The database model that the operation 
   * targets on.
   * @param {string} primaryKey - The key used to match the object to the
   * database documents.
   * @param {Object} object 
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  static insertIfNotExisting(model, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    model.findOne(conditions, (err, doc) => {
      if (err) {
        callback(this.failure(err));
      } else if (doc) {
        for (let field in object) {
          if (object.hasOwnProperty(field)) {
            doc[field] = object[field];
          }
        }
        this._save(doc, callback);
      } else {
        this.insert(model, object, callback);
      }
    });
  }

  /**
   * If the object already exists in the model, update the record in the model,
   * and then call the callback on the successful response. Otherwise, call the
   * callback on the failure response.
   * @param {mongoose.Model} model - The database model that the operation 
   * targets on.
   * @param {string} primaryKey - The key used to match the object to the
   * database documents.
   * @param {Object} object 
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  static update(model, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    model.findOne(conditions, (err, doc) => {      
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

  /**
   * If the object already exists in the model, remove that record from the 
   * database, and then call the callback on the successful response. 
   * Otherwise, call the callback on the failure response.
   * Note that the primary key is supposed to be unique, so there should be
   * at most 1 such document found in a specific collection.
   * @param {mongoose.Model} model - The database model that the operation 
   * targets on.
   * @param {string} primaryKey - The key used to match the object to the
   * database documents.
   * @param {Object} object 
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  static remove(model, primaryKey, object, callback = () => {}) {
    const conditions = {};
    conditions[primaryKey] = object[primaryKey];
    console.log("<><><><><><><><><", Object.keys(model), model.find, model.findOneAndDelete, model.findOneAndRemove);
    model.findOneAndDelete(conditions, (err, doc) => {
      if (err || !doc) {
        callback(this.failure(err ? err : "Entry not found."));
      } else {
        callback(this.success(doc._id));
      }
    });
  }

  /**
   * Get all the items from a given user.
   * @param {string} owner - The user's facebookId. Used to filter which items
   * we want.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  static getItems(owner, callback = () => {}) {
    models.Item.find({ owner: owner }, (err, items) => {
      if (err) {
        callback({ success: false });
      } else {
        callback({
          success: true,
          items: items
        });
      }
    });
  }

  /**
   * Get all the events from a given user.
   * @param {string} owner - The user's facebookId. Used to filter which items
   * we want.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  static getEvents(owner, callback = () => {}) {
    models.Event.find({ owner: owner }, (err, rawEvents) => {
      if (err) {
        callback({ success: false });
      } else {
        rawEvents.sort((a, b) => (a.time > b.time));
        const events = {};
    
        for (let event of rawEvents) {
          const time = new Date(Number(event.time));
          const year = time.getFullYear();
          const month = time.getMonth() + 1;
          const date = time.getDate();
          if (!(year in events))              { events[year] = {}; }
          if (!(month in events[year]))       { events[year][month] = {}; }
          if (!(date in events[year][month])) { events[year][month][date] = []; }
          const hour = time.getHours();
          const minute = time.getMinutes();
          const hourMinute = `${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}`;      
          event.time = hourMinute;
          events[year][month][date].push(event);
        }

        callback({
          success: true,
          events: events
        });
      }
    });
  }

  /**
   * Save a document into the database and then call the callback
   * @param {mongoose.Document} doc - The document to be saved.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  static _save(doc, callback = () => {}) {
    doc.save((err, doc) => {
      if (err) {
        callback(this.failure(err));
      } else {
        callback(this.success(doc._id));
      }
    });
  }
}

setTimeout(DatabaseUtils.sendNotification, 1000);

module.exports = DatabaseUtils;
