<template>
  <div class="comment">
    <div class="img">
      <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3142697516,2723287000&fm=26&gp=0.jpg"
           alt="">
    </div>
    <div class="center">
      <div>dsadasgasg</div>
      <div>评论内容</div>
      <div>
        <span class="time">2 周前</span>
        <span class="btn">回复1</span>
      </div>
    </div>
    <div class="right">
      <van-icon name="like"
                class="icon" /> 1
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.comment {
  width: 100%;
  display: flex;
  padding: 40px 12px 0;
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
