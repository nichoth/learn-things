# node tricks

Bite size node sampler

## shebang
```js
#!/usr/bin/env node
```

## require.main
```js
// if we are running this file from cli, not as a library
if (require.main === module) {
    // start the program
    myThing()
}

function myThing () {}

// you can also require this file and call it somewhere else
module.exports = myThing
```

## unref
Calling unref on a socket will allow the program to exit if this is the only active socket in the event system.

```js
var http = require('http')
var server = http.createServer()
server.unref()  // now the process will exit
```



