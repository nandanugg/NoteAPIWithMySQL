const Ajv = require('ajv')
const model = require('../model/noteModel')

const ajv = new Ajv()

const baseValidatorObj = {
  type: 'object',
  additionalProperties: false
}


/**
 * Controller is the place where if we want to do modification about how
 * the data will be returned, but remember, controller only do validation
 * about options about how the data will be returned
 */

// 👇 declare schema for GET note query handler
const querySchema = {
  compiledSchema: ajv.compile({
    ...baseValidatorObj,
    // 👇 only allow these query to be inserted
    properties: {
      search: { type: 'string', minLength: 1 },
      count: { type: 'string', enum: ['true', 'false'] },
    },
    minProperties: 1 // 👈 make sure that client is inserting minimal one of above query
  }),
  validate(data) {
    const isValid = this.compiledSchema(data)
    if (!isValid) throw this.compiledSchema.errors
  }
}

/**
 * There also situation where controller will not do much, like just
 * pass the data directly to model, without any modification from controller.
 * But we still need to create a function for it rather than the view (or route)
 * requesting the data directly to model, some of the reason is future use, someday
 * if we want to modify the app logic, it will be much easier to keep the logics
 * inside controller, so our view code is concistent
 */

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

// 👇 GET note query handler
async function getNoteLike(userId, query) {
  querySchema.validate(query)
  /**
   * As we can see below, controller manages what model function shoud it do
   * based on query inserted by client
   */
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