// pages/detail/detail.js
const util = require('../../utils/util.js')
const app = getApp()
let bkdatas
let nav_text
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: app.globalData.navHeight,
    nav_text: '',
    nav_text_ans: '',
    bkdatas: [],
    
  },
  otherData: {
    quescontent: '',
    nav_text_ans: '',
    question_update_time: '',
    question_id:0
  },
  onLoad: function () {
    let that = this;
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    bkdatas = Page.otherData.datas;
    nav_text = Page.otherData.nav_text
    that.setData({
      nav_text
    })
  },
  onReady:function(){
    let that = this;
    setTimeout(function () {
      that.setData({
        bkdatas
      })
    }, 500)
  },
  navBack: function () {
    wx.navigateBack({
      changed: true
    })
  },
  bgchange: util.throttle(function (e) {
    this.otherData = ({
      quescontent: e.currentTarget.dataset.question_content,
      nav_text_ans: e.currentTarget.dataset.question_title,
      question_update_time: e.currentTarget.dataset.question_update_time,
      question_id: e.target.dataset.question_id
    })
    wx.navigateTo({
      url: '../answer/answer',
    })
  }, 600),
  tfd: util.throttle(function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }, 300),


})
