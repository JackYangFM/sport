const StaffManage = () => import('./staffManage')
const StaffManageAdd = () => import('./staffManageAdd')
const StaffManageEdit = () => import('./staffManageEdit')

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
    }
]

