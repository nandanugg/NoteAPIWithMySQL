const BaseModel = require("./baseModel");

class NoteModel extends BaseModel {
  constructor() {
    const baseValidatorObj = {
      type: 'object',
      additionalProperties: false
    }
    super('notes', {
      addSchema: {
        ...baseValidatorObj,
        properties: {
          note: { type: 'string', minLength: 1 },
          userId: { type: 'string', minLength: 1 }
        },
        required: ['note', 'userId']
      },
      editSchema: {
        ...baseValidatorObj,
        properties: {
          note: { type: 'string', minLength: 1 },
          isArchived: { type: 'boolean' },
        },
        required: ['note']
      },
      querySchema: {
        ...baseValidatorObj,
        properties: {
          id: { type: 'string', minLength: 1 },
          note: { type: 'string', minLength: 1 },
          userId: { type: 'string', minLength: 1 },
        },
      }
    })

  }

  getLike(columnName, stringName, query) {
    this.querySchema.validate(query)

    return this.db(this.tableName)
      .select()
      .where(columnName, 'like', `%${stringName}%`)
      .where(query)
  }

  async getLikeCount(columnName, stringName, query) {
    this.querySchema.validate(query)

    const countResult = await this.db(this.tableName)
      .count({ count: "*" })
      .where(columnName, 'like', `%${stringName}%`)
      .where(query)
    return countResult[0]
  }
}

module.exports = NoteModel