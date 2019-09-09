import request from '../utils/request'
// import { resolve } from 'dns';
// import { rejects } from 'assert';

//通用请求方法，一般用于组件使用

//查询
export async function queryApi(url, params, mock) {
  return request(url, {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}

export async function queryApiGet(url, params, mock) {
  return request(url, {
    mock: mock ? mock : false,
    body: {
      method: 'GET',
      data: params
    }
  });
}

//新增
export async function addApi(url, params, mock) {
  return request(url, {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}

//删除
export async function removeApi(url, params, mock) {
  return request(url, {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  })
}

//更新
export async function updateApi(url, params, mock) {
  return request(url, {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}

//自定义请求接口
export async function menu(params) {
  return request('menu', {
    mock: true,
    body: {
      data: params
    }
  });
}

export async function menu2(params) {
  return request('menu2', {
    mock: true,
    body: {
      data: params
    }
  });
}

export async function user(params) {
  return request('user', {
    mock: true,
    body: {
      data: params
    }
  });
}

export async function queryTest(params) {
  return request('test', {
    mock: true,
    body: {
      data: params
    }
  });
}

export async function queryPerms(params) {
  return request('havePerms', {
    body: {
      method: 'GET',
      data: params
    }
  });
}

//5.1获取校区数据  作废
export async function campusSelect(params, mock) {
  return request('serviceManage/commonality_manage/campus_select', {
    mock: mock ? mock : false,
    body: {
      method: 'GET',
      data: params
    }
  });
}

//登录
export async function login(params, mock) {
  return request('serviceManage/user_manage/login', {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}

//0.2获取用户权限下所有校区
export async function userCampus(params, mock) {
  return request('serviceManage/user_manage/user_campus', {
    mock: mock ? mock : false,
    body: {
      method: 'GET',
      data: params
    }
  });
}

//0.3用户切换校区
export async function changeCampus(params, mock) {
  return request('serviceManage/user_manage/change_campus', {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}

//5.4获取课程时间
export async function courseTimeSelect(params, mock) {
  //serviceManage/commonality_manage/course_time_select
  return request('serviceManage/commonality_manage/each_course_time', {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}
export async function courseTimeSelect2(params, mock) {
  return request('serviceManage/commonality_manage/course_time_select', {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  });
}
//5.2获取职员职位数据
export async function positionSelect(params,mock) {
  return request('serviceManage/commonality_manage/position_select',{
    mock:mock ? mock : false,
    body:{
      method:'GET',
      data:params
    }
  });
}

//5.3获取各个职位的员工
export async function staffSelect(params,mock) {
  return request('serviceManage/commonality_manage/staff_select',{
    mock:mock ? mock : false,
    body:{
      data:params
    }
  });
}

//5.5获取额外收入的类型
export async function incomeTypeSelect(params,mock) {
  return request('serviceManage/commonality_manage/income_type_select',{
    mock:mock ? mock : false,
    body:{
      method:'GET',
      data:params
    }
  });
}