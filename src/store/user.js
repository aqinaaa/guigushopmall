// 登录与注册的模块
import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqUserLoginOut, reqAddressInfo, reqOrdertrade } from "@/api/index"
import { setToken, removeToken } from "@/utils/token";
const state = {
    code: '',
    //  localStorage中有token的话则获取到，没有的话初始值为null
    token: localStorage.getItem('TOKEN'),
    name: '',
    tradeInfo: [],
    orderInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, name) {
        state.name = name
    },
    CLEAR(state) {
        state.token = ''
        state.name = ''
            // 清空本地存储的token:从utils封装的函数中引入
        removeToken()
    },
    GETADDRESS(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
    GETORDERTRADE(state, orderInfo) {
        state.orderInfo = orderInfo
    }
};
const actions = {
    // 发送短信验证码的请求
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        // 正常情况下这里的数据请求发送成功之后时后台发送验证码给到对应的手机号码，但是因为收费问题，这里使用的时候我们需要将返回的验证码暂存到仓库里面
        // 然后手动获取或者通过控制台打印获取验证码
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 注册
    async getRegister({ commit }, data) {
        // 返回结果的data时null，所以不需要三联坏保存数据，返回成功与失败的结果即可
        let result = await reqRegister(data)
            // console.log(result)
        if (result == 200) {
            // 如果数据请求成功则让返回一个ok
            return 'ok'
        } else {
            // 如果数据请求失败则返回提醒
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async getLogin({ commit }, data) {
        let result = await reqLogin(data)
            // console.log(result)
            // 如果请求成功：将结果data中的token保存到仓库中
        if (result.code == 200) {
            commit('GETLOGIN', result.data.token)
                // 将token保存到本地存储
                // localStorage.setItem('TOKEN', result.data.token);
                // 如果有些人也可能会采用从utils中导入一个封装的函数
            setToken(result.data.token)
            return 'ok'
        } else {
            // 如果请求失败
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
            // console.log(result)
        if (result.code == 200) {
            commit('GETUSERINFO', result.data.name)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLoginOut({ commit }) {
        // 发送请求，通知服务器清空token
        let result = await reqUserLoginOut()
        if (result.code == 200) {
            // 如果后台接口请求成功，则提交mutation函数清空state仓库中的数据
            commit('CLEAR');
            return 'OK'
        } else {
            return Promise.reject(new error('fails'))
        }
        // console.log(result)
    },
    // ---------------------------------------------------订单地址信息-------------
    //获取用户信息地址
    async getAddress({ commit, state, dispatch }) {
        let result = await reqAddressInfo();
        console.log(result)
        if (result.code == 200) {
            commit('GETADDRESS', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //获取商品清单
    async getOrderTrade({ commit }) {
        let result = await reqOrdertrade()
        if (result.code == 200) {
            commit('GETORDERTRADE', result.data)
        }
    }

};
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}