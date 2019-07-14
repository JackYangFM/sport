/** 2018/2/23 17:42
 *  作者:周志豪
 *  功能:封装请求方法
 *  备注:
 */

import axios from 'axios'
import qs from 'qs'
import { Modal ,Notice} from 'iview'

//mock地址
const mockUrl = 'http://39.107.52.108:8001/app/mock/20/';
// const serverUrl = 'http://60.205.157.80/';
// const serverUrl = 'http://robot.ohaotian.com/';
//const serverUrl='http://10.249.217.229:80/';
const serverUrl = window.g.ApiServerUrl

//axios默认参数配置
axios.defaults.timeout = 1000 * 50;
axios.defaults.withCredentials = true
//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // window.location='/'
  // console.log(config.url)
  // if(config.url == 'http://robot.ohaotian.com/publicService/permissionInit'){
  //   // window.location.href = "http://robot.ohaotian.com/accounts/login"
  // }
  if(config.method === "post") {
    config.data = JSON.stringify(config.data);
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (res ) {
  if(res.request.responseURL==serverUrl+'platform/sqlExecution'){
    let data = res;
    return new Promise((resolve) => {
      if (data.data.code === 0) {
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
      // console.log(error);
    });
  }else{
    let data = res.data;
    return new Promise((resolve) => {
      if (data.code === 0) {
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
      // var s = window.location.href;
      // console.log(res)
      //这里通过在获取地址栏上地址，来判断是否是登陆页面的地址；如果不加这个判断，
      //直接跳转，这样会在前台无限循环跳转。
      // if(s.indexof("http://robot.ohaotian.com/accounts/login")==-1){
      // 	window.location.href="http://robot.ohaotian.com/accounts/login";   //或者使用window.location.assign("login地址");
      // }
    }).catch(error => {
      // console.log(error);
    });
  }

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
    // reqUrl = httpUrl + '?' + qs.stringify(option.body.data) + '?s=' + new Date().getTime();
    reqUrl = httpUrl + '?' + qs.stringify(option.body.data);

  }else{
    '/'
    reqUrl = httpUrl;
  }

  const defaultOptions = {
    method:'POST',
    // url:reqUrl + '?s=' + new Date().getTime()
    url:reqUrl

  };
  const newOptions = { ...defaultOptions, ...option.body };
  return axios({
    ...newOptions
  }).then(res => {
    return res
  })
}
