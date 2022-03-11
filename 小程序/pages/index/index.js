Page({
  data: {
    swiperList: [{
      imgUrl: '../../resources/swiper1.jpg'
    }, {
      imgUrl: '../../resources/swiper2.jpg'
    }, {
      imgUrl: '../../resources/swiper3.jpg'
    }],
    navigation: [{
        src: '../../resources/yq.png',
        name: '实时疫情',
        url: "/"
      },
      {
        src: '../../resources/ks.png',
        name: '诊所科室',
        url: "../department/department"
      },
      {
        src: '../../resources/ys.png',
        name: '诊所医生',
        url: "../doctor/doctor"
      },
      {
        src: '../../resources/dw.png',
        name: '到店就诊',
        url: "../map/map"
      },
    ],
    notice: [],
    lastUpdateTime: "2022-01-26 16:47",
    extData: "0",
    total: "0",
    today: "0",
    gdTotal: "0",
    gdToday: "0",
    type: "china",
  },
  onLoad() {
    wx.request({
      url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
      success: (res) => {
        // console.log(res);
        // 疫情数据
        const {
          data: {
            data
          }
        } = res;
        // 相当于 const data = res.data.data
        // console.log(data);
        // 截至时间，国内数据,地区数据
        const {
          lastUpdateTime,
          chinaTotal,
          areaTree
        } = data;
        // console.log(lastUpdateTime);
        // console.log(chinaTotal);
        const {
          today,
          extData,
          total
        } = chinaTotal
        // 广东数据
        const gdData = areaTree[2].children[3]
        // console.log(gdData);
        const gdTotal = gdData.total
        const gdToday = gdData.today
        // console.log(gdTotal);
        // console.log(gdToday);
        this.setData({
          lastUpdateTime,
          extData,
          today,
          total,
          gdTotal,
          gdToday,
        })

      }
    });
    wx.request({
      url: 'http://192.168.43.212:5000/notice',
      success: (res) => {
        // console.log(res.data);
        let notice = res.data
        // console.log(notice);
        this.setData({
          notice
        });
      }
    })
  },
  changeType(e) {
    // console.log(e.currentTarget.dataset.type);
    const type = e.currentTarget.dataset.type;
    this.setData({
      type
    });
  },
})