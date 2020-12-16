/**
 * A class is a combination between an object and function
 */

// 👇 a class name is usually written with caps at first character
class User {
  // 👇 we can define class parameters by using constructor method
  constructor(firstName, greetText) {
    // 👇 use class constructor to set class properties
    this.firstName = firstName
    this.greetText = greetText
  }
  // 👇 we can create a method
  greet() {
    // 👇 and we can refer to class property by "this"
    return this.firstName + " " + this.greetText
  }
  // 👇 also, arrow function does not interfere with "this" reference
  greetArrow = () => {
    return this.firstName + " " + this.greetText
  }
}

/**
 * to use a class. we need to call the class first by typing "new"
 * new means we create a new object with the class structure to a variable
 * so variable that assigned with the class will have class object structure
 */
const user = new User('Mark', "Halo")

// 👇 after declaring user, now we can call those methods
console.log(user.greet());
console.log(user.greetArrow());

/**
 * Due to class is actually a function with pre-set object properties & methods
 * we can actually use a class to create a new variable with different parameters
 */
const user2 = new User('Whisk', "Grats")

console.log(user2.greet());
console.log(user2.greetArrow());