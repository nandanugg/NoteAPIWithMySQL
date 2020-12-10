# Initialization
Things that we need to know at this branch

## New modules!
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [nodemon](https://www.npmjs.com/package/nodemon)

## New technique!
### History of node modules
Mainly, there's two types of modules in npmjs.com, there are:
1. CLI Modules
   
   These modules are meant to help us develop our code better by offering things like auto restart, autocorrect, autofill, and others. They usually can be used inside terminal by typing the module name and use it like another terminal command

2. Modules

   These module are meant to help us to build our code by adding features, like `bcrypt` or `jsonwebtoken` that we already installed, we can use it by using `require()` inside our code.

#### 🤔 How do I know if a module is the CLI one or the basic?
It usually explained in the module documentation

### Nodemon
As we code along, we will getting tired running `npm start` over and over again, we can automate that process by using `nodemon` CLI module!

We can use nodemon by installing it with `-g` like `npm i -g nodemon`, `-g` means the module is installed not in our project, but rather than installed in the node itself (or we can say it "globally"), by doing that, at any folder we open in terminal, nodemon will always be ready to be used by typing `nodemon javascriptFile.js` in terminal. 

Nodemon is the same as node, but they automatically restart if we change / add / delete any file, but as we can see at `package.json` nodemon is placed at `devDependencies` because in this project, nodemon is installed it by using `npm i `**`-D`**` nodemon`, the `-D` means `install in devDependencies`.

By installing CLI module in `devDependencies` means we can use nodemon only in the folder that we install it with, and can only be used by typing `nodemon javascriptFile.js` in `package.json` script, not in terminal.

`devDependencies` is a place to install any non functional module that's not affecting how the code will run, without nodemon, our code will just run fine without problem. `devDependencies` will also be the place where we install our code tester modules in the future.

### Why **-D**?
Because as we collaborate, we will encounter a condition where our partner is not installing nodemon globally, maybe they just forget or have their own reason to not install it, to make sure that the collaboration is using the same module without bothering our partner's reason, we should install it with `-D` and add a script to use that module in `package.json`

### How and when we should install with **-D**?
There's no another reason than "if we install a package that's not affecting our code to be operational, but it helps us to develop our code then install it with **-D**"