import request from '../utils/request'
// import { resolve } from 'dns';
// import { rejects } from 'assert';

//通用请求方法，一般用于组件使用

//查询
export async function queryApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}
export async function queryApiGet(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      method:'GET',
      data:params
    }
  });
}
//新增
export async function addApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}
//删除
export async function removeApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  })
}
//更新
export async function updateApi(url,params,mock) {
  return request(url,{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}

//自定义请求接口
export async function menu(params) {
  return request('menu',{
    mock:true,
    body:{
      data:params
    }
  });
}

export async function menu2(params) {
  return request('menu2',{
    mock:true,
    body:{
      data:params
    }
  });
}

export async function user(params) {
  return request('user',{
    mock:true,
    body:{
      data:params
    }
  });
}

export async function queryTest(params) {
  return request('test',{
    mock:true,
    body:{
      data:params
    }
  });
}
export async function queryPerms(params) {
  return request('havePerms',{
    body:{
      method:'GET',
      data:params
    }
  });
}

//获取校区数据
export async function campusSelect(params,mock) {
  return request('commonality_manage/campus_select',{
    mock:mock ? mock : false,
    body:{
      method:'GET',
      data:params
    }
  });
}

//登录
export async function login(params,mock) {
  return request('user_manage/login',{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}

//获取职员职位数据
export async function positionSelect(params,mock) {
  return request('commonality_manage/position_select',{
    mock:mock ? mock : false,
    body:{
      method:'GET',
      data:params
    }
  });
}

//获取各个职位的员工
export async function staffSelect(params,mock) {
  return request('commonality_manage/staff_select',{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}