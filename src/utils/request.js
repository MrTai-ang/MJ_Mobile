// 1. 导入axios
import axios from 'axios'

// 2. 配置(防止更改原来的axios,)
// 创建一个 axios 的副本 （创建一个新的axios实例对象）
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net', // 配置请求根路径
  timeout: 5000 // 超时时间
})

// 后期，还可以给 request 配置拦截器等等
// 添加请求拦截器(给request添加拦截器)
// axios.interceptors.request.use(function (config) {
// 将axios改为request
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('mobile-token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 3. 导出
export default request
