# Terms we use
Throughout learing, we will usually hear programming terms, these are some of them, as we learn we will hear another term but these are the basics

----------
### String
`""`

_"create a string filled with chicken"_

`"chicken"`

_"string filled with your name"_

`"nanda"`

----------

### Number
1,2,3,4 etc

_"write your age number"_

`23`

_"write the sum of the array"_

`3`

----------

### Boolean
`true` / `false`

_"fill it with true"_

`true`

_"write false"_

`false`

----------

### Array
`[]`

_"create an array with three random names"_

`["budi", "sudi", "ikhsan"]`

_"create an array with today date and the next 3 days"_

`[23, 24, 25, 26]`

_"change the second item of that array to 2"_

before `[23, 24, 25, 26]`

after `[23, 2, 25, 26]`

----------

### Object
`{}`

_"create an object with name property with a value of 'budi'_
_and age property with value of nine"_

```javascript
{
  name: "budi",
  age: 9,
}
```

_"change age property to healthCount"_

before
```javascript
{
  name: "budi",
  age: 9,
}
```

after
```javascript
{
  name: "budi",
  healthCount: 9,
}
```

_"change name value to 'siti'"_

before
```javascript
{
  name: "budi",
  age: 9,
}
```

after
```javascript
{
  name: "siti",
  healthCount: 9,
}
```

----------

### Variable

_"create a name variable"_
```javascript
const name;
```

_"create a let variable called age"_
_or_
_"create a age let variable"_
```javascript
let name;
```

_"create a name variable with value of budi"_
_or_
_"create a name with value of budi"_
```javascript
const name = "budi";
```

_"create a name variable with value of an object"_
_or_
_"create a name object"_
```javascript
const name = {};
```

_"create a day variable with value of an array"_
_or_
_"create a day array"_
```javascript
const name = [];
```

_"create a name object,_
_then fill the object with name and age properties with empty string value"_
```javascript
const name = {
  name: "",
  age: ""
};
```

----------

### Function

_"create a function called chainSet_
_with id and name parameter"_

```javascript
function chainSet(id, name){

}
```

_"Change chainSet name parameter to userId"_

Before
```javascript
function chainSet(id, name){

}
```

After
```javascript
function chainSet(id, userId){

}
```

_"Create bind function that has a name parameter_
_inside it, create user object_
_then add name property and fill it with function parameter_
```javascript
function bind(name){
  const user = {
    name: name
  }
}
```

_"In bind function, return the user variable"_

Before
```javascript
function bind(name){
  const user = {
    name: name
  }
}
```
After
```javascript
function bind(name){
  const user = {
    name: name
  }
  return user
}
```

### Anonymous function
```javascript
() => {

}
```

_"create an anonymous function with req and res parameter"_
```javascript
(req, res) =>{

}
```

_"create name variable with value of an anonymous function"_
```javascript
const name  = (req, res) =>{

}
```

## Task
### Task 1
1. Create a name variable with value of charlie
2. Create a days array, fill it with day names from monday to sunday
3. Create a init function, inside it
   1. create a user object with name and age property, fill it with your name and age respectively

### Task 2
1. Create add function with id & name parameter, inside it
   1. Create a result object with
      1. id property with value of id from function parameter as value, and
      2. a name property with value of name from function parameter as value
   2. Return the result variable
2. Create addItem function with id & item as parameter, inside it
   1. create a result object with
      1. id property with value of id from function parameter as value
      2. and a item property with value of item from function parameter as value
   2. Return the result variable
