const BaseModel = require('./baseModel');

class UserModel extends BaseModel {
  constructor() {
    const baseValidatorObj = {
      type: 'object',
      additionalProperties: false
    }

    super('users', {
      addSchema: {
        ...baseValidatorObj,
        properties: {
          username: { type: 'string', minLength: 1, maxLength: 32 },
          password: { type: 'string', minLength: 1 }
        },
        required: ['username', 'password']
      },
      querySchema: {
        ...baseValidatorObj,
        properties: {
          username: { type: 'string', minLength: 1, maxLength: 32 },
        },
        required: ['username'],
      },
      editSchema: {
        ...baseValidatorObj,
        properties: {
          password: { type: 'string', minLength: 1 },
        },
        required: ['password'],
      }
    })

  }

  async isExists(query) {
    this.querySchema(query)

    // minimize data transfers between node and database
    const countResult = await this.db(this.tableName)
      .count({ count: "*" })
      .where(query)
    return countResult[0].count
  }

  getOne(query) {
    this.querySchema(query)

    return this.db(this.tableName)
      .select()
      .where(query)
      .first()
  }
}

module.exports = UserModel