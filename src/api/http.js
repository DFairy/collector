/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import baseUrl from './url'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {
//     this.$message({
//         message: msg,
//         type: 'error'
//      });    
// }


// const root='http://106.13.94.82:3000'
// var root='http://localhost:3000'
// const root=process.env.BASE_URL
/*******创建axios实例********/
let instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [function (data) {
    return data;
  }],
  transformResponse: [function (data) {
    return data
  }],
  auth: {},
  responseType: 'json',
  maxContentLength: 5000,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  // showMessage:false
})

export default instance;