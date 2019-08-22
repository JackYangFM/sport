import request from '../utils/request'

//2.1收入支出数据查询
export async function spendSelect(params,mock) {
    return request('serviceManage/spending_manage/select',{
        mock:mock ? mock : false,
        body:{
            // method:'GET',
            data:params
        }
    });
}

//2.3支出数据新增
export async function spendInsert(params,mock) {
    return request('serviceManage/spending_manage/insert',{
        mock:mock ? mock : false,
        body:{
            data:params
        }
    });
}

//2.4支出记录删除
export async function spendDelete(params,mock) {
    return request('serviceManage/spending_manage/delete',{
        mock:mock ? mock : false,
        body:{
            data:params
        }
    });
}

//2.5其它收入数据查询
export async function incomeSelect(params,mock) {
    return request('serviceManage/income_manage/select',{
        mock:mock ? mock : false,
        body:{
            data:params
        }
    });
}

//2.6其它收入数据新增
export async function incomeInsert(params,mock) {
    return request('serviceManage/income_manage/insert',{
        mock:mock ? mock : false,
        body:{
            data:params
        }
    });
}

//2.7其它收入记录删除
export async function incomeDelete(params,mock) {
    return request('serviceManage/income_manage/delete',{
        mock:mock ? mock : false,
        body:{
            data:params
        }
    });
}

