const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')

// для серверного рендеринга
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require('path')

module.exports = function setupDevServer (app, onUpdate) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  const clientCompiler = webpack(clientConfig)
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      }
    })
  )
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // для серверного рендеринга =>

  // собираем в память
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  // пути вывода из конфигурации вебпак
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  // обпаботчик watch запускает при изменении исходного кода
  serverCompiler.watch({}, () => {
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
  // <= для серверного рендеринга
}
