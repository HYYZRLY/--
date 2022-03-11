Page({
   data:{
     userInfo:{},
     openid:""
   },
  handleGetUserInfo(e){
    wx.getUserInfo({
      userInfo: userInfo,
    })
    // console.log(e);
    let that=this;
    this.setData({
      userInfo: e.detail.userInfo,
    })
    const {userInfo}=e.detail;
    // wx.setStorageSync('userInfo', userInfo);
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo)
      }
    })
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
            var openid = res.data.openid //返回openid
            console.log('openid:' + openid);
            console.log(userInfo);
            wx.request({
              url: 'http://192.168.43.212:5000/user/register_openid',
              method:'POST',
              data:{
                openid:openid
              },
              success:(res)=>{
                console.log(res);
                if(res.data === 'empty'){
                  wx.request({
                    url:'http://192.168.43.212:5000/user/register',
                    method:'POST',
                    data:{
                      userInfo:userInfo,
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

    // console.log(userInfo);
    // console.log('openid:' + openid);

    // wx.navigateBack({
    //   delta: 1
    // });
   
  }

    })
