<template>
  <div class="left">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="this.$route.path"
      router
    >
      <el-menu-item index="/department" :disabled="admin">
        <i class="el-icon-s-fold"></i>
        <span slot="title">科室管理</span>
      </el-menu-item>
      <el-menu-item index="/doctor" :disabled="admin">
        <i class="el-icon-menu"></i>
        <span slot="title">医生管理</span>
      </el-menu-item>
      <el-menu-item index="/registration">
        <i class="el-icon-document"></i>
        <span slot="title">预约管理</span>
      </el-menu-item>
      <el-menu-item index="/roster" :disabled="admin">
        <i class="el-icon-setting"></i>
        <span slot="title">出诊管理</span>
      </el-menu-item>
      <el-menu-item index="/notice" :disabled="admin">
        <i class="el-icon-tickets"></i>
        <span slot="title">公告管理</span>
      </el-menu-item>
      <el-menu-item index="/suggestion" :disabled="admin">
        <i class="el-icon-tickets"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin:this.$store.state.isAdmin
    };
  },

  components: {},

  computed: {},

  methods: {
  },
};
</script>
<style scoped>
.left {
  position: fixed;
  width: 20%;
  height: 100%;
}
.el-menu {
  border: none;
}
</style>