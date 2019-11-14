// pages/product/product.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
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
            content: res.data.data
          })

          // 将selected为1的id存入xiangmulist
          if (this.data.content.dingzhi == 2) {
            var xiangmulist = [];
            this.data.content.list.forEach((element) => {
              if (element.selected == 1) {
                xiangmulist.push(element.id)
                this.setData({
                  xiangmulist
                })
              }
            })
          }
        }
      }
    })
  },
  checkboxChange: function(e) {
    this.setData({
      xiangmulist: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  submit: function(e) {
    let xiangmulist = this.data.xiangmulist;
    if (xiangmulist == '' || xiangmulist == undefined) {
      wx.showToast({
        title: '请至少选择一项服务',
        icon: 'none',
        duration: 1500
      })
      return;
    }else{
      xiangmulist = xiangmulist.toString();

    }
    let type = this.data.content.type;
    let mokuai_id = this.data.content.id;

    
    wx.navigateTo({
      url: '/pages/address/address?xiangmulist=' + xiangmulist + '&type=' + type + '&mokuai_id=' + mokuai_id,
    })
  },
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