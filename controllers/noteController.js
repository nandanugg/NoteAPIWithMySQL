const Ajv = require('ajv')
const model = require('../model/noteModel')

const ajv = new Ajv()

const baseValidatorObj = {
  type: 'object',
  additionalProperties: false
}

const querySchema = {
  composedSchema: ajv.compile({
    ...baseValidatorObj,
    properties: {
      search: { type: 'string', minLength: 1 },
      count: { type: 'string', enum: ['true', 'false'] },
    },
    minProperties: 1
  }),
  validate(data) {
    const isValid = this.composedSchema(data)
    if (!isValid) throw this.composedSchema.errors
  }
}

function add(data) {
  return model.add(data)
}

function get(query) {
  return model.get(query)
}

function edit(query, data) {
  return model.edit(query, data)
}

function remove(query) {
  return model.remove(query)
}

async function getNoteLike(userId, query) {
  querySchema.validate(query)
  if (query.hasOwnProperty('count') && query.count == 'true') {
    return model.getLikeCount('note', query.search, { userId })
  } else {
    return model.getLike('note', query.search, { userId })
  }
}

module.exports = {
  add,
  get,
  getNoteLike,
  edit,
  remove
}