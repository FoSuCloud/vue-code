const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: '/assest'
    },
    devServer: {
        port:8000,
        static:{
            directory: path.join(__dirname, 'public'),
        }
    }
};
