module.exports = {
  localhost: 'http://localhost:' + (process.env.PORT || '3000'),
  databaseUrl: 'mongodb://TeamChaosz:CS130Approaching@ds151383.mlab.com:51383/approaching',
  testDatabaseUrl: 'mongodb://TeamChaosz:CS130Approaching@ds115154.mlab.com:15154/approaching_test',
  databaseModels: {
    User: {
      collection: 'Users',
      fields: {
        facebookId:  { type: String, required: true },
        accessToken: { type: String, required: true },
        name:        { type: String, required: true },
        email:       { type: String, required: true },
        notifyTime:  { type: String, required: false },
      },
      primaryKey: 'facebookId',
      insert: [ 'facebookId', 'accessToken', 'name', 'email'],
      updateRequired: [ 'facebookId', 'accessToken' ],
      updateOptional: [ 'facebookId', 'accessToken', 'email', 'notifyTime' ],
      remove: [ 'facebookId', 'accessToken' ]
    },
    Item: {
      collection: 'Items',
      fields: {
        owner:       { type: String, required: true  },
        name:        { type: String, required: true  },
        picture:     { type: String, required: false },
        expireDate:  { type: String, required: false },
        location:    { type: String, required: true  },
        description: { type: String, required: false },
        eventList:   { type: String, required: false }
      },
      primaryKey: '_id',
      insert: [ 'facebookId', 'accessToken', 'name', 'picture', 'expireDate', 'location', 'description', 'eventList' ],
      updateRequired: [ 'facebookId', 'accessToken', '_id' ],
      updateOptional: [ 'facebookId', 'accessToken', '_id', 'name', 'picture', 'expireDate', 'location', 'description', 'eventList' ],
      remove: [ 'facebookId', 'accessToken', '_id' ]
    },
    Event: {
      collection: 'Events',
      fields: {
        owner:       { type: String, required: true  },
        name:        { type: String, required: true  },
        picture:     { type: String, required: false },
        time:        { type: String, required: true  },
        location:    { type: String, required: false },
        description: { type: String, required: false },
        itemList:    { type: String, required: false }
      },
      primaryKey: '_id',
      insert: [ 'facebookId', 'accessToken', 'name', 'picture', 'time', 'location', 'description', 'itemList' ],
      updateRequired: [ 'facebookId', 'accessToken', '_id' ],
      updateOptional: [ 'facebookId', 'accessToken', '_id', 'name', 'picture', 'time', 'location', 'description', 'itemList' ],
      remove: [ 'facebookId', 'accessToken', '_id' ]
    }
  }
}