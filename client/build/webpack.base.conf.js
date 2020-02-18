'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {    //配置决定如何解析模块
    extensions: ['.js', '.vue', '.json'],
    alias: {     //简写某些模块文件的路径
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      /*vue-cli3已经完成css-loader相关的配置*/
      
      // {
      //   test:/\.(css|less)$/,
      //   use:['style-loader',{
      //     loader:'css-loader',
      //     options:{
      //       /*以前开启模块的方式*/
      //       modules:true, //开启css模块化
      //       localIdentName: '[local]_[hash:base64:5]'
      //       //localIdentName:'[name]-[local]-[hash:base64:6]'
      //       // modules:{
      //       //   localIdentName:'[path]-[name]-[hash:base64:5]'
      //       // }
      //     }
      //   },{
      //     loader:'less-loader'
      //   }] //加载顺序是从右向左的
      // },
      {
        test: /\.(js)$/,
        loader: 'babel-loader', //将ES6代码转化成ES5代码
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]//指定需要执行babel-loader的文件目录
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    noParse:function (content) {
      return /jquery/.test(content); //对于jquery的npm包内部没有require与import，所以不需要去解析这些文件     
    }
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
