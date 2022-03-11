// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addmissage: '选的位置',
    // markers	 Array	标记点
    stitle: '故宫',
    // 纬度
    latitude: "",
    // 精度
    longitude: "",
    scale: 14,

    //设置标记点
    markers: [{
      iconPath: "../../resources/map.png",
      id: 4,
      latitude: 31.938841,
      longitude: 118.799698,
      width: 30,
      height: 30
    }],
    distanceArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  navigate() {

  },
  onLoad: function (options) {
    var that = this
    // // 使用微信内置地图查看标记点位置，并进行导航
    // wx.openLocation({
    //   latitude: that.data.markers[0].latitude, //要去的纬度-地址
    //   longitude: that.data.markers[0].longitude, //要去的经度-地址
    // })
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
  //controls控件的点击事件
  bindcontroltap(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 14,
      })
    }
  },
  //导航
  onGuideTap: function (event) {
    var lat = Number(event.currentTarget.dataset.latitude);
    var lon = Number(event.currentTarget.dataset.longitude);
    var bankName = event.currentTarget.dataset.bankname;
    console.log(lat);
    console.log(lon);
    wx.openLocation({
      type: 'gcj02',
      latitude: lat,
      longitude: lon,
      name: bankName,
      scale: 28
    })
    // 使用微信内置地图查看标记点位置，并进行导航
    // wx.openLocation({
    //   latitude: that.data.markers[0].latitude, //要去的纬度-地址
    //   longitude: that.data.markers[0].longitude, //要去的经度-地址
    // })
  },
})