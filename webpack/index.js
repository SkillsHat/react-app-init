const { resolve } = require('path');
const vendor = require('./vendor');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./dev_server');
const devtool = require('./devtool');

const settings = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss', '.png'],
  },
  context: resolve(__dirname, '..'),
  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/index'
    ],
    vendor,
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules,
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, '..', "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
  devtool,
};
module.exports = settings;
