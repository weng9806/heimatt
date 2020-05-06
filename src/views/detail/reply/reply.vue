<template>
  <div class="reply">
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '70%' }">
      <van-cell title="当前评论" />
      <div class="pad">
        <comment :isreply="true"
                 :item="currentObj" />
      </div>
      <van-cell title="评论回复" />
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="list">
        <comment :isreply="true"
                 v-for="(item, index) in replyList"
                 :key="index"
                 :item="item" />
      </van-list>
      <write :isreply="true"
             :comid="currentObj.com_id"
             @addReplyObj="addReplyObj" />
    </van-popup>
  </div>
</template>

<script>
import comment from '../comment/comment.vue'
import write from '../write/write.vue'
import bus from '@/utils/bus.js'
import { apiGetCommentReply } from '@/api/detail.js'
export default {
  components: {
    comment,
    write
  },
  watch: {
    show (newV) {
      if (newV === false) {
        this.replyList = []
        this.finished = false
      } else {
        this.onLoad()
      }
    }
  },
  data () {
    return {
      show: false, // 控制弹出层
      loading: false,
      finished: false,
      currentObj: {},
      timeID: null,
      offset: null,
      end_id: '',
      limit: 10,
      replyList: []
    }
  },
  methods: {
    addReplyObj (obj) {
      this.replyList.unshift(obj)
      this.currentObj.reply_count += 1
    },
    onLoad () {
      clearTimeout(this.timeID)
      this.timeID = setTimeout(async () => {
        var res = await apiGetCommentReply({
          comid: this.currentObj.com_id.toString(),
          offset: this.offset,
          limit: this.limit
        })
        this.replyList = [...this.replyList, ...res.data.data.results]
        this.offset = res.data.data.last_id
        this.end_id = res.data.data.end_id
        this.loading = false
        if (this.offset === this.end_id) {
          this.finished = true
        }
      }, 300)
    }
  },
  mounted () {
    bus.$on('passItem', item => {
      this.currentObj = item
      window.console.log(this.currentObj)
    })
  }
}
</script>

<style lang="less">
.reply {
  .list {
    margin-bottom: 54px;
    padding: 0 10px;
  }
  .pad {
    padding: 0 10px;
  }
}
</style>
