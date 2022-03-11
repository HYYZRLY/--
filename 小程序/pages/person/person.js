const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    registerNum:0,
    formNum:0
  },
  // 页面显示
  onShow: function(){
    // const userInfo=wx.getUserProfile("user");
    // console.log("userinfo");
    // console.log(app.globaData);
    const uid = app.globaData.userInfo._id
    this.setData({userInfo : app.globaData.userInfo})
    wx.request({
      url: 'http://192.168.43.212:5000/info/info_find',
      method: "get",
      // 传到后端
        data: {
          uid:uid,
        },
        success:(res)=>{
          // console.log("@@我的预约");
          // console.log(res.data);
          // console.log(res.data.length);
          this.setData({
            registerNum:res.data.length,
          }) 
        }
    });
    // 订单数
    wx.request({
      url: 'http://192.168.43.212:5000/pay/info_find',
      method: "get",
      // 传到后端
        data: {
          uid:uid,
        },
        success:(res)=>{
          // console.log("@@我的预约");
          // console.log(res.data);
          // console.log(res.data.length);
          this.setData({
            formNum:res.data.length,
          }) 
        }
    })
  },
  getUserProfile(e){
    let that = this
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo);
        let user = res.userInfo
        app.globaData.userInfo = user
        that.setData({
          userInfo: user,
        })
        // 查找有没有该用户，没有添加到数据库
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
                app.globaData.openid = res.data.openid
                var openid = res.data.openid //返回openid
                console.log('openid:' + openid);
                wx.request({
                  url: 'http://192.168.43.212:5000/user/register_openid',
                  method:'POST',
                  data:{
                    openid:openid
                  },
                  success:(res)=>{
                    // console.log(res);
                    if(res.data == 'empty'){
                      wx.request({
                        url:'http://192.168.43.212:5000/user/register',
                        method:'POST',
                        data:{
                          userInfo:user,
                          openid:openid
                        },
                        success:(res)=>{
                          // console.log(res.data);
                          if(res.data == 'success'){
                            console.log("用户注册成功");
                          }
                        }
                      })
                    }
                    else{
                      console.log("登录成功");
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  logout(){
    this.setData({
      userInfo: ''
  })
  // 清除用户缓存
  wx.setStorageSync('userInfo', null)
  }
  
})