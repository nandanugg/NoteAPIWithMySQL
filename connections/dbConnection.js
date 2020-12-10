const knex = require('knex')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

const db = knex({
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  pool: {
    max: 2
  }
})

module.exports = db