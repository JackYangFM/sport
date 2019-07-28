<template>
    <div>
        <Tips title="员工管理"></Tips>
        <div class="c-query">
            <Form ref="query" :model="formInline" inline>
                <FormItem label="员工名：" prop="staff_name">
                    <Input placeholder="请输入员工姓名（支持模糊查询）" clearable type="text" v-model="formInline.staff_name" :maxlength='20'/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="search">
                        <Icon type="ios-search-strong"></Icon>
                        查询
                    </Button>
                </FormItem>
            </Form>
        </div>
        <div class="c-operation">
            <Button type="primary" @click="add">
                <Icon type="plus-circled"></Icon>
                新增
            </Button>
        </div>
        <BaseTable v-bind="table" ref="basetable"></BaseTable>
    </div>

</template>

<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'


    export default {
        name: "staffManage",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                formInline: {
                    staff_name:'',//员工名字
                },
                table: {
                    mock: false,
                    baseParam: {
                        campus_id: "",
                        staff_name: '',
                    },
                    url: 'staff_manage/select',
                    columns: [
                        {
                            title: '员工',
                            key: 'time_quantum',
                            align: 'center',
                            minWidth: 170
                        },
                        {
                            title: '性别',
                            key: 'personName',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '年龄',
                            key: 'createTime',
                            align: 'center',
                            minWidth: 160
                        },
                        {
                            title: '课时（总课时 | 剩余课时）',
                            key: 'personName',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '成单员工',
                            key: 'personName',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '成交时间',
                            key: 'personName',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width: 140,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color: "#2d8cf0",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchConsume({roomId: params.row.roomId})
                                            }
                                        }
                                    }, '课时消耗'),
                                    h('span', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color: "#2d8cf0",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchDetaile({roomId: params.row.xxid})
                                            }
                                        }
                                    }, '详情'),
                                    h('span', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color: "#2d8cf0",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchUpdate(params.row)
                                            }
                                        }
                                    }, '修改')
                                ]);

                            }
                        }
                    ]
                },
            }
        },
        methods: {
            search() {

            },
            add() {

            }
        }
    }
</script>

<style lang="less">

</style>