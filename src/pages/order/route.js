const OrderManage = () => import('./orderManage')
const OrderManageAdd = () => import('./orderManageAdd')
const OrderManageEdit = () => import('./orderManageEdit')
const OrderManageDetail = () => import('./orderManageDetail')

export default [
    {
        path: '/orderManage',
        name: 'orderManage',
        component: OrderManage
    },
    {
        path: '/orderManageAdd',
        name: 'orderManageAdd',
        component: OrderManageAdd
    },
    {
        path: '/orderManageEdit/:order_id',
        name: 'orderManageEdit',
        component: OrderManageEdit
    },
    {
        path: '/orderManageDetail/:order_id',
        name: 'orderManageDetail',
        component: OrderManageDetail
    },
]

