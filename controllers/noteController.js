const NoteModel = require('../model/noteModel')
const BaseController = require('./baseController')

class NoteController extends BaseController {
  constructor() {
    const baseValidatorObj = {
      type: 'object',
      additionalProperties: false
    }
    super(NoteModel, {
      querySchema: {
        ...baseValidatorObj,
        properties: {
          search: { type: 'string', minLength: 1 },
          count: { type: 'string', enum: ['true', 'false'] },
        },
        minProperties: 1
      }
    })
  }

  async getNoteLike(userId, query) {
    this.querySchema.validate(query)
    if (query.hasOwnProperty('count') && query.count == 'true') {
      return this.model.getLikeCount('note', query.search, { userId })
    } else {
      return this.model.getLike('note', query.search, { userId })
    }
  }
}

module.exports = NoteController