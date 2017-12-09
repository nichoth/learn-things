# frontend test recipe

Use some shell pipes to run tests in a browser with custom html file.

```bash
browserify test/index.js | htmlify test/index.html | tape-run --input html
```

package.json
```js
{
  "scripts": {
    "test": "browserify test/index.js | htmlify test/index.html | tape-run --input html"
  },
  "devDependencies": {
    "browserify": "^14.5.0",
    "inline-htmlify": "^2.0.0",
    "tape": "^4.8.0",
    "tape-run": "^3.0.1"
  }
}
```

Your html file needs a couple of weird parts. tape-run needs a script tag for `/reporter.js`, and your code will be injected in a script tag with an attribute `inline-htmlify`.

test/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>example</title>
    <script src="/reporter.js"></script>
</head>
<body>
    <div id="content"></div>
    <script inline-htmlify></script>
</body>
</html>
```
