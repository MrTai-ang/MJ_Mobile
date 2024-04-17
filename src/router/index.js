import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/V2Login.vue'
import Detail from '@/views/V2Detail.vue'
import Home from '@/views/V2Home.vue'
import Register from '@/views/V2Register.vue'
import Article from '@/views/Layout/V2Article.vue'
import Collect from '@/views/Layout/V2Collect.vue'
import Like from '@/views/Layout/V2Like.vue'
import User from '@/views/Layout/V2User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: 'article', component: Article
    }, // 面经列表
    {
      path: 'collect', component: Collect
    }, // 收藏
    {
      path: 'like', component: Like
    }, // 喜欢
    {
      path: 'user', component: User
    } // 我的
    ]
  },
  {
    path: '/detail', component: Detail
  }

]

const router = new VueRouter({
  routes
})

export default router
