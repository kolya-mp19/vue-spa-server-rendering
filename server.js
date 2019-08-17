const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
// для серверного рендеринга установил vue-server-renderer@2.4.2
const { createBundleRenderer } = require('vue-server-renderer')
let renderer

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

// для возврата всех статических модулей из папки dist
app.use('/dist', express.static(path.resolve(__dirname, './dist')))

// расширили 2 новыми методами которые сдела в dev-server.js
// bundle для серверного рендеринга
require('./build/dev-server')(app, bundle => {
  renderer = createBundleRenderer(bundle)
})

// * - обрабатываем любой запрос на порт 3000
app.get('*', (req, res) => {
  // server-render
  renderer.renderToString({ url: req.url }, (err, html) => {
    if (err) {
      return res.status(500).send('Server Error')
    }
    html = indexHTML.replace('{{ APP }}', html)
    res.write(html)
    res.end()
  })
  // удалили для server-render
  // res.write(indexHTML)
  // res.end()
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
