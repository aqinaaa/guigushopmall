import { reqShopList, reqDeletecarList, reqUpdateChecked } from "@/api"
const state = {
    shopCartList: []
};
const mutations = {
    SHOPCARLIST(state, getShopList) {
        state.shopCartList = getShopList
    }
};
const actions = {
    // 获取购物车列表数据
    async getShopList({ commit }) {
        let result = await reqShopList();
        // 测试是否能获取个人购物车数据
        // console.log(result);
        if (result.code == 200) {
            commit('SHOPCARLIST', result.data)
        }
    },
    async deleteCarList({ commit }, skuId) {
        let result = await reqDeletecarList(skuId);
        // 测试成功
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改某一个商品勾选状态
    async changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    // 删除所有勾选状态的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context:小仓库，commit【提交mutations修改state】 getters【计算属性】dispatch【派发action】 state【当前仓库的数据】
        // console.log(getters.cartList.cartInfoList)
        const promiseAll = []
            // 定义一个存放的空数组放到循坏外面
        getters.cartList.cartInfoList.forEach(element => {
            // if (element.isChecked == 1) {
            //     dispatch('deleteCarList', element.skuId)
            // }
            let promise = element.isChecked == 1 ? dispatch('deleteCarList', element.skuId) : ''
            promiseAll.push(promise)
                // promiseAll是用来存放每次派发请求的返回值的数据
                // promise.all 函数用于判断一个数据返回值，全真的话会为真，否则为假
        });
        return Promise.all(promiseAll)
    },
    // 全选框选中状态修改后的数据请求
    updataAllischecked({ dispatch, state }, isChecked) {
        // -----循坏遍历前的空数组
        let promiseAll = [];
        //-----遍历contex state中的每一项的派发结果保存为promise
        state.shopCartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('changeChecked', { skuId: item.skuId, isChecked });
            // -----将结果保存到空数组中
            promiseAll.push(promise);
        });
        // ----将promiseAll的结果返回回去
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.shopCartList[0] || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}