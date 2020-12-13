/**
 * As we learn, we found that many object have a method, but how it's actually work?
 * A method is usually work like a hammer in a toolbox.
 * There's a lot of tool in toolbox and hammer is one if them, same as method, 
 * it's a tool to do something in a object
 */


const user = {
  greetText: "hello",
  firstName: "bob",
  // 👇 we can create a method like this
  greet() {
    // 👇 "this" will refer to user object, and it can ONLY refer it by using a function
    return this.greetText + ' ' + this.firstName;
  },
  // 👇 we can also create a property with a value of arrow function
  greetArrow: () => {
    // 👇 but "this" will refer to nothing, it will be undefined
    return this.greetText + " " + this.greet;
  }
}

console.log(user.greet());
console.log(user.greetArrow());

/**
 * But how if we want an object that can be modified?
 * That's where a function comming
 */

function userFunction(firstName, greetText) {
  // 👇 we can return a object, and not use "this"
  return {
    greet() {
      return greetText + " " + firstName
    },
    greetArrow: () => {
      return greetText + " " + firstName
    }
  }
}

// 👇 We can access the method like this
console.log(userFunction("Mark", "hello").greet());
console.log(userFunction("Mary", "Hola").greetArrow());
// 👆 the problem is above solution is not friendly for developers because we need to call the function first to get it's method
// That's where a class comes in
