// pages/personcenter/personcenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.baseUrl,
    headimgurl: app.headimgurl,
    nickname: app.nickname
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindGetUserInfo: function(e) {
    var that = this;
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showToast({
        icon: 'none',
        title: '快捷登陆失败'
      })
      return;
    }

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/Login/setuserinfo`,
      data: {
        id: app.id,
        nickname: e.detail.userInfo.nickName,
        headimgurl: e.detail.userInfo.avatarUrl,
        sex: e.detail.userInfo.gender
      },
      success: function(res) {
        if (res.data.code == 1) {
          wx.hideLoading();
          app.id = res.data.data.id;
          app.headimgurl = res.data.data.headimgurl;
          app.nickname = res.data.data.nickname;

        }
        that.setData({
          headimgurl: app.headimgurl,
          nickname: app.nickname
        })
      }
    })
  },

  calltel:function() {
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/kefuphone`,
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            calltel: res.data.data
          })
          wx.makePhoneCall({
            phoneNumber: this.data.calltel //拨打客服电话
          })
        }

      }
    })
  },
  toorder(){
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  payimg(){
    wx.navigateTo({
      url: '/pages/payimg/payimg',
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
    this.setData({
      headimgurl: app.headimgurl,
      nickname: app.nickname
    })
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