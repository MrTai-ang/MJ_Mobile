<template>
    <div class="collect-page">
        <van-nav-bar class="my-nav " title="我的收藏" />
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<ArticleItem v-for="item in list" :key="item.id" :item="item"></ArticleItem>
</van-list>
    </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { collectAndLikeListAPI } from '@/api/article.js'
export default {
  data () {
    return {
      optType: 2,
      list: [], // 存储要展示的面经
      loading: false,
      finished: false,
      current: 1

    }
  },
  components: {
    ArticleItem
  },
  created () {

  },
  methods: {
    async onLoad () {
      const res = await collectAndLikeListAPI(
        {
          optType: this.optType,
          page: this.current
        //   pageSize: 10
        })
      console.log('收藏页结构：', res)
      this.list.push(...res.data.data.rows)
      this.loading = false
      this.current++
      //   console.log('list:', this.list)
      console.log('current', this.current)
      console.log('pageTotal', res.data.data.pageTotal)
      if (this.current > res.data.data.pageTotal) {
        console.log('测试')
        this.finished = true
      }
    }
  }

}
</script>

<style lang="less" scoped>

.collect-page {
    margin-bottom: 50px;
    margin-top: 44px;
    .my-nav {

      height: 44px;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 999;
      background: #fff;
      align-items: center;}}

</style>
