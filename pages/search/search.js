// pages/search/search.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: app.globalData.navHeight,
    nav_text: '',
    nav_text_ans: '',
    bkdatas: {},
    searchValue: '',
    bool: 1,
    hasResult: 0,
    bottom: 0,
  },
  otherData: {
    quescontent: '',
    nav_text_ans: '',
    question_update_time: ''
  },
  back: util.throttle(function (e) {
    wx.navigateBack({
      changed: true
    })
  }, 300),
  tfd: util.throttle(function () {
    console.log(1);
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }, 300),
  getData: function (value) {
    let that = this;
    app.netHandlers.netSearch(value).then(data=>{
      if (data.问题信息 === '未搜索到该问题') {//TODO： 之后接手的同学和后端同学规范下，看着难受。
        that.setData({
          hasResult: 1,
          bkdatas: '',
          searchValue: value,
          bool: 1
        })
      } else {
        let bkdatas = data.问题信息;
        for (let i = 0; i < bkdatas.length; i++) {
          if (i == 0) {
            bkdatas[i].animation_delay = 600
          }
          bkdatas[i].animation_delay = (i + 1) * 300
        }
        that.setData({
          hasResult: 0,
          searchValue: value,
          bool: 0,
          bkdatas: bkdatas
        })
      }
    })
  },
  inputOkl: util.throttle(function () {
    this.setData({
      bottom: 0
    })
  }, 200),
  inputOk: util.throttle(function (e) {
    this.setData({
      bottom: 0
    })
    let that = this;
    let cnPattern = /[\u4E00-\u9FA5]/;
    let value = e.detail.value;
    let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(value)) {
      this.getData(value);
    } else if (value == '') {
      wx.showToast({
        title: '请先输入啦',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请输入中文字符',
        icon: 'none'
      })

    }
  }, 300),
  bgchange: util.throttle(function (e) {
    this.otherData = ({
      quescontent: e.currentTarget.dataset.question_content,
      nav_text_ans: e.currentTarget.dataset.question_title,
      question_update_time: e.currentTarget.dataset.question_update_time
    })
    wx.navigateTo({
      url: '../answer/answer',
    })
  }, 600),
  inputfocus: util.throttle(function (e) {
    this.setData({
      bottom: e.detail.height
    })
  }, 200)
})