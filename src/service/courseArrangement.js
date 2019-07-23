import request from '../utils/request'

//课程安排初始化
export async function compileInit(params,mock) {
    return request('course_manage/compile_init',{
        mock:mock ? mock : false,
        body:{
            method:'GET',
            data:params
        }
    });
}