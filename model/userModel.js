/**
 * A model is a collection of function that have responsibilities for:
 * 1. Giving a way for controller to do data operation
 * 2. Making sure the data inserted, queried, or updated are in the right format and don't make any syntax errors
 * 
 * By implementing model, we can see some benefits like:
 * 1. Centralized import, see that only model is requiring a database connection
 * 2. Complete control on what & how the data goes in and out
 */

const dbConnection = require("../connections/dbConnection");
const { nanoid } = require("nanoid");
const Ajv = require('ajv')

const ajv = new Ajv()
const tableName = 'users'

const baseValidatorObj = {
  type: 'object',
  additionalProperties: false
}

/**
 * To fullfill the second responsibility, we will use Ajv to ensure that the data is on the right format
 * because as we know, knex will convert any value we inputted to query, and query must be compatible with
 * database schema.
 */

// 👇 create a schema for validating any data input
const addSchema = {
  // in this schema, we should fill any property that client must add before adding the data to database
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      username: { type: 'string', minLength: 1, maxLength: 32 },
      password: { type: 'string', minLength: 1 }
    },
    required: ['username', 'password']
  }),
  validate(data) {
    const isValid = this.compiledSchema(data) // 👈 "this" references to the current object, which is "addSchema", we will learn about this in OOP
    if (!isValid) throw this.compiledSchema.errors
  }
}

// 👇 create a schema for validating any query
const querySchema = {
  // in this schema, we should fill any property that can be queried by client to database
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      username: { type: 'string', minLength: 1, maxLength: 32 },
    },
    required: ['username'],
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

// 👇 create a schema for validating data updates
const editSchema = {
  // in this schema, we should fill any property that can be changed by client to database
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      password: { type: 'string', minLength: 1 },
    },
    required: ['password'],
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

/**
 * To fulfill the first resposibility, we will create functions that act as
 * bridges to make controller fetch data to database
 */

/**
 * There will be a situation when model queries are unique from others, it's better to
 * create a new function rather than modify existing function to handle many situation,
 * it will be harder and also longer to made
 */

async function isExists(query) {
  querySchema.validate(query)
  const countResult = await dbConnection(tableName)
    .count({ count: "*" })
    .where(query)
  return countResult[0].count
}

async function get(query) {
  querySchema.validate(query)

  return dbConnection(tableName).where(query)
}

async function getOne(query) {
  querySchema.validate(query)

  return dbConnection(tableName)
    .select()
    .where(query)
    .first()
}

async function add(data) {
  addSchema.validate(data)

  data.id = nanoid()
  await dbConnection(tableName).insert(data)

  return dbConnection(tableName).where({ id: data.id }).first()
}

/**
 * As for now, we will not see any use of those 👇 functions, and that't ok
 * By typing those functions, we will get some benefits such as:
 * 1. We can easily copy and paste this file if we want to create another model
 * that maybe requires those function
 * 2. Future support, maybe sometime we will implement a delete / edit user feature
 */

async function edit(query, data) {
  querySchema.validate(query)
  editSchema.validate(data)

  await dbConnection(tableName)
    .update(data)
    .where(query)

  return dbConnection(tableName).where(query)
}

async function remove(query) {
  querySchema.validate(query)

  const result = await dbConnection(tableName)
    .delete()
    .where(query)

  return { result }
}

module.exports = {
  isExists,
  get,
  getOne,
  add,
  edit,
  remove
}