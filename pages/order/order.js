// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nav: ['待接单', '处理中', '已完成'],
    // currentTab: 0,
    nomore:false,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let currentTab = this.data.currentTab;
    let that = this;
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/orderlist`,
      data: {
        user_id: app.id,
        // status: parseInt(currentTab) + 1,
        page: 1
      },
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            orderlist: res.data.data,
            page:1,
            nomore:false
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

  // 打电话
  calltel() {
    wx.makePhoneCall({
      phoneNumber: this.data.calltel //拨打客服电话
    })
  },

  // tab切换
  // currentTab(e) {
  //   wx.showLoading({
  //     title: '正在加载中',
  //   })
  //   wx.pageScrollTo({
  //     scrollTop: 0,
  //     duration: 100
  //   })
  //   let that = this;

  //   let idx = parseInt(e.currentTarget.dataset.idx) + 1;

  //   wx.request({
  //     url: `${app.baseUrl}/index.php?s=/Api/order/orderlist`,
  //     data: {
  //       user_id: app.id,
  //       status: idx,
  //       page: 1
  //     },
  //     success(res) {
  //       wx.hideLoading();
  //       if (res.data.code == 1) {
  //         that.setData({
  //           orderlist: res.data.data,
  //           currentTab: e.currentTarget.dataset.idx,
  //           page:1,
  //           nomore:false
  //         })
  //       }else{
  //         that.setData({
  //           orderlist: res.data.data,
  //           currentTab: e.currentTarget.dataset.idx,
  //         })
  //       }
  //     }
  //   })

  // },
  todetail(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // let currentTab = this.data.currentTab;
    let that = this;
    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/orderlist`,
      data: {
        user_id: app.id,
        // status: parseInt(currentTab) + 1,
        page: 1
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            orderlist: res.data.data,
            page:1,
            nomore: false
          })
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.nomore){
      return;
    }
    // let currentTab = this.data.currentTab;
    let page = this.data.page;
    let that = this;
    page++;

    wx.request({
      url: `${app.baseUrl}/index.php?s=/Api/order/orderlist`,
      data: {
        user_id: app.id,
        // status: parseInt(currentTab)+1,
        page: page
      },
      success: res => {

        if(res.data.code==1){

          let oldorderlist = this.data.orderlist; //原数组
          let neworderlist = res.data.data; //每上拉加载一次得到的新数组
          let orderlist = oldorderlist.concat(neworderlist) //合并新老数组

          this.setData({
            page,
            orderlist
          })
        }
        
        else if(res.data.data="暂无数据"){
          this.setData({
            nomore:true
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})