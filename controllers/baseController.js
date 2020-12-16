const Ajv = require('ajv')
class BaseController {
  constructor(Model, schemas) {
    this.model = new Model()
    this.ajv = new Ajv()


    /**
     * below are the same code as baseModel.js, but
     * controller sometimes doesn't need validation,
     * so including a schema while use / extend this
     * class is optional.
     * 
     * Just remember that while designing a base controller
     * we should be thoughtful about how the base controller
     * can help controllers who extends it.
     */

    for (const key in schemas) {
      const schema = schemas[key];
      this[key] = {
        compiledSchema: this.ajv.compile(schema),
        validate(data) {
          const isValid = this.compiledSchema(data)
          if (!isValid) throw this.compiledSchema.errors
        }
      }
    }
  }

  // 👇 basic CRUD method using model
  add(data) {
    return this.model.add(data) // 👈 this is using baseModel methods
  }
  get(query) {
    return this.model.get(query) // 👈 this is using baseModel methods
  }
  edit(query, data) {
    return this.model.edit(query, data) // 👈 this is using baseModel methods
  }
  delete(query) {
    return this.model.delete(query) // 👈 this is using baseModel methods
  }
}

module.exports = BaseController