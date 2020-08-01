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
      blockquote: `border-left-width: 4px;
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
    question_test: '',

  },
  otherData: {
    fromShare: false,
    likestatus: 'undefined',
  },
  onShareAppMessage: function (res) {
    let obj = {
      answer_id: this.data.question_id,
      answer_title: this.data.nav_text_ans,
      answer_time: this.data.question_update_time,
      answer_content: this.data.question_content,
    }
    let answerJson = encodeURIComponent(JSON.stringify(obj));
    console.log(answerJson)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.nav_text_ans,
      path: '/pages/answer/answer?answerJson=' + answerJson
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
   let pages = getCurrentPages(),
    Page = pages[pages.length - 2];
    if(options.answerJson){
      let cb = JSON.parse(decodeURIComponent(options.answerJson));
      this.otherData.fromShare = true;
      this.setData({
        question_content: cb.answer_content,
        nav_text_ans: cb.answer_title,
        question_update_time: cb.answer_time,
        question_id: cb.answer_id
      })
    }else{
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
      this.otherData.likestatus = status;
    } else {
      var cache = {};
      wx.setStorageSync('cache_key', cache)
    }
  },

  navBack: util.throttle(function () {
    if (this.otherData.fromShare) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    } else {
      wx.navigateBack({
        changed: true
      })
    }

  }, 300),
  tfd: util.throttle(function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }, 300),
  thinkGood: util.throttle(function () {
    let status = this.otherData.likestatus;
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
      this.otherData.likestatus = 1;
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
      this.otherData.likestatus = 0;
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