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
      insert: [ 'name', 'email' ],
      updateRequired: [],
      updateOptional: [ 'email' ],
      remove: []
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
      insert: [ 'name', 'picture', 'expireDate', 'location', 'quantity', 'description' ],
      updateRequired: [ '_id' ],
      updateOptional: [ '_id', 'name', 'picture', 'expireDate', 'location', 'quantity', 'description' ],
      remove: [ '_id' ]
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
      insert: [ 'name', 'picture', 'time', 'location', 'description' ],
      updateRequired: [ '_id' ],
      updateOptional: [ '_id', 'name', 'picture', 'time', 'location', 'description' ],
      remove: [ '_id' ]
    }
  }
}