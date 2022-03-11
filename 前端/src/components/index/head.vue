<template>
  <div>
    <div class="drop">
      <h2>诊所预约小程序后台管理系统</h2>
      <div class="absolute">
        <div>
          <span class="username">{{ $store.state.username }}</span>
          <span class="logout" @click="logout()">退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
    };
  },

  components: {},

  computed: {},

  methods: {
    logout() {
      this.$axios({
        url: "http://localhost:5000/admin/logout",
        method: "get",
      }).then((res) => {
        if (res.data === "账号已退出") {
          this.$store.commit({
            type: "logout",
            isLog: false,
          });
          alert("退出登录成功");
          this.$router.push("login");
        }
      });
    },
  },
  // mounted() {
  //   this.$axios({
  //     url: "http://localhost:3000/user/login_username",
  //     method: "get",
  //     data: this.username,
  //   }).then((res) => {
  //     // console.log(res.data);
  //     this.username = res.data
  //   });
  // },
};
</script>
<style scoped>
.drop {
  position: relative;
  height: 100%;
  width: 100%;
  /* background-color: darkcyan; */
}
.drop h2 {
  margin-left: 20px;
  margin-top: 5px;
  color: #eeeeee;
}
.absolute {
  position: absolute;
  right: 2%;
  top: 10px;
  /* width: 120px; */
}
.absolute span {
  margin-left: 15px;
  color: #eeeeee;
}
.logout {
  cursor: pointer;
}
</style>