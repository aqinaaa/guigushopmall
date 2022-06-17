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
 export default [{
         path: "/pay",
         component: Pay,
         meta: { show: false }
     },
     {
         path: "/trade",
         component: Trade,
         meta: { show: false }
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