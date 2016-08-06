module.exports = {
    entry: ['./app/app'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/build/'
    }
};
