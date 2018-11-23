const debug = require('debug')('server:database');
const mongoose = require('mongoose');
const models = require('./models');
const config = require('../config');
const userConfig = config.databaseModels.User;
const itemConfig = config.databaseModels.Item;
const eventConfig = config.databaseModels.Event;
const utils = require('./DatabaseUtils');

const DatabaseStatus = {
  DISCONNECTED: 'disconnected',
  CONNECTING:   'connecting',
  CONNECTED:    'connected',
}

/**
 * @classdesc Class representing the database.
 * This class implements Singleton design pattern. At most one instance
 * should exist during the runtime. Get a database instance with 
 * `Database.getInstance()` or `Database.getTestInstance()` for testing.
 * Avoid using `new Database(...)` outside the Database class.
 * Note that NodeJS and ExpressJS are single threaded by default.
 */
class Database {
  /**
   * The constructor initializes a connection to the MongoDB at the url
   * specified in configuration.
   * @private
   * @param {boolean} isTest - Indicating whether or not the instance is
   * constructed for testing. Used to decide which database to connect to
   * and which status variables to update.
   * @see config.js 
   */
  constructor(isTest) {
    const databaseUrl = isTest ? config.testDatabaseUrl : config.databaseUrl;
    // connect to db
    mongoose.connect(databaseUrl, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error: '));
    this.db.once('open', () => {
      // set connection status to be successful
      if (isTest) {
        this.testStatus = DatabaseStatus.CONNECTED;
      } else  {
        this.status = DatabaseStatus.CONNECTED;
      }
      debug('connected to mongodb: ', databaseUrl);
    });
  }

  static getInstance() {
    if (this.status === DatabaseStatus.DISCONNECTED) {
      this.status = DatabaseStatus.CONNECTING;      
      this.uniqueInstance = new Database(false);
    }
    while (this.uniqueInstance === null) ;
    return this.uniqueInstance;
  }

  static getTestInstance() {
    if (this.testStatus === DatabaseStatus.DISCONNECTED) {
      this.testStatus = DatabaseStatus.CONNECTING;      
      this.uniqueTestInstance = new Database(true);
    }
    while (this.uniqueTestInstance === null) ;
    return this.uniqueTestInstance;
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
    const user = query.getAuth();
    const details = query.getDetails();
    switch (query.getTarget()) {
      case 'User':
        utils.insertIfNotExisting(models.User, userConfig.primaryKey, 
          details, callback);
        break;
      case 'Item':
        utils.authorize(user, callback, () => {
          utils.insert(models.Item, details, callback);
        });
        break;
      case 'Event':
        utils.authorize(user, callback, () => {
          utils.insert(models.Event, details, callback);
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

/**
 * initialize connection status.
 * `status` is necessary because checking uniqueInstance is null or not is 
 * not enough. When uniqueInstance = null and status = disconnect, we
 * need to create a Database instance. When uniqueInstance = null and 
 * status = connecting, we don't need to create a Database instance.
 */
Database.status = DatabaseStatus.DISCONNECTED;
  
Database.uniqueInstance = null;
  
/**
 *  initialize connection status for test.
 */
Database.testStatus = DatabaseStatus.DISCONNECTED;

Database.uniqueTestInstance = null;

module.exports = Database;
