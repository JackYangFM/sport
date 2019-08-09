<template>
    <div class="staff-manage-datail">
        <Tips title="员工详情信息"></Tips>
        <div class="c-form ">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  inline>
                <FormItem label="姓名：" prop="staff_name">
                    <p>{{formValidate.staff_name}}</p>
                </FormItem>
                <FormItem label="总成交金额：" prop="order_money">
                    <p>{{formValidate.order_money}}</p>
                </FormItem>
                <FormItem label="性别：" prop="gender">
                    <p>{{formValidate.gender}}</p>
                </FormItem>
                <FormItem label="成交订单总数：" prop="order_number">
                    <p>{{formValidate.order_number}}</p>
                </FormItem>
                <FormItem label="出生日期：" prop="birth">
                    <p>{{formValidate.birth}}</p>
                </FormItem>
                <FormItem label="代课总次数：" prop="course_number">
                    <p>{{formValidate.course_number}}</p>
                </FormItem>
                <FormItem label="联系电话：" prop="phone">
                    <p>{{formValidate.phone}}</p>
                </FormItem>
                <FormItem label="职位：" prop="position">
                    <p>{{formValidate.position}}</p>
                </FormItem>
            </Form>
        </div>
        <Tabs active-key="key1" :animated='false'>
            <Tab-pane label="成交订单记录" key="key1">
                <BaseTable v-bind="orderTable" ref='orderTable'></BaseTable>
            </Tab-pane>
            <Tab-pane label="代课记录" key="key2">
                <BaseTable v-bind="agentTable" ref='agentTable'></BaseTable>
            </Tab-pane>
        </Tabs>
    </div>
</template>
<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'

    import {details} from "@/service/staff"

    export default {
        name: "staffManageAdd",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                positionItems: [],
                spinShow: false,
                formValidate: {
                    staff_name: '',
                    gender: '',
                    birth: '',
                    phone: '',
                    position: '',
                    order_number: '',//订单数量
                    order_money: '',//成交金额
                    course_number: ''//代课次数
                },
                ruleValidate: {},
                orderTable: {
                    mock: false,
                    url: 'staff_manage/order_select',
                    baseParam: {staff_id: this.$route.params.staff_id},
                    columns: [
                        {
                            title: '学员名',
                            key: 'student_name',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '所属校区',
                            key: 'campus_name',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '成交金额',
                            key: 'order_sum',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '总课时',
                            key: 'total_course',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '成交时间',
                            key: 'order_time',
                            align: 'center',
                            minWidth: 160
                        },
                        {
                            title: '备注',
                            key: 'remark',
                            align: 'center',
                            minWidth: 160
                        }
                    ]
                },
                agentTable: {
                    mock: false,
                    url: 'staff_manage/record_select',
                    baseParam: {staff_id: this.$route.params.staff_id},
                    columns: [
                        {
                            title: '当节课教练',
                            key: 'coach',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '当节课助教',
                            key: 'teaching_assistant',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '学员人数',
                            key: 'student_number',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '上课时间',
                            key: 'course_time',
                            align: 'center',
                            minWidth: 180
                        }
                    ]
                },


            }
        },
        methods: {
            handleSubmit() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        staffIManageUpdate(this.formValidate).then(res => {
                            this.spinShow = !this.spinShow;
                            if (res !== false) {
                                this.$router.push({name: 'staffManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            }
        },
        created() {
            //获取员工详情数据
            const staff_id = this.$route.params.staff_id
            details({staff_id: staff_id}).then((res) => {
                this.formValidate = res
            })
        }
    }
</script>
<style lang="less">
    .staff-manage-datail {
        .c-form {
            width: auto;

            .ivu-form-inline .ivu-form-item {
                width: 550px;
            }
        }
    }
</style>
