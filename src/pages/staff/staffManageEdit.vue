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
                    <Input clearable v-model="formValidate.birth" placeholder="请输入员工出生日期"/>
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
            return {
                positionItems: [],
                spinShow: false,
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
                        {required: true, message: '请输入员工出生日期', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入员工联系方式', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '请选择职位'}
                    ],
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
            //获取职员职位数据
            positionSelect().then((res) => {
                this.positionItems = res
            })
            //修改初始化
            const staff_id = this.$route.params.staff_id
            staffIManageUpdateInit({staff_id: staff_id})
                .then(res => {
                    this.formValidate = res
                })
                .catch(err => {
                    this.$Message.error(err);
                })
        }
    }
</script>
