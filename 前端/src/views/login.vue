<template>
  <div>
     <Login></Login>
  </div>
</template>

<script>
import Login from '../components/login/login.vue'
export default {
  data () {
   return {
       username:null,
       password:null
   };
  },

  components: {
      Login
  },

  computed: {},


  methods: {
      login(){
        //   解构赋值，相当于let username = this.username
        let {username,password} = this
        // console.log(username);
        this.$axios({
            url:"http://localhost:5000/login",
            method:"post",
            data:{
                username,
                password
            },
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            console.log(res);
        })
      }
  }
}

</script>
<style scoped>
</style>