<template>
  <div>
    <div class="content_body">
      <template>
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <!-- 未就诊 -->
          <el-tab-pane label="未就诊" name="second">
            <div class="search_box">
              <el-input
                v-model="search"
                placeholder="请输入就诊人手机尾号"
                class="search"
              ></el-input>
              <el-button
                class="search_btn"
                type="primary"
                @click="handleSearch()"
                plain
                >搜索</el-button
              >
            </div>
            <div class="show_info">
              <el-link
                :underline="false"
                icon="el-icon-refresh-right"
                class="refresh"
                @click="refresh()"
                >刷新</el-link
              >
              <el-table
                :data="infoData"
                stripe
                border
                style="width: 100%"
                height="550"
                class="table_info table"
                :default-sort="{ prop: 'add_time', order: 'descending' }"
              >
                <el-table-column
                  prop="name"
                  label="就诊人"
                  width="100"
                  class="info_id"
                  sortable
                >
                </el-table-column>
                <el-table-column prop="personalId" label="身份证号" width="150">
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="150">
                </el-table-column>
                <el-table-column
                  prop="iDepartment"
                  label="科室"
                  width="100"
                  :filters="filtersData"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <el-tag>{{ scope.row.iDepartment }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="iDoctor" label="医生" width="100">
                </el-table-column>
                <el-table-column
                  prop="register_time"
                  label="预约时间"
                  width="100"
                >
                </el-table-column>
                <el-table-column prop="payStatus" label="支付状态" width="100">
                </el-table-column>
                <el-table-column
                  prop="medicalStatus"
                  label="就诊状态"
                  width="100"
                >
                </el-table-column>
                <el-table-column label="操作" width="130" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)"
                      >修改就诊状态</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 已就诊列表 -->
          <el-tab-pane label="已就诊" name="first">
            <div class="search_box">
              <el-input
                v-model="search1"
                placeholder="请输入就诊人手机尾号"
                class="search"
              ></el-input>
              <el-button
                class="search_btn"
                type="primary"
                @click="handleSearch1()"
                plain
                >搜索</el-button
              >
            </div>
            <div class="show_info">
              <el-link
                :underline="false"
                icon="el-icon-refresh-right"
                class="refresh"
                @click="refresh()"
                >刷新</el-link
              >
              <el-table
                :data="infoData1"
                stripe
                border
                style="width: 100%"
                height="550"
                class="table_info table"
                :default-sort="{ prop: 'add_time', order: 'descending' }"
              >
                <el-table-column
                  prop="name"
                  label="就诊人"
                  width="100"
                  class="info_id"
                  sortable
                >
                </el-table-column>
                <el-table-column prop="personalId" label="身份证号" width="150">
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="150">
                </el-table-column>
                <el-table-column
                  prop="iDepartment"
                  label="科室"
                  width="100"
                  :filters="filtersData"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <el-tag>{{ scope.row.iDepartment }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="iDoctor" label="医生" width="100">
                </el-table-column>
                <el-table-column
                  prop="register_time"
                  label="预约时间"
                  width="100"
                >
                </el-table-column>
                <el-table-column prop="payStatus" label="支付状态" width="100">
                </el-table-column>
                <el-table-column
                  prop="medicalStatus"
                  label="就诊状态"
                  width="100"
                >
                </el-table-column>
                <el-table-column label="操作" width="130" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)"
                      >修改就诊状态</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 未就诊状态编辑 -->
          <div>
            <el-dialog
              title="修改就诊状态"
              :visible.sync="dialogFormVisible"
              class="editForm"
            >
              <el-form :model="form">
                <el-form-item class="zy" :label-width="formLabelWidth">
                  <span>已就诊:1 &nbsp; 未就诊:0</span>
                </el-form-item>
                <el-form-item label="就诊状态" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.medicalStatus"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitEdit()"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <!-- 已就诊状态编辑 -->
          <div>
            <el-dialog
              title="修改就诊状态"
              :visible.sync="dialogFormVisible"
              class="editForm"
            >
              <el-form :model="form1">
                <el-form-item class="zy" :label-width="formLabelWidth">
                  <span>已就诊:1 &nbsp; 未就诊:0</span>
                </el-form-item>
                <el-form-item label="就诊状态" :label-width="formLabelWidth">
                  <el-input
                    v-model="form1.medicalStatus"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitEdit1()"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
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
      infoData: [],
      infoData1: [],
      departmentData: [],
      filtersData: [],
      filtersDepart: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        id: "",
        medicalStatus: 0,
      },
      form1: {
        id: "",
        medicalStatus: 1,
      },
      search: "",
      search1:"",
    };
  },

  components: {},

  computed: {},

  methods: {
    handleClick(tab, event) {
      this.$store.commit({
        type: "getActiveName", //传递到哪个mutation
        activeName: tab.name, //传递的参数
      });
    },
    filterTag(value, row) {
      return row.iDepartment === value;
    },
    refresh() {
      // 未就诊预约数据
      this.$axios({
        url: "http://localhost:5000/info/medicalStatus",
        method: "get",
        data: {
          infoData: this.infoData,
        },
      }).then((res) => {
        //   console.log(res.data);
        this.infoData = res.data;
        this.infoData.map((item) => {
          // console.log(item.payStatus);
          if (item.payStatus === 0) {
            item.payStatus = "未支付";
          } else if (item.payStatus === 1) {
            item.payStatus = "已支付";
          }
          if (item.medicalStatus === 0) {
            item.medicalStatus = "未就诊";
          } else if (item.medicalStatus === 1) {
            item.medicalStatus = "已就诊";
          }
          item.register_time = item.register_time.split("T");
          item.register_time = item.register_time[0];
          return item;
        });
      });
      // 已就诊预约数据
      this.$axios({
        url: "http://localhost:5000/info/medicalStatus1",
        method: "get",
        data: {
          infoData1: this.infoData1,
        },
      }).then((res) => {
        //   console.log(res.data);
        this.infoData1 = res.data;
        this.infoData1.map((item) => {
          // console.log(item.payStatus);
          if (item.payStatus === 0) {
            item.payStatus = "未支付";
          } else if (item.payStatus === 1) {
            item.payStatus = "已支付";
          }
          if (item.medicalStatus === 0) {
            item.medicalStatus = "未就诊";
          } else if (item.medicalStatus === 1) {
            item.medicalStatus = "已就诊";
          }
          item.register_time = item.register_time.split("T");
          item.register_time = item.register_time[0];
          return item;
        });
      });
    },
    //编辑
    handleEdit(row) {
      this.form.id = row._id;
      this.form1.id = row._id;
      this.dialogFormVisible = true;
    },
    // 未就诊
    commitEdit() {
      const { medicalStatus, id } = this.form;
      this.dialogFormVisible = false;
      // console.log(id);
      this.$axios({
        url: "http://localhost:5000/info/status_edit",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          medicalStatus,
          id,
        },
      }).then((res) => {
        if (res.data === "预约状态修改成功") {
          console.log("预约状态修改成功");
          this.refresh();
        } else {
          console.log("预约状态修改失败");
        }
      });
      this.refresh();
    },
    // 已就诊
    commitEdit1() {
      const { medicalStatus, id } = this.form1;
      this.dialogFormVisible = false;
      // console.log(id);
      this.$axios({
        url: "http://localhost:5000/info/status_edit",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          medicalStatus,
          id,
        },
      }).then((res) => {
        if (res.data === "预约状态修改成功") {
          console.log("预约状态修改成功");
          this.refresh();
        } else {
          console.log("预约状态修改失败");
        }
      });
      this.refresh();
    },
    // 搜索
    handleSearch() {
      // console.log(this.search);
      //  支持模糊查询
      const search = this.search;
      let searchList = null;
      if (search) {
        searchList = this.infoData.filter(
          (item) => item.tel.indexOf(search) > -1
        );
      }
      this.infoData = searchList;
    },
    handleSearch1() {
      // console.log(this.search);
      //  支持模糊查询
      const search = this.search1;
      let searchList = null;
      if (search) {
        searchList = this.infoData1.filter(
          (item) => item.tel.indexOf(search) > -1
        );
      }
      this.infoData = searchList;
    },
  },
  mounted() {
    // 分类数据
    this.$axios({
      url: "http://localhost:5000/department",
      method: "get",
      data: {
        departmentData: this.departmentData,
      },
    }).then((res) => {
      // console.log(res.data);
      this.departmentData = res.data;
      let filtersData = this.departmentData.map((item) => {
        return { text: item.department, value: item.department };
      });
      // console.log(filtersData);
      this.filtersData = filtersData;
      let filtersDepart = this.departmentData.map((item) => {
        return item.department;
      });
      this.filtersDepart = filtersDepart;
      // console.log(filtersDepart);
    });
    // 未就诊预约数据
    this.$axios({
      url: "http://localhost:5000/info/medicalStatus",
      method: "get",
      data: {
        infoData: this.infoData,
      },
    }).then((res) => {
      //   console.log(res.data);
      this.infoData = res.data;
      this.infoData.map((item) => {
        // console.log(item.payStatus);
        if (item.payStatus === 0) {
          item.payStatus = "未支付";
        } else if (item.payStatus === 1) {
          item.payStatus = "已支付";
        }
        if (item.medicalStatus === 0) {
          item.medicalStatus = "未就诊";
        } else if (item.medicalStatus === 1) {
          item.medicalStatus = "已就诊";
        }
        item.register_time = item.register_time.split("T");
        item.register_time = item.register_time[0];
        return item;
      });
    });
    // 已就诊预约数据
    this.$axios({
      url: "http://localhost:5000/info/medicalStatus1",
      method: "get",
      data: {
        infoData1: this.infoData1,
      },
    }).then((res) => {
      //   console.log(res.data);
      this.infoData1 = res.data;
      this.infoData1.map((item) => {
        // console.log(item.payStatus);
        if (item.payStatus === 0) {
          item.payStatus = "未支付";
        } else if (item.payStatus === 1) {
          item.payStatus = "已支付";
        }
        if (item.medicalStatus === 0) {
          item.medicalStatus = "未就诊";
        } else if (item.medicalStatus === 1) {
          item.medicalStatus = "已就诊";
        }
        item.register_time = item.register_time.split("T");
        item.register_time = item.register_time[0];
        return item;
      });
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
.show_info {
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
.table_info {
  width: 800px !important;
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
.zy {
  color: red;
}
/* 刷新 */
.refresh {
  float: right;
  right: 90px;
  top: -22px;
}
/* 搜索 */
.search_box {
  position: relative;
}
.search {
  /* position: absolute; */
  left: 20%;
  width: 50%;
}
.search_btn {
  /* position: absolute; */
  /* top: -40px; */
  margin-left: 22%;
}
</style>