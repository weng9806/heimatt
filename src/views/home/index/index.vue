<template>
  <div class="index">
    <van-nav-bar :fixed="true"
                 title="首页" />
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channelList"
               :key="index"
               :title="item.name">
        <van-pull-refresh v-model="item.isLoading"
                          @refresh="onRefresh">
          <van-list v-model="item.loading"
                    :finished="item.finished"
                    finished-text="-- 我是有底线的 --"
                    @load="onLoad">
            <van-cell v-for="(articleitem,articleindex) in item.articleList"
                      :key="articleindex">
              <template #title>
                <h3>{{articleitem.title}}</h3>
                <van-grid v-if="articleitem.cover.images.lenght!=0"
                          :border="false"
                          :column-num="3">
                  <van-grid-item v-for="(imgitem,imgindex) in articleitem.cover.images"
                                 :key="imgindex">
                    <van-image lazy-load
                               :src="imgitem" />
                  </van-grid-item>
                </van-grid>
                <div class="box">
                  <div class="left">
                    <span>{{ articleitem.aut_name }}</span>
                    <span>{{ articleitem.comm_count }} 评论</span>
                    <span>{{ articleitem.pubdate | timePros }}</span>
                  </div>
                  <div class="right"
                       @click="openmore(articleitem)">
                    <van-icon name="cross" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div class="icon"
           @click="openPop">
        <van-icon name="bars" />
      </div>
    </van-tabs>
    <Channels ref="myChannels"
              :channelList="channelList"
              :active="active"
              @update:active="v=>active=v" />
    <more ref="more"
          :art_id="art_id"
          :aut_id="aut_id"
          @disLike="delDisLike" />
  </div>
</template>

<script>
import { getChannelData, getArticleList, delArticleList } from '@/api/index'
import { getLoacl } from '@/utils/mylocal.js'
import Channels from './channels.vue'
import more from './more.vue'
import '@/filter/myfilter.js'
export default {
  components: {
    Channels, more
  },
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channelList: [],
      art_id: 0,
      aut_id: 0
    }
  },
  methods: {
    async delDisLike (id) {
      // 得到当前选中的频道下面的数据源
      var datalist = this.channelList[this.active].articleList
      // 遍历删除
      datalist.forEach((item, index) => {
        if (item.art_id === id) {
          // 说明当前文章就是要删除的文章
          datalist.splice(index, 1)
        }
      })
      // 数据提交服务器
      try {
        await delArticleList(id)
      } catch (error) {
        window.console.log('出错了')
      }
      this.$refs.more.show = false
    },
    // 打开更多面板
    openmore (articleitem) {
      this.$refs.more.show = true
      this.art_id = articleitem.art_id
      this.aut_id = articleitem.aut_id
    },
    // 打开弹出层面板
    openPop () {
      this.$refs.myChannels.show = true
    },
    async onLoad () {
      var currentChannel = this.channelList[this.active] // 当前频道
      var id = currentChannel.id // 当前频道id
      var res = await getArticleList(id) // 获取当前频道 文章列表
      // 这里需要拼接文章列表数组，不然会一直请求数据 渲染页面
      currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results]
      currentChannel.loading = false
      if (res.data.data.results.length === 0 || currentChannel.articleList.length >= 80) {
        currentChannel.finished = true
      }
      window.console.log(res.data.data.results)
    },
    onRefresh () {
      setTimeout(() => {
        var currentChannel = this.channelList[this.active] // 当前频道
        currentChannel.articleList = []
        currentChannel.loading = false
        currentChannel.finished = false
        currentChannel.isLoading = false
        this.onLoad()
      }, 500)
    },
    async getChannels () {
      if (this.$store.state.userInfo.token) { // 已登录
        var res = await getChannelData()
        this.channelList = res.data.data.channels
      } else { // 未登录
        // 未登录分两种情况: 1. 如果localStorage存在保存的频道数据,就把数据渲染到页面
        //                  2. 如果localStorage不存在保存的频道数据,就直接通过服务器获取频道数据
        var loacalChannel = getLoacl('channel')
        if (loacalChannel) {
          this.channelList = loacalChannel
        } else {
          var res1 = await getChannelData()
          this.channelList = res1.data.data.channels
        }
      }
      // 给不同的频道下设置不同的数据源
      this.addOtherProp()
    },
    // 给频道数据源添加额外的属性
    addOtherProp () {
      this.channelList.forEach(item => {
        // item.articleList = []
        // item.loading = false
        // item.finished = false
        // item.isLoading = false
        this.$set(item, 'articleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
      })
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
  .van-tabs__wrap.van-hairline--top-bottom {
    position: fixed;
    top: 46px;
    left: 0;
    width: 90%;
    z-index: 999;
    .van-tab.van-ellipsis {
      width: 20%;
    }
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
  .box {
    .left {
      float: left;
      font-size: 12px;
      color: #b4b4b4;
      span {
        margin-right: 10px;
      }
    }
    .right {
      float: right;
      margin: 0 5px;
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
</style>
