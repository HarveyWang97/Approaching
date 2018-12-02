const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');
const email = require("../../node_modules/emailjs/email");
const smtp = email.server.connect({
   user: "cs130.approaching@gmail.com",
   password: "CS130Approaching",
   host: "smtp.gmail.com",
   ssl: true,
   tls: false,
   port: 465
});
const defaultNotifyTime = 86400000; // one day


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
          if (object.hasOwnProperty(field) && field !== 'email') {
            doc[field] = object[field];
          }
        }
        this._save(doc, res => {
          if (!(res.success)) {
            callback(res);
          } else {
            callback({
              success: res.success,
              id: res.id,
              email: doc.email,
              notifyTime: doc.notifyTime
            })
          }
        });
      } else {
        object.notifyTime = defaultNotifyTime;
        this.insert(model, object, res => {
          if (!(res.success)) {
            callback(res);
          } else {
            callback({
              success: res.success,
              id: res.id,
              email: object.email,
              notifyTime: object.notifyTime
            })
          }
        });
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
    model.findOneAndDelete(conditions, (err, doc) => {
      if (err || !doc) {
        callback(this.failure(err ? err : "Entry not found."));
      } else {
        callback(this.success(doc._id));
      }
    });
  }

  static getProfile(owner, callback = () => {}) {
    models.User.findOne({ facebookId: owner }, (err, userProfile) => {
      if (err) {
        callback({ success: false });
      } else {
        callback({
          success: true,
          userProfile: userProfile
        });
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
    models.Event.find({ owner: owner }, (err, events) => {
      if (err) {
        callback({ success: false });
      } else {
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

  /**
   * Send an expiration notification email to the user, email contains 
   * all approaching expiration items and all approaching deadline events.
   * @param {Array} itemList - An array of approaching expiration items
   * @param {Array} eventList - An array of approaching deadline events
   * @param {string} name - User name
   * @param {string} email - User email
   */
  static sendNotification(itemList, eventList, name, email, callback = () => {}) {
    let detail = "Hello " + name + ",\n\n";
    // itemList is not empty
    if (itemList.length > 0) {
      detail += "Some items in your home are approaching expiration dates: \n";
      for (let i of itemList){
        const loc_arr = JSON.parse(i.location);
        detail += "\t" + i.name + " stored at " + loc_arr.join('/') + "\n";
      }
      detail += "\n";
    }
    // eventList is not empty
    if (eventList.length > 0) {
      detail += "Some events are approaching their deadlines: \n";
      for (let e of eventList){
        if (e.location){
          detail += "\t" + e.name + " at " + e.location + "\n";
        } else {
          detail += "\t" + e.name +  "\n";
        }
      } 
    }

    detail += "\nBest Regards,\nTeam Chaoz - Project Approaching"

    let message	= {
      text:	detail,
      from:	"Team Chaoz <cs130.approaching@gmail.com>",
      to: `<${email}>`,
      subject:	"Expiration Notification from Approaching",
    };

    smtp.send(message, callback);
  }
}

module.exports = DatabaseUtils;
