const path = require('path');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';//设置脚本的环境变量使用process.env可以获取环境变量里的所有值
const HTMLPlugin = require('html-webpack-plugin');

const config = {
    target: 'web',
    entry: path.join(__dirname, "src/index.js"),//join会拼接成一个绝对路径 __dirname代表文件所在的目录地址
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
              test: /\.styl$/,
              use: [
                  'style-loader',
                  'css-loader',
                  'stylus-loader',
              ]
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
if(isDev){
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
}

module.exports = config;