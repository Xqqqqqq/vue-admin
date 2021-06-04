const path = require('path');
　　
function resolve(dir) {
　return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  outputDir: 'dist',
  chainWebpack(config) {
    // 修复HMR
    config.resolve.symlinks(true);
    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svgIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
          options = {
              symbolId: 'icon-[name]'
          }
          return options
      })
    // 原有的svg图像处理loader添加exclude
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
          limit: 2048
      }));
    // 添加别名:set第一个参数：设置的别名，第二个参数：设置的路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('http', resolve('src/http'));
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/css/style.scss';`
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // 跨域代理
    proxy: {
      '/api': {
        target: 'http://192.168.1.235/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
        secure: false, // 接受 运行在 https 上的服务
      }
    },
  },
  // configureWebpack: {
  //   // 防止将某些 import 的包(package)打包到 bundle 中
  //   externals: {
  //     'vue': 'Vue',
  //     'vuex': 'Vuex',
  //     'vue-router': 'VueRouter',
  //     'element-ui': 'ELEMENT'
  //   },
  //   plugins: [
  //     // new BundleAnalyzerPlugin()
  //   ]
  // },
}