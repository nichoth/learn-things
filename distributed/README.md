# distributed patterns

## pubsub

Use the native node module `net` to create a server that publishes events to subscribers. 

### server

<details>

```js
var net = require('net')

if (require.main === module) {
    start()
}

function start () {
    var connections = []

    var server = net.createServer(function onConnection (conn) {
        var i = connections.length
        connections.push(conn)
        conn.on('close', () => connections.splice(i, 1))
    })
    server.listen(8000, () => console.log('listening on 8000'))

    setInterval(function () {
        connections.forEach(c => c.write(JSON.stringify({
            pid: process.pid,
            time: Date.now()
        })))
    }, 1000)
}

module.exports = start
```

</details>

### client

<details>

```js
var net = require('net')

if (require.main === module) {
    start()
}

function start () {
    var client = net.connect(8000)
    client.on('data', function (data) {
        console.log(JSON.parse(data))
    })
}

module.exports = start
```

</details>

-------------------------------

### reconnection

What happens if you start the client before the server? Or if the server goes offline?
```
Error: connect ECONNREFUSED 127.0.0.1:8000
```

To better decouple the client and server, you want the client to automatically try connecting until a server comes online. But that's too much work to do yourself -- look at these:

* [reconnect-core](https://www.npmjs.com/package/reconnect-core)
* [try-again](https://github.com/matthewmueller/try-again)


## req rep

Request and reply semantics are like http requests. However, HTTP has more overhead compared to other socket protocols. Another protocol we can use is [nanomsg](https://github.com/nickdesaulniers/node-nanomsg). Nanomsg does some low level stuff for us. Our socket will connect and reconnect on their own, so we don't have to write any reconnection logic.

### Server

<details>

```js
var nano = require('nanomsg')
var rep = nano.socket('rep')

rep.bind('tcp://127.0.0.1:8000')
rep.on('data', function (data) {
    console.log('wooo', data.toString())
    rep.send(data.toString() + ' world')
})
```

</details>


### client

<details>

```js
var nano = require('nanomsg')
var req = nano.socket('req')

req.connect('tcp://127.0.0.1:8000')
req.send('hello')
req.on('data', function (msg) {
    console.log('received', msg.toString())
})
```

</details>

------------------------------

So this is weird. In node we use callback functions for response semantics, but here there is a subscription API:

```js
req.send('hello', function onResponse (err, data) {})
```

What this means is that we are not able to send multiple requests in parallel. This is part of the protocol in nanomsg, which is based on [zeroMq](http://zeromq.org/). The responder is guaranteed to only get one message at a time, until it sends a response.

See also
* [ssbc/packet-stream](https://github.com/ssbc/packet-stream)
* [socketio/socket.io-client](https://github.com/socketio/socket.io-client)
* [tj/axon](https://github.com/tj/axon)

## dealer & router

In nanomsg/zeroMq context, parallel requests are done with a dealer/router structure. The server deals out requests round-robin to worker processes.

[zmq-time-rep-cluster.js](https://github.com/jimbojw/node-zmq-talk/blob/master/zmq-time-rep-cluster.js)


## multiplexing

Pipe several streams through a single socket. Check out this [example](https://github.com/hugozap/shoe-reconnect-muxdemux-example)


## discovery

[mafintosh/dns-discovery](https://github.com/mafintosh/dns-discovery)

