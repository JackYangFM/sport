<template>
    <div>
        <Tips title="订单新增"></Tips>
        <div class="c-form f-single">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  style="width: 550px">
                <FormItem label="姓名：" prop="student_name">
                    <Input clearable v-model="formValidate.student_name" placeholder="请输入学员名称"/>
                </FormItem>
                <FormItem label="性别：" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="出生日期：" prop="birth">
                    <Input clearable v-model="formValidate.birth" placeholder="请输入学员出生日期"/>
                </FormItem>
                <FormItem label="联系电话：" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入学员联系电话"/>
                </FormItem>
                <FormItem label="年级：" prop="grade">
                    <Input v-model="formValidate.grade" placeholder="请输入学员年级"/>
                </FormItem>
                <FormItem label="所属学校：" prop="school">
                    <Input v-model="formValidate.school" placeholder="请输入学员所属学校"/>
                </FormItem>
                <FormItem label="金额：" prop="orderSum">
                    <Input v-model="formValidate.order_sum" placeholder="请输入成交金额"/>
                </FormItem>
                <FormItem label="总课时：" prop="totalCourse">
                    <Input v-model="formValidate.total_course" placeholder="请输入总课时"/>
                </FormItem>
                <FormItem label="成交员工：" prop="staff_id">
                    <Select v-model="formValidate.staff_id">
                        <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_id">
                            {{item.staff_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="成交时间：" prop="orderTime">
                    <Input v-model="formValidate.order_time" placeholder="请输入成交时间"/>
                </FormItem>
                <FormItem label="备注：" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea"  placeholder="请输入备注信息"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">提交</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import Tips from '../../components/tips'
    import {staffSelect} from "@/service/api"
    import {insert} from "@/service/order"

    export default {
        name: "orderManageAdd",
        components: {
            Tips,
        },
        data() {
            return {
                staffItems: [],
                formValidate: {
                    student_name: '',
                    gender: '0',
                    birth: '',
                    phone: '',
                    grade:'',
                    school:'',
                    order_sum:'',
                    total_course:'',
                    order_time:'',
                    remark:'',
                },
                ruleValidate: {
                    student_name: [
                        {required: true, message: '请输入学员姓名', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    birth: [
                        {required: true, message: '请输入学员出生日期', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入学员联系方式', trigger: 'blur'}
                    ],
                    grade: [
                        {required: true, message: '请输入学员年级', trigger: 'blur'}
                    ],
                    orderSum: [
                        {required: true, message: '请输入成交金额', trigger: 'blur'}
                    ],
                    totalCourse: [
                        {required: true, message: '请输入总课时', trigger: 'blur'}
                    ],
                    staff: [
                        {required: true, message: '请选择成交员工'}
                    ],
                    orderTime: [
                        {required: true, message: '请输入成交时间', trigger: 'blur'}
                    ]
                },

            }
        },
        methods: {
            handleSubmit() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        console.log(this.formValidate)
                        insert(this.formValidate).then(res => {
                            if (res !== false) {
                                this.$router.push({name: 'orderManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            }
        },
        created() {
            //获取成交员工数据
            staffSelect({position:''}).then((res) => {
                this.staffItems = res
            })
        }
    }
</script>
