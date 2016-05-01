const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js')
  ],
  resolve: {
    extensions: ['', '.js']
  },
  // Server Configuration options
  devServer: {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost'
  },
  devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'app.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new TransferWebpackPlugin([{from: 'www'}], path.resolve(__dirname, 'src'))
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: [nodeModulesPath]
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};

module.exports = config;
