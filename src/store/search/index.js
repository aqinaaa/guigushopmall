// search模块的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
    getSearchList: {}
};
const mutations = {
    GETSEARCHLIST(state, getSearchList) {
        state.getSearchList = getSearchList;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)

        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
// getters相当于计算属性：为了简化数据而生
// 可以把我们将来在组件当中使用的数据简化一下【将来在获取数据的时候就方便了】
const getters = {
    // 当前形参sate，是当前仓库中的sate,并非大仓库中的那个sate
    goodsList(state) {
        // 加入网络不给力没有网 state.searchList.goodsList应该返回的是underfined,至少让返回一个空数组
        return state.getSearchList.goodsList || [];
    },
    trademarkList(state) {
        return state.getSearchList.trademarkList || [];
    },
    attrsList(state) {
        return state.getSearchList.attrsList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}