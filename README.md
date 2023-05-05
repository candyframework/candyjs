# An object-oriented efficient MVC and REST framework

[![NPM version](https://img.shields.io/npm/v/candyjs.svg?style=flat-square)](https://www.npmjs.com/package/candyjs)
[![Test coverage](https://img.shields.io/codecov/c/github/candyframework/candyjs.svg?style=flat-square)](https://app.codecov.io/gh/candyframework/candyjs)


CandyJs is a new framework and it is not based on the third party framework

### Why CandyJs

+ CandyJs implements the MVC (Model-View-Controller) architectural pattern

+ Auto router system

+ CandyJs is extremely extensible

+ Practice with TypeScript

### DOC

+ doc https://candyframework.github.io/candyjs-guide

+ examples https://gitee.com/candyjs/candyjs-examples

+ examples https://github.com/candyframework/candyjs-examples

### Version of Node.js

nodejs >= 10.0

### Quick start

```bash
# install
npm install -g @candyjs/cli

# run the command
candyjs-cli
```

### Hello world

CandyJs application start with an entry file

```javascript
// the entry file index.ts
import '@candyjs/tswrapper';

import CandyJs from 'candyjs';
import App from 'candyjs/web/Application';

new CandyJs(new App({
    'id': 1,

    // define debug mode
    'debug': true,

    // define the base path of the running application
    'appPath': __dirname + '/app'

})).listen(2333, () => {
    console.log('listen on 2333');
});
```

### Alias

+ @candy the directory where the Candy.ts file is located

+ @app the base path of the running application

+ @runtime the runtime path of the running application. Defaults to @app/runtime

### Application structure example

<pre>
|- index.ts
|
|- node_modules
|
|- public
|
|- app
|  |
|  |-- controllers
|      |
|      |-- user
|      |   |
|      |   |-- IndexController.ts
|      |   |-- OtherController.ts
|      |
|      |-- goods
|      |   |
|      |   |-- IndexController.ts
|      |   |-- OtherController.ts
|      |
|   -- views
|      |
|      |-- user
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- goods
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- modules
|      |
|      |-- actives
|      |   |
|      |   |-- controllers
|      |   |   |
|      |   |   |-- IndexController.ts
|      |   |
|      |   |-- views
|      |   |   |
|      |   |   |-- index.html
|      |   |
|      |
|   -- runtime
|
</pre>

