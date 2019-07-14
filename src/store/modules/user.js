import { INITHIRE,UPDATEHIRE} from '../mutation-types'
// import {permissionInit,updateHirer} from "@/service/publicService"

const user = {
  state: {
    tenementItems: [], //租户列表 渲染下拉框数据
    activeHire:''     //当前选中租户
  },
  getters: {
    getTenementItems:state => state.tenementItems,
    getActiveHire: state => state.activeHire,
  },
  mutations: {
    // 初始化租户
    [INITHIRE](state,payload){
      // console.log(state,payload)
      state.tenementItems = payload
      // console.log(11,state.tenementItems)
      state.activeHire = sessionStorage.getItem('activeHire') || '';
    },
    [UPDATEHIRE](state){
      console.log('payload')
      //缓存点击租户
      // state.tenementItems = payload;
      // state.activeHire = payload;
    },
  },
  actions: {
   /* initHire({commit}){
      return permissionInit().then((res)=>{
        commit('INITHIRE',res)
      })
    },*/
    /*updateHire({commit}, hireId){
      return updateHirer({hireId:hireId}).then((tenementItems)=>{
        commit('UPDATEHIRE')
        // return tenementItems
      })
    }*/

  }
}
export default user
