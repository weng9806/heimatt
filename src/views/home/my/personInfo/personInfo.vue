<template>
  <div class="personInfo">
    <van-nav-bar title="个人信息"
                 :fixed="true"
                 left-arrow
                 right-text="保存"
                 @click-right="onClickRight"
                 @click-left="$router.back()" />
    <van-cell-group class="marbomm">
      <van-cell title="头像"
                is-link
                @click="$refs.Upload.show= true">
        <template #default>
          <img class="img"
               :src="userInfoObj.photo"
               alt="">
        </template>
      </van-cell>
      <van-cell title="昵称"
                is-link
                @click="show=true">
        <template #default>
          <span>{{userInfoObj.name}}</span>
        </template>
      </van-cell>
      <van-cell title="介绍"
                is-link>
        <template #default>
          <span>{{userInfoObj.intro}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别"
                is-link>
        <template #default>
          <span>{{userInfoObj.gender === 0 ? '男' : '女'}}</span>
        </template>
      </van-cell>
      <van-cell title="生日"
                is-link>
        <template #default>
          <span>{{userInfoObj.birthday}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '8%' }">
      <van-field required
                 @input="changeName"
                 :error-message='errmsg'
                 v-model="userInfoObj.name" />
    </van-popup>
    <Upload ref="Upload"
            @setPhoto="setPhoto" />
  </div>
</template>

<script>
import { apiGetUserInfo, apiGetUserProfile, apSetUserProfile } from '@/api/my.js'
import Upload from './upload.vue'
export default {
  components: { Upload },
  data () {
    return {
      userInfoObj: {},
      show: false,
      errmsg: ''
    }
  },
  methods: {
    setPhoto (photo) {
      this.userInfoObj.photo = photo
    },
    changeName () {
      if (this.userInfoObj.name.length > 7) {
        this.errmsg = '名字长度不能超过7位'
      } else {
        this.errmsg = ''
      }
    },
    async onClickRight () {
      await apSetUserProfile({
        name: this.userInfoObj.name,
        gender: this.userInfoObj.gender,
        birthday: this.userInfoObj.birthday,
        intro: this.userInfoObj.intro
      })
      this.$toast.success('修改信息成功')
    }
  },
  async mounted () {
    var res = await apiGetUserInfo()
    this.$set(this.userInfoObj, 'photo', res.data.data.photo)
    this.$set(this.userInfoObj, 'name', res.data.data.name)
    this.$set(this.userInfoObj, 'intro', res.data.data.intro)
    var res1 = await apiGetUserProfile()
    this.$set(this.userInfoObj, 'birthday', res1.data.data.birthday)
    this.$set(this.userInfoObj, 'gender', res1.data.data.gender)
  }
}
</script>

<style lang="less">
.personInfo {
  margin-top: 46px;
  background-color: #f5f7f9;
  .van-nav-bar.van-nav-bar--fixed.van-hairline--bottom {
    background-color: rgb(50, 150, 250);
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left::before {
    color: #fff;
  }
  span.van-nav-bar__text {
    color: #fff;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .marbomm {
    margin-bottom: 10px;
  }
}
</style>
