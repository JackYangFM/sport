<template>
    <div>
        <Tips title="收入新增"></Tips>
        <div class="c-form f-single">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  style="width: 550px">
                <FormItem label="收入类型：" prop="income_type">
                    <Select v-model="formValidate.income_type">
                        <Option v-for="(item,index) in typeItems" :key="index" :value="item.income_type">
                            {{item.income_type_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="人员：" prop="staff_name">
                    <Select v-model="formValidate.staff_name">
                        <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_name" label-in-value :lable="item.staff_name">
                            {{item.staff_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="金额：" prop="income_money">
                    <Input clearable v-model="formValidate.income_money"  @on-keyup="checkNumVal" placeholder="请输入收入金额" number/>
                </FormItem>
                <FormItem label="时间：" prop="income_time">
                    <DatePicker v-model="formValidate.income_time" format="yyyy-MM-dd" type="date" placeholder="请输入收入时间" @on-change="changeTime" style="width: 450px;"></DatePicker>
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
    import {staffSelect,incomeTypeSelect} from "@/service/api"
    import {incomeInsert} from "@/service/incomePay"

    export default {
        name: "incomeManageAdd",
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
                typeItems: [],
                formValidate: {
                    staff_name: '',
                    income_money: '',
                    income_time: '',
                    income_type: '',
                    remark: '',
                },
                ruleValidate: {
                    income_type: [
                        {required: true, message: '请选择收入类型'}
                    ],
                    staff_name: [
                        {required: true, message: '请选择收入人员'}
                    ],
                    income_money: [
                        {required: true, validator:money,trigger: 'blur',type:'number',}
                    ],
                    income_time: [
                        {required: true, message: '请输入收入时间', trigger: 'blur'}
                    ]
                },


            }
        },
        methods: {
            handleSubmit() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        console.log(this.formValidate)
                        incomeInsert(this.formValidate).then(res => {
                            if (res !== false) {
                                this.$router.push({name: 'incomeManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
            },
            checkNumVal(){
                const reg =(/[^0-9]/g)
                this.formValidate.income_money = this.formValidate.income_money.toString().replace(reg,'')
            },
            changeTime(old){
                this.formValidate.income_time = old
            }
        },
        created() {
            //获取员工数据
            staffSelect({position: 0}).then((res) => {
                this.staffItems = res
            })
            incomeTypeSelect().then((res) => {
                this.typeItems = res
            })
        }
    }
</script>
