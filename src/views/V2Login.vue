<template>
    <div>
<van-nav-bar title="面经登录"/>

<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="username"
    label="账号"
    placeholder="请输入用户名"
    :rules="UserRules"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="请输入密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button  block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>

<router-link to="/register" class="link">还没有账号，去注册</router-link>
    </div>

</template>

<script>
import { loginAPI } from '@/api/user.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      UserRules: [
        // required必须，表示用户名必填
        { required: true, message: '请填写用户名' },
        // 使用正则验证，验证用户名为6-10位的数字字母下划线组合
        { pattern: /^\w{6,10}$/, message: '请输入6-10位的用户名' }
      ]
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await loginAPI(values)
        console.log('loginres：', res)
        //   存储token
        localStorage.setItem('mobile-token', res.data.data.token)

        this.$toast(res.data.message)
        setTimeout(() => {
          this.$router.push('/article')
          this.username = this.password = ''
        }, 2000)
      } catch (err) {
        this.$toast(err.response.data.message)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.link{
    float: right;
    margin-right: 20px;
    font-size: 15px;
    color:blue
}

</style>
