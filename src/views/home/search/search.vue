<template>
  <div class="search">
    <van-search v-model="value"
                show-action
                background="#3296fa"
                placeholder="请输入搜索关键词"
                @input="thinkRes"
                @search="onSearch"
                @cancel="onCancel" />
    <van-cell-group v-if="thinkList.length>0">
      <van-cell title="联想区域" />
      <van-cell v-for="(item, index) in thinkList"
                :key="index"
                icon="search"
                :title="item"
                @click="onSearch(item)" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="搜索记录" />
      <van-cell icon="search"
                title="黑马程序员">
        <template #default>
          <van-icon name="cross" />
        </template>
      </van-cell>
      <van-cell icon="search"
                title="黑马程序员">
        <template #default>
          <van-icon name="cross" />
        </template>
      </van-cell>
      <van-cell icon="search"
                title="黑马程序员">
        <template #default>
          <van-icon name="cross" />
        </template>
      </van-cell>
      <van-cell icon="search"
                title="黑马程序员">
        <template #default>
          <van-icon name="cross" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getThinkList } from '@/api/search.js'
export default {
  data () {
    return {
      value: '',
      thinkList: [] // 联想结果
    }
  },
  methods: {
    // 输入框输入内容联想关键字
    async thinkRes () {
      var res = await getThinkList(this.value)
      this.thinkList = res.data.data.options
    },
    // 输入框回车
    onSearch (val) {
      window.console.log(val)
      window.console.log('onSearch')
      this.$router.push('/searchresult?key=' + val)
    },
    // 取消按钮事件
    onCancel () {
      window.console.log('onCancel')
    }
  }
}
</script>

<style lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: #ccc;
  }
}
</style>
