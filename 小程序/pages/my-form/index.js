const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerList: [],
    add_time: [],
    doId: "",
  },
  onShow: function () {
    // const userInfo=wx.getUserProfile("user");
    // console.log("userinfo");
    // console.log(app.globaData);
    const uid = app.globaData.userInfo._id
    this.setData({
      userInfo: app.globaData.userInfo
    })
    wx.request({
      url: 'http://192.168.43.212:5000/pay/info_find',
      method: "get",
      // 传到后端
      data: {
        uid: uid,
      },
      success: (res) => {
        console.log("@@我的订单");
        console.log(res.data);
        const registerList = res.data
        registerList.map((item) => {
          // console.log(item.add_time);
          if (item == null) {
            item.add_time= "";
            item.register_time = "";
            item.medicalStatus = "";
            item.medicalStatus = "";
            item.medicalStatus = "";
          } else {
            item.add_time = item.add_time.split("T")
            item.add_time = item.add_time[0]
            item.register_time = item.register_time.split("T")
            item.register_time = item.register_time[0]
            // console.log(item.pay_data[0].add_time);
            if (item.registrationStatus === 0) {
              item.registrationStatus = "已取消预约";
            } else if (item.registrationStatus === 1) {
              item.registrationStatus = "已预约";
            }
            if (item.medicalStatus === 0) {
              item.medicalStatus = "未就诊";
            } else if (item.medicalStatus === 1) {
              item.medicalStatus = "已就诊";
            }
          }
          // console.log(item.doId);
        })
        // console.log(res.data.length);
        this.setData({
          registerList,
        })
      }
    })
  },
})