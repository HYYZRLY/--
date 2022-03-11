const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    personalId: "",
    tel: "",
    department: "全科",
    register_time: "",
    doctor: "莉丝",
    time_id: "",
    payStatus: 0,
    medicalStatus: 0,
    roster: [],
    registrationNum: 0,
    doId: "",
    paied: false,
    register_id: ""
  },

  onLoad: function (options) {
    // console.log(options);
    let that = this
    console.log('预约时间已获取', options._time)
    this.setData({
      time_id: options._time
    })
    // 通过id查找
    wx.request({
      url: 'http://192.168.43.212:5000/roster/roster-detail',
      method: "get",
      // 传到后端
      data: {
        _id: options._time,
      },
      success: (res) => {
        // console.log(res.data);
        let department = res.data.department[0].department
        let doctor = res.data.doctor[0].doctor
        let doId = res.data.doctor[0]._id
        let rosterData = res.data.roster;
        let registrationNum = res.data.roster[0].registrationNum
        rosterData.map((item) => {
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
        let roster = rosterData[0]
        this.setData({
          department,
          doctor,
          roster,
          registrationNum,
          doId
        })
      }
    });
  },

  // 输入框变化时更新数据
  nameChange(e) {
    this.setData({
      name: e.detail.value
    });
    // console.log(`赋值后：this.data:`,this.data);

  },
  idChange(e) {
    this.setData({
      personalId: e.detail.value
    });
    // console.log(`赋值后：this.data:`,this.data);
  },
  telChange(e) {
    this.setData({
      tel: e.detail.value
    });
    // console.log(`赋值后：this.data:`,this.data);
  },
  dateChange(e) {
    this.setData({
      register_time: e.detail.value
    });
    // console.log(`赋值后：this.data:`,this.data);
  },

  // 提交
  submit() {
    // console.log(this.data.register_time);
    if (this.data.register_time == "" || this.data.name == "" || this.data.personalId == "" || this.data.tel == "") {
      wx.showModal({
        title: '提示',
        content: '请完善预约信息',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })

    } else {
      this.setData({
        paied: true
      })
      const uid = app.globaData.userInfo._id
      const {
        name,
        personalId,
        tel,
        doctor,
        department,
        register_time,
        doId,
        payStatus,
        medicalStatus
      } = this.data
      const week = this.data.roster.week
      const time = this.data.roster.time
      // console.log(name);
      wx.request({
        url: 'http://192.168.43.212:5000/info/add_registerInfo',
        method: 'POST',
        data: {
          name,
          personalId,
          tel,
          doctor,
          department,
          register_time,
          doId,
          payStatus,
          medicalStatus,
          uid,
          week,
          time
        },
        success: (res) => {
          // console.log(res.data);
          let register_id = res.data.registerData._id
          // console.log(register_id);
          this.setData({
            register_id
          });
          if (res.data.message == 'success') {
            console.log("预约成功");
          }
        }
      });
    }
  },

  // 支付
  pay() {
    const uid = app.globaData.userInfo._id
    const {
      name,
      doctor,
      department,
      register_time,
      medicalStatus,
      register_id
    } = this.data
    const week = this.data.roster.week
    const time = this.data.roster.time
    wx.request({
      url: 'http://192.168.43.212:5000/info/pay',
      method: 'POST',
      data: {
        register_id
      },
      success: (res) => {
        // console.log(res.data);
        if (res.data == 'success') {
          console.log("支付成功");
        }
      }
    })
    
    // 预约数加一
    let {
      registrationNum,
      time_id
    } = this.data
    registrationNum++;
    // console.log(registrationNum,time_id);
    wx.request({
      url: 'http://192.168.43.212:5000/roster/addNum',
      method: 'POST',
      data: {
        registrationNum,
        time_id
      },
      success: (res) => {
        // console.log(res.data);
        if (res.data == 'success') {
          console.log("预约数加一");
        }
      }
    });

    wx.request({
      url: 'http://192.168.43.212:5000/pay/pay',
      method: 'POST',
      data: {
        name,
        doctor,
        department,
        register_time,
        medicalStatus,
        uid,
        week,
        time,
        register_id
      },
      success: (res) => {
        // console.log(res.data);
        if (res.data.message == 'success') {
          console.log("订单生成成功");
        }
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000 //持续的时间
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../person/person',
          })
        }, 1200)
      }
    });
  }
})