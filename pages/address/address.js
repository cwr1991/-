// pages/address/address.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["请选择省市区"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        // xiangmulist: options.xiangmulist,
        // type: options.type,
        mokuai_id: options.id
      })
      wx.request({
        url: `${app.baseUrl}/index.php?s=/api/index/gooddetail`,
        data: {
          id: this.data.mokuai_id
        },
        success: res => {
          if (res.data.code == 1) {
            this.setData({
              type: res.data.data.type,
              
            })

            
          }
        }
      })
    }
  },
  autoaddress: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          // 未授权，先调授权弹框，再调getLocation
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              this.getLocation();
            },
            fail() {
              wx.showToast({
                title: '授权失败!',
                icon: 'none',
                duration: 1500
              })
            }
          })

        } else if (res.authSetting['scope.userLocation']) {
          //已授权 直接调getLocation
          this.getLocation()
        }
      }
    })
  },

  getLocation: function() {
    wx.getLocation({
      type: 'wgs84',
      success: res => {

        console.log(res)
        let longitude = res.longitude;
        let latitude = res.latitude;
        wx.request({
          url: `${app.baseUrl}/index.php?s=/Api/index/jingwei`,
          data: {
            longitude,
            latitude
          },
          success: res => {
            if (res.data.code == 1) {
              let region = [];
              region.push(res.data.data.province);
              region.push(res.data.data.city);
              region.push(res.data.data.district);

              this.setData({
                region,
                address: res.data.data.xiangxi
              })
            }
          }
        })
      },
    })
  },
  xiadan: function() {
    if (!this.data.name || this.data.name == '') {
      wx.showToast({
        title: '请输入您的姓名!',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (!this.data.tel || this.data.tel == '') {
      wx.showToast({
        title: '请输入您的电话!',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (!this.data.region || this.data.region == '' || this.data.region[0] == '请选择省市区') {
      wx.showToast({
        title: '请选择地区!',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (!this.data.address || this.data.address == '') {
      wx.showToast({
        title: '请输入您的详细地址!',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    let address = this.data.region.toString().replace(',', ' ').replace(',', ' ');
    address += ',';
    address += this.data.address;
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/Order/orderadd`,
      data: {
        // xiangmulist: this.data.xiangmulist,
        user_id: app.id,
        type: this.data.type,
        mokuai_id: this.data.mokuai_id,
        user_name: this.data.name,
        phone: this.data.tel,
        address: address
      },
      success: res => {
        if (res.data.code == 1) {
          wx.navigateTo({
            url: '/pages/payorder/payorder',
          })
        }
      }
    })
  },
  bindname: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindtel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindaddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})