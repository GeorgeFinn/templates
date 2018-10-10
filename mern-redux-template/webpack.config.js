const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const { NODE_ENV } = process.env;

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      path.resolve(__dirname, 'src/client/index.js'),
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.html$/, use: [{loader: 'html-loader', options: { minimize: true }}]},
      { test: /\.svg$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'MERN boilerplate',
      template: path.resolve(__dirname, 'src/client/public/index.html'),
      inject: 'body',
      favicon: 'favicon.ico'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
};
