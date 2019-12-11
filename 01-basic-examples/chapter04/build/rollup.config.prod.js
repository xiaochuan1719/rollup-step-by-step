import { uglify } from 'rollup-plugin-uglify';
import config from './rollup.config';
import path from "path";

const resolveFile = (filepath) => {
    return path.join(__dirname, '..', filepath)
};

config.output.file = resolveFile('dist/index.min.js');
config.output.sourcemap = false;
config.plugins = [
    ...config.plugins,
    ...[
        uglify()
    ]
];

export default config;
