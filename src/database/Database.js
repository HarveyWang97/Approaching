const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');
const config = require('../config');
const userConfig = config.databaseModels.User;
const itemConfig = config.databaseModels.Item;
const eventConfig = config.databaseModels.Event;
const utils = require('./DatabaseUtils');

class Database {
  /**
   * The constructor initializes a connection to the MongoDB at the url
   * specified in configuration.
   * 
   * @see config.js
   */
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

  fetchData(user, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.getItems(user.facebookId, itemsResult => {
        if (!(itemsResult.success)) {
          callback(itemsResult);
        } else {
          utils.getEvents(user.facebookId, eventsResult => {
            if (!(eventsResult.success)) {
              callback(eventsResult);
            } else {
              callback({
                success: true,
                items: itemsResult.items,
                events: eventsResult.events
              });
            }
          })
        }
      });
    });
  }

  insertUser(user, callback = () => {}) {
    utils.insertIfNotExisting(models.User, userConfig.primaryKey, user, callback);
  }

  insertItem(user, item, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.insert(models.Item, item, callback);
    });
  }

  insertEvent(user, event, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.insert(models.Event, event, callback);
    });
  }

  updateUser(user, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.update(models.User, userConfig.primaryKey, user, callback);
    });
  }

  updateItem(user, item, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.update(models.Item, itemConfig.primaryKey, item, callback);
    });
  }

  updateEvent(user, event, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.update(models.Event, eventConfig.primaryKey, event, callback);
    });
  }

  removeUser(user, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.remove(models.User, userConfig.primaryKey, user, callback);
    });
  }

  removeItem(user, item, callback = () => {}) {
    utils.authorize(user, callback, () => {
      utils.remove(models.Item, itemConfig.primaryKey, item, callback);
    });
  }

  removeEvent(user, event, callback = () => {}) {
    utils.remove(models.Event, eventConfig.primaryKey, event, callback);
  }
}

module.exports = new Database();

