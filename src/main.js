import Vue from 'vue'
import App from './App.vue'
import router from '@/router' //引入路由文件
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
// 引入element-ui组件库和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 统一接口api文件夹里面全部请求函数(*as api是将全部引入的数据起别名？)
import * as API from '@/api';
// 全局组件
import TypeNav from '@/components/Typenav'
import carousel from '@/components/carousel'
import pagination from '@/components/pagination'

Vue.prototype.$API = API; //将导入的API加到vue原型对象上，所有的组件都可以使用
Vue.config.productionTip = false
    // component第一个参数式全局组件的名字，第二个参数是哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(carousel.name, carousel);
Vue.component(pagination.name, pagination)
new Vue({
    render: h => h(App),
    // 注册使用（这里的kv一直省略v,router小写）
    beforeCreate() {
        Vue.prototype.$bus = this; //这个this就是vm?
    },
    router,
    store,


}).$mount('#app')