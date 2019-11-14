// pages/score/score.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dafenjieguo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/dafendetail`,
      data: {
        id: this.data.id,
      },
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            list: res.data.data
          })
        }
      }
    })
  },
  radioChange(e) {
    switch (e.currentTarget.dataset.index) {
      case 1:
        this.array(0, e);
        break;
      case 2:
        this.array(1, e);
        break;
      case 3:
        this.array(2, e);
        break;
      case 4:
        this.array(3, e);
        break;
      case 5:
        this.array(4, e);
        break;
      case 6:
        this.array(5, e);
        break;
      case 7:
        this.array(6, e);
        break;
      case 8:
        this.array(7, e);
        break;

      case 9:
        this.array(8, e);
        break;
      case 10:
        this.array(9, e);
        break;
      case 11:
        this.array(10, e);
        break;
      case 12:
        this.array(11, e);
        break;
      case 13:
        this.array(12, e);
        break;
      case 14:
        this.array(13, e);
        break;
      case 15:
        this.array(14, e);
        break;
      case 16:
        this.array(15, e);
        break;

      case 17:
        this.array(16, e);
        break;
      case 18:
        this.array(17, e);
        break;
      case 19:
        this.array(18, e);
        break;
      case 20:
        this.array(19, e);
        break;

      case 21:
        this.array(20, e);
        break;
      case 22:
        this.array(21, e);
        break;
      case 23:
        this.array(22, e);
        break;
      case 24:
        this.array(23, e);
        break;
      case 25:
        this.array(24, e);
        break;
      case 26:
        this.array(25, e);
        break;
      case 27:
        this.array(26, e);
        break;
      case 28:
        this.array(27, e);
        break;

      case 29:
        this.array(28, e);
        break;
      case 30:
        this.array(29, e);
        break;
      case 31:
        this.array(30, e);
        break;
      case 32:
        this.array(31, e);
        break;
      case 33:
        this.array(32, e);
        break;
      case 34:
        this.array(33, e);
        break;
      case 35:
        this.array(34, e);
        break;
      case 36:
        this.array(35, e);
        break;

      case 37:
        this.array(36, e);
        break;
      case 38:
        this.array(37, e);
        break;
      case 39:
        this.array(38, e);
        break;
      case 40:
        this.array(39, e);
        break;
    }
  },

  array(i, e) {
    let dafenjieguo = this.data.dafenjieguo;
    dafenjieguo[i] = e.detail.value;
    this.setData({
      dafenjieguo
    })
  },

  submit() {
    let id = this.data.id;
    let dafenjieguo = this.data.dafenjieguo;
    for (var i = 0; i < this.data.list.length; i++) {
      if (!dafenjieguo[i] || dafenjieguo[i] == null || !dafenjieguo) {
        dafenjieguo[i] = "0";
        console.log(dafenjieguo[i])
      }
    }
    this.setData({
      dafenjieguo
    })

    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/dafenjieguo`,
      data: {
        id: this.data.id,
        dafenjieguo: this.data.dafenjieguo.toString()
      },
      success: res => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/order/order',
          })
        }
      }
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