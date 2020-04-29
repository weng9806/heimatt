<template>
  <div class="more">
    <van-popup v-model="show"
               class="pop">
      <van-cell-group v-if="report===false">
        <van-cell icon="failure"
                  title="不感兴趣"
                  @click="disLike" />
        <van-cell @click="report=true"
                  icon="info-o"
                  title="反馈垃圾内容"
                  is-link />
        <van-cell icon="delete"
                  title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell @click="report=false"
                  icon="arrow-left" />
        <van-cell v-for="(item, index) in resports"
                  :key="index"
                  :title="item.type"
                  @click="resportUse(item.id)" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { useReportArt } from '@/api/index.js'
export default {
  props: ['art_id'],
  watch: {
    show (newV) {
      if (newV === false) {
        this.report = false
      }
    }
  },
  data () {
    return {
      show: false, // 弹出层
      report: false,
      resports: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ]
    }
  },
  methods: {
    // 用户举报文章
    async resportUse (id) {
      try {
        await useReportArt({
          artId: this.art_id,
          id: id
        })
        this.$toast.success('举报成功')
      } catch (error) {
        this.$toast.fail('举报失败')
      }
      this.show = false
      this.report = false
    },
    // 不感兴趣
    disLike () {
      this.$emit('disLike', this.art_id)
    }
  }
}
</script>

<style lang="less">
.more {
  .pop {
    width: 90%;
  }
}
</style>
