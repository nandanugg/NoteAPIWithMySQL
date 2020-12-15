// you can test this file by running "node material/ajv.js" in terminal

// 👇 https://ajv.js.org/#getting-started
const Ajv = require('ajv')

// 👇 ajv is a class, so we need to type "new" to use it
const ajv = new Ajv()

// 👇 compile a schema first before validating any value
const compiledSchema = ajv.compile({
  type: 'object', // 👈 https://ajv.js.org/json-schema.html#type
  properties: { // 👈 https://ajv.js.org/json-schema.html#properties
    name: { type: 'string' },
    age: { type: 'number' },
    isMarried: { type: 'boolean' },
    pets: {
      type: 'array',
      items: { // 👈 https://ajv.js.org/json-schema.html#items
        type: 'string'
      },
      minItems: 1 // 👈 https://ajv.js.org/json-schema.html#maxitems--minitems
    }
  },
  required: ['name', 'age', 'isMarried', 'pets'], // 👈 https://ajv.js.org/json-schema.html#required
  additionalProperties: false // 👈 https://ajv.js.org/json-schema.html#additionalproperties
})

async function run() {
  // scenario 1, client insert body with a less property than it should
  const body1 = {
    name: "julien",
    age: 32,
    isMarried: true
  }
  const isBody1Ok = await compiledSchema(body1)
  if (!isBody1Ok) console.log('body1', compiledSchema.errors);

  // scenario 2, client insert body with a wrong type
  const body2 = {
    name: "julien",
    age: "32",
    isMarried: true,
    pets: ['Spark', 'Chill']
  }
  const isBody2Ok = await compiledSchema(body2)
  if (!isBody2Ok) console.log('body2', compiledSchema.errors);

  // scenario 3, client insert body with extra property than it should
  const body3 = {
    name: "julien",
    age: 32,
    isMarried: true,
    pets: ['Spark', 'Chill'],
    randomProperty: false
  }
  const isBody3Ok = await compiledSchema(body3)
  if (!isBody3Ok) console.log('body3', compiledSchema.errors);

  // scenario 4, client insert body with right property and value
  const body4 = {
    name: "julien",
    age: 32,
    isMarried: true,
    pets: ['Spark', 'Chill']
  }
  const isBody4Ok = await compiledSchema(body4)
  if (!isBody4Ok) {
    console.log('body4', compiledSchema.errors);
  } else {
    console.log('body4', "No errors here 👀");
  }
}
run()