<template>
  <div>
    <div class="goBack">
      <h3>科室管理</h3>
    </div>
    <div class="content_body">
      <div class="commit_department">
        <el-input
          class="department_input department"
          placeholder="请输入科室名"
          v-model="department"
          clearable
        >
        </el-input>
        <el-input
          class="department_input introduction"
          placeholder="请输入科室介绍"
          v-model="introduction"
          clearable
        >
        </el-input>
        <el-input
          class="department_input department_addr"
          placeholder="请输入科室地址"
          v-model="department_addr"
          clearable
        >
        </el-input>
        <el-button class="department_btn" type="primary" @click="commit()" plain
          >添加科室</el-button
        >
      </div>
      <div class="show_department">
        <el-link
          :underline="false"
          icon="el-icon-refresh-right"
          class="refresh"
          @click="refresh()"
          >刷新</el-link
        >
        <el-table
          :data="departmentData"
          stripe
          border
          style="width: 100%"
          height="400"
          class="table_department"
        >
          <el-table-column
            prop="_id"
            label="科室编号"
            width="250"
            class="department_id"
          >
          </el-table-column>
          <el-table-column prop="department" label="科室" width="100">
          </el-table-column>
          <el-table-column prop="department_addr" label="地址" width="100">
          </el-table-column>
          <el-table-column prop="introduction" label="科室介绍" width="200">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑 -->
        <div>
          <el-dialog
            title="修改科室"
            :visible.sync="dialogFormVisible"
            class="editForm"
          >
            <el-form :model="form">
              <el-form-item label="科室" :label-width="formLabelWidth">
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="科室地址" :label-width="formLabelWidth">
                <el-input v-model="form.addr" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="科室介绍" :label-width="formLabelWidth">
                <el-input v-model="form.introduction"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="commitEdit()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: "",
      introduction: "",
      department_addr: "",
      departmentData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        addr: "",
        introduction: "",
        id: "",
      },
      formLabelWidth: "120px",
    };
  },

  components: {},

  computed: {

  },

  methods: {
    // 添加成功提示
    open(data) {
      this.$alert(data, "添加状态", {
        confirmButtonText: "确定",
      });
      this.refresh();
    },
    // 添加科室
    commit() {
      this.$axios({
        url: "http://localhost:5000/department/department_add",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          department: this.department,
          department_addr: this.department_addr,
          introduction: this.introduction,
        },
      }).then((res) => {
        // console.log(res);
        this.open(res.data);
      });
    },
    // 刷新
    refresh() {
      // this.$router.go(0);
      // window.location.reload();
      this.$axios({
        url: "http://localhost:5000/department",
        method: "get",
        data: {
          departmentData: this.departmentData,
        },
      }).then((res) => {
        // console.log(res.data);
        this.departmentData = res.data;
      });
    },
    // 编辑
    handleEdit(row) {
      this.form.id = row._id;
      this.dialogFormVisible = true;
    },
    commitEdit() {
      const { name, addr, introduction, id } = this.form;
      this.dialogFormVisible = false;
      // console.log(id);
      this.$axios({
        url: "http://localhost:5000/department/department_update",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
          addr,
          introduction,
          id,
        },
      }).then((res) => {
        if (res.data === "修改科室成功") {
          // this.$store.commit({
          //   type: "department_update",
          //   departmentInfo: {
          //     name,
          //     addr,
          //     introduction,
          //   },
          // });
          console.log("修改科室成功");
          this.refresh();
        } else {
          console.log("修改科室失败");
        }
      });
    },
    // 删除
    handleDelete(row) {
      this.$axios({
        url: "http://localhost:5000/department/department_delete",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          row,
        },
      }).then((res) => {
        if (res.data === "科室删除成功") {
          this.$alert("科室删除成功");
          this.refresh();
        } else {
          this.$alert("科室删除失败");
        }
        this.refresh();
      });
    },
  },
  mounted() {
    this.$axios({
      url: "http://localhost:5000/department",
      method: "get",
      data: {
        departmentData: this.departmentData,
      },
    }).then((res) => {
      // console.log(res.data);
      this.departmentData = res.data;
    });
  },
};
</script>
<style scoped>
.goBack {
  margin: 15px;
  width: 96%;
  height: 40px;
  color: rgb(84, 92, 100);
  border-bottom: 1px solid rgb(192, 191, 191);
}
.content_body {
  position: absolute;
  width: 100%;
  height: 89%;
  /* background-color: rosybrown; */
}
/* 添加科室 */
.commit_department {
  position: absolute;
  width: 100%;
  height: 25%;
  /* background-color: sandybrown; */
}
/* 科室列表 */
.show_department {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 25%;
  /* background-color: aquamarine; */
  /* margin-left: 20px; */
}
/* 输入框*/
.department_input {
  position: absolute;
  left: 20%;
  width: 50%;
}
.department {
  left: 20%;
  width: 20%;
}
.introduction {
  width: 50%;
  top: 50px;
}
.department_addr {
  left: 45%;
  width: 25%;
}
.department_btn {
  position: absolute;
  top: 50px;
  left: 72%;
}
/* 科室表 */
.table_department {
  width: 800px !important;
  margin: auto !important;
  /* background-color: sandybrown; */
}
/* 刷新 */
.refresh {
  float: right;
  right: 90px;
  top: -22px;
}
.editForm {
  margin-left: 150px !important;
}
</style>