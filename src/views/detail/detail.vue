<template>
  <div class="dateil">
    <van-nav-bar :title="artInfo.title"
                 :fixed="true"
                 left-arrow
                 @click-left="$router.back()" />
    <h1 class="title">{{artInfo.title}}</h1>
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
                    @click="unfollow"
                    v-if="artInfo.is_followed === true">已关注</van-button>
        <van-button type="info"
                    @click="follow"
                    v-else>+ 关注</van-button>
      </div>
    </div>
    <div class="artInfo">
      <div v-html="artInfo.content"></div>
    </div>
    <div class="likes">
      <div class="right">
        <van-button round
                    plain
                    icon="like"
                    type="danger"
                    @click="unZan"
                    v-if="artInfo.attitude === 1">点赞</van-button>
        <van-button round
                    icon="like"
                    type="default"
                    @click="zan"
                    v-else>点赞</van-button>
      </div>
      <div class="left">
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
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <div v-for="(item, index) in commentList"
           :key="index">
        <Comment :isreply="false"
                 @openreply="openreply"
                 :item="item" />
      </div>
    </van-list>
    <reply ref="reply" />
    <write @getNewComment="getNewComment"
           :isreply="false" />
  </div>
</template>

<script>
import Comment from './comment/comment.vue'
import write from './write/write.vue'
import reply from './reply/reply.vue'
import { apigetDetail, apifollow, apiunfollow, apizan, apiunzan, apiGetComment } from '@/api/detail.js'
export default {
  components: {
    Comment,
    write,
    reply
  },
  data () {
    return {
      artid: 0, // 定义文章id
      artInfo: '', // 文章详情
      loading: false, // list 加载状态
      finished: false, // list 完结状态
      limit: 10, // 页容量
      offset: null, // 评论下一页标识
      end_id: '',
      commentList: [],
      timeID: null
    }
  },
  methods: {
    // 打开回复评论面板
    openreply (value) {
      this.$refs.reply.show = value
    },
    getNewComment (obj) {
      window.console.log(obj)
      this.commentList.unshift(obj)
    },
    onLoad () {
      clearTimeout(this.timeID)
      this.loading = false
      this.timeID = setTimeout(async () => {
        var res = await apiGetComment({
          artid: this.artid,
          offset: this.offset,
          limit: this.limit
        })
        this.commentList = [...this.commentList, ...res.data.data.results]
        this.offset = res.data.data.last_id
        this.end_id = res.data.data.end_id
        if (this.offset === this.end_id) {
          this.finished = true
        }
      }, 300)
    },
    // 取消点赞
    async unZan () {
      await apiunzan(this.artid)
      this.artInfo.attitude = -1
    },
    // 点赞
    async zan () {
      await apizan(this.artid)
      this.artInfo.attitude = 1
    },
    // 关注作者
    async follow () {
      var id = this.artInfo.aut_id
      await apifollow(id)
      this.artInfo.is_followed = true
    },
    // 取消关注作者
    async unfollow () {
      var id = this.artInfo.aut_id
      await apiunfollow(id)
      this.artInfo.is_followed = false
    }
  },
  async mounted () {
    this.artid = this.$route.query.artid
    var res = await apigetDetail(this.artid)
    this.artInfo = res.data.data
  }
}
</script>

<style lang="less">
.dateil {
  margin-top: 46px;
  margin-bottom: 80px;
  padding: 0 10px;
  .van-nav-bar.van-nav-bar--fixed.van-hairline--bottom {
    width: 100%;
    background-color: rgb(50, 150, 250);
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left::before {
    color: #fff;
  }
  .title {
    text-align: center;
    font-weight: 400;
    padding: 20px 0;
  }
  .autInfo {
    padding: 0 12px;
    display: flex;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      padding-right: 15px;
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
    padding: 0 5px;
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
