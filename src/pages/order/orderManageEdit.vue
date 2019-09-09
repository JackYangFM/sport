<template>
    <div>
        <Tips title="订单修改"></Tips>
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
                <FormItem label="金额：" prop="order_sum">
                    <Input clearable v-model="formValidate.order_sum" placeholder="请输入成交金额" @on-keyup="checkNumVal" number/>
                </FormItem>
                <FormItem label="总课时：" prop="total_course">
                    <Input v-model="formValidate.total_course" placeholder="请输入总课时"/>
                </FormItem>
                <FormItem label="成交员工：" prop="staff_id">
                    <Select v-model="formValidate.staff_id">
                        <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_id">
                            {{item.staff_name}}
                        </Option>
                    </Select>
                </FormItem>
                <!--<FormItem label="出生日期：" prop="birth">
                    <DatePicker v-model="formValidate.birth" format="yyyy年MM月dd日" type="date" placeholder="请输入学员出生日期" @on-change="changeTime" style="width: 450px;"></DatePicker>
                </FormItem>-->
                <FormItem label="联系电话：" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入学员联系电话"/>
                </FormItem>
                <FormItem label="年级：" prop="grade">
                    <Input v-model="formValidate.grade" placeholder="请输入学员年级"/>
                </FormItem>
                <FormItem label="所属学校：" prop="school">
                    <Input v-model="formValidate.school" placeholder="请输入学员所属学校"/>
                </FormItem>

                <FormItem label="成交时间：" prop="order_time">
                    <Input v-model="formValidate.order_time" placeholder="请输入成交时间" disabled/>
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
    import {updateInit,update} from "@/service/order"

    export default {
        name: "orderManageEdit",
        components: {
            Tips,
        },
        data() {
            const money = (rule, value, callback) => {
                if(!value){
                    callback(new Error('请输入成交金额'));
                }
                else{
                    callback();
                }
            };
            const phone = (rule, value, callback) => {
                let myreg=/^((0\d{2,3}-\d{7,8})|(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8})$/;
                if(!value){
                    callback(new Error('请输入学员联系方式'));
                }
                else if (!myreg.test(value)&&value!=='') {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            return {
                staffItems: [],
                spinShow: false,
                formValidate: {
                    student_name: '',
                    gender: '0',
                    // birth: '',
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
                    /*birth: [
                        {required: true, message: '请输入学员出生日期', trigger: 'blur'}
                    ],*/
                    // phone: [
                    //     { required: true,validator:phone,type:'RegExp' },
                    // ],
                    // grade: [
                    //     {required: true, message: '请输入学员年级', trigger: 'blur'}
                    // ],
                    order_sum: [
                        {required: true,validator:money,trigger: 'blur',type:'number',}
                    ],
                    total_course: [
                        {required: true, message: '请输入总课时', trigger: 'blur'}
                    ],
                    staff_id: [
                        {required: true, message: '请选择成交员工'}
                    ],
                    // order_time: [
                    //     {required: true, message: '请输入成交时间', trigger: 'blur'}
                    // ]
                },

            }
        },
        methods: {
            handleSubmit() {
                /*let startTime1 = this.formValidate.birth
                if (startTime1.toString().indexOf('-') == -1) {
                    let startDate1 = startTime1.getDate();
                    if (startDate1 < 10) {
                        startDate1 = '0' + startDate1;
                    }
                    let startMounth1 = startTime1.getMonth() + 1;
                    if (startMounth1 < 10) {
                        startMounth1 = '0' + startMounth1
                    }
                    let startTime2 = startTime1.getFullYear() + '年' + startMounth1 + '月' + startDate1 + '日';
                    this.formValidate.birth = startTime2
                }*/
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        update(this.formValidate).then(res => {
                            if (res !== false) {
                                this.$router.push({name: 'orderManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            },
            /*changeTime(old){
                this.formValidate.birth = old
            },*/
            checkNumVal(){
                const reg =(/[^0-9]/g)
                this.formValidate.order_sum = this.formValidate.order_sum.toString().replace(reg,'')
            },
        },
        created() {
            //获取成交员工数据
            staffSelect({position:''}).then((res) => {
                this.staffItems = res
            })
            //修改初始化
            const order_id = this.$route.params.order_id
            updateInit({order_id: order_id})
                .then(res => {
                    this.formValidate = res
                })
                .catch(err => {
                    this.$Message.error(err);
                })
        },

    }
</script>
