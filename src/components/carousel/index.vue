<template>
  <div class="swiper-container" ref="floor2Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "carousel",
  props: ['list'],
  watch: {
    list: {
      // 立即监听：不管数据有没有变化，上来就监听一次
      // watch监听不到list变化，因为这个数据从来就没有变化，父亲给的时候就是一个对象，对象里面的对象都是现有的
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor2Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击分页器的小圆点也能切换页面
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      }
    }
  },
}
</script>

<style>
</style>