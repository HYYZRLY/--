Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: ""
  },

  /**
   * 获取内容
   */

  getDataBindTap: function (e) {
    var result = e.detail.value;
    this.setData({
      result
    });
  },
  refer() {
    console.log(this.data.result);
    if (this.data.result == "") {
      wx.showModal({
        title: '提示',
        content: '请完善留言信息',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      const content = this.data.result
      wx.request({
        url: 'http://localhost:5000/suggestion/add_suggestion',
        method: 'POST',
        data: {
          content
        },
        success: (res) => {
          console.log(res.data);
          if (res.data == '留言添加成功') {
            wx.showToast({
              title: '留言成功',
              icon: 'success',
              duration: 1000 //持续的时间
            })
            // setTimeout(function () {
            //   wx.switchTab({
            //     url: '../person/person',
            //   })
            // }, 1200)
          }
        }
      });
    }
  }

})