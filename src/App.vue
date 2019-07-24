<template>
  <div>
    <router-view v-if="$route.path === '/parent'"/>
    <router-view v-else-if="$route.path === '/login'"/>
    <div class="l-app" v-else>
      <div class="l-header">
        <h1 @click="home" class="logo">利晨体育</h1>
        <Breadcrumb separator=">">
          <BreadcrumbItem>当前位置</BreadcrumbItem>
          <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="l-sider" :style="{ width:menuToggle }">
        <Menu :style="{ width:menuToggle }" active-name="1">
          <MenuItem v-for="(item,index) in menu" :key="index" :name="item.menuCode" :to="item.menuPath">
            {{item.menuName}}
          </MenuItem>
        </Menu>
      </div>
      <div class="l-content" :style="{ left:menuToggle }">
        <router-view/>
      </div>
      <Select :class="[ campus == true ? 'hide' : '' ]" @on-change="changetenement" size="small" placeholder="请选择校区"
              v-model="campusList.campus_id">
        <Option v-for="(item,index) in campusList" :key="item.campus_id + index" :value="item.campus_id">
          {{item.campus_name}}
        </Option>
      </Select>
    </div>
  
  </div>
</template>
<script>
  import {campusSelect} from "@/service/api"
  
  export default {
    data() {
      return {
        isCollapsed: false,
        campus: false,
        isRouterAlive: true,
        campusList: [],
        menu: [
          {
            menuCode: "1",
            menuName: '订单管理',
            menuPath: 'orderManage'
          },
          {
            menuCode: "2",
            menuName: '收入支出统计',
            menuPath: 'incomePayManage'
          },
          {
            menuCode: "3",
            menuName: '员工管理',
            menuPath: 'staffManage'
          },
          {
            menuCode: "4",
            menuName: '课程安排',
            menuPath: 'courseArrangement'
          }
        ]
      }
    },
    computed: {
      menuToggle() {
        return this.isCollapsed ? '78px' : '200px';
      }
    },
    methods: {
      home() {
        this.reset();
        location.href = '/';
      },
      //点击三级菜单
      selectItem(data) {
        this.$router.push({
          name: data
        })
      },
      changetenement(obj) {
        updateHirer({campus_id: obj})
          .then(res => {
            this.$Notice.success({title: '更新校区成功!'})
            // location.reload()
            /*this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })*/
          })
          .catch(err => {
            this.$Message.error(err);
          })
      },
      permission() {
        campusSelect()
          .then(res => {
            this.campusList = res
            this.campusList.campus_id = this.campusList.campus_id ? this.campusList.campus_id : res[0].campus_id
            // updateHirer({campus_id:this.campusList.campus_id})
          })
          .catch(err => {
            this.$Message.error(err);
          })
      },
    },
    created() {
      this.permission()
    }
  }
</script>
<style lang="less">
  .l-header {
    background-color: rgba(68, 97, 125, 1);
    line-height: 60px;
    color: #fff;
    
    .ivu-breadcrumb {
      color: #fff;
    }
    
    .ivu-breadcrumb a {
      color: #fff;
    }
    
    .ivu-breadcrumb > span:last-child {
      color: #fff;
    }
  }
  
  .logo {
    width: 220px;
    text-align: center;
    float: left;
  }
  
  .l-app {
    .ivu-select {
      position: relative;
      top: 20px;
      right: 30px;
      float: right;
      z-index: 999;
      width: 200px;
    }
  }
</style>
