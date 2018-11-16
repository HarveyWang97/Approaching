const config = require('../config').databaseModels;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @function modelGenerator
 * @param {string} name 
 * @returns {mongoose.Model}
 * @see config.js
 */
const modelGenerator = name => {
  const schemaPrototype = config[name].fields;
  const primaryKey = config[name].primaryKey;
  if (schemaPrototype[primaryKey]) {
    schemaPrototype[primaryKey].unique = true;
  }

  const schema = new Schema(schemaPrototype, {
    collection: config[name].collection
  });
  const model = mongoose.model(name, schema);
  model.collection.dropIndexes();

  return model;
}

module.exports = {
  User: modelGenerator('User'),
  Item: modelGenerator('Item'),
  Event: modelGenerator('Event'),
};
