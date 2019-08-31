<template>
    <div>
        <Tips title="支出新增"></Tips>
        <div class="c-form f-single">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  style="width: 550px">
                <FormItem label="支出人员：" prop="staff_name">
                    <Select v-model="formValidate.staff_name">
                        <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_name" label-in-value :lable="item.staff_name">
                            {{item.staff_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="支出金额：" prop="spending_money">
                    <Input clearable v-model="formValidate.spending_money" placeholder="请输入支出金额" @on-keyup="checkNumVal" number/>
                </FormItem>
                <FormItem label="支出时间：" prop="spending_time">
                    <DatePicker v-model="formValidate.spending_time" format="yyyy-MM-dd" type="date" placeholder="请输入支出时间" @on-change="changeTime" style="width: 450px;"></DatePicker>
                </FormItem>
                <FormItem label="支出原因：" prop="spending_cause">
                    <Input v-model="formValidate.spending_cause" placeholder="请输入支出原因"/>
                </FormItem>
                <FormItem label="备注：" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" placeholder="请输入备注信息"/>
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
    import {spendInsert} from "@/service/incomePay"

    export default {
        name: "spendingManageAdd",
        components: {
            Tips,
        },
        data() {
            const money = (rule, value, callback) => {
                if(!value){
                    callback(new Error('请输入金额'));
                }
                else{
                    callback();
                }
            };
            return {
                staffItems: [],
                formValidate: {
                    staff_name: '',
                    spending_money: '',
                    spending_time: '',
                    spending_cause: '',
                    remark: '',
                },
                ruleValidate: {
                    staff_name: [
                        {required: true, message: '请选择支出人员'}
                    ],
                    spending_money: [
                        {required: true,validator:money, message: '请输入支出金额', trigger: 'blur'}
                    ],
                    spending_time: [
                        {required: true, message: '请输入支出时间', trigger: 'blur'}
                    ],
                    spending_cause: [
                        {required: true, message: '请输入支出原因', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        spendInsert(this.formValidate).then(res => {
                            if (res !== false) {
                                this.$router.push({name: 'spendingManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            },
            checkNumVal(){
                const reg =(/[^0-9]/g)
                this.formValidate.spending_money = this.formValidate.spending_money.toString().replace(reg,'')
            },
            changeTime(old){
                this.formValidate.spending_time = old
            }
        },
        created() {
            //获取员工数据
            staffSelect({position:''}).then((res) => {
                this.staffItems = res
            })
        }
    }
</script>
