const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const rootPath = __dirname;
const appPath = path.resolve(rootPath, 'app');
const tsConfig = require('./tsconfig.json');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-source-map',
  entry: [path.resolve(appPath, 'src/index.ts')],
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.server.js'
  },
  resolve: {
    modules: ['node_modules', appPath],
    extensions: ['.ts', '.tsx', '.js'],
    enforceExtension: false,
    plugins: [new TsConfigPathsPlugin(tsConfig)]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      }
    ]
  }
};
