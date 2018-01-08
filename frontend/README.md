# frontend

## package scripts

```js
{
    "scripts": {
        "preversion": "npm run lint && npm test",
        "postversion": "git push && git push --tags && npm publish",
        "lint": "eslint .",
        "test": "tape test/*.js | tap-spec"
    }
}
```

## frontend test recipe

Use some shell pipes to run tests in a browser with custom html file. This is good for when your code *requires* a browser environment. It's preferable whenever possible to write code that is environment agnostic -- that runs either in node or browsers.

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
