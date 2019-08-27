<template>
    <div>
        <Tips title="其它收入记录"></Tips>
        <div class="c-query">
            <Form ref="query" :model="formInline" inline>
                <FormItem label="员工名：" prop="income_time">
                    <Input placeholder="请输入员工姓名（支持模糊查询）" clearable type="text" v-model="formInline.staff_name"
                           :maxlength='20'/>
                </FormItem>
                <FormItem label="时间：" prop="income_time">
                    <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 280px"
                                v-model='formInline.income_time'></DatePicker>
                </FormItem>
                <FormItem label="收入类型：" prop="income_type">
                    <Select clearable v-model="formInline.income_type" @on-change="handleChange" label-in-value @on-clear="handleClear">
                        <Option  v-for="(item,index) in typeItems" :key="index" :value="item.income_type" :label="item.income_type_name">
                            {{item.income_type_name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="search">
                        <Icon type="md-search" />
                        查询
                    </Button>
                </FormItem>
            </Form>
        </div>
        <div class="c-operation">
            <Button type="success" @click="add">
                <Icon type="md-add"/>
                新增
            </Button>
        </div>
        <BaseTable v-bind="table" ref="basetable" showTotal></BaseTable>
    </div>

</template>

<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'
    import {incomeTypeSelect} from "@/service/api"
    import {incomeDelete} from "@/service/incomePay"


    export default {
        name: "incomeManage",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                typeItems:[],
                formInline: {
                    staff_name: '',
                    income_time: ['', ''],
                    income_type: ''
                },
                table: {
                    mock: false,
                    baseParam: {
                        staff_name: '',
                        income_time: ['', ''],
                        income_type: ''
                    },
                    url: 'serviceManage/income_manage/select',
                    columns: [
                        {
                            title: '收入人员',
                            key: 'staff_name',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '收入类型',
                            key: 'income_type',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '金额',
                            key: 'income_money',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '收入时间',
                            key: 'income_time',
                            align: 'center',
                            minWidth: 160
                        },
                        {
                            title: '备注',
                            key: 'remark',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width: 160,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            color: "red",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchDel({income_id: params.row.income_id})
                                            }
                                        }
                                    }, '删除')
                                ]);

                            }
                        }
                    ]
                },

            }
        },
        methods: {
            handleChange(obj){
                if(obj){
                    // console.log(obj)

                }else{
                    // console.log('xx',obj)
                    this.$set(this.formInline, 'income_type', '')
                }


            },
            handleClear(){
                // console.log(111,this.formInline.income_type)
                // this.$set(this.formInline, 'income_type', 0)
            },
            search() {
                //处理日期格式
                let startTime1 = this.formInline.income_time[0];
                let endTime1 = this.formInline.income_time[1];
                if (startTime1 == '') {
                    this.formInline.income_time = ['', ''];
                    this.$refs['basetable'].query(this.formInline); //查询
                } else {
                    if (startTime1.toString().indexOf('-') == -1) {
                        let startDate1 = startTime1.getDate();
                        let endDate1 = endTime1.getDate();
                        if (startDate1 < 10) {
                            startDate1 = '0' + startDate1;
                        }
                        if (endDate1 < 10) {
                            endDate1 = '0' + endDate1;
                        }
                        let startMounth1 = startTime1.getMonth() + 1;
                        let endMounth1 = endTime1.getMonth() + 1;
                        if (startMounth1 < 10) {
                            startMounth1 = '0' + startMounth1
                        }
                        if (endMounth1 < 10) {
                            endMounth1 = '0' + endMounth1;
                        }
                        let startTime2 = startTime1.getFullYear() + '-' + startMounth1 + '-' + startDate1;
                        let endTime2 = endTime1.getFullYear() + '-' + endMounth1 + '-' + endDate1;
                        this.formInline.income_time = [startTime2, endTime2]
                        this.$refs['basetable'].query(this.formInline);
                    }
                    this.$refs['basetable'].query(this.formInline);

                }
            },
            //新增
            add() {
                this.$router.push({name: 'incomeManageAdd'})
            },
            //删除
            batchDel(delparams) {
                this.$Modal.confirm({
                    title: '是否继续？',
                    content: '<p>该操作将导致基础数据数据无法恢复，请谨慎操作！</p>',
                    onOk: () => {
                        incomeDelete(delparams)
                            .then(res => {
                                if (res !== false) {
                                    this.$refs['basetable'].query(this.formInline);
                                    this.formInline.staff_name = ''
                                    this.formInline.income_time = ['', '']
                                    this.income_type = ''
                                } else {
                                    this.$refs['basetable'].query(this.formInline);
                                }
                            })
                    },
                    onCancel: () => {
                    }
                });
            },
        },
        created() {
            incomeTypeSelect().then((res) => {
                this.typeItems = res
            })
        }
    }
</script>

<style lang="less">

</style>