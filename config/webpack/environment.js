const { environment } = require('@rails/webpacker')

module.exports = Object.assign(environment.toWebpackConfig(), {
  node: {
    fs: 'empty',
  },
  target: 'web',
})
