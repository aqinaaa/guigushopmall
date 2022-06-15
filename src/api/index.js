// 当前这个模块的作用：API进行统一管理,请求数据。
import requests from "./request";
import mockRequests from './mockRequest';
// 三级联动接口
//请求地址： /api/product/getBaseCategoryList  GET 参数无
// axios 发请求返回结果是promise函数
export const reqCatagoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });
// ---4:获取搜索模块数据 地址：/api/list  请求方式POST
/*{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}*/
// data：params至少应该是个空对象。
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });
export const reqGetgoodsinfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' });
// 将产品添加到购物车（获取更新某一产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum } 参数：skuID  skuNum  POST请求
export const reqAddOrUpdatedShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
    // 购物车数据请求
    // url:/api/cart/cartList  请求方式：GET   参数：无
export const reqShopList = () => requests({ url: '/cart/cartList', method: 'get' })
    // /api/cart/deleteCart/{skuId} 请求方式：DELETE
export const reqDeletecarList = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
    // 切换商品选中状态：复选框数据请求：url:/api/cart/checkCart/{skuID}/{isChecked}   GET  skuID   isChecked
    //修改某一个商品的勾选的状态  (url:/api/cart/checkCart/{skuID}/{isChecked}   GET  skuID   isChecked)
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
// 获取手机验证码：/api/user/passport/sendCode/{phone}   GET  参数：phone
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
    // 完成注册接口请求：/api/user/passport/register  请求方式： POST  参数：phone、password、code
export const reqRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })
    // 登录数据请求 ： /api/user/passport/login  请求方式：POST   参数： phone password
export const reqLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'POST' })