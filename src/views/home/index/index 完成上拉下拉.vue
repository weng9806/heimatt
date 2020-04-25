<template>
  <div class="index">
    <van-nav-bar :fixed="true"
                 title="首页" />
    <van-tabs v-model="active">
      <!-- van-tab 标签频道 -->
      <van-tab v-for="item in 8"
               :key="item"
               :title="'标签 '+item">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="item in list"
                      :key="item"
                      :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div class="icon">
        <van-icon name="bars" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0, // 默认选中的标签 tab
      loading: false, // van-list组件中的加载状态
      finished: false, // van-list组件中的数据源是否加载完毕
      list: [], // 文章数据源
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      window.console.log('onLoad')
      setTimeout(() => {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        this.list = [...this.list, ...arr]
        this.loading = false
        window.console.log(this.list.length)
        if (this.list.length >= 60) {
          this.finished = true
        }
      }, 1000)
    },
    // 下拉刷新
    onRefresh () {
      // 注意点:上拉刷新默认会把van-pull-refresh组件v-model的值改为true
      setTimeout(() => {
        window.console.log('onRefresh')
        this.list = [] // 清空list数组数据源
        this.isLoading = false // 将下拉刷新状态改为false
        this.loading = false // 将van-list组件加载状态设置为false
        this.finished = false // 将van-list组件是否加载完毕 设置为 false
        this.onLoad()
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3296fa;
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
  }
  .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
    position: fixed;
    top: 46px;
    left: 0;
    width: 90%;
    z-index: 999;
  }
  .icon {
    width: 10%;
    height: 44px;
    position: fixed;
    top: 46px;
    right: 0;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
  }
}
</style>
