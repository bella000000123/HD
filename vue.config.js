const path = require('path');
module.exports = {
  configureWebpack: () => ({
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }),
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });
    config.plugin('html').tap(args => {
      args[0].title = '七月体育';
      return args;
    });
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://api.211aoa.com'
      }
    }
    // before: require("./mock/mock-server.js")
  }
};
