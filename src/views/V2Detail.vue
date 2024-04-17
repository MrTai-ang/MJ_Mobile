<template>
    <div class="detail-page">
      <van-nav-bar left-text="返回" @click-left="$router.back()" fixed title="面经详细" />
      <header class="header">
        <h1>{{data.stem  }}</h1>
        <p>
          {{ data.createdAt }} | {{data.views}} 浏览量 |
          {{ data.likeCount }} 点赞数
        </p>
        <p>
          <img :src="data.avatar" alt />
          <span>{{data.creator}}</span>
        </p>
      </header>
      <main class="body" v-html="data.content"></main>
      <div class="opt">
        <!-- active加不加取决于likeflag为真还是假 -->
        <van-icon :class="{ active: data.likeFlag }" @click="toggleLike" name="like-o"  />
        <van-icon :class="{ active: data.collectFlag }" @click="toggleCollect" name="star-o" />
      </div>
    </div>
  </template>

<script>
import { detailAPI, collectAndLikeAPI } from '@/api/article.js'
export default {
  data () {
    return {
      data: []
    }
  },
  name: 'detail-page',
  async created () {
    console.log('detail的created()函数')
    const { data: { data } } = await detailAPI(this.$route.query.id)
    this.data = data
  },
  methods: {
    // 点击喜欢图标
    async toggleLike () {
      this.data.likeFlag = !this.data.likeFlag
      //   调用接口，真正修改点赞数组
      await collectAndLikeAPI({
        id: this.data.id,
        optType: 1
      })
      if (this.data.likeFlag) {
        this.data.likeCount++
        this.$toast.success('点赞成功')
      } else {
        this.data.likeCount--
        this.$toast.success('取消点赞')
      }
    },
    // 点击收藏图标
    async toggleCollect () {
      this.data.collectFlag = !this.data.collectFlag
      await collectAndLikeAPI({
        id: this.data.id,
        optType: 2
      })
      if (this.data.collectFlag) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消收藏')
      }
    }

  }
}
</script>

  <style lang="less" scoped>
  .detail-page {
    margin-top: 44px;
    overflow: hidden;
    padding: 0 15px;
    .header {
      h1 {
        font-size: 24px;
      }
      p {
        color: #999;
        font-size: 12px;
        display: flex;
        align-items: center;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .opt {
      position: fixed;
      bottom: 100px;
      right: 0;
      > .van-icon {
        margin-right: 20px;
        background: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        box-shadow: 2px 2px 10px #ccc;
        font-size: 18px;
        &.active {
          background: #fec635;
          color: #fff;
        }
      }
    }
  }
  </style>
