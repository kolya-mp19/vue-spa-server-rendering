const path = require("path");

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  }
};

module.exports = config;

// node ./node_modules/webpack/bin/webpack --config ./build/webpack.base.config.js - этой командой запустили сборку вебпака


