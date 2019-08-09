<template>
    <div>
        <Tips title="学员详情信息"></Tips>
        <div class="c-form ">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  inline>
                <FormItem label="姓名：" prop="student_name">
                    <p>{{formValidate.student_name}}</p>
                </FormItem>
                <FormItem label="校区：" prop="campus_name">
                    <p>{{formValidate.campus_name}}</p>
                </FormItem>
                <FormItem label="性别：" prop="gender">
                    <p>{{formValidate.gender}}</p>
                </FormItem>
                <FormItem label="总课时：" prop="total_course">
                    <p>{{formValidate.total_course}}</p>
                </FormItem>
                <FormItem label="年龄：" prop="birth">
                    <p>{{formValidate.birth}}</p>
                </FormItem>
                <FormItem label="消耗课时：" prop="consume_course">
                    <p>{{formValidate.consume_course}}</p>
                </FormItem>
                <FormItem label="联系电话：" prop="phone">
                    <p>{{formValidate.phone}}</p>
                </FormItem>
                <FormItem label="剩余课时：" prop="surplus">
                    <p>{{formValidate.surplus}}</p>
                </FormItem>
                <FormItem label="年级：" prop="grade">
                    <p>{{formValidate.grade}}</p>
                </FormItem>
                <FormItem label="成交金额：" prop="order_sum">
                    <p>{{formValidate.order_sum}}</p>
                </FormItem>
                <FormItem label="所属学校：" prop="school">
                    <p>{{formValidate.school}}</p>
                </FormItem>
                <FormItem label="成交时间：" prop="order_time">
                    <p>{{formValidate.order_time}}</p>
                </FormItem>
                <FormItem label="备注：" prop="remark">
                    <p>{{formValidate.remark}}</p>
                </FormItem>
                <FormItem label="成交员工：" prop="staff_name">
                    <p>{{formValidate.staff_name}}</p>
                </FormItem>

            </Form>
        </div>
        <Tabs active-key="key1" :animated='false'>
            <Tab-pane label="上课记录" key="key1">
                <BaseTable v-bind="classTable" ref='classTable'></BaseTable>
            </Tab-pane>
        </Tabs>
    </div>
</template>
<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'

    import {details} from "@/service/order"

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
                    grade: '',//年级
                    school:'',//学校
                    campus_name:'',//校区
                    order_sum:'',//成交金额
                    total_course:'',//总课时
                    consume_course:'',//消耗课时
                    surplus:'',//剩余课时
                    order_time:'',//成交时间
                    remark:'',
                    staff_name:'',//成交员工
                },
                ruleValidate: {},
                classTable: {
                    mock: false,
                    url: 'order_manage/class_register',
                    baseParam: {order_id: this.$route.params.order_id},
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
                            title: '上课时间',
                            key: 'course_time',
                            align: 'center',
                            minWidth: 180
                        },
                        {
                            title: '第几次上课',
                            key: 'number',
                            align: 'center',
                            minWidth: 140
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
            const order_id = this.$route.params.order_id
            details({order_id: order_id}).then((res) => {
                this.formValidate = res
            })
        }
    }
</script>
<style lang="less">
    .c-form {
        width: auto;

        .ivu-form-inline .ivu-form-item {
            width: 550px;
        }
    }
</style>
