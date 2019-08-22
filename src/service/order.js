import request from '../utils/request'

//1.2订单新增
export async function insert(params, mock) {
    return request('order_manage/insert', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//1.3订单修改初始化
export async function updateInit(params, mock) {
    return request('order_manage/update_init', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//1.4订单修改
export async function update(params, mock) {
    return request('order_manage/update', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//1.5订单详情数据查询
export async function details(params, mock) {
    return request('serviceManage/order_manage/details', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//1.6学员上课课程记录
export async function classRegister(params, mock) {
    return request('serviceManage/order_manage/class_register', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//1.7课时消耗
export async function consumeCourse(params, mock) {
    return request('serviceManage/order_manage/consume_course', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}