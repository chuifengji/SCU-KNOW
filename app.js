import netHandlers from "./utils/netHandlers"
App({
  netHandlers : new netHandlers(),//全局注册/实例化 网络请求类。
  onLaunch: function () {
    var that = this
    that.netHandlers.netGetData().then(data=>{
      console.log(data)
      try{
        wx.setStorageSync('datas', data);
        that.globalData.getted = 1
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(data)
        }
      }catch(err){
       throw(err)
      }
    })
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
  },
 
})
