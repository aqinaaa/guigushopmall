 // 引入路由组件
 import Home from '@/pages/Home'
 import Login from '@/pages/Login'
 import Register from '@/pages/Register'
 import Search from '@/pages/Search'
 import Detail from '@/pages/Detail'
 import AddCartSuccess from '@/pages/AddCartSuccess'
 import ShopCart from '@/pages/ShopCart'
 import Trade from '@/pages/Trade'
 import Pay from '@/pages/Pay'
 import Paystatus from '@/pages/PaySuccess'
 import Center from '@/pages/Center'
 import MyOrder from '@/pages/Center/myOrder'
 import GroupOrder from '@/pages/Center/groupOrder'



 export default [{
         path: "/center",
         component: Center,
         meta: { show: false },
         children: [{
                 path: "myorder", //注意子组件不能加斜杠，否则会编程一级路由组件
                 component: MyOrder,
                 meta: { show: false },
             },
             {
                 path: "grouporder",
                 component: GroupOrder,
                 meta: { show: false },
             },
             // 重定向
             {
                 path: "/center",
                 redirect: '/center/myorder',
                 meta: { show: false },
             }
         ]
     },
     {
         path: "/paystatus",
         component: Paystatus,
         meta: { show: false },
         //  beforeEnter: (to, from) => {
         //      if (from.path == '/shopcart') {
         //          next();
         //      }
         //  },
     },
     {
         path: "/pay",
         component: Pay,
         meta: { show: false },
         beforeEnter: (to, from, next) => {
             if (from.path == '/trade') {
                 next();
             } else {
                 next(false)
             }
         },

     },
     {
         path: "/trade",
         component: Trade,
         meta: { show: false },
         //  路由独享守卫:只有来自于某个地址才能跳转到该页面
         beforeEnter: (to, from, next) => {
             //  console.log(from)
             if (from.path == ('/shopcart')) {
                 next();
             } else {
                 //  console.log(from)
                 next(false)
             }
         },
     },
     {
         path: "/shopcart",
         component: ShopCart,
         meta: { show: false }
     },
     {
         path: "/addcartsuccess",
         name: 'addcartsuccess',
         component: AddCartSuccess,
         meta: { show: true }
     },
     {
         path: "/detail/:skuid",
         component: Detail,
         meta: { show: true }
     },
     {
         path: "/home",
         component: Home,
         meta: { show: true }
     },
     {
         path: "/login",
         component: Login,
         meta: { show: false }
     }, {
         path: "/register",
         component: Register,
         meta: { show: false }
     }, {
         path: "/search/:keyword?", //路由传参占位符
         component: Search,
         meta: { show: true },
         name: "search"

     }
 ]