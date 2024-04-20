import path from 'path';

export default (env) => ({
    entry: './src/index.ts',
    mode: env.prod ? 'production' : 'development',
    output: {
        path: path.resolve('./', 'build'),
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
