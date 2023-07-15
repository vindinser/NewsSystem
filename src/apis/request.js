// 封装axios请求方法
import axios from 'axios';

const baseUrl = 'http://localhost:5000/';

const request = (url, method = 'get', data = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${ baseUrl }${ url }`,
      data
    }).then(res => {
      if(res.status !== 200) return reject('Network Error！');
      resolve(res.data);
    }).catch(err => reject('Network Error！'));
  })
}


export default request
