<template>
  <div>
    <div class="content_body">
      <template>
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <!-- 添加公告 -->
          <el-tab-pane label="添加公告" name="second">
            <div class="addDoctor_body">
              <el-form>
                <el-form-item label="标题" :label-width="formLabelWidth">
                  <el-input
                    v-model="title"
                    placeholder="请输入标题"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    v-model="content"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                  <el-button
                    class="department_btn"
                    type="primary"
                    @click="commit()"
                    plain
                    >添加公告</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <!-- 公告列表 -->
          <el-tab-pane label="公告列表" name="first">
            <div class="show_doctor">
              <el-table
                :data="noticeData"
                stripe
                border
                style="width: 100%"
                height="550"
                class="table_doctor table"
                :default-sort="{ prop: 'add_time', order: 'descending' }"
              >
                <el-table-column
                  prop="title"
                  label="标题"
                  width="250"
                  class="doctor_id"
                  sortable
                >
                </el-table-column>
                <el-table-column prop="content" label="内容" width="500">
                </el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$store.state.activeName,
      noticeData: [],
      formLabelWidth: "120px",
      title: "",
      content: "",
    };
  },

  components: {},

  computed: {},

  methods: {
    handleClick(tab, event) {
      // this.activeName = tab.name;
      // console.log(tab, event);
      this.$store.commit({
        type: "getActiveName", //传递到哪个mutation
        activeName: tab.name, //传递的参数
      });
    },
    open(data) {
      this.$alert(data, "添加状态", {
        confirmButtonText: "确定",
      });
      this.refresh();
    },
    refresh() {
      this.$axios({
        url: "http://localhost:5000/notice",
        method: "get",
      }).then((res) => {
        // console.log(res.data);
        this.noticeData = res.data;
      });
    },

    // 添加公告
    commit() {
      this.$axios({
        url: "http://localhost:5000/notice/add_notice",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          title: this.title,
          content: this.content,
        },
      }).then((res) => {
        // console.log(res);
        this.open(res.data);
      });
    },

    // 删除
    handleDelete(row) {
      this.$axios({
        url: "http://localhost:5000/notice/notice_delete",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          row,
        },
      }).then((res) => {
        if (res.data === "删除成功") {
          this.$alert("删除成功");
          this.refresh();
        } else {
          this.$alert("删除失败");
        }
        // console.log(res);
        this.refresh();
      });
    },
  },
  mounted() {
    // 公告数据
    this.$axios({
        url: "http://localhost:5000/notice",
        method: "get",
      }).then((res) => {
        // console.log(res);
      this.noticeData = res.data;
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
  width: 96%;
  height: 89%;
  margin: 0 15px;
  /* background-color: rosybrown; */
}
/* 医生 */
.show_doctor {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  margin-top: 30px;
  /* background-color: crimson; */
}
/* 表格 */
.table {
  height: 100%;
  margin: auto !important;
  /* margin-top: 30px !important; */
  /* background-color: sandybrown; */
}
/* 医生表 */
.table_doctor {
  width: 800px !important;
}
/* 刷新 */
.refresh {
  /* position: fixed; */
  position: absolute;
  /* float: right; */
  /* margin-right: 50px; */
  top: -30px;
  left: 90%;
  z-index: 2;
}
/* 添加医生 */
.addDoctor_body {
  /* position: absolute; */
  width: 90%;
  height: 89%;
  /* background-color: rosybrown; */
  margin-left: 5%;
}
.addDoctor_body .input {
  width: 300px;
  height: 25px;
}
.submitBtn {
  width: 100px;
  background-color: #66b1ff;
  color: aliceblue;
  border: 1px solid;
  border-radius: 4px;
  height: 40px;
}
.editForm {
  margin-left: 150px !important;
}
</style>