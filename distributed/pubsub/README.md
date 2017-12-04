# pubsub

Use the native node module `net` to create a server that publishes events to subscribers. 

## server

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

## client

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
