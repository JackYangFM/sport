<template>
    <div class="order-manage">
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
                        <Icon type="md-search"/>
                        查询
                    </Button>
                </FormItem>
            </Form>
        </div>
        <div class="c-operation">
            <Button v-if="showBtn" type="success" @click="add">
                <Icon type="md-add"/>
                新增
            </Button>
            <Button type="primary" @click="consume">课时消耗</Button>
        </div>
        <BaseTable v-bind="table" ref="basetable" @selectionChange="getTableSelection" showTotal></BaseTable>
        <Modal
                v-model="modal1"
                width="500px"
                class-name="c-modal"
                title="课时消耗"
                @on-ok="ok"
        >
            <div class="c-form order-manage-modal-form" style="padding:12px 0; margin: 0">
                <Form ref="formValidate" :model="detailItems" :rules="ruleValidate" inline>
                    <FormItem label="上课时间：" prop="order">
                        <span style="width: 40%;float:left; margin-right: 10px;">{{parseTime(new Date().getTime(), '{y}年{m}月{d}日')}}</span>

                        <Select style="width: 50%;" v-model="detailItems.order" placeholder="请选择上课时间" label-in-value
                                @on-change="changeOption">
                            <Option v-for="(item,index) in courseTime" :key="index" :value="item.order">
                                {{item.time_quantum[0] + '-' + item.time_quantum[1]}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="代课教练：" prop="one_staff_id">
                        <Select v-model="detailItems.one_staff_id">
                            <Option v-for="(item,index) in staffItems" :key="index" :value="item.staff_id">
                                {{item.staff_name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="助教：">
                        <Select v-model="detailItems.two_staff_id">
                            <Option v-for="(item,index) in assistantItems" :key="index" :value="item.staff_id">
                                {{item.staff_name}}
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button ghost>取消</Button>
                <Button type="primary" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
    import Tips from '../../components/tips'
    import BaseTable from '../../components/baseTable'
    import {courseTimeSelect, staffSelect} from "@/service/api"
    import {consumeCourse} from "@/service/order"


    import {parseTime} from '../../utils/index'

    let c;

    export default {
        name: "home",
        components: {
            Tips,
            BaseTable
        },
        data() {
            return {
                showBtn: true,
                modal1: false,
                staffItems: [],//教练
                assistantItems: [],//助教
                courseTime: {}, // 课程时间
                formInline: {
                    staff_name: '',
                    order_time: ['', ''],
                    student_name: ''
                },
                detailItems: {
                    order: '',
                    order_ids: [],
                    course_time: '',
                    one_staff_id: '',
                    two_staff_id: ''
                },
                selection: [],
                table: {
                    mock: false,
                    baseParam: {
                        staff_name: '',
                        order_time: ['', ''],
                        student_name: ''
                    },
                    url: 'serviceManage/order_manage/select',
                    columns: [
                        {
                            type: 'selection',
                            align: 'center',
                            minWidth: 50
                        },
                        {
                            title: '学员名',
                            key: 'student_name',
                            align: 'center',
                            minWidth: 140
                        },
                        {
                            title: '性别',
                            key: 'gender',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '年级',
                            key: 'grade',
                            align: 'center',
                            minWidth: 120
                        },
                        {
                            title: '课时（总课时 | 剩余课时）',
                            key: 'course',
                            align: 'center',
                            minWidth: 180
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
                            minWidth: 180
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width: 180,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }
                                }, [
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
                                                this.batchConsume(params.row.order_id)
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
                                                this.batchDetaile(params.row)
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
                                            cursor: "pointer",
                                            display: this.showBtn ? 'block' : 'none'
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
                ruleValidate: {
                    order: [
                        {required: true, message: '请选择时间'}
                    ],
                    one_staff_id: [
                        {required: true, message: '请选择代课教练'}
                    ]
                },
            }
        },
        methods: {
            parseTime(time, options) {
                return parseTime(time, options)
            },
            getTableSelection(selection) {
                this.selection = selection
            },
            add() {
                this.$router.push({name: 'orderManageAdd'})
            },
            //课时消耗
            consume() {
                if (this.selection.length >= 1) {
                    const order_ids = this.selection.map((item) => {
                        return item.order_id
                    })
                    this.modal1 = true;
                    this.detailItems.order_ids = order_ids
                } else {
                    this.$Message.error('请至少选择一项')
                }

            },
            //每条课时消耗
            batchConsume(params) {
                this.modal1 = true;
                this.detailItems.order_ids = []
                this.detailItems.order_ids.push(params)
            },
            //详情
            batchDetaile(params) {
                this.$router.push({
                    name: 'orderManageDetail',
                    params: {
                        order_id: params.order_id
                    }
                })
            },
            //修改
            batchUpdate(params) {
                this.$router.push({
                    name: 'orderManageEdit',
                    params: {
                        order_id: params.order_id
                    }
                })
            },
            search() {
                //处理日期格式
                let startTime1 = this.formInline.order_time[0];
                let endTime1 = this.formInline.order_time[1];
                if (startTime1 == '') {
                    this.formInline.order_time = ['', ''];
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
                        this.formInline.order_time = [startTime2, endTime2]
                        this.$refs['basetable'].query(this.formInline); //查询
                    }
                }
            },
            changeOption(item) {
                c = item.label.replace(/\s+/g, '')
            },
            ok() {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        this.modal1 = false
                        let n = parseTime(new Date().getTime(), '{y}年{m}月{d}日')
                        this.detailItems.course_time = n + ' ' + c
                        consumeCourse(this.detailItems).then(res => {
                            if (res !== false) {
                                this.selection.length = 0
                                this.$refs['basetable'].query(this.formInline);
                                return
                            }
                        })
                    } else {
                        return
                    }
                })
            }
        },
        created() {
            courseTimeSelect().then((res) => {
                this.courseTime = res

            })
            staffSelect({position: 0}).then((res) => {
                this.staffItems = res

            })
            staffSelect({position: 2}).then((res) => {
                this.assistantItems = res
            })
            if (JSON.parse(localStorage.getItem('menu')).length == 1 && JSON.parse(localStorage.getItem('menu'))[0].menuName == "订单管理") {
                this.showBtn = false
            }
        }
    }
</script>

<style lang="less">
    .order-manage-modal-form {
        width: auto;

        .ivu-form-inline .ivu-form-item {
            width: 100% !important;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>