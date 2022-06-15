 module.exports = {
     // 关闭eslint
     lintOnSave: false,
     //  代理跨域
     devServer: {
         proxy: {
             '/api': { //前台项目地址有api则转给后台
                 target: 'http://gmall-h5-api.atguigu.cn', //目标接口
                 //  pathRewrite: { '^/api': '' },地址中都带有api，这里不需要重写
             },
         },
     },
 }