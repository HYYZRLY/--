//app.js
App({
  globaData:{
    userInfo:null,
    openid:null
  },
  onLaunch: function() {
    let that = this
    // 获取openid
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        // console.log(code);
        var appId = '';
        var secret = '';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            that.globaData.openid = res.data.openid //返回openid
            // console.log('openid:' + res.data.openid);
            wx.request({
              url: 'http://192.168.43.212:5000/user/register_openid',
              method:'POST',
              data:{
                openid:res.data.openid
              },
              success:(res)=>{
                // console.log(res.data.data);
                that.globaData.userInfo = res.data.data
                // console.log(that.globaData.userInfo)
              }
            })
          }
        })
      }
    })
  },
})