import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
import index from './store/menu'

Vue.use(Vuex); //使用 vuex

export default new Vuex.Store({
  modules:{
    index
  }
  /*state: {

  },
  mutations: {

  },
  actions: {

  }*/
})
