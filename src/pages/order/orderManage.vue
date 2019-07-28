<template>
    <div>
        <Tips title="订单管理"></Tips>
        <div class="c-query">
            <Form ref="query" :model="formInline" inline>
                <FormItem label="学员名：" prop="roomId">
                    <Input placeholder="请输入学员姓名（支持模糊查询）" clearable type="text" v-model="formInline" :maxlength='20'/>
                </FormItem>
                <FormItem label="员工名：" prop="roomId">
                    <Input placeholder="请输入员工名（支持模糊查询）" clearable type="text" v-model="formInline" :maxlength='20'/>
                </FormItem>
                <FormItem label="时间：" prop="roomId">
                    <DatePicker type="datetime" placeholder="请选择日期" style="width: 200px"></DatePicker>
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
            <Button type="primary" @click="consume">课时消耗</Button>
        </div>
        <BaseTable v-bind="table" ref="basetable"></BaseTable>

    </div>

</template>

<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'


    export default {
        name: "home",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                formInline: {},
                table: {
                    mock: false,
                    url: '',
                    columns: [
                        {
                            title: '学员名',
                            key: 'time_quantum',
                            align: 'center',
                            minWidth: 170
                        },
                        {
                            title: '年级',
                            key: 'personName',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '课程类型',
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
            add() {

            },
            //课时消耗
            consume() {

            },
            //每条课时消耗
            batchConsume(){

            },
            //详情
            batchDetaile(){

            },
            //修改
            batchUpdate(){

            }
        }
    }
</script>

<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>