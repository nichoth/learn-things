var nano = require('nanomsg')
var req = nano.socket('req')

req.connect('tcp://127.0.0.1:8000')

req.send('hello')
req.on('data', function (msg) {
    console.log('hello', msg.toString())
})

req.send('hey')
req.on('data', function (msg) {
    console.log('hey', msg.toString())
})



