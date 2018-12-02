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

  /**
   * Get singleton database instance, initialize a new connection only when
   * the database does not exist.
   */
  static getInstance() {
    if (this.status === DatabaseStatus.DISCONNECTED) {
      this.status = DatabaseStatus.CONNECTING;      
      this.uniqueInstance = new Database(false);
    }
    while (this.uniqueInstance === null) ;
    return this.uniqueInstance;
  }

  /**
   * Get a test sandbox database instance, initialize a new connection only when
   * the database does not exist.
   */
  static getTestInstance() {
    if (this.testStatus === DatabaseStatus.DISCONNECTED) {
      this.testStatus = DatabaseStatus.CONNECTING;      
      this.uniqueTestInstance = new Database(true);
    }
    while (this.uniqueTestInstance === null) ;
    return this.uniqueTestInstance;
  }

  /**
   * Fetch the specific user profile from database with the given query.
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations 
   */
  fetchProfile(query, callback = () => {}) {
    const user = query.getAuth();
    utils.authorize(user, callback, () => {
      utils.getProfile(user.facebookId, callback);
    });
  }

  /**
   * Fetch all items stored under the given user from database with the given query.
   * Return a raw item list (get directly from database) and a structured item list.
   * The structured item list is in following structure:
   * { name: {layer name},
   *   sublayers: a list of {name, sublayers, items} object,
   *   items: all items stored under this layer
   * }
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations
   */
  fetchItems(query, callback = () => {}) {
    const user = query.getAuth();
    utils.authorize(user, callback, () => {
      utils.getItems(user.facebookId, items => {
        // success: false, do nothing but return
        if (!(items.success)) {
          callback(items);
        } else {
          const rawItems = items.items;
          let structuredItems = {
            name: 'home',
            sublayers: [],
            items: []};
          // iterate through all items
          for (let object of rawItems){
            let current = structuredItems;
            // iterate through location path
            const loc_arr = JSON.parse(object.location);
            for (let loc of loc_arr){
              if (loc !== current.name){
                // check if the location exists in sublayers
                let exist = false;
                for (let sub of current.sublayers){
                  if (loc === sub.name){
                    current = sub;
                    exist = true;
                  }
                }
                // the location doesn't exist in sublayers, create one
                if (!exist) {
                  let layer = {
                    name: loc,
                    sublayers: [],
                    items: []};
                  current.sublayers.push(layer);
                  current = layer;
                }
              }
            }
            current.items.push(object);
          }
          callback({
            success: true,
            items:{
              rawItems: rawItems,
              structuredItems: structuredItems
            }
          });
        }
      });
    });
  }

  /**
   * Fetch all events stored under the given user from database with the given query.
   * Return a raw event list (get directly from database) and a structured event list.
   * The structured event list stores all events in a 3D array with dimensions: year, month, date.
   * @param {Query} query - The Query object wrapped from client request.
   * @param {DatabaseCallback} callback - Called after all other operations 
   */
  fetchEvents(query, callback = () => {}) {
    const user = query.getAuth();
    utils.authorize(user, callback, () => {
      utils.getEvents(user.facebookId, events => {
        if (!(events.success)) {
          callback(events);
        } else {
          const rawEvents = events.events;
          rawEvents.sort((a, b) => (a.time > b.time));
          const structuredEvents = {};
      
          for (let event of rawEvents) {
            const time = new Date(Number(event.time));
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const date = time.getDate();
            if (!(year in structuredEvents)) {
              structuredEvents[year] = {};
            }
            if (!(month in structuredEvents[year])) {
              structuredEvents[year][month] = {};
            }
            if (!(date in structuredEvents[year][month])) {
              structuredEvents[year][month][date] = [];
            }
            
            structuredEvents[year][month][date].push(event);
          }
  
          callback({
            success: true,
            events: {
              rawEvents: rawEvents,
              structuredEvents: structuredEvents
            }
          });
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
      utils.remove(model, primaryKey, details, callback);
    });
  }

  /**
   * Iterate through all users and find if they have expiring item/event.
   * Send email to users who have expiring items or events according to their notification settings.
   * @param {Integer} timeInterval - delay between two runs of checkExpiration in miliseconds
   */
  static checkExpiration(timeInterval) {
    models.User.find( {}, (err, user) => {
      if (!err && user) {
        user.forEach((element) => {
          const userName = element.name;
          const userEmail = element.email;
          const notifyTime = element.notifyTime;
          let itemList = [];
          let eventList = [];
          models.Item.find( {}, (err, item) => {
            if (!err && item) {
              item.forEach((object) => {
              if (object.owner === element.facebookId) {
                // perform all date calculations in miliseconds
                if (!isNaN(object.expireDate)) {
                  const time_diff = Number(object.expireDate)-Number(new Date());
                  if (time_diff >= 0 && time_diff <= notifyTime && (!timeInterval || time_diff > (notifyTime-timeInterval))){
                    itemList.push(object);
                  }
                }
              }})
              models.Event.find( {}, (err, event) => {
                if (!err && event) {
                  event.forEach((object) => {
                  if (object.owner === element.facebookId) {
                    if (!isNaN(object.time)) {
                      const time_diff = Number(object.time)-Number(new Date());
                      if (time_diff >= 0 && time_diff <= notifyTime && (!timeInterval || time_diff > (notifyTime-timeInterval))){
                        eventList.push(object);
                      }
                    }
                  }})
                }
                if (itemList.length > 0 || eventList.length > 0){
                  utils.sendNotification(itemList, eventList, userName, userEmail, (err, message) => {
                    if (err){
                      console.log(err);
                    }
                  });
                }
              });
            }
          });
        });
      }
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