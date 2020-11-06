const path = require("path");

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/abstract/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/abstract/_mixins.scss'),
        path.resolve(__dirname, './src/assets/scss/base/_utilities.scss'),
      ]
    }
  },
}
