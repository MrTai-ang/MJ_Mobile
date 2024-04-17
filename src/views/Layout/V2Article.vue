<template>
    <div class="article-page">
      <nav class="my-nav van-hairline--bottom">
        <!-- 通过给当前选中的标签加active类，增加选中效果 -->
        <a href="javascript:;" :class="{active:sorter==='weight_desc'}" @click="changeSorter(1)">推荐</a>
        <a href="javascript:;" :class="{active:sorter===null}" @click="changeSorter(0)">最新</a>
        <div class="logo"><img src="@/assets/logo.png" alt=""></div>
      </nav>

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
import { articleAPI } from '@/api/article.js'
export default {
  data () {
    return {
      current: 1, // 页码，获取第一页数据
      sorter: 'weight_desc', // weight_desc获取推荐的面试题，null--获取最新的面试题
      list: [], // 存储要展示的面经
      loading: false,
      finished: false

    }
  },

  methods: {
    async onLoad () {
      // 会将loading设置为true，表示正在请求数据，此时不能重复加载
      try {
        const res = await articleAPI({
          // params参数
          current: this.current,
          sorter: this.sorter
        })

        //   this.list = res.data.data.rows
        // 拿到某一页的数据之后，不是赋值给list，而是向list里面添加
        this.list.push(...res.data.data.rows)
        this.loading = false
        this.current++
        console.log('list:', this.list)
      } catch (err) {
        console.log('articleerr:', err)
      }
      // 数据全部加载完成
      if (this.list.length >= 40) {
        this.finished = true
      }
    },
    changeSorter (t) {
      if (t === 1) { this.sorter = 'weight_desc' } else {
        this.sorter = null
      }
      //   重置页码为1
      this.current = 1
      this.list = []
      // 调用方法发送请求
      //   切换页面的时候，因为滚动条的位置靠下，会导致切换页面时自动请求一次数据，然后这里又手动请求一次，将会报错

      this.loading = true // 避免重复发送请求，改为true表示切换的时候不允许加载数据
      this.onLoad()
    }
  }

}
</script>

  <style lang="less" scoped>
  .article-page {
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
      display: flex;
      align-items: center;
      > a {
        color: #999;
        font-size: 14px;
        line-height: 44px;
        margin-left: 20px;
        position: relative;
        transition: all 0.3s;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 0;
          height: 2px;
          background: #222;
          transition: all 0.3s;
        }
        &.active {
          color: #222;
          &::after {
            width: 14px;
          }
        }
      }
      .logo {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        > img {
          width: 64px;
          height: 28px;
          display: block;
          margin-right: 10px;
        }
      }
    }
  }

  </style>
