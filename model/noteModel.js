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

  /**
   * The power of OOP inheritance will be shown here, as 
   * we can see that previously we have basic function like add,
   * get, edit & remove function, and now they're gone, because
   * those function already been implemented in baseModel.
   * 
   * By doing that, we can create a model that only focused
   * on custom queries like methods below, and also speed up
   * the development for creating model that requires basic
   * methods
   */

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