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
                @click="onSearch(item.oldItem)">
        <template #title>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else-if="historyList.length>0">
      <van-cell title="搜索记录">
        <template #default>
          <van-icon name="delete"
                    @click="clearHis" />
        </template>
      </van-cell>
      <van-cell @click="onSearch(item)"
                v-for="(item, index) in historyList"
                :key="index"
                icon="clock-o"
                :title="item">
        <template #default>
          <van-icon name="cross"
                    @click.stop="dleHis(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getThinkList } from '@/api/search.js'
import { setLoacl, getLoacl, removeLocal } from '@/utils/mylocal.js'
export default {
  data () {
    return {
      value: '',
      thinkList: [], // 联想结果
      timeID: null,
      historyList: getLoacl('history') || [] // 历史记录
    }
  },
  methods: {
    // 清空所有搜索记录
    clearHis () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认要删除所有搜索记录吗?'
      })
        .then(() => {
          this.historyList = []
          removeLocal('history')
        })
    },
    // 删除搜索记录
    dleHis (index) {
      this.historyList.splice(index, 1)
      setLoacl('history', this.historyList)
    },
    // 输入框输入内容联想关键字
    async thinkRes () {
      if (this.value.trim().length === 0) {
        this.thinkList = []
        return
      }
      clearTimeout(this.timeID)
      this.timeID = setTimeout(async () => {
        var res = await getThinkList(this.value.trim())
        this.thinkList = res.data.data.options
        this.thinkList = this.thinkList.map(item => {
          return {
            oldItem: item,
            newItem: item.replace(this.value, '<span style= "color: red">' + this.value + '</span>')
          }
        })
      }, 300)
    },
    // 输入框回车
    onSearch (val) {
      // 往数组开头添加元素
      this.historyList.unshift(val)
      // 去重
      this.historyList = [...new Set(this.historyList)]
      setLoacl('history', this.historyList)
      window.console.log(this.historyList)
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
