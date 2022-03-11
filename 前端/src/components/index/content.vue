<template>
  <div class="content_right">
      <div class="fault">
          <router-view>
              
          </router-view>
      </div>
  </div>
</template>

<script>
export default {
  data () {
   return {
   };
  },

  components: {
    
  },

  computed: {},


  methods: {}
}

</script>
<style scoped>
.content_right{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #e4e9ef;

}
.fault{
    position: absolute;
    width: 92%;
    height: 92%;
    left: 4%;
    top: 4%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>