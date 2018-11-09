module.exports = {
  localhost: 'http://localhost:' + (process.env.PORT || '3000'),
  databaseUrl: 'mongodb://TeamChaosz:CS130Approaching@ds151383.mlab.com:51383/approaching',
  databaseModels: {
    User: {
      collection: 'Users',
      fields: {
        facebookId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        }
      },
      primaryKey: 'facebookId',
      required: [ 'facebookId', 'name', 'email' ],
      updatable: [ 'email' ]
    },
    Event: {
      collection: 'Events',
      fields: {
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          required: true
        },
        location: {
          type: String,
          required: false
        },
        description :{
          type: String,
          required: false
        }
      },
      primaryKey: 'id',
      required: [ 'name', 'time', 'location', 'description' ],
      updatable: [ 'name', 'time', 'location', 'description' ]
    }
  }
}