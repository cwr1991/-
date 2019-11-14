// pages/orderDetail/orderDetail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/orderdetail`,
      data: {
        id: this.data.id
        // id: 2
      },
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            orderid: res.data.data.order_no,
            list: res.data.data.list
          })
        }
      }
    })
  },
  tocomment(e) {

    let id = e.currentTarget.dataset.id,
      img = e.currentTarget.dataset.img,
      user_name = e.currentTarget.dataset.user_name,
      xiangmu_name = e.currentTarget.dataset.xiangmu_name,
      fuwu_time = e.currentTarget.dataset.fuwu_time,
      startime = e.currentTarget.dataset.startime,
      endtime = e.currentTarget.dataset.endtime

    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id + '&img=' + img + '&user_name=' + user_name + '&xiangmu_name=' + xiangmu_name + '&fuwu_time=' + fuwu_time + '&startime=' + startime + '&endtime=' + endtime,
    })
  },
  toscore(e){
    wx.navigateTo({
      url: '/pages/score/score?id='+e.currentTarget.dataset.id,
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
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/orderdetail`,
      data: {
        id: this.data.id
        // id: 2
      },
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            orderid: res.data.data.order_no,
            list: res.data.data.list
          })
        }
      }
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