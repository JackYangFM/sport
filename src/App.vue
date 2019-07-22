<template>
  <div>
    <router-view v-if="$route.path == '/parent' || 'login'"/>
    
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
    </div>
  
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapsed: false,
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
    },
    created() {
    
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
</style>
