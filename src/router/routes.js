 // 引入路由组件
 //  import Home from '@/pages/Home'
 //  import Login from '@/pages/Login'
 //  import Register from '@/pages/Register'
 //  import Search from '@/pages/Search'
 //  import Detail from '@/pages/Detail'
 //  import AddCartSuccess from '@/pages/AddCartSuccess'
 //  import ShopCart from '@/pages/ShopCart'
 //  import Trade from '@/pages/Trade'
 //  import Pay from '@/pages/Pay'
 //  import Paystatus from '@/pages/PaySuccess'
 //  import Center from '@/pages/Center'
 //  import MyOrder from '@/pages/Center/myOrder'
 //  import GroupOrder from '@/pages/Center/groupOrder'

 //路由懒加载：  如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
 //  动态引入
 const foo = () =>
     //  console.log('home')
     import ('@/pages/Home')


 export default [{
         path: "/center",
         component: import ('@/pages/Center'),
         meta: { show: false },
         children: [{
                 path: "myorder", //注意子组件不能加斜杠，否则会编程一级路由组件
                 component: () =>
                     import ('@/pages/Center/myOrder'),
                 meta: { show: false },
             },
             {
                 path: "grouporder",
                 component: () =>
                     import ('@/pages/Center/groupOrder'),
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
         component: () =>
             import ('@/pages/PaySuccess'),
         meta: { show: false },
         //  beforeEnter: (to, from) => {
         //      if (from.path == '/shopcart') {
         //          next();
         //      }
         //  },
     },
     {
         path: "/pay",
         component: () =>
             import ('@/pages/Pay'),
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
         component: () =>
             import ('@/pages/Trade'),
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
         component: () =>
             import ('@/pages/ShopCart'),
         meta: { show: false }
     },
     {
         path: "/addcartsuccess",
         name: 'addcartsuccess',
         component: () =>
             import ('@/pages/AddCartSuccess'),
         meta: { show: true }
     },
     {
         path: "/detail/:skuid",
         component: () =>
             import ('@/pages/Detail'),
         meta: { show: true }
     },
     {
         path: "/home",
         component: () =>
             import ('@/pages/Home'),
         meta: { show: true }
     },
     {
         path: "/login",
         component: () =>
             import ('@/pages/Login'),
         meta: { show: false }
     }, {
         path: "/register",
         component: () =>
             import ('@/pages/Register'),
         meta: { show: false }
     }, {
         path: "/search/:keyword?", //路由传参占位符
         component: () =>
             import ('@/pages/Search'),
         meta: { show: true },
         name: "search"

     }
 ]