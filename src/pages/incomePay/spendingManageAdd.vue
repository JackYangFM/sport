<template>
    <div>
        <Tips title="支出新增"></Tips>
        <div class="c-form f-single">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  style="width: 550px">
                <FormItem label="支出人员：" prop="staff_id">
                    <Select v-model="formValidate.staff_id">
                        <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_id">
                            {{item.staff_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="支出金额：" prop="spending_money">
                    <Input clearable v-model="formValidate.spending_money" placeholder="请输入支出金额"/>
                </FormItem>
                <FormItem label="支出时间：" prop="spending_time">
                    <Input v-model="formValidate.spending_time" placeholder="请输入支出时间"/>
                </FormItem>
                <FormItem label="支出原因：" prop="spending_cause">
                    <Input v-model="formValidate.spending_cause" placeholder="请输入支出原因"/>
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
    import {spendInsert} from "@/service/incomePay"

    export default {
        name: "orderManageAdd",
        components: {
            Tips,
        },
        data() {
            return {
                staffItems: [],
                formValidate: {
                    staff_name: '',
                    spending_money: '',
                    spending_time:'',
                    spending_cause:'',
                    remark:'',
                },
                ruleValidate: {
                    staff_id: [
                        {required: true, message: '请选择支出人员'}
                    ],
                    spending_money: [
                        {required: true, message: '请输入支出金额', trigger: 'blur'}
                    ],
                    spending_time: [
                        {required: true, message: '请输入支出时间', trigger: 'blur'}
                    ],
                    spending_cause: [
                        {required: true, message: '请输入支出原因', trigger: 'blur'}
                    ]
                },

            }
        },
        methods: {
            handleSubmit() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        spendInsert(this.formValidate).then(res => {
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
            //获取成交员工数据
            staffSelect({position:0}).then((res) => {
                this.staffItems = res
            })
        }
    }
</script>
