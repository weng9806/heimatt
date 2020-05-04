<template>
  <div class="reply">
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
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onCancel () {
      window.console.log(this.value)
    }
  }
}
</script>

<style lang='less'>
.reply {
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
    width: 15%;
  }
}
</style>
