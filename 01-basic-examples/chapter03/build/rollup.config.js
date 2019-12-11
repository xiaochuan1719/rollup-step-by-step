import path from 'path';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

const resolveFile = (filepath) => {
    return path.join(__dirname, '..', filepath)
};

export default {
    input: resolveFile('src/index.js'),
    output: {
        file: resolveFile('dist/index.js'),
        format: 'umd',
        sourcemap: true     // 开发模式，开启 sourceMap 文件的生成
    },
    plugins: [
        // 使用和配置babel编译插件
        babel({
            'presets': [
                ['@babel/preset-env', {
                    modules: false,
                    targets: 'ie >= 8'
                }]
            ]
        }),
        // 使用开发服务器插件
        serve({
            // Launch in browser（default: false）
            open: true,

            openPage: '/example/index.html',

            // Show server address in console (default: true)
            verbose: true,

            // Options used in setting up server
            host: 'localhost',
            port: 8090,

            // 当指定 openPage 时，contentBase: ''
            contentBase: ''

            // 当不指定 openPage 时， 设置 example 的访问目录和dist的访问目录
            // contentBase: [resolveFile('dist'), resolveFile('example')]
        })
    ]
}
