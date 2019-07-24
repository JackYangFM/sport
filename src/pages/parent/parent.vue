<template>
  <div class="parent">
    <div class="p-container">
      <div class="pc-content">
        <h1 class="pcc-title">尊敬的家长您好，为方便2019年7月1日安排上课，请选择孩子明天上课的时间段，谢谢您的配合！</h1>
        <div class="pcc-choose">
            <Row>
                <i-col :xs="24" :lg="12">
                    <div class="pccc-left">
                        <ul class="pcccl-ul">
                            <li>
                                <div class="pcccl-name">开课时间：</div>
                                <div class="pcccl-text">
                                    <span>上午：06:00 - 08:00</span>
                                    <span>上午：06:00 - 08:00</span>
                                    <span>上午：06:00 - 08:00</span>
                                    <span>上午：06:00 - 08:00</span>
                                </div>
                            </li>
                            <li>
                                <div class="pcccl-name">上课内容：</div>
                                <div class="pcccl-text">
                                    <span>篮球、实心球、跳绳</span>
                                </div>
                            </li>
                            <li>
                                <div class="pcccl-name">集合地点：</div>
                                <div class="pcccl-text">
                                    <span>北篮球场</span>
                                </div>
                            </li>
                            <li>
                                <div class="pcccl-name">所需器材：</div>
                                <div class="pcccl-text">
                                    <span>篮球、跳绳</span>
                                </div>
                            </li>
                            <li>
                                <div class="pcccl-name">其他：</div>
                                <div class="pcccl-text">
                                    <span>待定</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </i-col>
                <i-col :xs="24" :lg="12">
                    <div class="pccc-right">
                        <i-form :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <Form-item label="姓名" prop="name">
                            <i-input :value.sync="formValidate.name" placeholder="请输入姓名"></i-input>
                        </Form-item>
                        <Form-item label="上课时间" prop="city">
                            <i-select :model.sync="formValidate.city" placeholder="请选择上课时间">
                            <i-option value="beijing">上午：06:00 - 08:00</i-option>
                            <i-option value="shanghai">上午：06:00 - 08:00</i-option>
                            <i-option value="shenzhen">上午：06:00 - 08:00</i-option>
                            </i-select>
                        </Form-item>
                        <Form-item>
                            <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
                            <i-button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
                        </Form-item>
                        </i-form>
                    </div>
                </i-col>
            </Row>
            <i-table :columns="columns1" :data="data1"></i-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        name: '',
        city: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      columns1: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '姓名',
                key: 'name'
            }
        ],
      data1: [
            {
                name: '王小明'
            },
            {
                name: '张小刚'
            },
            {
                name: '李小红'
            },
            {
                name: '周小伟'
            }
        ]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
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
        justify-content:  center;
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
