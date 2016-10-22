let webpack = require('webpack');

module.exports = {
  entry: {
    index: [
      './src/index.js',
    ],
  },
  output: {
    path: __dirname + '/dist',
    filename: '/index.js',
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
