<template>
    <div>
        <Tips title="员工信息修改"></Tips>
        <div class="c-form f-single">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  style="width: 550px">
                <FormItem label="姓名：" prop="staff_name">
                    <Input clearable v-model="formValidate.staff_name" placeholder="请输入员工名称"/>
                </FormItem>
                <FormItem label="性别：" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="出生日期：" prop="birth">
                    <DatePicker v-model="formValidate.birth" format="yyyy年MM月dd日" type="date" placeholder="请输入员工出生日期"
                                @on-change="changeTime" style="width: 450px;"></DatePicker>
                </FormItem>
                <FormItem label="联系电话：" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入员工联系电话"/>
                </FormItem>
                <FormItem label="职位：" prop="position">
                    <Select v-model="formValidate.position">
                        <Option v-for="(item,index) in positionItems" :key="index" :value="item.position">
                            {{item.position_name}}
                        </Option>
                    </Select>
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
    import {positionSelect} from "@/service/api"
    import {staffIManageUpdateInit, staffIManageUpdate} from "@/service/staff"

    export default {
        name: "staffManageAdd",
        components: {
            Tips,
        },
        data() {
            const phone = (rule, value, callback) => {
                let myreg = /^((0\d{2,3}-\d{7,8})|(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8})$/;
                if (!value) {
                    callback(new Error('请输入手机号'));
                } else if (!myreg.test(value) && value !== '') {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            return {
                positionItems: [],
                formValidate: {
                    staff_name: '',
                    gender: '0',
                    birth: '',
                    phone: '',
                    position: ''
                },
                ruleValidate: {
                    staff_name: [
                        {required: true, message: '请输入员工姓名', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    birth: [
                        {required: true, message: '请输入员工出生日期'}
                    ],
                    phone: [
                        {required: true, validator: phone, type: 'RegExp'},
                    ],
                    position: [
                        {required: true, message: '请选择职位'}
                    ],
                },

            }
        },
        methods: {
            handleSubmit() {
                let startTime1 = this.formValidate.birth
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
                }
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        staffIManageUpdate(this.formValidate).then(res => {
                            if (res !== false) {
                                this.$router.push({name: 'staffManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            },
            changeTime(old) {
                console.log(old)
                this.formValidate.birth = old
            }
        },
        created() {
            //获取职员职位数据
            positionSelect().then((res) => {
                this.positionItems = res
            })
            //修改初始化
            const staff_id = this.$route.params.staff_id
            staffIManageUpdateInit({staff_id: staff_id})
                .then(res => {
                    console.log(2, res)
                    this.formValidate = res
                    this.formValidate.birth = res.birth
                    console.log(3, this.formValidate)

                })
                .catch(err => {
                    this.$Message.error(err);
                })
        }
    }
</script>
