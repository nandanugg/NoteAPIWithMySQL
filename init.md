# Initialization
Things that we need to know at this branch

## New modules!
- [knex](http://knexjs.org/)
- [mysql2](https://www.npmjs.com/package/mysql2)

## New technique! 
### Debugging
Remember `console.log()`? It's a command to show what is inside a variable, by writing that
actually we already implementing what's called "debugging", means we make sure what's inside
a variable.

The scope of debugging actually is more than that, by `console.log()` (or we can call it in future
"logging") we can also make sure that our program is running as intended, for example
if we want to make sure that the variable we insert inside an if statement, is as expected.

### VSCode debugging
Than typing a lot of `console.log()` why don't we just pause the program while running and observe
variables, after we done, we can continue the program? That's where VSCode debugging comes in.

We can use VSCode debugging by creating a `launch.json`, it's a `.json` file used by VSCode as
debugging configuration in current folder

## Steps for configuring VSCode debugging
1. Create `launch.json` by
   ![debug_new](init/debug_new.gif)
2. Add a breakpoint at where do we want to pause our program
   ![debug_breakpoint](init/debug_add_breakpoint.gif)
3. Start debugger
   ![debug_start](init/debug_start.gif)

----------

After that, we can debug an see variables in real time!
![debug_breakpoint](init/debug_breakpoint.gif)

### Debugging controls
1. Start (`f5`)
   ![debug_start](init/debug_start.gif)
2. Step over (`f10`)
   To step over to the next code
   ![debug_step_over](init/debug_continue.gif)
3. Restart debugger (`ctrl` + `shift` + `f5`)
   
   ![debug_restart](init/debug_restart.png)
4. Stop debugger (`shift` + `f5`)
   
   ![debug_stop](init/debug_stop.png)