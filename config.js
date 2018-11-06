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
    }
  }
}