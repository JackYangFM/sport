<template>
  <div class="parent">
    <div class="p-container">
      <div class="pc-content">
        <h1 class="pcc-title">尊敬的家长您好，为方便2019年7月1日安排上课，请选择孩子明天上课的时间段，谢谢您的配合！</h1>
        <div class="pcc-choose">
          <div class="">
            zuobian
          </div>
          <div class="pccc-right">
            <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
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
                <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
              </Form-item>
            </i-form>
          </div>
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
      }
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
  .p-container {
    .pc-content {
      .pcc-title {
        font-size: 18px;
      }
      .pcc-choose {
        display: flex;
      }
    }
  }
}
</style>
