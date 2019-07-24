<template>
  <div class="course-arrangement-plan">
    <Tips title="课程管理"></Tips>
    <div class="c-form f-single">
      <Form class="base-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100"
            style="width: 500px">
        <FormItem label="开课时间：" prop="time_quantum">
          <TimePicker v-for="(item,index) in formValidate.make_an_appointment" :key="index" :value="item.time1"
                      format="HH:mm" type="timerange" placement="bottom-end"
                      :steps="[1, 30]"
                      placeholder="Select time" style="width: 170px;margin: 0 30px 10px 0;"></TimePicker>
          <Button type="dashed" long @click="handleAdd" icon="md-add" style="width: 370px;">增加一项</Button>
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
    methods: {
      handleAdd() {
        this.index++;
        this.formValidate.make_an_appointment.push({
          order: '',
          time_quantum: '',
          index: this.index
        });
      },
      handleSubmit() {
      
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
