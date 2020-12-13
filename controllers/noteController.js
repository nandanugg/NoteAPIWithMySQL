const Ajv = require('ajv')
const model = require('../model/noteModel')

const ajv = new Ajv()

const baseValidatorObj = {
  type: 'object',
  additionalProperties: false
}

const querySchema = ajv.compile({
  querySchema: {
    ...baseValidatorObj,
    properties: {
      search: { type: 'string', minLength: 1 },
      count: { type: 'string', enum: ['true', 'false'] },
    },
    minProperties: 1
  }
})

async function getNoteLike(userId, query) {
  querySchema.validate(query)
  if (query.hasOwnProperty('count') && query.count == 'true') {
    return model.getLikeCount('note', query.search, { userId })
  } else {
    return model.getLike('note', query.search, { userId })
  }
}

module.exports = {
  getNoteLike
}