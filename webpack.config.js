const path = require('path');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';//设置脚本的环境变量使用process.env可以获取环境变量里的所有值
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
    target: 'web',
    entry: path.join(__dirname, "src/index.js"),//join会拼接成一个绝对路径 __dirname代表文件所在的目录地址
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js',//开发环境和正式环境不同命名
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-whr.[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader',
            },

        ],
    },
    plugins: [
        // process.env.NODE_ENV = development 没有定义development变量，所以必须加""
        new webpack.DefinePlugin({//给webpack编译时判断运行环境，可以在js里引用；
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"',
            }
        }),
        new HTMLPlugin(),//这里可以设置参数，这里基础的就可以
    ],
};

//基础配置
if (isDev) {
    config.module.rules.push({
        test: /\.styl$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,//可以使用前面别的loader编译后的东西，使效率更快
                }
            },
            'stylus-loader',
        ]
    })
    config.devtool = "#cheap-module-eval-source-map"//帮助调试代码
    config.devServer = {//这是在webpack2以后才加入这个方法
        port: 8000,
        host: '0.0.0.0',//可以通过内网ip访问，localhost不能使用内网ip访问
        overlay: {//使错误直接显示在网页上
            errors: true,
        },
        // open: true,//自动打开浏览器
        // historyFallback: {//帮助webpack本身不理解、没有做映射的地址映射到入口

        // },
        hot: true,//热部署，只对当前修改的组件生效，而不是刷新页面，刷新会导致数据丢失
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),//启动hot的插件
        new webpack.NoEmitOnErrorsPlugin()//
    )
} else {
    config.entry = {
        app: path.join(__dirname, "src/index.js"),
        vendor: ['vue']//vue-router之类的
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,//可以使用前面别的loader编译后的东西，使效率更快
                        }
                    },
                    'stylus-loader',
                ],
            })
        }
    )
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),//会根据内容进行一个计算得出hash值
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),//把生成在js里的关于webpack的相关代码打包在一起，
    )
}

module.exports = config;