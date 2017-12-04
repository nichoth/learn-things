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

