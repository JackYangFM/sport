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
    import {staffIManageDelete} from "@/service/staff"


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
                            key: 'staff_name',
                            align: 'center',
                            minWidth: 170
                        },
                        {
                            title: '性别',
                            key: 'gender',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '年龄',
                            key: 'birth',
                            align: 'center',
                            minWidth: 160
                        },
                        {
                            title: '职位',
                            key: 'position',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '联系电话',
                            key: 'phone',
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
                                                this.batchDetaile(params.row)
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
                                    }, '修改'),
                                h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: "red",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: () => {
                                            this.batchDel({staff_id: params.row.staff_id})
                                        }
                                    }
                                }, '删除'),
                                ]);

                            }
                        }
                    ]
                },
            }
        },
        methods: {
            search() {
                this.$refs['basetable'].query(this.formInline);
            },
            add() {
                this.$router.push({
                    name: 'StaffManageAdd',
                });
            },
            batchUpdate(params){
                this.$router.push({
                    name: 'StaffManageEdit',
                    params: {
                        staff_id: params.staff_id
                    }
                });
            },
            batchDel(delparams){
                this.$Modal.confirm({
                    title: '是否继续？',
                    content: '<p>该操作将导致基础数据数据无法恢复，请谨慎操作！</p>',
                    onOk: () => {
                        this.spinShow = !this.spinShow;
                        staffIManageDelete(delparams)
                            .then(res=>{
                                this.spinShow = !this.spinShow;
                                if(res!==false){
                                    this.$refs['basetable'].query(this.formInline);
                                    this.formInline.roomName = ''
                                }else{
                                    this.$refs['basetable'].query(this.formInline);
                                }
                            })
                    },
                    onCancel: () => { }
                });
            },
            //详情
            batchDetaile(params){
                this.$router.push({
                    name: 'StaffManageDetail',
                    params: {
                        staff_id: params.staff_id
                    }
                });
            }
        }
    }
</script>

<style lang="less">

</style>