App({
  onLaunch: function () {
    var that = this
    wx.request({
      url: 'https://wenda-data.nt-geek.club/wenda.txt',
      header: {
        'content-type': 'text/plain' // 默认值
      },
      success: res => {
        console.log(res.data)
        wx.setStorage({
          key: "datas",
          data: res.data,
          success:function(){
            that.globalData.getted = 1
          }
        })
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res.data)
        }
      },
      fail:res=>{
        wx.showToast({
          title: '没能获取最新数据呢',
          icon: 'none'
        })
        that.globalData.getted = 1
      }
    }),
      // 获取系统状态栏信息
      wx.getSystemInfo({
        success: (e) => {
          this.globalData.navHeight = e.statusBarHeight + 46;
          this.globalData.statusBar = e.statusBarHeight; //状态栏高度
        }
      })
  },
  globalData: {
    statusBar: 0,
    navHeight: 0,
    getted: 0,
    usestorage: 1
  }
})
