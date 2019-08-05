import request from '../utils/request'

//4.5课程安排初始化-五一校区
export async function WuYiSelect(params, mock) {
  return request('course_manage/WuYi_select', {
    mock: mock ? mock : false,
    body: {
      method: 'GET',
      data: params
    }
  })
}

//4.5课程安排初始化-桐柏路校区
export async function TongBaiLuSelect(params, mock) {
  return request('course_manage/TongBaiLu_select', {
    mock: mock ? mock : false,
    body: {
      method: 'GET',
      data: params
    }
  })
}

//4.5课程安排初始化-淮河路校区
export async function HuaiHeLuSelect(params, mock) {
  return request('course_manage/HuaiHeLu_select', {
    mock: mock ? mock : false,
    body: {
      method: 'GET',
      data: params
    }
  })
}

//4.4家长选课提交
export async function studentInsert(params, mock) {
  return request('course_manage/student_insert', {
    mock: mock ? mock : false,
    body: {
      data: params
    }
  })
}
