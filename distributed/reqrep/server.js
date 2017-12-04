var nano = require('nanomsg')
var rep = nano.socket('rep')

rep.bind('tcp://127.0.0.1:8000')
rep.on('data', function (data) {
    console.log('wooo', data.toString())
    rep.send(data.toString() + ' world')
})

