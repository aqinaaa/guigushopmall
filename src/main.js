import Vue from 'vue'
import App from './App.vue'
import router from '@/router' //引入路由文件
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import { reqGetSearchInfo } from '@/api'
// 全局组件
import TypeNav from '@/components/Typenav'
import carousel from '@/components/carousel'
import pagination from '@/components/pagination'


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