module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'unnotech-frontend-recruit/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/main.scss";`
      }
    }
  }
}