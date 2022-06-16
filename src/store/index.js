import Vue from 'vue'
import Vuex from 'vuex'
import home from './home.js'
import search1 from './search1'
import detail from './detail.js'
import shopcart from './shopCart.js'
import user from './user.js'

Vue.use(Vuex);
// state:仓库存储数据的地方

export default new Vuex.Store({
    modules: {
        home,
        search1,
        detail,
        shopcart,
        user
    }
})