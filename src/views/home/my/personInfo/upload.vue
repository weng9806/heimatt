<template>
  <div class="upload">
    <van-popup :close-on-click-overlay="false"
               v-model="show"
               class="pop">
      <div @click="upFile">从相册选择</div>
      <input type="file"
             ref="myinp"
             @change="imgChange"
             style="display:none">
      <div>拍照</div>
      <div @click="show= false">取消</div>
    </van-popup>
  </div>
</template>

<script>
import { apiUpFileLoad } from '@/api/my.js'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  data () {
    return {
      show: false,
      photo: ''
    }
  },
  methods: {
    upFile () {
      this.$refs.myinp.click()
    },
    // 文件上传时触发
    imgChange () {
      var reader = new FileReader()
      reader.readAsDataURL(this.$refs.myinp.files[0])
      reader.addEventListener('load', () => {
        ImagePreview({
          images: [
            reader.result
          ],
          onClose: this.hint
        })
      })
    },
    // 关闭头像预览时 弹出提示框
    hint () {
      this.$dialog.confirm({
        title: '提示',
        message: '确定使用该头像吗'
      })
        .then(async () => {
          var res = await apiUpFileLoad(this.$refs.myinp.files[0])
          window.console.log(res)
          this.photo = res.data.data.photo
          this.$toast.success('上传成功')
          this.show = false
          this.$emit('setPhoto', this.photo)
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="less">
.upload {
  .pop {
    width: 85%;
    text-align: center;
    line-height: 44px;
  }
  div :nth-child(2) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
