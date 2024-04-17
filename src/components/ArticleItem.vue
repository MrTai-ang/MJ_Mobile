<template>
   <van-cell class="article-item" @click="$router.push(`/detail?id=${item.id}`)" >
        <template #title>
          <div class="head">
            <img :src="item.avatar" alt="" />
            <div class="con">
              <p class="title van-ellipsis">宇宙头条校招前端面经</p>
              <p class="other">{{ item.creator }} | {{ item.createdAt }}</p>
            </div>
          </div>
        </template>
        <template #label>
          <div class="body van-multi-ellipsis--l2">
{{   delHtmlTag(item.content) }}
          </div>
          <div class="foot">点赞 {{ item.likeCount }} | 浏览 {{ item.views }}</div>
        </template>
      </van-cell>
</template>

<script>
export default {
  props: ['item'],
  created () {

  },
  methods: {
    // 渲染数据时，去除html机构
    delHtmlTag (html) {
      // 先找一个<,接着找的不能是>,在找>,替换的就是一个html标签
      return html.replace(/<[^>]+>/g, '')
    }

  }

}
</script>

<style lang="less" scoped>
 .article-item {
    .head {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      .con {
        flex: 1;
        overflow: hidden;
        padding-left: 10px;
        p {
          margin: 0;
          line-height: 1.5;
          &.title {
            width: 280px;
          }
          &.other {
            font-size: 10px;
            color: #999;
          }
        }
      }
    }
    .body {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin-top: 10px;
    }
    .foot {
      font-size: 12px;
      color: #999;
      margin-top: 10px;
    }
  }
</style>
