# Initialization
Things that we need to know at this branch

## New modules!
- [ajv](https://ajv.js.org/)

## New technique! 
### Input validation
----------

### Why we should do an input validation?

At work, as backend developer, we will serve our clients, which is frontend, mobile, or another backend developer,
and they're humans, human make mistakes, as their process to build their app, they will do mistakes, like not filling
certain property at body while adding data, and as we know, our app is designed to parse object inside request body
and transform it to queries, any misstyped property name, or value, can make a error, we don't want that to happen.

At this branch, we will use Ajv library to validate inputs and tell client if they have wrongly input some data. Ajv
uses a JSON Schema, which is a standard way for validating data types. By using Ajv, we can safely sleep at our nights
while our client is busy working their app.

### How does it work?
You can see how ajv work in [here](material/ajv.js) 
