const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [path.join(__dirname, '/src/app/app.js')],
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: 'app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname, 'src'))
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath]
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};

module.exports = config;
