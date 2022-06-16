import { reqAddOrUpdatedShopCart, reqGetgoodsinfo } from "@/api";
// // 封装游客身份模块uuid
const state = {
    goodsInfo: {},
};
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },
    // ADDORUPDATEDSHOPCAR(state, shopCarInfo) {
    //     state.shopCarInfo = shopCarInfo
    // }
};
const actions = {
    async getGoodsInfo({ commit }, skuid) {
        let result = await reqGetgoodsinfo(skuid);
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data);
        }
    },
    // 购物车数量修改：发送post请求，只是修改商品数量，不用存储到仓库
    async addOrUpdatedShopCar({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdatedShopCart(skuId, skuNum);
        代表服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {
    // 简化产品导航信息
    categoryView(state) {
        // 如果state的goodsInf初始状态为空，空对象的categoryview属性值为undefined,如果是underfined至少让它显示一个空对象
        return state.goodsInfo.categoryView || {};
    },
    // 简化商品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    // 简化产品售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {};
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}