<template>
  <div class="course-arrangement">
    <Tips title="课程安排"></Tips>
    <div class="c-operation">
      <Button type="primary" @click="plan">编辑课程安排</Button>
      <Button type="primary" @click="parentChoose">家长选课</Button>
    </div>
    <div class="c-query">
      <h3 style="margin: 10px 15px;">{{parseTime(new Date().getTime(), '{y}年{m}月{d}日')}}课程信息：</h3>
      <Form ref="query" :model="formInline" inline label-position="right" :label-width="150">
        <FormItem label="开课时间：" prop="course_content">
          <p v-for="(item,index) of  formInline.make_an_appointment" :key="index">{{item.time_quantum}}</p>
        </FormItem>
        <FormItem label="所需器材：" prop="course_time">
          <p>{{formInline.sports_equipment}} </p>
        </FormItem>
        <FormItem label="上课内容：" prop="other_content">
          <p>{{formInline.course_content}} </p>
        </FormItem>
        <FormItem label="集合地点：" prop="site">
          <p>{{formInline.site}} </p>
        </FormItem>
        <FormItem label="其它：" prop="sports_equipment">
          <p> {{formInline.other_content}} </p>
        </FormItem>
      </Form>
    </div>
    <BaseTable v-bind="table" ref="basetable"></BaseTable>
  </div>

</template>

<script>
  import Tips from '../../components/tips'
  import BaseTable from '../../components/baseTable'
  import {parseTime} from '../../utils/index'
  import {compileInit} from "@/service/courseArrangement"
  
  export default {
    name: "CourseArrangement",
    components: {
      Tips,
      BaseTable
    },
    data() {
      return {
        current: '',
        formInline: {
          course_content: "",
          course_time: "",
          other_content: "",
          site: "",
          sports_equipment: "",
          make_an_appointment: []
        },
        table: {
          mock: false,
          url: 'course_manage/compile_init',
          // baseParam: {campus_id: 1},
          method: 'GET',
          columns: [
            {
              title: '开课时间',
              key: 'time_quantum',
              align: 'center',
              minWidth: 170
            },
            {
              title: '学员人数',
              key: 'personName',
              align: 'center',
              minWidth: 120
            }, {
              title: '学员',
              key: 'createTime',
              align: 'center',
              minWidth: 160
            }]
        },
        
        tableColumns: [],
        tableData: [
          {},
          {},
          {},
          {}
        ]
      }
    },
    methods: {
      parseTime(time, options) {
        return parseTime(time, options)
      },
      plan() {
        this.$router.push({
          name: 'courseArrangementPlan',
        });
      },
      parentChoose() {
        this.$router.push({
          name: 'parent',
        });
      }
      // 初始化表头
      /*columsInit() {
          let timeStr1 = 'timeStr1'
          let startMonth = timeStr1 + '月维护企业数'
          let timeStr2 = 'timeStr2'
          let midMonth = timeStr2 + '月维护企业数'
          let timeStr3 = 'timeStr3'
          let endMonth = timeStr3 + '月维护企业数'
          this.tableColumns.splice(3, 4,
              {
                  title: startMonth,
                  align: 'center',
                  render: (h, params) => {
                      //下面业务逻辑直接不用看
                      // console.log(timeStr1)
                      /!*   let arr = params.row.historyDataListDto || [];
                         let obj = null
                         arr.forEach((item, index) => { //有些人员，有些月份的数据没有
                           if (item.month == timeStr1) {
                             obj = arr[index]
                           }
                         })
                         if (obj) {
                           return h('a', {
                             on: {
                               click: () => {
                                 this.toDetail(params.row.uId, params.row.class2Id, obj.month, obj.month, obj.dirId)
                               }
                             }
                           }, obj.whsNum)
                         } else {
                           return h('span', '--')
                         }
                      *!/
                      //业务逻辑
                  }
              },
              {
                  title: midMonth,
                  align: 'center',
                  render: (h, params) => {

                  }
              },
              {
                  title: endMonth,
                  align: 'center',
                  render: (h, params) => {

                  }
              },
              {
                  title: '平均',
                  align: 'center',
                  key: 'avgNum'
              }
          )
      },*/
    },
    created() {
      // this.columsInit()
      //课程安排初始化
      compileInit().then(res => {
        this.formInline = res
      })
    }
    
  }
</script>

<style lang="less">
  .course-arrangement {
  
  }
</style>
