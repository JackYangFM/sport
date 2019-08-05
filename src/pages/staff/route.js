const StaffManage = () => import('./staffManage')
const StaffManageAdd = () => import('./staffManageAdd')
const StaffManageEdit = () => import('./staffManageEdit')
const StaffManageDetail = () => import('./staffManageDetail')


export default [
    {
        path: '/staffManage',
        name: 'staffManage',
        component: StaffManage
    },
    {
        path: '/StaffManageAdd',
        name: 'StaffManageAdd',
        component: StaffManageAdd
    },
    {
        path: '/StaffManageEdit/:staff_id',
        name: 'StaffManageEdit',
        component: StaffManageEdit
    },
    {
        path: '/StaffManageDetail/:staff_id',
        name: 'StaffManageDetail',
        component: StaffManageDetail
    }
]

