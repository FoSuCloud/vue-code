const path = require('path');

module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // 打包输出路径
        path: path.resolve(__dirname, 'dist'),
        // 虚拟路径,webpack-dev-serve启动index.html引入的资源路径可以为/dist
        // 也就是即使没有执行过npm run build ，但是依旧可以使用该路径，因为只是一个虚拟的！
        // 不一定需要和打包的path一一对应
        // 只要和index.html中的路径对应就可以了！
        // <script src="/assest/bundle.js"></script>
        // 那么publicPath就可以使用assest，这个路径是我们在source控制台看到的目录名称和位置！
        // todo 如果不配置 那么只能获取到404
        publicPath: '/assest'
    },
    devServer: {
        // 静态资源文件夹
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
};
