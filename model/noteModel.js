const dbConnection = require("../connections/dbConnection");
const { nanoid } = require("nanoid");
const Ajv = require('ajv')

const ajv = new Ajv()
const tableName = 'notes'

const baseValidatorObj = {
  type: 'object',
  additionalProperties: false
}

const addSchema = {
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      note: { type: 'string', minLength: 1 },
      userId: { type: 'string', minLength: 1 }
    },
    required: ['note', 'userId']
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

const editSchema = {
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      note: { type: 'string', minLength: 1 },
      isArchived: { type: 'boolean' },
    },
    required: ['note']
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

const querySchema = {
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      id: { type: 'string', minLength: 1 },
      note: { type: 'string', minLength: 1 },
      userId: { type: 'string', minLength: 1 },
    },
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

// 👇 copied from userModel.js get()
async function get(query) {
  querySchema.validate(query)

  return dbConnection(tableName).where(query)
}

/**
 * Model first responsibility is to make way for controller to access data,
 * so when there's a condition where controller needs specific query, then
 * model should provide it.
 */

async function getLike(columnName, stringName, query) {
  querySchema.validate(query)

  return dbConnection(tableName)
    .select()
    .where(columnName, 'like', `%${stringName}%`)
    .where(query)
}

async function getLikeCount(columnName, stringName, query) {
  querySchema.validate(query)

  const countResult = await dbConnection(tableName)
    .count({ count: "*" })
    .where(columnName, 'like', `%${stringName}%`)
    .where(query)
  return countResult[0]
}

// 👇 copied from userModel.js add()
async function add(data) {
  addSchema.validate(data)

  data.id = nanoid()
  await dbConnection(tableName).insert(data)

  return dbConnection(tableName).where({ id: data.id }).first()
}


// 👇 copied from userModel.js edit()
async function edit(query, data) {
  querySchema.validate(query)
  editSchema.validate(data)

  await dbConnection(tableName)
    .update(data)
    .where(query)

  return dbConnection(tableName).where(query)
}

// 👇 copied from userModel.js remove()
async function remove(query) {
  querySchema.validate(query)

  const result = await dbConnection(tableName)
    .delete()
    .where(query)

  return { result }
}


module.exports = {
  get,
  getLike,
  getLikeCount,
  add,
  edit,
  remove,
}