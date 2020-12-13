const dbConnection = require("../connections/dbConnection");
const { nanoid } = require("nanoid");
const Ajv = require('ajv')

const ajv = new Ajv()
const tableName = 'users'

const baseValidatorObj = {
  type: 'object',
  additionalProperties: false
}


const addSchema = {
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      username: { type: 'string', minLength: 1, maxLength: 32 },
      password: { type: 'string', minLength: 1 }
    },
    required: ['username', 'password']
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
      username: { type: 'string', minLength: 1, maxLength: 32 },
    },
    required: ['username'],
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
      password: { type: 'string', minLength: 1 },
    },
    required: ['password'],
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

async function isExists(query) {
  querySchema.validate(query)

  // minimize data transfers between node and database
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

  await dbConnection(tableName)
    .delete()
    .where(query)

  return { result: 1 }
}

module.exports = {
  isExists,
  get,
  getOne,
  add,
  edit,
  remove
}