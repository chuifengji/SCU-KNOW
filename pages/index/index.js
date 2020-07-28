//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    currentTab: 0, //预设当前项的值
    sleft: 0, //tab标题的滚动条位置
    dn: 600,
    tabh: 0,
    nav_text: '',
    tabItems: [],
    platesData: [],
    everyClickLen: 0,
  },
  otherData: {
    lastTab: 0,
    questiondatas: [],
    datas: {}
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.getted) {
      that.getData();
    } else {
      app.userInfoReadyCallback = res => {
        var datas = res
        var everyClickLen = ((198 * datas[0].navbar_info.length - 710) + 40) / (datas[0].navbar_info.length - 1)
        that.setData({
          navH: app.globalData.navHeight,
          tabh: 2 * app.globalData.navHeight + 70,
          tabItems: datas[0].navbar_info,
          platesData: datas[0].plate_info,
          everyClickLen: everyClickLen
        })
        that.otherData.questiondatas = datas[1]
      }
    }
  },
  getData: function () {
    let that = this;
    wx.getStorage({
      key: 'datas',
      success: function (res) {
        var datas = res.data
        var everyClickLen = ((198 * datas[0].navbar_info.length - 710) + 40) / (datas[0].navbar_info.length - 1)
        that.setData({
          navH: app.globalData.navHeight,
          tabh: 2 * app.globalData.navHeight + 70,
          tabItems: datas[0].navbar_info,
          platesData: datas[0].plate_info,
          everyClickLen: everyClickLen
        })
        that.otherData.questiondatas = datas[1]
      },
      fail: function (res) {
        wx.showToast({
          title: '数据错误，请重新加载',
          icon: 'none'
        })
      }
    })
  },
  //获取后台数据
  swichNav: util.throttle(function (e) {
    var cur = e.target.dataset.current;
    var lastTab = this.otherData.lastTab
    this.setData({
      dn: 0
    })
    this.otherData.lastTab = cur
    this.setData({
      currentTab: cur,
      dn: 600
    })
  }, 150),
  switchTab: util.throttle(function (e) {
    var cur = e.detail.current;
    var lastTab = this.otherData.lastTab
    this.setData({
      currentTab: cur
    })
    this.otherData.lastTab = cur
  }, 200),
  f4: util.throttle(function (e) {
    let id = e.currentTarget.dataset.forum_id
    var dnf = id + ''
    this.otherData.nav_text = e.currentTarget.dataset.forum_title
    var obj = this.otherData.questiondatas.所有问题.find(function (x) {
      return x.板块id == id
    })
    this.otherData.datas = obj.问题信息
    for (let i = 0; i < this.otherData.datas.length; i++) {
      if (i == 0) {
        this.otherData.datas[i].animation_delay = 100
      } else {
        this.otherData.datas[i].animation_delay = (i + 1) * 200
      }

    }
    wx.navigateTo({
      url: '../detail/detail?',
    })

  }, 600),
  toSearchPage: util.throttle(function () {
    wx.navigateTo({
      url: '../search/search',
    })
  }, 300),
  toFeedback: util.throttle(function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }, 300),
})