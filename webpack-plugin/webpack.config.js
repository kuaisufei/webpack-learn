const autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  webpack = require('webpack'),
  devServer = require('webpack-dev-server'),
  path = require('path'),
  ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
  // 打包文件的存放地址
  // devServer: {
  //   contentBase: './public',
  //   colors: true,
  //   historyApiFallback: true,
  //   inline: true
  // },
  // devtool: 'inline-source-map',//配置生成Source Maps，选择合适的选项
  // devServer: {
  //   contentBase: path.join(__dirname, "public"),
  //   compress: true,
  //   port: 9000,
  //   hot : true
  // },
  devtool: 'eval-source-map',
  entry: {
    index: __dirname + '/index.js',
    entry: __dirname + '/entry.js',
    extract: __dirname + '/extract.js'
  },
  output: {
    filename: 'js/[name].js',
    path: __dirname + '/public'
  },
  devServer: {
    historyApiFallback:true,
    inline:true,
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
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
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader"]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include : path.join(__dirname, 'img'),
        loader: "url-loader?limit=8192&name=/img/[name].[hash:8].[ext]&publicPath=..&ouputPath=."
      }
    ],
  },
  plugins:[
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',   // 生成出来的文件和路径，前面会加上output的path
    //   template: 'index.html',   // 获取最初的html末班
    //   inject:  'body',          // 插入文件的位置
    //   hash: true,               // 在生成的文件后面增加一个hash，防止缓存
    //   // "chunks": {               // 引入的js和css地址 
    //   //   "head": {
    //   //     "entry": ["./js/index.js","./js/entry.js"]  // 所需插入的js，数量超过一个用数组
    //   //   },
    //   //   xhtml:false
    //   // }
    //   chunks: ['index','entry']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'extract.html',   // 生成出来的文件和路径，前面会加上output的path
    //   template: 'extract.html',   // 获取最初的html末班
    //   inject:  'body',          // 插入文件的位置
    //   hash: true,               // 在生成的文件后面增加一个hash，防止缓存
    //   // "chunks": {               // 引入的js和css地址 
    //   //   "head": {
    //   //     "entry": ["./js/extract.js"]  // 所需插入的js，数量超过一个用数组
    //   //   },
    //   //   xhtml:false
    //   // }
    //   chunks: ['extract']
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    //   output: {
    //     comments: false,
    //   }
    // }),
    new CleanWebpackPlugin(['public']),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/public/',
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object"),
      consoletest: JSON.stringify('this is a console test')
    })
  ]
}

const htmlArray = ['index','extract'];
htmlArray.forEach((element) => {
  const chunksArray = [element];
  if (element === 'index') {
    chunksArray.push('entry');
  }
  const newPlugin = new HtmlWebpackPlugin({
    filename: element + '.html',
    template: element + '.html',   // 获取最初的html末班
    inject:  'body',          // -
    hash: true,               // 在生成的文件后面增加一个hash，防止缓存
    chunks: chunksArray
  });
  module.exports.plugins.push(newPlugin);
});
