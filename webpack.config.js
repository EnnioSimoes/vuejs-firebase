var webpack = require('webpack');

module.exports = {
    entry: ['./app/app'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.ProviderPlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
};
