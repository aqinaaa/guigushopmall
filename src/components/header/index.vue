<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!username">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ username }}</a>
            <a class="register">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="../../assets/images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- button 使用编程式导航进行路由跳转，因为这里有button按钮不能替换成router-link 声明式，否则会丢失功能按钮-->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="gosearch">搜索</button>
        </form>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    }
  },
  mounted() {
    // 监听全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = '';
    })
  },
  methods: {
    // 编程式导航路由管家
    gosearch() {
      // 路由传参：第一种形式：字符串形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase());
      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种：对象写法
      // 代表的如果有query参数也带过去
      let location = { name: "search", params: { keyword: this.keyword } || undefined };
      if (this.$route.query.categoryName) {
        location.query = this.$route.query;
      }
      this.$router.push(location);

      // this.$router.push({ path: "/search", params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })
      // 面试题2：如何指定params参数可传可不传？
      // 在配置路由的时候加个问号？
      // this.$router.push({ name: "search", query: { k: this.keyword.toUpperCase() } })
      // 面试题3：params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // this.$router.push({ name: "search", params: { keyword: '' | undefined } })


    }
  },
  computed: {
    username() {
      return this.$store.state.user.name;
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>