const IncomePayManage = () => import('./incomePayManage')
const IncomeManage = () => import('./incomeManage')
const IncomeManageAdd = () => import('./incomeManageAdd')
const SpendingManage = () => import('./spendingManage')
const SpendingManageAdd = () => import('./spendingManageAdd')


export default [
    {
        path: '/incomePayManage',
        name: 'incomePayManage',
        component: IncomePayManage
    },
    {
        path: '/incomeManage',
        name: 'incomeManage',
        component: IncomeManage
    },
    {
        path: '/incomeManageAdd',
        name: 'incomeManageAdd',
        component: IncomeManageAdd
    },
    {
        path: '/spendingManage',
        name: 'spendingManage',
        component: SpendingManage
    },
    {
        path: '/spendingManageAdd',
        name: 'spendingManageAdd',
        component: SpendingManageAdd
    }
]

