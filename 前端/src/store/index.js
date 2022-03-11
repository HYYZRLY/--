import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:"admin",
    isLog:false,
    activeName: "second",
    departmentInfo:"",
    isAdmin:false,
  },
  mutations: {
    // 
    getUserName(state,payload){
      state.username = payload.username
    },
    update(state,payload){
      console.log(payload);
      state.username = payload.username
    },
    login(state,payload){
      // console.log(payload.isLog);
      sessionStorage.setItem("isLog", payload.isLog)
      state.isLog = true
      state.isAdmin = payload.isAdmin
    },
    logout(state,payload){
      // console.log(payload.isLog);
      sessionStorage.setItem("isLog", payload.isLog)
      // sessionStorage.removeItem("username");
      state.isLog = false
    },
    getActiveName(state,payload){
      // console.log(payload);
      state.activeName = payload.activeName
    },
    department_update(state,payload){
      state.departmentInfo = payload.departmentInfo
      console.log(state.departmentInfo);
    }
  },
  actions: {
  },
  modules: {
  }
})
