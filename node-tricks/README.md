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

## random strings
```js
var crypto = require('crypto')
crypto.randomBytes(32).toString('base64')
```

## run js from bash

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

## buffer encodings

* 'ascii' - For 7-bit ASCII data only. This encoding is fast and will strip the high bit if set.
* 'utf8' - Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
* 'utf16le' - 2 or 4 bytes, little-endian encoded Unicode characters. Surrogate pairs (U+10000 to U+10FFFF) are supported.
* 'ucs2' - Alias of 'utf16le'.
* 'base64' - Base64 encoding. When creating a Buffer from a string, this encoding will also correctly accept "URL and Filename Safe Alphabet" as specified in RFC4648, Section 5.
* 'latin1' - A way of encoding the Buffer into a one-byte encoded string (as defined by the IANA in RFC1345, page 63, to be the Latin-1 supplement block and C0/C1 control codes).
* 'binary' - Alias for 'latin1'.
* 'hex' - Encode each byte as two hexadecimal characters.


