# 介绍 

## Overview 概述

**Rollup** 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，比如：库（library） 和 应用程序（application）。

**Rollup** 对代码模块使用新的标准化格式，这写标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 Common.js 和 AMD。ES6模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用的独立函数，而你的项目不必携带其他未使用的代码。ES6模块最终还是要由浏览器原生实现，Rollup可以是你提前体验。

## Tree-shaking

除了使用ES6模块之外，Rollup还静态分析代码中的 `import`，并将排除任何未实际使用的代码，这允许您架构于现有工具和模块之上，而不会增加额外的依赖或使项目的大小膨胀。

例如，在使用 CommonJS 时，必须导入（import）完整的工具（tool）或库（library）对象。

```javascript
// 使用 CommonJS 导入完整的 utils 对象
var utils = require('utils');
var query = 'Rollup';

// 使用 utils 对象的 ajax 方法
utils.ajax('http://api.example.com?search=' + query).then(handleResponse);
```

但使用 ES6 模块时，无需导入整个 utils 对象，只需导入（import）所需要的 ajax 函数即可：

```javascript
// 使用 ES6 import 语句导入（import）ajax函数
import { ajax } from 'utils';
let query = 'Rollup';

// 调用 ajax 函数
ajax('http://api.example.com?search=' + query).then(handleResponse);
```

因为 Rollup 只引入最基本最精简的代码，所以可以生成轻量、快速、以及低复杂的 library 和应用程序。因为这种基于显式的 import 和 export 语句的方式，它远比在编译后的输出代码中，简单地运行自动 i 检测未使用的变量更有效。

## Compatibility 兼容性

#### 1. Importing CommonJS Modules

Rollup 可以通过插件导入已存在的 CommonJS 模块

#### 2. Publishing ES6 Modules

为了确保你的ES6模块可以直接与运行在 CommonsJS (例如：Node.js 和 webpack) 中的工具（tool）使用，你可以使用 Rollup 编译未 UMD 或 CommonJS 格式，然后在 package.json 文件的 main 属性中指向当前编译的版本。如果你的 package.json 也具有 module 字段，像 Rollup 和 webpack2 这样的 ES6 感知工具（ES6-aware tools）将会直接导入 ES6模块版本。


# Quick Start 快速入门指南

## 1. Installation

```shell script
# 使用 npm 安装全局包
npm install -g rollup

# 使用 yarn 安装全局包
yarn global add rollup

# 实际项目开发中，通常安装 rollup 到项目目录中
npm install rollup -D
yarn add rollup -D
```







































