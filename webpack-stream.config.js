const path = require('path');

module.exports = (env) => ({
    target: 'node',
    entry: './src/stream/index.ts',
    mode: env.prod ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
        ],
    },
});

