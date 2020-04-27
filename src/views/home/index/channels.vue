<template>
  <div class="channels">
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '80%' }">
      <van-cell>
        <template #title>
          <div style="font-size: 18px;">我的频道</div>
        </template>
        <template #default>
          <van-button v-if="isEdit === false"
                      @click="isEdit=true"
                      type="danger"
                      round
                      size="mini"
                      plain>编辑</van-button>
          <van-button v-if="isEdit === true"
                      @click="isEdit = false"
                      type="danger"
                      round
                      size="mini"
                      plain>完成</van-button>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item class="father"
                       @click="changeActive(index)"
                       v-for="(item,index) in channelList"
                       :key="index">
          <template #text>
            <span :class="{'active': active === index}">{{item.name}}</span>
            <van-icon name="clear"
                      v-if="isEdit && index!== 0"
                      @click.stop="delChannels(index)"
                      class="icon" />
          </template>
        </van-grid-item>

      </van-grid>
      <van-cell>
        <template #title>
          <div style="font-size: 18px;">频道推荐</div>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item v-for="(item, index) in tuijian"
                       @click="resetChannels(item)"
                       :key="index"
                       :text="item.name" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannelData, resetChannelList } from '@/api/index.js'
import { setLoacl } from '@/utils/mylocal.js'
export default {
  props: ['channelList', 'active'],
  data () {
    return {
      show: false,
      allChannels: [], // 所有频道数据
      isEdit: false
    }
  },
  methods: {
    changeActive (index) {
      this.$emit('update:active', index)
    },
    // 获取所有频道数据
    async getAllChannel () {
      var res = await getAllChannelData()
      this.allChannels = res.data.data.channels
    },
    // 用户删除频道
    delChannels (index) {
      this.channelList.splice(index, 1)
      this.resetChanne()
      if (this.active > index) {
        this.$emit('update:active', this.active - 1)
      }
    },
    // 用户添加频道
    resetChannels (item) {
      // 将点击的频道添加到我的频道中
      this.channelList.push(item)
      this.resetChanne()
    },

    // 用户增删重置频道数据提交 封装
    async resetChanne () {
      // 提交频道数据到服务器的 请求参数
      // 注意点: id是频道的id seq是频道的顺序
      //        推荐频道不被操作,排除掉推荐频道,默认排序第一位
      var channels = this.channelList.slice(1).map((item, index) => {
        return {
          id: item.id,
          seq: index + 2
        }
      })
      // 获取token
      var token = this.$store.state.userInfo.token
      if (token) {
        // 已经登录
        await resetChannelList(channels)
      } else {
        // 未登录
        setLoacl('channel', this.channelList)
      }
    }
  },
  mounted () {
    // 获取所有频道数据
    this.getAllChannel()
  },
  computed: {
    // 推荐频道
    tuijian () {
      // 取出我的频道列表中的所有id
      var ids = this.channelList.map(item => {
        return item.id
      })
      // 筛选没有包含ids的元素 返回一个新数组
      var newArr = this.allChannels.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  }
}
</script>

<style lang="less">
.channels {
  .van-grid-item__content.van-grid-item__content--center.van-hairline {
    font-size: 12px;
    color: #646566;
  }
  .father {
    position: relative;
    .icon {
      position: absolute;
      right: 10px;
      top: -5px;
      color: #666;
    }
  }
  .active {
    color: red;
  }
}
</style>
