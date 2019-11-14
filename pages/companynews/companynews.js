// pages/companynews/companynews.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.baseUrl,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/index/gonggao`,
      success:res=>{
        if(res.data.code==1){
          let newsData=res.data.data;
          newsData.forEach((element)=>{
            for (var i = 0; i < element.yinwen.length;i++){
              if(i>=50){
                //详情字数超过50字加省略号
                let newyinwen=element.yinwen.substring(0,i);
                newyinwen+='...';
                element.yinwen=newyinwen;
                return;
              }
            }
          })
          this.setData({
            newsData
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})