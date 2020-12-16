const knex = require('knex')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

const dbConnection = knex({
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // https://github.com/knex/knex/issues/1240
    typeCast: function (field, next) {
      if (field.type == 'TINY' && field.length == 1) {
        return (field.string() == '1');
      }
      return next();
    }
  },
  pool: {
    max: 2
  },
})

module.exports = dbConnection