<template>
  <div class="comment">
    <div class="img">
      <img :src="item.aut_photo"
           alt="">
    </div>
    <div class="center">
      <div>{{item.aut_name}}</div>
      <div>{{item.content}}</div>
      <div>
        <span class="time">{{item.pubdate | timePros}}</span>
        <span class="btn"
              v-if="isreply === false"
              @click="reply">回复 {{item.reply_count}}</span>
      </div>
    </div>
    <div class="right">
      <van-icon name="like"
                class="icon" />{{item.like_count}}
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  props: ['item', 'isreply'],
  data () {
    return {

    }
  },
  methods: {
    reply () {
      if (this.$login()) {
        this.$emit('openreply', true)
        bus.$emit('passItem', this.item)
      }
    }
  }
}
</script>

<style lang="less">
.comment {
  width: 100%;
  display: flex;
  margin-top: 10px;
  margin-bottom: 50px;
  .img {
    img {
      width: 46px;
      height: 46px;
      margin-right: 10px;
    }
  }
  .center {
    div:nth-child(1) {
      color: #7099d0;
    }
    div:nth-child(2) {
      padding: 20px 10px;
    }
    div:nth-child(3) {
      .time {
        margin-right: 10px;
      }
      .btn {
        background-color: #ccc;
        padding: 5px 15px;
        border-radius: 20px;
      }
    }
    flex: 1;
  }
}
</style>
