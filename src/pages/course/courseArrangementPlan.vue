<template>
    <div class="course-arrangement-plan">
        <Tips title="课程管理"></Tips>
        <div class="c-form f-single">
            <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
                  style="width: 500px">
                <FormItem label="开课时间：" prop="time_quantum">
                    <Row>
                        <Col span="12">
                            <TimePicker :value="time2" format="HH:mm" type="timerange" placement="bottom-end" :steps="[1, 30]"
                                        placeholder="Select time" style="width: 168px"></TimePicker>
                        </Col>
                        <Col span="12">
                            <TimePicker :value="time2" format="HH点mm分" type="timerange" placement="bottom-end"
                                        placeholder="Select time" style="width: 168px"></TimePicker>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <TimePicker :value="time2" format="HH点mm分" type="timerange" placement="bottom-end"
                                        placeholder="Select time" style="width: 168px"></TimePicker>
                        </Col>
                        <Col span="12">
                            <TimePicker :value="time2" format="HH点mm分" type="timerange" placement="bottom-end"
                                        placeholder="Select time" style="width: 168px"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="集合地点：" prop="site">
                    <Input clearable v-model="formValidate.site" placeholder="请输入集合地点"/>
                </FormItem>
                <FormItem label="上课内容：" prop="course_content">
                    <Input clearable v-model="formValidate.course_content" placeholder="请输入上课内容"/>
                </FormItem>
                <FormItem label="所需器材：" prop="sports_equipment">
                    <Input clearable v-model="formValidate.sports_equipment" placeholder="请输入所需器材"/>
                </FormItem>
                <FormItem label="其他：" prop="other_content">
                    <Input v-model="formValidate.other_content" type="textarea" placeholder=""/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="">提交</Button>
                </FormItem>
            </Form>
        </div>
    </div>

</template>

<script>
    import Tips from '../../components/tips'

    import {compileInit} from "@/service/courseArrangement"

    export default {
        name: "CourseArrangement",
        components: {
            Tips,
        },
        data() {
            return {
                time1: '09:41:00',
                time2: ['09:41', '12:00'],
                formValidate: {
                    course_content: "",
                    course_time: "",
                    other_content: "",
                    site: "",
                    sports_equipment: "",
                    make_an_appointment: [],
                    time_quantum: '',
                    time1: '',
                    time2: '',
                    time3: '',
                    time4: ''
                },
                ruleValidate: {
                    site: [
                        {required: true, message: '请输入集合地点', trigger: 'blur'}
                    ],
                    course_content: [
                        {required: true, message: '请输入上课内容', trigger: 'blur'}
                    ],
                    sports_equipment: [
                        {required: true, message: '请输入所需器材', trigger: 'blur'}
                    ],
                    sports_equipment: [
                        {required: true, message: '请输入集合地点', trigger: 'blur'}
                    ],
                },

            }
        },
        methods: {},
        created() {
            //课程安排初始化
            compileInit().then(res => {
                this.formValidate = res
                console.log(this.formValidate.make_an_appointment)
                this.formValidate.make_an_appointment.forEach((item) => {
                    console.log(item)
                    if (item.order === 1) {
                        this.formValidate.time1 = item.time_quantum
                    } else if (item.order === 2) {
                        this.formValidate.time2 = item.time_quantum
                    } else if (item.order === 3) {
                        this.formValidate.time3 = item.time_quantum
                    } else if (item.order === 4) {
                        this.formValidate.time4 = item.time_quantum
                    }
                })
            })
        }

    }
</script>

<style lang="less">
    .course-arrangement-plan {

    }
</style>