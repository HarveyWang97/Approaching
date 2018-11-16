const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');
const config = require('../config');
const userConfig = config.databaseModels.User;
const itemConfig = config.databaseModels.Item;
const eventConfig = config.databaseModels.Event;
const utils = require('./DatabaseUtils');

/**
 * @classdesc Class representing the database.
 */
class Database {
  /**
   * The constructor initializes a connection to the MongoDB at the url
   * specified in configuration.
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

  /**
   * Fetch and reformat Items and Events data for a given user from database.
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  fetchData(query, callback = () => {}) {
    const user = query.getAuth();
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

  /**
   * Insert a user/item/event into the database.
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  insert(query, callback = () => {}) {
    switch (query.getTarget()) {
      case 'User':
        utils.insertIfNotExisting(models.User, userConfig.primaryKey, 
          query.getQuery(), callback);
        break;
      case 'Item':
        const user = query.getAuth();
        const item = query.getDetails();
        utils.authorize(user, callback, () => {
          utils.insert(models.Item, item, callback);
        });
        break;
      case 'Event':
        const user = query.getAuth();
        const event = query.getDetails();
        utils.authorize(user, callback, () => {
          utils.insert(models.Event, event, callback);
        });
        break;
    }
  }

  /**
   * Update a user/item/event that is already in the database.
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  update(query, callback = () => {}) {
    const user = query.getAuth();
    const details = query.getDetails();
    const model = models[query.getTarget()];
    const primaryKey = config.databaseModels[query.getTarget()].primaryKey;
    utils.authorize(user, callback, () => {
      utils.update(model, primaryKey, details, callback);
    });
  }

  /**
   * Remove a user/item/event that is already in the database.
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations 
   * are done.
   */
  remove(query, callback = () => {}) {
    const user = query.getAuth();
    const details = query.getDetails();
    const model = models[query.getTarget()];
    const primaryKey = config.databaseModels[query.getTarget()].primaryKey;
    utils.authorize(user, callback, () => {
      utils.remove(models, primaryKey, details, callback);
    });
  }
}

module.exports = new Database();

