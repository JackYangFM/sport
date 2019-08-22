import request from '../utils/request'

//3.1员工新增
export async function select(params, mock) {
    return request('serviceManage/staff_manage/select', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//3.2员工新增
export async function staffIManageInsert(params, mock) {
    return request('serviceManage/staff_manage/insert', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//3.3员工修改初始化
export async function staffIManageUpdateInit(params, mock) {
    return request('serviceManage/staff_manage/update_init', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//3.4员工修改
export async function staffIManageUpdate(params, mock) {
    return request('serviceManage/staff_manage/update', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//3.5员工删除
export async function staffIManageDelete(params, mock) {
    return request('serviceManage/staff_manage/delete', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}

//3.6员工详情数据查询
export async function details(params, mock) {
    return request('serviceManage/staff_manage/details', {
        mock: mock ? mock : false,
        body: {
            data: params
        }
    });
}
