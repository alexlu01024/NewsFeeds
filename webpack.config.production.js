var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  // externals: {
  //   "antd": 'antd',
  //   "react": "React" ,
  //   "react-dom": "ReactDOM"
  // },
  context: path.join(__dirname),
  devtool: false, //update: null
  entry: "./src/js/root.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'], 
        }
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  plugins: [
    //update: new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(), //update: https://github.com/webpack/webpack/issues/1964
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize:true, mangle: false, sourcemap: false,
      compress: {
        warnings: false
      }
    }),
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './vendor.bundle.js' }),//name: 'vendor', filename: './vendor.bundle.js'
  ]
};