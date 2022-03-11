<template>
  <div>
    <div class="content_body">
      <template>
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <!-- 添加医生 -->
          <el-tab-pane label="添加医生" name="second">
            <div class="addDoctor_body">
              <el-form
                action="http://localhost:5000/doctor/doctor_add"
                method="post"
                enctype="multipart/form-data"
                label-width="80px"
              >
                <el-form-item label="医生">
                  <input class="input" type="text" name="doctor" />
                </el-form-item>
                <el-form-item label="所属科室">
                  <select name="department">
                    <option v-for="item in filtersDepart" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </el-form-item>
                <el-form-item prop="pic_img" label="图片" required>
                  <input type="file" name="img" />
                </el-form-item>
                <el-form-item label="工号(唯一)">
                  <input class="input" type="text" name="doctorNum" />
                </el-form-item>
                <el-form-item label="职称">
                  <input class="input" type="text" name="titles" />
                </el-form-item>
                <el-form-item label="医生简介">
                  <textarea
                    class="input"
                    type="text"
                    name="introduction"
                    style="height: 120px"
                  />
                </el-form-item>
                <el-form-item>
                  <input class="submitBtn" type="submit" value="提交" />
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <!-- 医生列表 -->
          <el-tab-pane label="医生列表" name="first">
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
                <el-table-column label="操作" width="150" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="dialogFormVisible = true"
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
            </div>
          </el-tab-pane>

          <!-- 编辑页 -->
          <div>
            <el-dialog
              title="修改医生信息"
              :visible.sync="dialogFormVisible"
              class="editForm"
            >
              <div class="addDoctor_body">
                <el-form
                  action="http://localhost:5000/doctor/doctor_update"
                  method="post"
                  enctype="multipart/form-data"
                  label-width="80px"
                >
                  <el-form-item label="工号(唯一)">
                    <input
                      class="input"
                      type="text"
                      name="doctorNum"
                      placeholder="请正确输入所需修改医生工号(工号不可修改)"
                    />
                  </el-form-item>
                  <el-form-item label="医生姓名">
                    <input class="input" type="text" name="doctor" />
                  </el-form-item>
                  <el-form-item label="职称">
                    <input class="input" type="text" name="titles" />
                  </el-form-item>
                  <el-form-item label="所属科室">
                    <select name="department">
                      <option v-for="item in filtersDepart" :key="item">
                        {{ item }}
                      </option>
                    </select>
                  </el-form-item>
                  <el-form-item prop="pic_img" label="图片" required>
                    <input type="file" name="img" />
                  </el-form-item>
                  <el-form-item label="医生简介">
                    <textarea
                      class="input"
                      type="text"
                      name="introduction"
                      style="height: 140px"
                    />
                  </el-form-item>
                  <el-form-item>
                    <input class="submitBtn" type="submit" value="提交" />
                  </el-form-item>
                </el-form>
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
      filtersData: [],
      filtersDepart: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      search: "",
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
      return row.doctor_data[0].department === value;
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
    },

    // 删除
    handleDelete(row) {
      this.$axios({
        url: "http://localhost:5000/doctor/doctor_delete",
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
  float: right;
  right: 90px;
  top: -22px;
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