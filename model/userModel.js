const BaseModel = require('./baseModel');

class UserModel extends BaseModel {
  constructor() {
    const baseValidatorObj = {
      type: 'object',
      additionalProperties: false
    }

    /**
     * By using OOP, because class are designed to be strict about
     * how it should be used, we will get a benefit like human error prone
     * so developer will make less mistake, but with a cons like longer 
     * implementation, because to make a class "strict", means we need
     * to code a lot, which also means longer implementation.
     */

    super('users', {
      // 👇 insert the schemas needed for the extended class
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


  // 👇 below are the same functions as previous userModel.js, but now they're class methods
  async isExists(query) {
    this.querySchema(query)

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