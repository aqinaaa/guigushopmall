// -------配置路由的地方-------
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter);

// 重写push|replace
// 先把Vuerouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点:call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点:call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}
let router = new VueRouter({
        // 配置路由
        routes,
        // 让页面路由跳转后返回到顶部
        scrollBehavior(to, from, savedPosition) {
            return { y: 0 }
        }
    })
    // 全局导航守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to, from, next) => {
    // to:可以获取到你要跳转到的那个路由信息
    // from:可以获取到你从那个路由而来的信息
    // next:放行函数 next()放行， next(path)放行到指令路由   next(false):--
    next();
    let token = store.state.user.token;
    let name = store.state.user.name;
    // 如果已经登录了，要去的页面是登录页面则next到首页
    //测试打印： console.log(store)
    if (token) {
        // 登录后去的是login登录页
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录后去其他页面，放行
            // 派发获取用户信息的action,获取到用户信息之后再放行
            // 判断是否有用户信息
            if (name) {
                // 有用户信息，直接放行
                next()
            } else {
                // 没有用户信息，派发action获取用户信息
                try {
                    // 登录情况下跳转路由获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 登录情况下获取用户信息失败：一般是token失效了,则派发仓库中的退出登录action清空服务器token数据和浏览器中仓库中的信息
                    // 清除token
                    await store.dispatch('userLoginOut');
                    next('/login');
                }
            }
        }
    } else {
        // 没有登录:如果去的是支付页面||交易页面||center个人中心页面，则应该路由跳转到登录页login
        let toPath = to.path
            // console.log(toPath)  测试
        if (toPath.indexOf('/pay') != -1 || toPath.indexOf('/trade') != -1 || toPath.indexOf('/center') != -1) {
            // 路由跳转到login登录页面，但是通过to.path将要去的路由携带到query参数里面
            // 把想去但是没有去成的路由报存到路由里面
            next('/login?redirect=' + toPath);
        } else {
            // 如果去的不是这些交易支付个人中心相关的页面，则直接放行
            next();
        }
    }
});
export default router;