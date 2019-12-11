import path from 'path';
import serve from 'rollup-plugin-serve';
import config from './rollup.config';

const resolveFile = (filepath) => {
    return path.join(__dirname, '..', filepath)
};

const PORT = 8090;
const HOST = 'localhost';

config.output.sourcemap = true;

config.plugins = [
    ...config.plugins,
    ...[
        serve({
            // Launch in browser（default: false）
            open: true,

            openPage: '/example/index.html',

            // Show server address in console (default: true)
            verbose: true,

            // Options used in setting up server
            host: HOST,
            port: PORT,

            // 当指定 openPage 时，contentBase: ''
            contentBase: ''

            // 当不指定 openPage 时， 设置 example 的访问目录和dist的访问目录
            // contentBase: [resolveFile('dist'), resolveFile('example')]
        })
    ]
];

export default config;

