import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopCart'
import user from './user'

Vue.use(Vuex);
// state:仓库存储数据的地方

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user
    }
})