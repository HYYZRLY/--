<template>
  <div>
      <div class="head_nav">
          <Head></Head>
      </div>
      <div class="body">
          <div class="left_menu">
              <Left></Left>
          </div>
          <div class="content">
              <Content></Content>
          </div>
      </div>
  </div>
</template>

<script>
import Head from '../components/index/head.vue'
import Left from '../components/index/left.vue'
import Content from '../components/index/content.vue'
export default {
  data () {
   return {
   };
  },

  components: {
      Head,
      Left,
      Content
  },

  computed: {},


  methods: {},
//   mounted(){
//       this.$axios("http://localhost:3000").then((res)=>{
//           if(res.data.username==undefined){
//               this.$router.replace("login")
//           }
//       })
//   }
}

</script>
<style scoped>
.head_nav{
    width: 100%;
    height: 50px;
    background-color:#4c5257;
    /* 永远固定在最上面 */
    position: fixed;
    z-index: 999;
    min-height: 40px;
}
.body{
    width: 100%;
    min-width: 800px;
    height: 760px;
    top: 8%;
    /* background-color: cornsilk; */
    position: absolute;
}
.left_menu{
    position: absolute;
    width: 20%;
    height: 100%;
    background-color: #545c64;
}
.content{
    width: 80%;
    height: 100%;
    /* background-color: cyan; */
    position: absolute;
    left: 20%;
}
</style>