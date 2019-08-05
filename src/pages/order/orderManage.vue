<template>
    <div>
        <Tips title="订单管理"></Tips>
        <div class="c-query">
            <Form ref="query" :model="formInline" inline>
                <FormItem label="学员名：" prop="student_name">
                    <Input placeholder="请输入学员姓名（支持模糊查询）" clearable type="text" v-model="formInline.student_name"
                           :maxlength='20'/>
                </FormItem>
                <FormItem label="员工名：" prop="staff_name">
                    <Input placeholder="请输入员工名（支持模糊查询）" clearable type="text" v-model="formInline.staff_name"
                           :maxlength='20'/>
                </FormItem>
                <FormItem label="时间：" prop="order_time">
                    <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 280px"
                                v-model='formInline.order_time'></DatePicker>
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
            <Button type="primary" @click="add">
                <Icon type="plus-circled"></Icon>
                新增
            </Button>
            <Button type="primary" @click="consume">课时消耗</Button>
        </div>
        <BaseTable v-bind="table" ref="basetable"></BaseTable>

    </div>

</template>

<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'


    export default {
        name: "home",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                formInline: {
                    staff_name: '',
                    order_time: ['', ''],
                    student_name: ''
                },
                table: {
                    mock: false,
                    baseParam: {
                        staff_name: '',
                        order_time: '',
                        student_name: ''
                    },
                    url: 'order_manage/select',
                    columns: [
                        {
                            title: '学员名',
                            key: 'student_name',
                            align: 'center',
                            minWidth: 170
                        },
                        {
                            title: '性别',
                            key: 'gender',
                            align: 'center',
                            minWidth: 160
                        },
                        {
                            title: '年级',
                            key: 'personName',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '课时（总课时 | 剩余课时）',
                            key: 'course',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '成单员工',
                            key: 'staff_name',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '成交时间',
                            key: 'order_time',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width: 140,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color: "#2d8cf0",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchConsume({roomId: params.row.roomId})
                                            }
                                        }
                                    }, '课时消耗'),
                                    h('span', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color: "#2d8cf0",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchDetaile({order_id: params.row.order_id})
                                            }
                                        }
                                    }, '详情'),
                                    h('span', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            color: "#2d8cf0",
                                            cursor: "pointer"
                                        },
                                        on: {
                                            click: () => {
                                                this.batchUpdate(params.row)
                                            }
                                        }
                                    }, '修改')
                                ]);

                            }
                        }
                    ]
                },
            }
        },
        methods: {
            add() {
                this.$router.push({name: 'orderManageAdd'})
            },
            //课时消耗
            consume() {

            },
            //每条课时消耗
            batchConsume() {

            },
            //详情
            batchDetaile() {

            },
            //修改
            batchUpdate() {

            },
            search() {
                //处理日期格式
                let startTime1=this.formInline.importDateRange[0];
                let endTime1=this.formInline.importDateRange[1];
                if(startTime1==''){
                    this.formInline.importDateRange=['',''];
                    this.$refs['basetable'].query(this.formInline); //查询
                }
                else {
                    if (startTime1.toString().indexOf('-') == -1) {
                        let startDate1=startTime1.getDate();
                        let endDate1=endTime1.getDate();
                        if(startDate1<10){
                            startDate1='0'+startDate1;
                        }
                        if(endDate1<10){
                            endDate1='0'+endDate1;
                        }
                        let startMounth1=startTime1.getMonth() + 1;
                        let endMounth1=endTime1.getMonth() + 1;
                        if(startMounth1<10){
                            startMounth1='0'+startMounth1
                        }
                        if(endMounth1<10){
                            endMounth1='0'+endMounth1;
                        }
                        let startTime2 = startTime1.getFullYear() + '-' + startMounth1+ '-' + startDate1;
                        let endTime2 = endTime1.getFullYear() + '-' + endMounth1 + '-' + endDate1;
                        this.formInline.importDateRange = [startTime2, endTime2]
                        this.$refs['basetable'].query(this.formInline); //查询
                    }
                }
            },
        }
    }
</script>

<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>