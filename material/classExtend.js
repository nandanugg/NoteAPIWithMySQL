/**
 * After knowing what class is and the differencies between basic object and function,
 * class can be used to structure our code to be more "abstract"
 * like for example, if we want to create a new Admin, and all of the admin properties
 * are the same as user properties
 */
// 👇 declare a Person class
class Person {
  constructor(fullName, username, email) {
    this.fullName = fullName
    this.username = username
    this.email = email
  }
  greetUser() {
    return `Hello ${this.username}`
  }
}

class Admin extends Person { // 👈 extends Person, means this class is using Person's object structure as basis
  constructor(fullName, username, email, storeName) {
    /**
     * Remember calling class like new Admin()?
     * Due to this class is extending Person class
     * doesn't mean that we still not need to write new Person().
     * But by extending, we can write new Person() by just adding super()
     * at constructor
     */
    super(fullName, username, email) // 👈 same as new Person(), and the value filled with Admin class parameter
    this.storeName = storeName // 👈 add property exclusive for this class only
  }
  showStore() {
    return `Admin ${this.fullName} has a store called ${this.storeName}`
  }
}

const admin1 = new Admin('Sam', 'sammyboy', 'sam@gmail.com', 'Gaming store')

// 👇 we can use Person method because Admin is extending Person
console.log(admin1.greetUser());
// 👇 we also can use Admin method
console.log(admin1.showStore());

