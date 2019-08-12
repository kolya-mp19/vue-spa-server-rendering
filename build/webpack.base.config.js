const path = require("path")

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /(\.js$)/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  // resolve не рекомендуется т.к. снижает производительность.
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  }
}

module.exports = config

// node ./node_modules/webpack/bin/webpack --config ./build/webpack.base.config.js - этой командой запустили сборку вебпака


