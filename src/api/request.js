import axios from 'axios';
// 导入仓库
// import store from '@/store'
// 引入uuid回调函数，随机成成一个游客身份
import { getUUID } from '@/utils'
// 引入进度条（start:进度条开始 done:进度条结束）-引入进度条样式
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// console.log(nprogress)
// 1:利用axios对象的方法creat，去创建一个axios实例
// 2：request 就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径：发请求的时候，路径当中会出现api
    baseURL: "/api",
    // 代表请求超时的时间为5s
    timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config => {
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    nprogress.start();
    const USER_ID = getUUID()
        // console.log(USER_ID)
    if (USER_ID) {
        config.headers.userTempId = USER_ID;
    }

    //token[公共参数]

    // if (store.state.user.token) {
    //     config.headers.token = store.state.user.token;
    // }
    return config;
}));
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器相应的响应数据回来以后，响应拦截器剋有检测到，可以做一些事情
    nprogress.done(); //响应拦截器中结束进度条
    return res.data;
}, (err) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
});
// 向外暴露
export default requests