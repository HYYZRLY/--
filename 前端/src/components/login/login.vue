<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      v-if="user === 'doctor'"
    >
      <h2>医生登录</h2>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="link">
        <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="checked" class="remember-pas"
          >记住密码</el-checkbox
        >
        <el-link type="primary" class="forget-pas">忘记密码</el-link>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
      <el-form-item class="link">
        <el-link type="primary" @click="toRegister">快速注册</el-link>
        <el-link class="link-admin" type="primary" @click="toAdmin"
          >管理员登录</el-link
        >
      </el-form-item>
    </el-form>

    <el-form
      :model="ruleAdmin"
      status-icon
      ref="ruleAdmin"
      class="demo-ruleForm"
      v-if="user === 'admin'"
    >
      <h2>管理员登录</h2>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleAdmin.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleAdmin.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item class="link">
        <el-checkbox v-model="checked" class="remember-pas"
          >记住密码</el-checkbox
        >
        <el-link type="primary" class="forget-pas">忘记密码</el-link>
      </el-form-item> -->
      <el-form-item class="btn">
        <el-button type="primary" @click="submitAdmin()">登录</el-button>
      </el-form-item>
      <el-form-item class="link">
        <el-link class="link-admin" type="primary" @click="toDoctor"
          >医生登录</el-link
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        this.usernameFlag = false;
        callback(new Error("请输入用户名"));
      } else {
        //   如果是如的是特殊符号
        if (/[^\w]/.test(value)) {
          this.usernameFlag = false;
          callback(new Error("请勿输入特殊字符"));
        }
        // 如果输入的是正常字母数字下划线且长度位6-18
        else if (/\w{6,18}/.test(value)) {
          // 如果匹配成功
          //   1.用户存在，发请求
          this.usernameFlag = true;
        }
        // 如果没有输入特殊字符且长度不够
        else {
          this.usernameFlag = false;
          callback(new Error("请输入6-18位的字母、数字、下划线"));
        }
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        //   如果密码为空
        this.passwordFlag = false;
        callback(new Error("请输入密码"));
      } else {
        //
        if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
          this.passwordFlag = true;
          callback();
        } else {
          this.passwordFlag = false;
          callback(new Error("请输入6-18位同时包含数字和字母的密码"));
        }
      }
    };
    return {
      user: "doctor",
      // 记住密码
      checked: false,
      // 用户判断初始值
      usernameFlag: false,
      //   密码判断
      ruleForm: {
        username: "",
        password: "",
      },
      ruleAdmin: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      // 只有三个flag都为真的时候，条件通过
      let { username, password } = this;
      if (this.usernameFlag && this.passwordFlag) {
        this.$axios({
          url: "http://localhost:5000/admin/login",
          method: "post",
          data: {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          // console.log(res.data);
          if (res.data.message === "登录成功") {
            //登录成功获取session后才进行转跳
            // console.log(res.data);
            this.$store.commit({
              type: "getUserName", //传递到哪个mutation
              username: res.data.session, //传递的参数
              //   userInfo: res.data.userInfo[0],
            });
            this.$store.commit({
              type: "login",
              isLog: true,
              isAdmin: true,
            });
            alert("登录成功");
            this.$router.push("registration");
          } else {
            alert("用户名或密码错误");
          }
        });
      }
    },
    submitAdmin() {
      if (
        this.ruleAdmin.username === "admin" &&
        this.ruleAdmin.password === "123456"
      ) {
        this.$store.commit({
          type: "getUserName", //传递到哪个mutation
          username: "admin", //传递的参数
          //   userInfo: res.data.userInfo[0],
        });
        this.$store.commit({
          type: "login",
          isLog: true,
          isAdmin: false,
        });
        alert("登录成功");
        this.$router.push("index");
      } else {
        alert("用户名或密码错误");
      }
    },
    toRegister() {
      this.$router.push("register");
    },
    toAdmin() {
      this.user = "admin";
    },
    toDoctor() {
      this.user = "doctor";
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: #606266;
  font-size: 20px;
}
.demo-ruleForm {
  width: 300px;
  height: 300px;
  padding: 20px;
  /* padding-right: 50px; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-left: 700px;
  position: relative;
  top: 100px;
  /* background-color: rgba(0, 0, 0, 0.3); */
}
.btn button {
  width: 100%;
  position: relative;
}
.forget-pas {
  float: right;
}
.link {
  margin-top: -15px;
  margin-bottom: -10px;
}
.link-admin {
  float: right;
}
</style>