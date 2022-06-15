// home模块的小仓库
import { reqCatagoryList, reqBannerList, reqFloorList } from "@/api";
const state = {
    // state中数据的默认初始值别瞎写，服务器返回对象，服务器返回数据【根据接口返回的数据类型初始化】
    categoryList: [],
    bannerList: [],
    floorList: [],
};
const mutations = {
    CATGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(date, getBannerList) {
        state.bannerList = getBannerList;
    },
    GETFLOORLIST(date, getFloorList) {
        state.floorList = getFloorList;
    }
};
const actions = {
    // 通过Api里面的接口函数调用，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCatagoryList();
        if (result.code == 200) {
            commit("CATGORYLIST", result.data);
        }
    },
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}