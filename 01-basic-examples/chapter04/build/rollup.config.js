import path from 'path';
import babel from 'rollup-plugin-babel';

const resolveFile = (filepath) => {
    return path.join(__dirname, '..', filepath)
};

export default {
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
}
