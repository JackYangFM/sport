<template>
    <div>
        <Tips title="收入支出统计"></Tips>
        <div class="c-query">
            <Form ref="query" :model="formInline" inline>
                <FormItem label="时间：" prop="statistics_time">
                    <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 280px"
                                v-model='formInline.statistics_time'></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="search">
                        <Icon type="ios-search-strong"></Icon>
                        查询
                    </Button>
                </FormItem>
            </Form>
        </div>
        <div class="c-operation">
            <Button type="primary" @click="expend">
                <Icon type="plus-circled"></Icon>
                支出
            </Button>
            <Button type="primary" @click="otherIncome">其它收入</Button>
        </div>
        <BaseTable v-bind="table" ref="basetable"></BaseTable>


    </div>

</template>

<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'

    export default {
        name: "incomePayManage",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                formInline: {
                    statistics_time: ['', ''],
                },
                table: {
                    mock: false,
                    baseParam: {
                        staff_name: '',
                        spending_time: ['', ''],
                    },
                    url: 'serviceManage/spending_manage/select',
                    columns: [
                        {
                            title: '汇总时间',
                            key: 'statistics_time',
                            align: 'center',
                            minWidth: 170
                        },
                        {
                            title: '订单收入（元）',
                            key: 'order_money',
                            align: 'center',
                            minWidth: 160
                        },
                        {
                            title: '订单数量',
                            key: 'order_count',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '其它收入（元）',
                            key: 'income_money',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '其它收入数量',
                            key: 'income_count',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '支出金额',
                            key: 'spending_money',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '支出数量',
                            key: 'spending_count',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '实际总收入（元）',
                            key: 'order_time',
                            align: 'center',
                            minWidth: 120
                        }
                    ]
                },

            }
        },
        methods: {
            search() {
                //处理日期格式
                let startTime1 = this.formInline.statistics_time[0];
                let endTime1 = this.formInline.statistics_time[1];
                if (startTime1 == '') {
                    this.formInline.statistics_time = ['', ''];
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
                        this.formInline.statistics_time = [startTime2, endTime2]
                        this.$refs['basetable'].query(this.formInline); //查询
                    }
                }
            },
            //支出
            expend() {
                this.$router.push({name: 'incomeManage'})
            },
            //其他收入
            otherIncome() {
                this.$router.push({name: 'spendingManage'})
            }
        }
    }
</script>

<style lang="less">

</style>