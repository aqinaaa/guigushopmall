<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->
    <!-- 使用路由元数据 -->
    <Footer v-show="$route.show"></Footer>
    <!-- 使用router-view作为出口 -->

  </div>

</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储与仓库当中 ??这个数据为什么要放到仓库中，不需要重复使用，只在typenav组件中使用而已。
    // 为了优化性能，数据请求放到根组件app中只会请求一次。
    // 但是这里的请求请求是不能放到main.js中的，因为只有组件才有store仓库。和this指向。
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>
</style>
