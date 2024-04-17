<template>

<div>

    <!-- 二级路由的出口 -->
<router-view></router-view>
<!-- 底部标签 -->
<van-tabbar v-model="active" >
  <van-tabbar-item  icon="description-o"  to="/article">面经</van-tabbar-item>
  <van-tabbar-item icon="star-o" to="/collect">收藏</van-tabbar-item>
  <van-tabbar-item icon="like-o" to="/like">喜欢</van-tabbar-item>
  <van-tabbar-item icon="contact-o" to="/user">我的</van-tabbar-item>
</van-tabbar>
</div>

</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
