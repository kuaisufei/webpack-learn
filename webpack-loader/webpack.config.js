const autoprefixer = require('autoprefixer');
module.exports = {
  // 打包文件的存放地址
  entry: __dirname + "/index.js",
  output:{
  	// 打包后存放地址
  	path: __dirname,
  	// 输出后的文件名
  	filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: __dirname,//本地服务器所加载的页面所在的目录
  //   colors: true,//终端中输出结果为彩色
  //   historyApiFallback: true,//不跳转
  //   inline: true//实时刷新
  // }
  module: {
    loaders: [
      {
        test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        // loader: 'style-loader!css-loader!sass-loader!postcss-loader'
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer(
                { browsers: ['iOS >= 7', 'Android >= 4.1', 'last 10 Chrome versions', 'last 10 Firefox versions', 'Safari >= 6', 'ie > 8'] }
              )],
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader?limit=8192&name=build/img/[name].[hash:8].[ext]"
      }
    ],
  }
}