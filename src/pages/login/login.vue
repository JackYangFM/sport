<template>
  <div class="login">
    <div class="l-header">
      <h1 @click="home" class="logo">利晨体育</h1>
    </div>
    <div class="l-container">
      <img class="lc-logo" src="../../assets/images/logo.png" width="240">
      <div class="lc-input">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user_name">
            <Input type="text" v-model="formInline.user_name" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Checkbox v-model="checked">记住密码</Checkbox>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import {login} from "@/service/api"
  
  export default {
    data() {
      let userNamePattern = /^[a-zA-Z]+$/;
      const user_name = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        } else if (!userNamePattern.test(value)) {
          callback(new Error('请输入大写或小写英文字母'));
        } else {
          callback();
        }
      };
      
      return {
        formInline: {
          user_name: '',
          password: ''
        },
        ruleInline: {
          user_name: [
            {required: true, validator: user_name, trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        },
        checked: false
      }
    },
    mounted() {
      this.getCookie()
    },
    methods: {
      home() {
        this.reset();
        location.href = '/';
      },
      handleSubmit(name, formName) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            //判断复选框是否被勾选 勾选则调用配置cookie方法
            if (this.checked === true) {
              //传入账号名，密码，和保存天数3个参数
              this.setCookie(this.formInline.user_name, this.formInline.password, 7);
            } else {
              //清空Cookie
              this.clearCookie();
            }
            // console.log("登陆成功");
            login(this.formInline).then((res)=>{
              this.$router.push({
                name: 'courseArrangementPlan',
              });
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //设置cookie
      setCookie (c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      getCookie () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          console.log(arr)
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.formInline.user_name = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.formInline.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    }
  }
</script>
<style lang="less">
  .l-container {
    background: url("../../assets/images/bg.png");
    background-size: center;
    background-repeat: no-repeat;
    height: 100vh;
    padding-top: 60px;
    
    .lc-logo {
      padding-top: 55px;
      padding-left: 41px;
    }
    
    .lc-input {
      background: rgba(255, 255, 255, .5);
      width: 350px;
      height: 350px;
      position: absolute;
      right: 100px;
      top: 223px;
      padding: 60px 30px 30px;
      
      .ivu-form-item {
        margin-bottom: 40px;
      }
    }
  }
</style>
