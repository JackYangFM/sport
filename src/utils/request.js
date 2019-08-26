/** 2018/2/23 17:42
 *  作者:周志豪
 *  功能:封装请求方法
 *  备注:
 */

import axios from 'axios'
import qs from 'qs'
import { Notice } from 'iview'
Notice.config({
  duration: 3
});
//mock地址
const mockUrl = 'http://39.107.52.108:8001/app/mock/20/';
let domain = '';
const path = '/';//根据项目修改

if(process.env.NODE_ENV === "development"){
  //本地开发可以随意修改
  // domain = 'http://103.45.101.170:8000';
  domain = 'http://47.104.165.12:8001'
  // domain = 'http://robot.ohaotian.com/hardware';
}else{
  domain = '';
}
const serverUrl = domain + path;
//axios默认参数配置
axios.defaults.timeout = 1000 * 50;
//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  if(config.method === "post") {
    config.data = JSON.stringify(config.data);
    // config.data = qs.stringify(config.data);
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  let data = res.data;
  return new Promise((resolve) => {
    if (data.code === '0'||data.code === 0) {
      if(data.message){
        // 为null
        Notice.success({title:data.message ? data.message :' '});
      }
      resolve(data.data);
    }else{
      Notice.error({
        title:'系统提示',
        desc:data.message ? data.message :'网络繁忙！'
      });
      resolve(false);
    }
  }).catch(error => {
    console.log(error);
  });
}, function (error) {
  const res = error.response;
  // console.log(res);
  if(res.status === 401){//token失效状态码
    window.parent.postMessage('refresh','*');
  }else{
    return Promise.reject(error);
  }
});

export default function request(url,option) {
  let httpUrl;
  if(!option.noPrefix){
    httpUrl= option.mock ? mockUrl + url : serverUrl + url;
  }else{
    httpUrl= option.mock ? mockUrl + url : url;
  }
  let reqUrl = '';
  if(option.body.method === 'GET' && option.body.data){
    reqUrl = httpUrl + '?' + qs.stringify(option.body.data);
  }else{
    reqUrl = httpUrl;
  }
  const defaultOptions = {
    method:'POST',
    url:reqUrl
  };
  const newOptions = { ...defaultOptions, ...option.body };
  return axios({
    ...newOptions
  }).then(res => {
    return res
  })
}
