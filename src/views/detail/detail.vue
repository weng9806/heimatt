<template>
  <div class="dateil">
    <van-nav-bar title="文章详情"
                 :fixed="true"
                 left-arrow
                 @click-left="$router.back()" />
    <h1>{{artInfo.title}}</h1>
    <div class="autInfo">
      <div class="left">
        <img :src="artInfo.aut_photo"
             alt="">
      </div>
      <div class="center">
        <div class="name">{{artInfo.aut_name}}</div>
        <div>{{artInfo.pubdate | timePros}}</div>
      </div>
      <div lang="right">
        <van-button type="info"
                    v-if="artInfo.is_followed === true">已关注</van-button>
        <van-button type="info"
                    v-else>+ 关注</van-button>
      </div>
    </div>
    <div class="artInfo">
      <div v-html="artInfo.content"></div>
    </div>
    <div class="likes">
      <div class="left">
        <van-button round
                    plain
                    icon="like"
                    type="danger"
                    v-if="artInfo.attitude === 1">点赞</van-button>
        <van-button round
                    icon="like"
                    type="default"
                    v-else>点赞</van-button>
      </div>
      <div class="right">
        <van-button round
                    plain
                    icon="delete"
                    type="danger"
                    v-if="artInfo.attitude === 0">不喜欢</van-button>
        <van-button round
                    icon="delete"
                    type="default"
                    v-else>不喜欢</van-button>
      </div>
    </div>
    <Comment v-for="(item) in 12"
             :key="item" />
    <Reply />
  </div>
</template>

<script>
import Comment from './comment/comment.vue'
import Reply from './reply/reply.vue'
import { apigetDetail } from '@/api/detail.js'
export default {
  components: {
    Comment,
    Reply
  },
  data () {
    return {
      artid: 0, // 定义文章id
      artInfo: '' // 文章详情
    }
  },
  async mounted () {
    this.artid = this.$route.query.artid
    var res = await apigetDetail(this.artid)
    window.console.log(res, '111')
    this.artInfo = res.data.data
    window.console.log(this.artInfo)
  }
}
</script>

<style lang="less">
.dateil {
  margin-top: 46px;
  margin-bottom: 80px;
  .van-nav-bar.van-nav-bar--fixed.van-hairline--bottom {
    background-color: rgb(50, 150, 250);
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left::before {
    color: #fff;
  }
  h1 {
    text-align: center;
    font-weight: 400;
    padding: 20px 0;
  }
  .autInfo {
    padding: 0 12px;
    display: flex;
    width: 100%;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .center {
      flex: 1;
      font-size: 14px;
      .name {
        margin-bottom: 5px;
      }
    }
  }
  .artInfo {
    padding: 25px 12px 0;
  }
  .likes {
    padding-top: 40px;
    display: flex;
    .left,
    .right {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
