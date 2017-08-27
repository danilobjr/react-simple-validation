const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = value => path.resolve(__dirname, value)

module.exports = {
  entry: resolvePath('src/demo/index'),
  output: {
    filename: 'react-simple-validation.js',
    path: resolvePath('./'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      lib: path.resolve(__dirname, 'src/lib'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath(`src/demo/index.ejs`),
      inject: true,
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, './'),
    port: 9000,
  },
}
