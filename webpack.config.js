const path = require('path');

const resolvePath = value => path.resolve(__dirname, value)

module.exports = {
  entry: resolvePath('src/index.tsx'),
  output: {
    filename: 'react-simple-validation.js',
    path: resolvePath('dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ]
  },
  resolve: {
    extensions: [".js", ".json", '.ts', '.tsx'],
    alias: {
      lib: path.resolve(__dirname, 'src/lib')
    }
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  }
}
