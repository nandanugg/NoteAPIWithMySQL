const knex = require('knex')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

// 👇 initiate knex instance
const db = knex({
  // 👇 use mysql2 module
  client: 'mysql2',
  // 👇 give details about mysql connection
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  // 👇 enable connection pooling (https://www.youtube.com/watch?v=_IyN5HNV7QE)
  pool: {
    max: 2
  }
})

module.exports = db