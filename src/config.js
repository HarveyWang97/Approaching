module.exports = {
  localhost: 'http://localhost:' + (process.env.PORT || '3000'),
  databaseUrl: 'mongodb://TeamChaosz:CS130Approaching@ds151383.mlab.com:51383/approaching',
  databaseModels: {
    User: {
      collection: 'Users',
      fields: {
        facebookId:  { type: String, required: true },
        accessToken: { type: String, required: true },
        name:        { type: String, required: true },
        email:       { type: String, required: true },
      },
      primaryKey: 'facebookId',
      insert: [ 'facebookId', 'accessToken', 'name', 'email' ],
      updateRequired: [ 'facebookId', 'accessToken' ],
      updateOptional: [ 'facebookId', 'accessToken', 'email' ],
      remove: [ 'facebookId', 'accessToken' ]
    },
    Item: {
      collection: 'Items',
      fields: {
        owner:       { type: String, required: true },
        name:        { type: String, required: true },
        picture:     { type: String, required: false },
        expireDate:  { type: String, required: false },
        location:    { type: String, required: false },
        quantity:    { type: String, required: true },
        description: { type: String, required: false },
      },
      primaryKey: '_id',
      insert: [ 'facebookId', 'accessToken', 'name', 'picture', 'expireDate', 'location', 'quantity', 'description' ],
      updateRequired: [ 'facebookId', 'accessToken', '_id' ],
      updateOptional: [ 'facebookId', 'accessToken', '_id', 'name', 'picture', 'expireDate', 'location', 'quantity', 'description' ],
      remove: [ 'facebookId', 'accessToken', '_id' ]
    },
    Event: {
      collection: 'Events',
      fields: {
        owner:       { type: String, required: true },
        name:        { type: String, required: true },
        picture:     { type: String, required: false },
        time:        { type: String, required: true },
        location:    { type: String, required: false },
        description: { type: String, required: false },
      },
      primaryKey: '_id',
      insert: [ 'facebookId', 'accessToken', 'name', 'picture', 'time', 'location', 'description' ],
      updateRequired: [ 'facebookId', 'accessToken', '_id' ],
      updateOptional: [ 'facebookId', 'accessToken', '_id', 'name', 'picture', 'time', 'location', 'description' ],
      remove: [ 'facebookId', 'accessToken', '_id' ]
    }
  }
}