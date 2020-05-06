<template>
  <div class="my">
    <div class="mytop">
      <img :src="userInfo.photo"
           alt=""
           @click="$router.push('/personInfo')">
      <span class="autname">{{userInfo.name}}</span>
      <div class="reads">
        <span>今日阅读</span>
        <div>123分钟</div>
      </div>
      <div class="details">
        <div class="left">
          <div>{{userInfo.art_count}}</div>
          <div>动态</div>
        </div>
        <div class="center">
          <div>{{userInfo.follow_count}}</div>
          <div>关注</div>
        </div>
        <div class="right">
          <div>{{userInfo.fans_count}}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item icon="star-o"
                     text="收藏" />
      <van-grid-item icon="underway-o"
                     text="历史" />
      <van-grid-item icon="records"
                     text="作品" />
    </van-grid>
    <van-cell-group class="bottom">
      <van-cell title="消息通知"
                is-link>
      </van-cell>
      <van-cell title="用户反馈"
                is-link>
      </van-cell>
      <van-cell title="小智同学"
                is-link>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiGetUserInfo } from '@/api/my.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  async mounted () {
    var res = await apiGetUserInfo()
    this.userInfo = res.data.data
  }
}
</script>

<style lang='less'>
.my {
  background-color: #f5f7f9;
  .mytop {
    position: relative;
    background-color: #3e9df8;
    color: #fff;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 40px;
    }
    .autname {
      position: relative;
      top: -80px;
      left: -10px;
      font-size: 18px;
    }
    .details {
      display: flex;
      padding-bottom: 30px;
      div {
        flex: 1;
        text-align: center;
      }
    }
    .reads {
      position: absolute;
      top: 60px;
      right: 0;
      font-size: 12px;
      border-radius: 20px 0px 0px 20px;
      padding: 3px 15px;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .van-icon-star-o::before {
    color: red;
    font-size: 35px;
  }
  .van-icon-underway-o::before {
    font-size: 35px;
    color: #ffbc69;
  }
  .van-icon-records::before {
    font-size: 35px;
    color: blue;
  }
  .bottom {
    margin-top: 10px;
  }
}
</style>
