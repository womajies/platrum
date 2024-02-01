const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/platrum/' : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/base/_vars.scss";
          @import "@/assets/styles/base/_mixins.scss";
        `,
      },
    },
  },
})
