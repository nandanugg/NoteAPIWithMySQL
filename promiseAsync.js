/**
 * Asynchronous is a concept to handle things that might happen in future
 * 
 * Any programming code is designed to be synchronous, means if we type, declare, or use any function
 * programming expect that the result should be immidiate, thats a problem when we want to use a function
 * that return a result but not immidiate, like requesting to internet or database, because there are
 * phases that should be accomplised in order to get a result, like making sure that the internet is available,
 * the url is contact-able, etc etc
 * 
 * There are other example too, like compressing an image or file, as we can see everytime we compress a file,
 * there is a loading bar that indicate the process of compressing, even though they are not using internet
 * they also asynchronous, because the process is not immidiate
 * 
 * In short, asynchronous means all things about running a long task, and handle the result as the task is finished
 */

// 👇 synchronous task
function sendTimeout(miliseconds) {
  // 👇 setTimeout is a function in javascript to execute the first function parameter after waiting for several milliseconds
  setTimeout(() => {
    // 👇 this code will be executed after setTimeout done waiting by given milliseconds
    return `Timeout called after ${miliseconds}ms`
  },
    // 👇 insert how many milliseconds in second parameter should setTimeout wait to execute the first function parameter
    miliseconds)
}

// 👇 use the synchronous task
const timeoutResult = sendTimeout(300)
// 👇 log the result of synchronous task
console.log("sendTimeout()", timeoutResult); // undefined
/**
 * 👆
 * That's happened because the "return ..." code is executed after several milliseconds
 * and as we already read in first explanation, "if we type, declare, or use any function,
 * programming expect that the result should be immidiate"
 * 
 * We can handle this by changing it to promises, it's same as a promise in a real world
 * a promise can be fulfilled, or can be revoked, but wether it's fulfilled or revoked 
 * the result of a promise is unknown until we wait for the result
 */

// 👇 asynchronous task
function sendTimeoutPromise(miliseconds) {
  // new Promise() is a javascript class (means we don't need to import it) that have slightly different
  // structure than functions, we will learn about it later
  // 👇 tell that this function is returning promise, so we can expect that the result is not immidiate
  return new Promise((resolve, reject) => {
    // 👆 at first parameter, we insert an anonymous function to tell that this promise will do anything we code inside this function
    // resolve and reject parameter will be filled with function by new Promise() that we can use to tell
    // that the code inside this function is fullfilled (we can call it in future "resolved") a result
    // or revoked (we can call it in future "rejected") an error

    if (miliseconds > 500) {
      // 👇 use reject parameter to tell this promise that this promise is revoking it's promise
      // and the reason is inside reject function parameter
      reject(`${miliseconds}ms is too long!`)
    } else {
      setTimeout(() => {
        // 👇 use resolve parameter to tell this promise that this promise is fullfilling it's promise
        // and the result is inside resolve function parameter
        resolve(`Timeout called after ${miliseconds}ms`)
      }, miliseconds)
    }
  })
}

// 👇 use a function that returns a promise
sendTimeoutPromise(100)
  .then((timeoutResultPromise) => { // 👈 if a function returning a promise, there will be a .then() method that we can use to do anything if the promise fulfilled (resolved)
    // 👆 .then() first parameter must be an anonymous function that the first parameter will be filled with promise resolved result
    console.log("sendTimeoutPromise().then()", timeoutResultPromise);
  })

// 👇 use a function that returns a promise
sendTimeoutPromise(600)
  .catch((reason) => { // 👈 if a function returning a promise, there will also a .catch() method that we can use to do anything if the promise is revoked (rejected)
    // 👆 .catch() first parameter must be an anonymous function that the first parameter will be filled with promise rejected reason
    console.log("sendTimeoutPromise().catch()", reason);
  })

/**
 * As we code along the road, we will get in situation where we will use function that retuns a promise in side a function that's not returning a promise
 * That's a problem, with the same reason as "if we type, declare, or use any function, programming expect that the result should be immidiate"
 */

function runPromise() {
  let result
  sendTimeoutPromise(400)
    .then((promiseResult) => {
      result = promiseResult // 👈 fill the result variable with promise result
    })
  console.log("runPromise()", result); // undefined
  // 👆 due to the result is filled later, console.log will be executing first, becuase it's not waiting sendTimeoutPromise to resolve it's promise
}
runPromise()

/**
 * We can solve above problem by using async await
 * Async await is a way to "wait" a promise to resolved, so another code can use the result
 */

// 👇 async function
async function runPromiseWithAsync(miliseconds) {
  const timeoutResultAsync = await sendTimeoutPromise(miliseconds) // 👈 to wait a promise to be resolved, type "await" and the result will be placed inside "timeoutResultAsync" 
  // using promise with await 👆 can be also called "await function"
  console.log("runPromiseWithAsync()", timeoutResultAsync);
  return timeoutResultAsync // 👈 this is same as typing "resolve(timeoutResultAsync)" without declaring new Promise()
}
runPromiseWithAsync(100)

// async function is actually a promise too, so we can still use it like regular promise, but only use this if we want to use promise outside any function
// just make sure that the async function is returning something, otherwise the async result will be undefined
runPromiseWithAsync(200)
  .then((result) => {
    console.log("runPromiseWithAsync().then()", result);
  })

// We can also use the catch to catch any rejection inside await function
runPromiseWithAsync(200)
  .catch((reason) => {
    console.log("runPromiseWithAsync().catch()", reason);
  })