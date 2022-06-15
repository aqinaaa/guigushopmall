// 引入mockjs模块
import Mock from 'mockjs'
// json数据格式引入进来的数据格式没有对外暴露。但是可以引用
// webpack默认对外暴露的：图片、json数据格式（不需要对外暴露）
import banner from './banner.json'
import floor from './floor.json'
// mock数据:mock方法第一个参数是请求地址，第二个参数是请求数据。
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor });