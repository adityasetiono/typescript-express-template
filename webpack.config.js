const path = require('path');
const fs = require('fs');
const node_modules = fs.readdirSync('node_modules').filter(function (x) { return x !== '.bin' });

module.exports = {
  devtool: process.env.NODE_ENV == 'develop' ? 'eval' : undefined,
  entry: [
    path.resolve('./src/index.ts')
  ],
  target: 'node',
  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [{
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      test: /\.tsx?$/,
      exclude: 'node_modules',
      loader: 'ts-loader'
    }]
  },
  externals: function(context, request, cb) {
    if (node_modules.indexOf(request) !== -1) {
      cb(null, 'commonjs ' + request);
      return;
    }
    cb();
  },
  node: {
    __dirname: true
  }
}