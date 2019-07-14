<template>
    <div>
        <router-view v-if="$route.path == '/parent'"/>
        <div class="l-app" v-else>
            <div class="l-header">
                <h1 @click="home" class="logo">利晨体育</h1>
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/">Home</BreadcrumbItem>
                    <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
                    <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <!--            <Crumbs :step="getCrumbs" :style="{ paddingLeft:menuToggle }"></Crumbs>-->
            <div class="l-sider" :style="{ width:menuToggle }">
                <Menu :style="{ width:menuToggle }">
                    <MenuItem name="1">订单管理</MenuItem>
                    <MenuItem name="2">收入支出统计</MenuItem>
                    <MenuItem name="3">员工管理</MenuItem>
                    <MenuItem name="4">课程安排</MenuItem>
                </Menu>
                <!--<Sider :width="200" ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <div class="u-toggle">
                        <Icon :class="rotateIcon" @click.native="collapsedSider" type="navicon-round" :size="20"></Icon>
                    </div>
                    &lt;!&ndash;<Menu
                            :accordion="true"
                            :open-names="[getOpenName]"
                            :active-name="getActiveName"
                            :class="menuitemClasses"
                            ref="sub" theme="light" width="auto" @on-select="selectItem">
                        <Submenu v-for="sub in getSubMenu" :name="sub.menuCode" :key="sub.menuCode">
                            <template slot="title">
                                <span v-if="!isCollapsed">{{ sub.menuName }}</span>
                            </template>
                            <div v-if="!isCollapsed">
                                <MenuItem v-for="item in sub.subMenus" :name="item.menuCode" :key="item.menuCode">
                                    {{ item.menuName }}
                                </MenuItem>
                            </div>
                        </Submenu>
                    </Menu>&ndash;&gt;
                </Sider>-->
            </div>
            <div class="l-content" :style="{ left:menuToggle }">
                <router-view/>
            </div>
        </div>
        <!--    <router-view v-else/>-->

    </div>
</template>
<script>
    // import { mapGetters,mapActions } from 'vuex'
    import Crumbs from '@/components/index/crumbs'
    import Operate from '@/components/index/operate'

    export default {
        components: {
            Crumbs,
            Operate
        },
        data() {
            return {
                isCollapsed: false
            }
        },
        computed: {
            //   ...mapGetters([
            //     'getMenu',
            //     'getSubMenu',
            //     'getCrumbs',
            //     'getOpenName',
            //     'getActiveName',
            //     'getActiveNav'
            //   ]),
            //   rotateIcon () {
            //     return [
            //       this.isCollapsed ? 'rotate-icon' : ''
            //     ];
            //   },
            //   menuitemClasses () {
            //     return [
            //       'menu-item',
            //       this.isCollapsed ? 'collapsed-menu' : ''
            //     ]
            //   },
            menuToggle() {
                return this.isCollapsed ? '78px' : '200px';
            }
        },
        methods: {
            home() {
                this.reset();
                location.href = '/';
            },
            // ...mapActions([
            //   'initMenu',
            //   'changeSubMenu',
            //   'changeItem',
            //   'reset'
            // ]),
            // //点击一级菜单
            // selection(data) {
            //   this.changeSubMenu(data);
            //   this.$nextTick(()=> {
            //     this.$refs.sub.updateOpened();
            //     this.$refs.sub.updateActiveName();
            //   });
            //
            // },
            // //点击三级菜单
            // selectItem(data) {
            //   this.changeItem(data);
            //   this.$router.push({
            //     name:data
            //   });
            //   this.$nextTick(()=> {
            //     this.$refs.menu.updateActiveName();
            //   });
            // },
            // //首页
            // home(){
            //   this.reset();
            //   location.href = '/';
            // },
            // //收起菜单
            // collapsedSider () {
            //   this.$refs.side.toggleCollapse();
            //   this.$nextTick(()=> {
            //     this.$refs.sub.updateActiveName();
            //   });
            // }
        },
        created() {
            // this.initMenu(this);
            // console.log(this.$route)
        }
    }
</script>
<style lang="less">
    .l-header {
        background-color: rgba(68, 97, 125, 1);
        line-height: 60px;
        color: #fff;
        .ivu-breadcrumb a{
            color: #fff;
        }
        .ivu-breadcrumb>span:last-child {
            color: #fff;
        }
    }

    .logo {
        width: 220px;
        text-align: center;
        float: left;
    }
</style>