//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrl: app.baseUrl,
  },

  onLoad: function() {
    let that = this;

    // 请求轮播图
    wx.request({
      url: 'https://jiazheng.hzcsot.com/index.php?s=/Api/index/lunlist',
      success: function(res) {
        let swiperData = res.data.data;
        if (res.data.code == 1) {
          that.setData({
            swiperData
          })
        }
      }
    })

    //请求首页数据项目
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/index/appindex`,
      success: function(res) {
        let itemData = res.data.data;
        if (res.data.code == 1) {
          that.setData({
            itemData
          })
        }
      }
    })

    // 请求公告栏数据
    wx.request({
      url: `${app.baseUrl}/index.php?s=/api/index/newgonggao`,
      success: function(res) {
        let news = res.data.data;
        if (res.data.code == 1) {
          that.setData({
            news
          })
        }
      }
    })

    //获取客服电话
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/kefuphone`,
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            calltel: res.data.data
          })

        }
      }
    })
  },
  togoodstaff: function() {
    wx.navigateTo({
      url: '/pages/goodstaff/goodstaff',
    })
  },
  tocompanynews: function() {
    wx.navigateTo({
      url: '/pages/companynews/companynews',
    })
  },
  tocommentlist: function() {
    wx.navigateTo({
      url: '/pages/commentlist/commentlist',
    })
  },
  toproduct: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      cancelText: '继续下单',
      confirmText: '立即拨打',
      content: '拨打电话联系客服，咨询详细信息',
      success: res => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: this.data.calltel //拨打客服电话
          })
        } else if (res.cancel) {

          wx.navigateTo({
            url: '/pages/address/address?id=' + id,
          })
        }
      }
    })
  },
  noopen(){
    wx.showToast({
      title: '暂未开放 敬请期待',
      icon:'none'
    })
  },
})