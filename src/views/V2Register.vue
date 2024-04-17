<template>
    <div>
<van-nav-bar title="面经注册"/>

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
    <van-button  block type="info" native-type="submit">注册</van-button>
  </div>
</van-form>

<router-link to="/login" class="link">已有账号，去登录</router-link>
    </div>

</template>

<script>
// 导入API方法
import { registerAPI } from '@/api/user'
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
      console.log('submit', values)
      try {
        const res = await registerAPI(values)
        this.$toast(res.data.message)

        setTimeout(() => {
          // 编程式导航实现跳转
          this.$router.push('/login')
          // 重置表单
          this.username = this.password = ''
        }, 2000)
      } catch (err) {
        //   注册失败提示
        if (err.response) { // 有响应结果
          this.$toast(err.response.data.message)
        } else {
          // 无响应结果
          this.$toast('注册失败')
        }
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
