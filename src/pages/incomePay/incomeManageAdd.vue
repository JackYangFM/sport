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
                <FormItem label="人员：" prop="staff_id">
                    <Select v-model="formValidate.staff_id">
                        <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_id">
                            {{item.staff_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="金额：" prop="income_money">
                    <Input clearable v-model="formValidate.income_money" placeholder="请输入收入金额"/>
                </FormItem>
                <FormItem label="时间：" prop="income_time">
                    <Input v-model="formValidate.income_time" placeholder="请输入收入时间"/>
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
                    staff_id: [
                        {required: true, message: '请选择收入人员'}
                    ],
                    income_money: [
                        {required: true, message: '请输入收入金额', trigger: 'blur'}
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
                        incomeInsert(this.formValidate).then(res => {
                            if (res !== false) {
                                this.$router.push({name: 'incomeManage'})
                            }
                        })
                    }
                }).catch(err => {
                    this.$Message.error(err);
                })
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
