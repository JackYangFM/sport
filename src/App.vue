<template>
  <div>
    <router-view v-if="$route.path === '/login'"/>
    <router-view v-else-if="$route.path === '/parentwy' || $route.path === '/parenttbl' || $route.path === '/parenthhl'"/>
    <div class="l-app" v-else>
      <div class="l-header">
        <h1 @click="home" class="logo">利晨体育</h1>
        <Breadcrumb separator=">">
          <BreadcrumbItem>当前位置</BreadcrumbItem>
          <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="l-sider" :style="{ width:menuToggle }">
        <Menu :style="{ width:menuToggle }" :active-name="menuFocus" @on-select="handleFocus" >
          <MenuItem v-for="(item,index) in this.$store.state.index.menu" :key="index" :name="item.menuCode">
            <span @click="handleLink(item.menuPath)">{{item.menuName}}</span>
          </MenuItem>
        </Menu>
      </div>
      <div class="l-content" :style="{ left:menuToggle }">
        <router-view/>
      </div>
      <Select :class="[ campus == true ? 'hide' : 'show' ]" @on-change="changetenement" size="small" placeholder="请选择校区"
              v-model="campusList.campus_id">
        <Option v-for="(item,index) in campusList" :key="item.campus_id + index" :value="item.campus_id">
          {{item.campus_name}}
        </Option>
      </Select>
    </div>

  </div>
</template>
<script>
  import {campusSelect,changeCampus} from "@/service/api"
  import { mapState, mapActions }  from 'vuex'

  export default {
    data() {
      return {
        isCollapsed: false,
        campus: false,
        isRouterAlive: true,
        campusList: [],
        menuFocus: '1'
        // menu: []
      }
    },
    computed: {

      ...mapState(['menu']),

      menuToggle() {
        return this.isCollapsed ? '78px' : '200px';
      },

    },
    methods: {
      handleFocus (name) {
        sessionStorage.setItem('menuStatus', JSON.stringify(name))
      },
      home() {
        this.reset();
        location.href = '/';
      },
      changetenement(obj) {
        changeCampus({campus_id: obj})
          .then(res => {
            this.$Notice.success({title: '更新校区成功!'})
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
      handleLink(route){
        this.$router.push({
          name:route
        })
      }
    },
    created() {
      this.permission()
      this.$store.dispatch('getMenuData') // 刷新的时候实时获取侧边菜单列表
      const menuStatus = JSON.parse(sessionStorage.getItem('menuStatus'))
      if (menuStatus) { // 判空
        this.menuFocus = menuStatus
      } else {
        this.menuFocus = '1'
      }
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
    .hide {
      position: relative;
      top: 20px;
      right: 30px;
      float: right;
      z-index: 999;
      width: 200px;
    }
    .show{
      position: relative;
      top: 20px;
      right: 30px;
      float: right;
      z-index: 999;
      width: 200px;
    }
  }
  .ivu-menu-item, .ivu-menu-submenu-title {
    padding: 0 !important;
    span {
      padding: 14px 24px;
      display: flex;
      justify-content: center;
    }
  }
</style>
