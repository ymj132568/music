module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    externals:
      process.env.NODE_ENV === 'production'
        ? {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios'
          }
        : {}
  }
};
