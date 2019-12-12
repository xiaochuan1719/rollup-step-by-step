# Node.js使用API模式

本篇主要讲述用 rollup.js 的 API 在 Node.js 代码中执行编译代码

## 本篇目标

- 创建项目 chapter05

- 利用 rollup.js 的 API

- 在 Node.js 脚本中执行编译


## 目标实现

### 1. 项目创建

```shell script
cd 01-basic-examples
mkdir chapter05
cd chapter05

yarn init -y

# rollup 核心模块
yarn add rollup -D

# rollup 编译 ES6+ 的Babel模块
yarn add rollup-plugin-babel @babel/core @babel/preset-env @babel/plugin-proposal-object-rest-spread -D

# 安装 rollup.js 编译本地开发服务插件
yarn add rollup-plugin-serve -D

# 安装 rollup.js 编译代码混淆插件
yarn add rollup-plugin-uglify -D
```


- `rollup` 模块是 rollup.js 编译的核心模块

- `rollup-plugin-babel` 模块是 rollup.js 支持 babel 官方编译插件模块

- `@babel/core` 是官方 babel 编译核心模块

- `@babel/preset-env` 是官方 babel 编译解析 ES6+ 语言的扩展模块

- `@babel/plugin-proposal-object-rest-spread` 是官方 babel 编译 ES6+ 对象扩展的编译插件（针对ES2018引入的特性 - object-rest-spread）

- `rollup-plugin-serve`  Serve your rolled up bundle like webpack-dev-server , Github地址：[https://github.com/thgh/rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)

- `rollup-plugin-uglify`  Rollup plugin to minify generated bundle. Uses UglifyJS under the hood , Github地址：[https://github.com/thgh/rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)


### 2. rollup.config.js

项目根目录下新建一个 build 目录，用于管理构建配置文件

```shell script
cd chapter04
mkdir build

# 在 build 目录下新建 rollup.config.js 文件
ni rollup.config.js
ni rollup.config.dev.js
ni rollup.config.prod.js
```

编写配置文件， Common.js方式引用编写

```javascript
/* rollup.config.js */
const path = require('path');
const babel = require('rollup-plugin-babel');

const resolveFile = (filepath) => {
    return path.join(__dirname, '..', filepath)
};

module.exports = {
    input: resolveFile('src/index.js'),
    output: {
        file: resolveFile('dist/index.js'),
        format: 'umd'
    },
    plugins: [
        babel({
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    targets: 'ie >= 8'
                }]
            ]
        })
    ]
};
```

```javascript
/* build.js */
const rollup = require('rollup');
const config = require('./rollup.config');

const inputOptions = config;
const outputOptions = config.output;

async function build () {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log(`[INFO] >>> 开始编译 ${inputOptions.input}`);

    // generate code and a sourcemap
    const {code, map} = await bundle.generate(outputOptions);

    console.log(`[SUCCESS] >>> 编译结束 ${outputOptions.file}`);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();
```

在 `package.json` 配置文件中加入执行脚本

```javascript
// package.json
"scripts": {
  "clean": "rimraf dist",
  "build": "node ./build/build.js"
}
``` 

### 3. 编写待编译的 ES6源码

```javascript
// ./src/index.js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

console.log([...arr1, arr2]);

async function initDemo () {
    let data = await demo();
    console.log(data);
}

initDemo();
```

```javascript
// ./src/lib/index.js
function demo () {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const obj1 = { a: 1 };
                const obj2 = { b: 2 };
                const result = { ...obj1, ...obj2 };
                resolve(result);
            }, 1000)
        } catch (err) {
            reject(err)
        }
    })
}

export default demo;
```

### 4. 执行脚本，编译结果

项目根目录下执行 `yarn run build`

编译结果在目录 `./dist/` 下

编译结果分成  
    - ES5代码文件 `./dist/index.js`   
    
**注意：** 页面使用的时候要引入 `@babel/polyfill` 构建的JS版本 `dist/pollyfill.js` 或者打包的时候把 `@babel/polyfill` 模块引用进入项目中

> **Usage in Browser**   
> Avaliable from the `dist/pollyfill.js` file within a `@babel/polyfill` npm release.

> 比如第三方的CDN可以直接引入 html 的 script 脚本中： `https://unpkg.com/@babel/polyfill@7.7.0/dist/polyfill.js`

打开浏览器工作台 Web Console 就会显示可运行结果
```ini
  Array(6) [ 1, 2, 3, 4, 5, 6 ]
  Object { a: 1, b: 2 }
>>
```
