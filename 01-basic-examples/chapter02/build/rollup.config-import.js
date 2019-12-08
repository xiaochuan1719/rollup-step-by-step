import path from 'path'
import babel from 'rollup-plugin-babel'

const resolveFile = (filepath) => {
    return path.join(__dirname, '..', filepath)
}

export default {
    input: resolveFile('src/index.js'),
    output: {
        file: resolveFile('dist/index.js'),
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        targets: {
                            chrome: '50',
                            ie: '9'
                        }
                    }
                ]
            ],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
        })
    ]
}
