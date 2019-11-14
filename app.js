//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        if (res.code) {
          var that = this;
          that.code = res.code;
          wx.request({
            url: that.baseUrl + '/index.php?s=/Api/Login/login',
            data: {
              code: res.code
            },
            success(res) {
              if (res.data.code == 1) {
                that.nickname = res.data.data.nickname;
                that.headimgurl = res.data.data.headimgurl;
                that.id = res.data.data.id
                
                if (that.nickname=="未设置"){
                  
                  
                }
                console.log(that.nickname, that.headimgurl)
              }
            }
          })
        }
      }

    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  baseUrl: "https://jiazheng.hzcsot.com",
  nickname:'',
  headimgurl:'',
  id:''
})