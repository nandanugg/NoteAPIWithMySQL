const Ajv = require('ajv')
class BaseController {
  constructor(Model, schemas) {
    this.model = new Model()
    const ajv = new Ajv()

    for (const key in schemas) {
      const schema = schemas[key];
      this[key] = {}
      this[key].compiledSchema = ajv.compile(schema)
      this[key].validate = (data) => {
        const isValid = this[key].compiledSchema(data)
        if (!isValid) throw this[key].compiledSchema.errors
      }
    }
  }

  add(data) {
    return this.model.add(data)
  }
  get(query) {
    return this.model.get(query)
  }
  edit(query, data) {
    return this.model.edit(query, data)
  }
  delete(query) {
    return this.model.delete(query)
  }
}

module.exports = BaseController