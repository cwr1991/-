// pages/comment/comment.js
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
    let content = {
      id: options.id,
      img: options.img,
      user_name: options.user_name,
      xiangmu_name: options.xiangmu_name,
      fuwu_time: options.fuwu_time,
      startime: options.startime,
      endtime: options.endtime,
    }
    this.setData({
      content
    })
  },
  textarea: function(e) {
    this.setData({
      textarea: e.detail.value
    })
  },

  chooseImage: function() {
    var that = this;
    var tempFilePaths;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        tempFilePaths = res.tempFilePaths;
        if (that.data.upload) {
          tempFilePaths = that.data.upload.concat(tempFilePaths)
        }
        that.setData({
          upload: tempFilePaths
        })
      }
    })

  },
  delete(e) {
    var index = e.currentTarget.dataset.index;
    var upload = this.data.upload;
    console.log(upload)
    upload.splice(index, 1);
    this.setData({
      upload: upload
    })
  },

  submit: function(e) {
    let id = e.currentTarget.dataset.id,
      text = e.currentTarget.dataset.text,
      img = e.currentTarget.dataset.img;

    if (text == '' || text == undefined) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (img == '' || img == undefined) {
      img = ''
    }
    console.log(id, text, img)
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/pinglun`,
      data: {
        id: id,
        text: text,
        img: img.toString()
      },
      success: res => {
        if (res.data.code == 1 || res.data.data == '操作成功'){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateBack({
            delta:1
          })
        }else if(res.data.data=="您已经评论过了"){
          wx.showToast({
            title: '您已经评论过了',
            icon: 'none',
            duration: 1000
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