<template>
  <div class="searchResult">
    <van-nav-bar title="搜索结果"
                 :fixed="true"
                 left-arrow
                 @click-left="onClickLeft" />
    <van-list v-model="loading"
              :finished="finished"
              finished-text="-- 我是有底线的 --"
              @load="onLoad">
      <van-cell-group v-for="(artitem, artindex) in searchResList"
                      :key="artindex">
        <van-cell @click="$router.push('/detail?artid=' +artitem.art_id)">
          <template #title>
            <h3>{{ artitem.title }}</h3>
            <van-grid :border="false"
                      :column-num="3"
                      v-if="artitem.cover.type != 0">
              <van-grid-item v-for="(imgitem, imgindex) in artitem.cover.images"
                             :key="imgindex">
                <van-image :src="imgitem" />
              </van-grid-item>
            </van-grid>
            <div class="info">
              <span>{{artitem.aut_name}}</span>
              <span>{{artitem.comm_count}} 评论</span>
              <span>{{artitem.pubdate | timePros}}</span>
            </div>
            <van-grid :column-num="3">
              <van-grid-item icon="comment-o"
                             text="190"
                             @click.stop="comment" />
              <van-grid-item icon="like-o"
                             text="点赞" />
              <van-grid-item text="分享">
                <template #icon>
                  <i class="iconfont icon-tubiaozhizuomoban-"></i>
                </template>
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { getSearchRes } from '@/api/search.js'
export default {
  data () {
    return {
      loading: false, // list组件加载状态
      finished: false, // list组件数据是否加载完毕
      page: 0, // 定义页数
      perpage: 10, // 定义页容量
      searchResList: [], // 搜索结果
      timeID: null
    }
  },
  methods: {
    // 评论操作
    comment () {
      if (this.$login()) {
        window.console.log('评论操作')
      }
    },
    onLoad () {
      clearTimeout(this.timeID)
      this.timeID = setTimeout(async () => {
        this.loading = false
        var res = await getSearchRes({
          page: this.page += 1,
          perpage: this.perpage,
          key: this.$route.query.key
        })
        this.searchResList = [...this.searchResList, ...res.data.data.results]
        if (this.searchResList.length === 100 || res.data.data.results.length === 0) {
          this.finished = true
        }
      }, 500)
    },
    // 返回上一页
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.searchResult {
  margin-top: 46px;
  .van-nav-bar.van-nav-bar--fixed.van-hairline--bottom {
    background-color: rgb(50, 150, 250);
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left::before {
    color: #fff;
  }
  i.van-icon.van-grid-item__icon {
    font-size: 20px;
  }
  .icon-tubiaozhizuomoban-:before {
    font-size: 21px;
  }
  .van-grid-item__icon + .van-grid-item__text {
    margin-top: 0px;
    margin-left: 5px;
  }
  .van-grid-item__text {
    margin-left: 5px;
    margin-top: -6px;
    font-size: 12px;
  }
  .van-grid-item__content.van-grid-item__content--center.van-hairline {
    flex-direction: row;
  }
  .info {
    span {
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
