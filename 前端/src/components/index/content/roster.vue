<template>
  <div>
    <div class="content_body">
      <template>
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <!-- 出诊管理 -->
          <el-tab-pane label="出诊管理" name="second">
            <div class="search_box">
              <el-input
                v-model="search"
                placeholder="请输入搜索医生姓名"
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
            <div class="show_doctor">
              <el-link
                :underline="false"
                icon="el-icon-refresh-right"
                class="refresh"
                @click="refresh()"
                >刷新</el-link
              >
              <el-table
                :data="doctorData"
                stripe
                border
                style="width: 100%"
                height="550"
                class="table_doctor table"
                :default-sort="{ prop: 'add_time', order: 'descending' }"
              >
                <el-table-column
                  prop="doctorNum"
                  label="医生编号"
                  width="150"
                  class="doctor_id"
                  sortable
                >
                </el-table-column>
                <el-table-column prop="doctor" label="医生" width="100">
                </el-table-column>
                <el-table-column label="照片" width="100">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 50px; height: 50px"
                      :src="scope.row.doctor_pic"
                    >
                    </el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="titles" label="职称" width="100">
                </el-table-column>
                <el-table-column
                  prop="doctor_data[0].department"
                  label="科室"
                  width="100"
                  :filters="filtersData"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <el-tag>{{ scope.row.doctor_data[0].department }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="introduction" label="简介" width="200">
                </el-table-column>
                <el-table-column label="操作" width="110" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleAdd(scope.row)"
                      >添加出诊</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 出诊列表 -->
          <el-tab-pane label="出诊列表" name="first">
            <div class="search_box">
              <el-input
                v-model="search_roster"
                placeholder="请输入搜索医生姓名"
                class="search"
              ></el-input>
              <el-button
                class="search_btn"
                type="primary"
                @click="handleSearchRoster()"
                plain
                >搜索</el-button
              >
            </div>
            <div class="show_doctor">
              <el-link
                :underline="false"
                icon="el-icon-refresh-right"
                class="refresh"
                @click="refresh()"
                >刷新</el-link
              >
              <el-table
                :data="rosterData"
                stripe
                border
                style="width: 100%"
                height="550"
                class="table_doctor table"
                :default-sort="{ prop: 'add_time', order: 'descending' }"
              >
                <el-table-column
                  prop="doctor_data[0].doctorNum"
                  label="医生编号"
                  width="150"
                  class="doctor_id"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="doctor_data[0].doctor"
                  label="医生"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="week"
                  label="出诊时间"
                  width="100"
                  :filters="filtersWeek"
                  :filter-method="filterWeek"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <el-tag>{{ scope.row.week }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="出诊时段" width="100">
                </el-table-column>
                <el-table-column prop="total" label="总号" width="100">
                </el-table-column>
                <el-table-column
                  prop="registrationNum"
                  label="已挂号"
                  width="100"
                >
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

          <!-- 编辑页 -->
          <div>
            <el-dialog
              title="添加出诊"
              :visible.sync="dialogFormVisible"
              class="editForm"
            >
              <el-form :model="form_roster">
                <el-form-item label="总挂号数" :label-width="formLabelWidth">
                  <el-input
                    v-model="form_roster.total"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="已挂号数" :label-width="formLabelWidth">
                  <el-input
                    v-model="form_roster.registrationNum"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="出诊时间" :label-width="formLabelWidth">
                  <el-radio-group v-model="form_roster.week">
                    <el-radio :label="1">周一</el-radio>
                    <el-radio :label="2">周二</el-radio>
                    <el-radio :label="3">周三</el-radio>
                    <el-radio :label="4">周四</el-radio>
                    <el-radio :label="5">周五</el-radio>
                    <el-radio :label="6">周六</el-radio>
                    <el-radio :label="7">周日</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="出诊时段" :label-width="formLabelWidth">
                  <el-radio-group v-model="form_roster.time">
                    <el-radio :label="1">上午</el-radio>
                    <el-radio :label="2">下午</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitAdd()">确 定</el-button>
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
      doctorData: [],
      departmentData: [],
      rosterData: [],
      filtersData: [],
      filtersWeek: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form_roster: {
        doId: "",
        total: 0,
        registrationNum: 0,
        week: 1,
        time: 1,
      },
      search: "",
      search_roster: "",
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
    filterTag(value, row) {
      return row.doctor_data[0].department === value;
    },
    filterWeek(value, row) {
      return row.week === value;
    },
    open(data) {
      this.$alert(data, "添加状态", {
        confirmButtonText: "确定",
      });
      this.refresh();
    },
    refresh() {
      this.$axios({
        url: "http://localhost:5000/doctor",
        method: "get",
        data: {
          doctorData: this.doctorData,
        },
      }).then((res) => {
        // console.log(res.data);
        this.doctorData = res.data;
      });
      // 出诊数据
      this.$axios({
        url: "http://localhost:5000/roster",
        method: "get",
        data: {
          rosterData: this.rosterData,
        },
      }).then((res) => {
        //   console.log(res.data);
        this.rosterData = res.data;
        this.rosterData.map((item) => {
          if (item.time === 1) {
            item.time = "上午";
          } else if (item.time === 2) {
            item.time = "下午";
          }

          if (item.week === 1) {
            item.week = "周一";
          } else if (item.week === 2) {
            item.week = "周二";
          } else if (item.week === 3) {
            item.week = "周三";
          } else if (item.week === 4) {
            item.week = "周四";
          } else if (item.week === 5) {
            item.week = "周五";
          } else if (item.week === 6) {
            item.week = "周六";
          } else if (item.week === 7) {
            item.week = "周日";
          }
        });
        let filtersWeek = this.rosterData.map((item) => {
          return { text: item.week, value: item.week };
        });
        // console.log(filtersData);
        this.filtersWeek = filtersWeek;
      });
    },
    // 添加出诊
    handleAdd(row) {
      this.dialogFormVisible = true;
      this.form_roster.doId = row._id;
      //   console.log(row._id);
    },
    commitAdd() {
      this.dialogFormVisible = false;
      //   console.log(this.form_roster);
      const form_roster = this.form_roster;
      this.$axios({
        url: "http://localhost:5000/roster/add_roster",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          //   doId,
          form_roster,
        },
      }).then((res) => {
        if (res.data === "success") {
          this.$alert("安排成功");
          this.refresh();
        } else {
          this.$alert("安排失败");
        }
        // console.log(res);
        this.refresh();
      });
    },

    // 删除
    handleDelete(row) {
      this.$axios({
        url: "http://localhost:5000/roster/delete",
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
    // 搜索
    handleSearch() {
      // console.log(this.search);
      //  支持模糊查询
      const search = this.search;
      let searchList = null;
      if (search) {
        searchList = this.doctorData.filter(
          (item) => item.doctor.indexOf(search) > -1
        );
      }
      this.doctorData = searchList;
    },
    handleSearchRoster() {
      const search_roster = this.search_roster;
      let searchList = null;
      if (search_roster) {
        searchList = this.rosterData.filter(
          (item) => item.doctor_data[0].doctor.indexOf(search_roster) > -1
        );
      }
      this.rosterData = searchList;
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

    // 医生数据
    this.$axios({
      url: "http://localhost:5000/doctor",
      method: "get",
      data: {
        doctorData: this.doctorData,
      },
    }).then((res) => {
      // console.log(res.data);
      this.doctorData = res.data;
    });

    // 出诊数据
    this.$axios({
      url: "http://localhost:5000/roster",
      method: "get",
      data: {
        rosterData: this.rosterData,
      },
    }).then((res) => {
      //   console.log(res.data);
      this.rosterData = res.data;
      this.rosterData.map((item) => {
        if (item.time === 1) {
          item.time = "上午";
        } else if (item.time === 2) {
          item.time = "下午";
        }

        if (item.week === 1) {
          item.week = "周一";
        } else if (item.week === 2) {
          item.week = "周二";
        } else if (item.week === 3) {
          item.week = "周三";
        } else if (item.week === 4) {
          item.week = "周四";
        } else if (item.week === 5) {
          item.week = "周五";
        } else if (item.week === 6) {
          item.week = "周六";
        } else if (item.week === 7) {
          item.week = "周日";
        }
      });
      let filtersWeek = this.rosterData.map((item) => {
        return { text: item.week, value: item.week };
      });
      // console.log(filtersData);
      this.filtersWeek = filtersWeek;
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