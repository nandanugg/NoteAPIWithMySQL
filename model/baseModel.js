const dbConnection = require("../connections/dbConnection");
const { nanoid } = require("nanoid");
const Ajv = require('ajv')

/**
 * As we can see that BaseModel is extended by this NoteModel
 * and UserModel class because we designed BaseModel
 * to can be used in many different model, that concept is
 * called "OOP Polymorphism", means that BaseModel class can
 * "morph" to another class by inserting a different parameter
 */

class BaseModel {
  constructor(tableName, schemas) {
    this.db = dbConnection
    this.tableName = tableName
    this.ajv = new Ajv()

    /**
     * In OOP, we should be strct about how this class should be used,
     * below there's a code to verify that in order to use this class,
     * the schemas parameter should be inserted with rules defined below
     * 👇
     */

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

    /**
     * After verifiying a schema, we can create a ajv validator
     * in each property in schemas parameter, by doing this, any
     * class who extends / use this class will have ability
     * to create a validation schema without importing Ajv
     */

    // 👇 loop object
    for (const key in schemas) {
      // 👆 "key" will be filled with property name
      // 👇 we can access property value by using square brackets "[ ]" filled with a variable contain the property name
      const schema = schemas[key];
      // 👇 create a property with name of looped property name, and fill it with
      this[key] = {
        // 👇 compiled schema from schemas property
        compiledSchema = this.ajv.compile(schema),
        // 👇 and a validate method to validate to validate input
        validate(data) {
          const isValid = this[key].compiledSchema(data)
          if (!isValid) throw this[key].compiledSchema.errors
        }
      }
    }
  }

  // 👇 Basic CRUD methods using database
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