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
          <van-button type="danger"
                      round
                      size="mini"
                      plain>编辑</van-button>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item class="father"
                       v-for="(item,index) in channelList"
                       :key="index">
          <template #text>{{item.name}}
            <van-icon name="clear"
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
        <van-grid-item text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ['channelList'],
  data () {
    return {
      show: false
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
    }
  }
}
</style>
