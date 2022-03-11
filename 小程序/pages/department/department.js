// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentList:[],
    departmentData:[],
    menu_now:"61e686698ce410e094a29d92",
  },
    //左侧分类的点击事件
    get_fenlei:function(e){
      let that = this
      console.log(e);
      that.setData({
        menu_now:e.currentTarget.dataset.name
      })
      that.onLoad()
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://192.168.43.212:5000/department',
      success:(res)=>{
        // console.log(res.data);
        const {data} = res;
        // console.log(data);
        const departmentList = data
        // console.log(departmentList);
        this.setData({
          departmentList
        })   
      }
    });
      let that = this
      console.log(that.data.menu_now);
      let _id = that.data.menu_now;
      wx.request({
        url: 'http://192.168.43.212:5000/department/departmentData',
        method: "get",
      // 传到后端
        data: {
          _id:_id,
        },
        success:(res)=>{
          // console.log("@@科室");
          // console.log(res.data);
          const departmentData = res.data
          this.setData({
            departmentData,
          }) 
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})