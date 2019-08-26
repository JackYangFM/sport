<template>
  <div class="course-arrangement-plan">
    <Tips title="课程管理"></Tips>
    <div class="c-form f-single">
      <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
            style="width: 550px">
        <FormItem label="开课时间：" prop="time_quantum">
          <span v-for="(item,index) in formValidate.make_an_appointment" :key="index" >
            {{item.order}}：
            <TimePicker :value="item.time_quantum"
            format="HH:mm" type="timerange" placement="bottom-end"
            :steps="[1, 30]"
            placeholder="请选择时间" style="width: 170px;margin: 0 30px 10px 0;"></TimePicker>
          </span>

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
          <Button type="primary" @click="handleSubmit">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>

</template>

<script>
  import Tips from '../../components/tips'
  
  import {compileInit, compile} from "@/service/courseArrangement"
  
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
        },
        ruleValidate: {
          // time_quantum:[
          //   {required: true, message: '请选择开课时间'}
          // ],
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
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
            if(valid){
              compile(this.formValidate).then(res => {
                this.$router.push({
                  name: 'courseArrangement',
                });
              })
            }
        })
      }
    },
    created() {
      //课程安排初始化
      compileInit().then(res => {
        this.formValidate = res
      })
    }
    
  }
</script>

<style lang="less">
  .course-arrangement-plan {
  
  }
</style>
