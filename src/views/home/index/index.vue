<template>
  <div class="index">
    <van-nav-bar :fixed="true"
                 title="首页" />
    <van-tabs>
      <van-tab v-for="(item, index) in channelList"
               :key="index"
               :title="item.name">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="-- 我是有底线的 --"
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
import { getChannelData } from '@/api/index'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channelList: []
    }
  },
  methods: {
    onLoad () {

    },
    onRefresh () {

    },
    async getChannels () {
      var res = await getChannelData()
      this.channelList = res.data.data.channels
    }
  },
  mounted () {
    this.getChannels()
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
