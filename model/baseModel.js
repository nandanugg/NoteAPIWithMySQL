const dbConnection = require("../connections/dbConnection");
const { nanoid } = require("nanoid");
const Ajv = require('ajv')
class BaseModel {
  constructor(tableName, schemas) {
    this.db = dbConnection
    this.tableName = tableName
    this.ajv = new Ajv()

    const isSchemaValid = this.ajv.validate({
      type: 'object',
      properties: {
        addSchema: { type: 'object' },
        editSchema: { type: 'object' },
        querySchema: { type: 'object' },
      },
      required: ['addSchema', 'editSchema', 'querySchema']
    }, schemas)
    if (!isSchemaValid) throw this.ajv.errors

    for (const key in schemas) {
      const schema = schemas[key];
      this[key] = {}
      this[key].compiledSchema = this.ajv.compile(schema)
      this[key].validate = (data) => {
        const isValid = this[key].compiledSchema(data)
        if (!isValid) throw this[key].compiledSchema.errors
      }
    }
  }

  async add(data) {
    this.addSchema.validate(data)

    data.id = nanoid()
    await this.db(this.tableName).insert(data)

    return this.db(this.tableName).where({ id: data.id }).first()
  }

  async edit(query, data) {
    this.querySchema.validate(query)
    this.editSchema.validate(data)

    await this.db(this.tableName)
      .update(data)
      .where(query)

    return this.db(this.tableName).where(query)
  }

  async delete(query) {
    this.querySchema.validate(query)

    await this.db(this.tableName)
      .delete()
      .where(query)

    return { result: 1 }
  }

  async get(query) {
    this.querySchema.validate(query)

    return this.db(this.tableName).where(query)
  }
}

module.exports = BaseModel