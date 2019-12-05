const path = require('path');
const buble = require('@rollup/plugin-buble');

const resolve = function (filepath) {
    return path.join(__dirname, '..', filepath)
};

module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/index.js'),
        format: 'iife'
    },
    plugins: [
        buble()
    ]
};
