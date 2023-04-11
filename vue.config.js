const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true
  },
  configureWebpack: (config) => {
    if(process.env.NODE_ENV === 'development') {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          // This makes all dependencies of this file - build dependencies
          config: [__filename],
        },
        maxAge: 5184000000 / 2 
      }
    }
  }
})
