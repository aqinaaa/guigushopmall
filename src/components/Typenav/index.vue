<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="clearbgc" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画：给需要添加过度的dom元素包裹transition过度 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="gosearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentindex == index }">
                <h3 @mouseenter="changeindex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二三级分类 -->
                <!-- 动态绑定样式的显示与隐藏：三元表达式：如果变量currentindex等于索引号，有cur类的时候则样式为block,false的时候则显示为none -->
                <div class="item-list clearfix" :style="{ display: currentindex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 这种引入方式是把lodash全部的功能都进入进来。
// import _ from 'lodash';
// 按需引入throttle,因为throttle文件中是默认暴露module.export，所以这里可以不用{}引入
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      currentindex: -1,
      show: true
    }
  },
  // 组件挂载完毕后：可以向服务器发请求
  computed: {
    // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 注入一个参数state,其实即为大仓库中的数据，所以后面返回的数据需要跟home
    ...mapState({
      categoryList: (state) => state.home.categoryList
    })
  },
  methods: {
    add() {
      // console.log('add')
      this.$store.dispatch('add') //派发仓库的add事件
    },
    // es5的写法，方变添加_.throttle节流方法
    // 注意这里的throttle不要用箭头函数，可能会存在上下文的问题
    changeindex: throttle(function (index) {
      // index是鼠标经过的当前item的索引值
      this.currentindex = index;
    }, 50),
    // 一级分类鼠标移除的事件回调
    clearbgc() {
      // 鼠标移除后当前变量为-1.
      this.currentindex = -1;
      if (this.$route.path != '/home') {
        this.show = false;
      }

    },
    gosearch(event) {
      let element = event.target;  //可以获取到触发当前事件的事件节点
      // console.log(element)
      // 获取到当前触发这个事件的节点【h3/ a/dt/d1】
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // 如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        // 只要点击a就往search模块跳转
        // 整理路由跳转的参数
        let location = { name: "search", query: { categoryName: categoryname } };
        // 一级分类，二级分类，三级分类的a标签
        if (category1id) {
          location.query.category1Id = category1id;
        } else if (category2id) {
          location.query.category2Id = category2id;
        } else {
          location.query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        // 动态给location配置对象添加query属性
        if (this.$route.params.keyword) {
          location.params = this.$route.params;
          // 路由跳转
        }
        // console.log(location)
        this.$router.push(location);
      }
      // 编程式导航和事件委派：存在两个问题：1、如果识别是点击的a标签，而不是其他地方；2、如何获取对应的二级或者三级参数
      // this.$router.push('/search')
    },
    entershow() {
      this.show = true
    }
  },
  mounted() {
    // 当页面挂载完毕以后更具判断条件显示或者隐藏type-nav的三级联动
    if (this.$route.path != '/home') {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // margin-bottom: 10px;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          // :hover {
          //   background-color: blue;
          // }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 样式控制二三级联动的显示与隐藏
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过度动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }

    // 过度动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }

    //定义动画事件，速率
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>