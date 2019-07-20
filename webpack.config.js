var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['./src/index.ts'],
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs-module'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};
