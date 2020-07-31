// pages/answer/answer.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    tagStyle: {
      table: `width: 100%;border: 1px solid #ddd;margin: 1rem 0;border-collapse: collapse;border-spacing: 0;`,
      th: `display: table-cell;vertical-align: inherit;font-weight: bold;color:#2c3e50;text-align:center;border: 1px solid #dedede;border-bottom: 2px solid #ccc;padding: 0.2rem 1rem 0 1rem;`,
      td: `display: table-cell;text-align:center;vertical-align: inherit;border: 1px solid #dedede;padding: 0.2rem 1rem 0 1rem;`,
      img: `margin-left: auto;margin-right: auto;max-width: 100%;height: auto;box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
        0 2px 10px 0 rgba(34, 36, 38, 0.08);`,
      blockquote:`border-left-width: 4px;
      border-left-style: solid;
      color: #9e9e9e;
      margin: 0;
      padding: 0.2rem;
      background-color: #eeeeee;
      border-color: #9e9e9e;
      border-left-color: #D6E4F0;
      font-style: italic;`
    },
    navH: app.globalData.navHeight,
    nav_text_ans: '',
    index: 0,
    question_content: '',
    question_update_time: '',
    true: 1,
    isShowModal: false,
    question_id: 0,
    likestatus: 'undefined',
    question_test: ''
  },

  onLoad: function (options) {
    console.log(options, 13)
    wx.showShareMenu({
      withShareTicket: true
    })
    var pages = getCurrentPages();
    var Page = pages[pages.length - 2];
    if (options.answer_title) { //当前入口为转发模式
      console.log(options)
      this.setData({
        question_content: options.answer_content,
        nav_text_ans: options.answer_title,
        question_update_time: options.answer_time,
        question_id: options.answer_id
      })
    } else {
      this.setData({
        question_content: Page.otherData.quescontent,
        nav_text_ans: Page.otherData.nav_text_ans,
        question_update_time: Page.otherData.question_update_time,
        question_id: Page.otherData.question_id
      })
    }
  },
  onReady: function () {
    let id = this.data.question_id;
    let that = this;
    let status;
    var cache = wx.getStorageSync('cache_key');
    if (cache) {
      if (cache[id]) {
        status = cache[id]
      } else {
        status: 'undefined';
      }
      that.setData({
        likestatus: status
      })
    } else {
      var cache = {};
      wx.setStorageSync('cache_key', cache)
    }
  },

  navBack: util.throttle(function () {
    wx.navigateBack({
      changed: true
    })
  }, 300),
  tfd: util.throttle(function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }, 300),
  thinkGood: util.throttle(function () {
    let status = this.data.likestatus;
    var cache = wx.getStorageSync('cache_key');
    let that = this;
    if (status === undefined || status === 0) {
      wx.showToast({
        title: '反馈成功',
      })
      let id = this.data.question_id
      app.netHandlers.netRemarkLike(id);
      cache[id] = true;
      wx.setStorageSync('cache_key', cache);
      that.setData({
        likestatus: 1
      })
    } else {
      wx.showToast({
        title: '你已经满意过啦',
        icon: 'none'
      })
    }


  }, 300),

  thinkBad: util.throttle(function () {
    this.setData({
      isShowModal: true
    })
    let id = this.data.question_id;
    let status = this.data.likestatus;
    var cache = wx.getStorageSync('cache_key');
    let that = this;
    if (status === undefined || status === 1) {
      pp.netHandlers.netRemarkDislike(id);
      cache[id] = 0;
      wx.setStorageSync('cache_key', cache);
      that.setData({
        likestatus: 0
      })
    }

  }, 300),
  cancle: util.throttle(function () {
    this.setData({
      isShowModal: false
    })
  }, 300),
  confirm: util.throttle(function () {
    this.setData({
      isShowModal: false
    }),
      wx.navigateTo({
        url: '../feedback/feedback',
      })
  }, 300)
})