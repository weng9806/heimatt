<template>
  <div>
    <h2>使用Vant按钮</h2>
    <van-button type="primary">我是按钮</van-button>
    <van-button type="info">我是按钮</van-button>
    <van-button type="warning">我是按钮</van-button>
    <van-button type="danger">我是按钮</van-button>
    <van-button type="default">我是按钮</van-button>
    <h2>使用icon</h2>
    <van-icon name="gem-o" />
    <van-icon name="cart-o" />
    <van-icon name="replay" />
    <h2>使用Vant单元格</h2>
    <van-cell-group>

    </van-cell-group>
    <van-cell-group>
      <van-cell title="左"
                value="右"
                label="标题下方描述" />
    </van-cell-group>
    <!-- 使用插槽 -->
    <van-cell value="右"
              label="标题下方描述">
      <template #title>
        <van-icon name="chat-o" />
      </template>
      <template #default>
        <van-icon name="gem-o" />
      </template>
      <template #label>
        <van-tag type="danger">标签</van-tag>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
