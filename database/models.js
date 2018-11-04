const config = require('../config').databaseModels;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelGenerator = name => {
  const schemaPrototype = config[name].fields;
  schemaPrototype[config[name].primaryKey].unique = true;
  
  const schema = new Schema(schemaPrototype, {
    collection: config[name].collection
  });
  const model = mongoose.model(name, schema);

  return model;
}

module.exports = {
  User: modelGenerator('User')
};
