<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="form.mobile"
                 :error-message="result.mobile"
                 type="number"
                 placeholder="请输入手机号">
        <template #left-icon>
          <i class="iconfont icon-iPhone"></i>
        </template>
      </van-field>
      <van-field v-model="form.code"
                 :error-message="result.code"
                 left-icon="smile-o"
                 placeholder="请输入验证码">
        <template #button>
          <van-button class="codeBtn"
                      size="small"
                      type="info">发送验证码</van-button>
        </template>
        <template #left-icon>
          <i class="iconfont icon-lock lock"></i>
        </template>
      </van-field>
    </van-cell-group>
    <div class="loginBtn">
      <van-button type="info"
                  size="large"
                  :loading="loading"
                  @click="login">登录</van-button>
    </div>

  </div>
</template>

<script>
import { userlogin } from '@/api/login.js'
export default {
  data () {
    return {
      form: {
        // 手机号
        mobile: '13911111111',
        // 验证码
        code: '246810'
      },
      result: {
        mobile: '',
        code: ''
      },
      loading: false // 加载效果
    }
  },
  methods: {
    // 登录按钮
    async login () {
      if (this.checkData()) { // 结果为true的处理
        this.loading = true // 开启加载效果
        try {
          var res = await userlogin(this.form)
          // 用户信息存入localStorage 和 vuex 中
          this.$store.commit('setUserInfo', res.data.data)
          this.$router.push('/home')
        } catch (error) {
          this.$toast.fail('登录失败')
        }
        this.loading = false
      }
    },
    // 校验方法封装
    checkData () {
      // 校验
      var isPass = []
      if (this.form.mobile.trim().length === 11) {
        this.result.mobile = ''
        isPass.push('true')
      } else {
        this.result.mobile = '手机号验证失败'
        isPass.push('false')
      }
      if (this.form.code.trim().length === 6) {
        this.result.code = ''
        isPass.push('true')
      } else {
        this.result.code = '验证码验证失败'
        isPass.push('false')
      }
      if (isPass.includes('false')) { // 判断是否包含了false,返回一个结果
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.login {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3296fa;
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
  }
  .iconfont {
    color: #666;
    font-size: 20px;
  }
  .codeBtn {
    border-radius: 20px;
    border-color: #ededed;
    background-color: #ededed;
    .van-button__text {
      color: #666;
    }
  }
  .loginBtn {
    margin: 30px 20px;
    .van-button {
      border-radius: 5px;
    }
  }
}
</style>
