// 封装axios请求方法
import axios from 'axios';
import store from "../redux/store";

const baseUrl = 'http://localhost:5000/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 显示loading
  store.dispatch({
    type: "change_loading",
    payload: true
  })
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 隐藏loading
  store.dispatch({
    type: "change_loading",
    payload: false
  })
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // 隐藏loading
  store.dispatch({
    type: "change_loading",
    payload: false
  })
  return Promise.reject(error);
});

const request = (url, method = 'get', data = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${ baseUrl }${ url }`,
      data
    }).then(res => {
      /**
       * 1xx：信息性状态码，表示请求已被接受，继续处理。
       * 2xx：成功状态码，表示请求已成功被服务器接收、理解和处理。
       * 3xx：重定向状态码，表示需要进一步操作以完成请求。
       * 4xx：客户端错误状态码，表示客户端发送的请求有误。
       * 5xx：服务器错误状态码，表示服务器在处理请求时发生了错误。
       */
      if(res.status < 200 || res.status > 300) return reject('Network Error！');
      resolve(res.data);
    }).catch(err => reject('Network Error！'));
  })
}

export default request
