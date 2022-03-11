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
  cancel(e) {
    console.log(e);
    let that = this
    const _id = e.currentTarget.dataset.id
    const doId = e.currentTarget.dataset.doid
    wx.request({
      url: 'http://192.168.43.212:5000/info/cancel',
      method: 'POST',
      data: {
        _id
      },
      success: (res) => {
        // console.log(res.data);
        if (res.data == 'success') {
          console.log("取消预约成功");
        }
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 1000 //持续的时间
        })
        this.onShow();
      }
    });
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
      url: 'http://192.168.43.212:5000/info/info_find',
      method: "get",
      // 传到后端
      data: {
        uid: uid,
      },
      success: (res) => {
        console.log("@@我的预约");
        console.log(res.data);
        const registerList = res.data
        registerList.map((item) => {
          // console.log(item.add_time);
          item.add_time = item.add_time.split("T")
          item.add_time = item.add_time[0]
          item.register_time = item.register_time.split("T")
          item.register_time = item.register_time[0]
          // console.log(item.add_time);
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