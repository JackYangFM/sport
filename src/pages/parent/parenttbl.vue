<template>
  <div class="parent">
    <div class="p-container">
      <div class="pc-content">
        <h1 class="pcc-title">尊敬的家长您好，为方便{{parentDataTbl.course_time}}安排上课，请选择孩子明天上课的时间段，谢谢您的配合！</h1>
        <div class="pcc-choose">
          <Row>
            <i-col :xs="24" :lg="12">
              <div class="pccc-left">
                <ul class="pcccl-ul">
                  <li>
                    <div class="pcccl-name">开课时间：</div>
                    <div class="pcccl-text" v-for="(item,index) in parentDataTbl.rows" :key="index">
                      <span>{{item.time_quantum[0]}} - {{item.time_quantum[1]}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="pcccl-name">上课内容：</div>
                    <div class="pcccl-text">
                      <span>{{parentDataTbl.course_content}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="pcccl-name">集合地点：</div>
                    <div class="pcccl-text">
                      <span>{{parentDataTbl.site}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="pcccl-name">所需器材：</div>
                    <div class="pcccl-text">
                      <span>{{parentDataTbl.sports_equipment}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="pcccl-name">其他：</div>
                    <div class="pcccl-text">
                      <span>{{parentDataTbl.other_content}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </i-col>
            <i-col :xs="24" :lg="12">
              <div class="pccc-right">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                  <FormItem label="姓名" prop="student_name">
                    <Input v-model="formValidate.student_name" placeholder="请输入姓名"></Input>
                  </FormItem>
                  <FormItem label="上课时间" prop="order">
                    <Select v-model="formValidate.order" placeholder="请选择上课时间">
                      <Option v-for="(item,index) in courseTime" :key="index" :value="item.order">
                        {{item.time_quantum[0] + '-' + item.time_quantum[1]}}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="handleSubmit">提交</Button>
                    <Button type="primary" @click="handleReset" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </Form>
              </div>
            </i-col>
          </Row>
          <BaseTable v-bind="table" ref="basetable"></BaseTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BaseTable from '../../components/baseTable'
  import {TongBaiLuSelect, studentInsert} from "@/service/parent"
  import {courseTimeSelect} from "@/service/api"
  
  export default {
    name: 'parent',
    components: {
      BaseTable
    },
    data() {
      return {
        formValidate: {
          campus_id: 1,
          student_name: '',
          order: ''
        },
        ruleValidate: {
          student_name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          order: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ]
        },
        table: {
          mock: false,
          url: 'course_manage/TongBaiLu_select',
          // baseParam: {campus_id: 1},
          method: 'GET',
          columns: [
            {
              title: '开课时间',
              key: 'time_quantum',
              align: 'center',
              render: (h, params) => {
                return h('span', {}, params.row.time_quantum[0] + '-' + params.row.time_quantum[1]
                );
              }
            },
            {
              title: '学员人数',
              key: 'student_number',
              align: 'center'
            }, {
              title: '学员',
              key: 'students',
              align: 'center',
            }]
        },
        parentDataTbl: {}, // 某个校区数据
        courseTime: {} // 课程时间
      }
    },
    created() {
      courseTimeSelect({'campus_id': 1}).then((res) => {
        this.courseTime = res
      })
      
      TongBaiLuSelect().then((res) => {
        this.parentDataTbl = res
      })
    },
    methods: {
      handleSubmit() {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            studentInsert().then(res => {
              this.$Message.success('提交成功!')
            })
          }
        })
      },
      handleReset() {
        this.$refs['formValidate'].resetFields()
      }
    }
  }
</script>

<style lang="less">
  .parent {
    width: 100%;
    padding: 20px;
    
    .p-container {
      .pc-content {
        .pcc-title {
          font-size: 18px;
          display: flex;
          justify-content: center;
        }
        
        .pcc-choose {
          width: 100%;
          padding-top: 20px;
          
          .pccc-left {
            display: flex;
            font-size: 16px;
            justify-content: center;
            padding-bottom: 20px;
            
            .pcccl-ul {
              li {
                display: flex;
                
                .pcccl-name {
                  width: 100px;
                  text-align: right;
                }
                
                .pcccl-text {
                  display: flex;
                  flex-direction: column;
                }
              }
            }
          }
          
          .pccc-right {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
