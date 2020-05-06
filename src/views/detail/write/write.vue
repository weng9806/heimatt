<template>
  <div class="write">
    <van-field v-model="value"
               center
               clearable
               placeholder="发表评论" />
    <van-button type="info"
                class="btn"
                @click="onCancel">发送</van-button>
  </div>
</template>

<script>
import { apiSendComment, apiAddCommentReply } from '@/api/write.js'
export default {
  props: ['isreply', 'comid'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onCancel () {
      if (this.isreply === false) {
        if (this.$login()) {
          window.console.log('评论')
          if (this.value.trim().length === 0) {
            this.$toast.fail('评论内容不能为空')
            return
          }
          var res = await apiSendComment({
            artid: this.$route.query.artid,
            content: this.value
          })
          var newComment = res.data.data.new_obj
          this.$toast.success('评论成功')
          this.$emit('getNewComment', newComment)
          this.value = ''
        }
      } else {
        window.console.log('评论回复')
        var replyres = await apiAddCommentReply({
          comid: this.comid,
          content: this.value,
          artid: this.$route.query.artid
        })
        var newreplyObj = replyres.data.data.new_obj
        this.$toast.success('回复成功')
        this.$emit('addReplyObj', newreplyObj)
        this.value = ''
      }
    }
  }
}
</script>

<style lang='less' scope>
.write {
  margin-top: 54px;
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  input.van-field__control {
    font-size: 20px;
    font-size: 16px;
  }
  .btn {
    width: 20%;
  }
}
</style>
