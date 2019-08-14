const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({}, base, {
  plugins: base.plugins || []
})

// config.module.rules
//   // eslint-disable-next-line eqeqeq
//   .filter(x => { return x.loader == 'vue-loader' })
//   // eslint-disable-next-line no-return-assign
//   .forEach(x => x.options.extractCSS = true)

config.plugins.push(
  new ExtractTextPlugin('assets/styles.css')
)

module.exports = config
