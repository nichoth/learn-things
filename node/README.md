# node

## decouple the IO layer

See the book *Node Cookbook*

Decouple the network layer by factoring the functionality as a separate module.

wiring.js

<details>

```js
module.exports = wiring 

function wiring (service) {
   const server = restify.createServer()

   server.get('/add/:first/:second', (req, res, next) => {
     service.add(req.params, (err, result) => {
       if (err) { 
         res.send(err)
         next()
         return 
       }
       res.send(200, result)
       next()
     })
   })

   server.listen(ADDERSERVICE_SERVICE_PORT, '0.0.0.0', () => {
     console.log('%s listening at %s', server.name, server.url)
   })
 } 
```

</details>

service.js

<details>

```js
module.exports = service

function service () {
   function add (args, cb) {
     const {first, second} = args
     const result = (parseInt(first, 10) + parseInt(second, 10))
     cb(null, {result: result.toString()})
   }

   return { add }
} 
```

</details>

index.js

Glue everything together

<details>

```js
const wiring = require('./wiring')
const service = require('./service')()
wiring(service)
```

</details>

