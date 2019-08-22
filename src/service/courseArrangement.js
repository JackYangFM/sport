import request from '../utils/request'

//4.2课程安排初始化
export async function compileInit(params,mock) {
    return request('serviceManage/course_manage/compile_init',{
        mock:mock ? mock : false,
        body:{
            method:'GET',
            data:params
        }
    });
}

//4.1课程安排
export async function select(params,mock) {
    return request('serviceManage/course_manage/select',{
        mock:mock ? mock : false,
        body:{
            method:'GET',
            data:params
        }
    });
}

//4.3编辑课程安排
export async function compile(params,mock) {
    return request('serviceManage/course_manage/compile',{
        mock:mock ? mock : false,
        body:{
            data:params
        }
    });
}