// pages/doctor-detial/doctor-detial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    doctor: "",
    department: "",
    introduction: "",
    doctor_pic: "",
    titles: "",
    doctortList: [],
    rosterData: [],
  },

  register:function(e){
    let that = this
    console.log(e.currentTarget.dataset.time);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('医生数据已获取', options._id)
    // 通过id查找
    wx.request({
      url: 'http://192.168.43.212:5000/doctor/doctor-detail',
      method: "get",
      // 传到后端
      data: {
        _id: options._id,
      },
      success: (res) => {
        // console.log(res.data);
        // console.log(res.data.roster);
        let department = res.data.department[0].department
        let doctor = res.data.doctor[0].doctor
        let titles = res.data.doctor[0].titles
        let introduction = res.data.doctor[0].introduction
        let doctor_pic = res.data.doctor[0].doctor_pic
        let rosterData = res.data.roster;
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
        // console.log(rosterData);
        this.setData({
          department,
          doctor,
          titles,
          doctor_pic,
          introduction,
          rosterData,
        })
      }
    });
  },
})