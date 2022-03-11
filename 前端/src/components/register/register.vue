<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item class="link">
        <h2>欢迎注册</h2>
        <el-link type="primary" class="toLogin" @click="toLogin">直接登录</el-link>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password">
        <el-input
          type="password"
          v-model="ruleForm.confirm_password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
          this.$axios({
            url: "http://localhost:5000/admin/register_username",
            method: "post",
            data: { username: this.ruleForm.username },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log(res);
            //   在接收成功里面判断用户名是否可用
            console.log(res.data);
             this.usernameFlag = true;
            if (res.data === '用户名可用') {
              callback();
            } else {
              callback(new Error("该用户名已注册"));
            }
          });
          
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
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        this.confirmFlag = false;
        callback(new Error("请输入相同的密码"));
      } else {
        // 如果匹配不到字母
        if (value === this.ruleForm.password) {
          this.confirmFlag = true;
          callback();
        } else {
          this.confirmFlag = false;
          callback(new Error("请输入相同的密码"));
        }
      }
    };
    return {
      // 用户判断初始值
      usernameFlag: false,
      //   密码判断
      passwordFlag: false,
      confirmFlag: false,
      ruleForm: {
        username: "",
        password: "",
        confirm_password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        confirm_password: [
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      // 只有三个flag都为真的时候，条件通过
      if (this.usernameFlag && this.passwordFlag && this.confirmFlag) {
        this.$axios({
          url: "http://localhost:5000/admin/register",
          method: "post",
          data: this.ruleForm,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res);
          if(res.data === "success"){
              alert("注册成功");
          this.$router.push("login");
          }
        });
      } else {
        alert("请完善注册信息");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push("login");
    }
  },
};
</script>
<style scoped>
.demo-ruleForm {
  width: 600px;
  height: 280px;
  padding: 20px;
  padding-right: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: auto;
  position: relative;
  top: 150px;
}
.btn button {
  position: relative;
  left: 196px;
}
.toLogin{
  float: right;
  margin-top: -40px;
}
</style>