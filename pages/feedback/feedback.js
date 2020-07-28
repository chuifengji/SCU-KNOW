const util = require('../../utils/util.js')
const app = getApp()
// pages/feedBack/feedBack.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: app.globalData.navHeight,
    bgchange: 0,
    kindsOne: '找不到想要的问题',
    kindsTwo: "问题的回答不够详细/不够满意",
    kindsThree: "关于小程序的功能/使用方面",
    boolOne: 1,
    boolTwo: 1,
    feedback_type: "",
    lastfeedback: "",
    feedback_question:'',
    remark: "",
    onFocus: 0,
    isShowText: 1
  },
  
  navBack: util.throttle(function () {
    wx.navigateBack({
      changed: true
    })
  }, 300),
  clickSelect: util.throttle(function () {
    let boolOne = this.data.boolOne;
    this.setData({
      boolOne: !boolOne,
    })
  }, 300),
  selectTwo: util.throttle(function () {
    let focus = this.data.kindsOne;
    let willFocus = this.data.kindsTwo;
    this.setData({
      kindsTwo: focus,
      kindsOne: willFocus,
    })
  }, 300),
  selectThree: util.throttle(function () {
    let focus = this.data.kindsOne;
    let willFocus = this.data.kindsThree;
    this.setData({
      kindsThree: focus,
      kindsOne: willFocus,
    })
  }, 300),
  stripscript: function (s) {
    var rs = "";
    var pattern = new RegExp("[--`^()|{}\\[\\]<>/——|{}]");
    var patternReal = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘”“']")
    if (s == "" || s == undefined || s == null || (s.length > 0 && s.trim().length == 0)) {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    } 
    
    // else if (pattern.test(s)) {
    //   wx.showToast({
    //     title: '你在搞事情啊',
    //     icon: 'none'
    //   })
    // }
    for (var i = 0; i < s.length; i++) {
      rs = rs + s.substr(i,1).replace(patternReal,'');
    }
    rs = rs.replace(/\s/g, '');
    return rs;
  }, //XSS以及SQL简单过滤
  submit: util.throttle(function () {
    let timer,
     feedback_type = this.data.kindsOne,
    feedback_question = this.data.feedback_question;
    if (feedback_question === '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    } else if (feedback_question === this.data.lastfeedback) {
      wx.showToast({
        title: '你已经提交过了',
        icon: 'none'
      })
    } else if (feedback_question && feedback_question !== this.data.lastfeedback) {
      app.netHandlers.netFeedback(feedback_question,feedback_type);
      this.setData({
        bgchange: 1,
        lastfeedback: feedback_question
      }),
        timer = setTimeout(function () {
          wx.navigateTo({
            url: '../thanks/thanks',
          })
        }, 300)
    }
  }, 300),
  selectUp: util.throttle(function () {
    this.setData({
      boolTwo: 0
    })
  }, 300),
  blurInput: function (e) {
    let origin = e.detail.value;
    if (e.detail.value == '') {
      this.setData({
        boolTwo: 1
      })
    }
    this.setData({
      feedback_question: this.stripscript(origin),
      isShowText: 1,
      onFacus: 0
    });
  },
  confirmandput: util.throttle(function (e) {
    let origin = e.detail.value;
    this.setData({
      feedback_question: this.stripscript(origin)//调用字符串过滤以及用户输入检测正则判断函数
    })
  }, 200),

  onShowTextarea: function () {
    let that=this;
    if(that.data.boolOne==0){
      that.setData({
        boolOne:1,
        boolTwo:0
      })
      console.log(that.data.boolOne);
      setTimeout(function(){
        that.setData({
          isShowText:0,
          onFacus:1
        })
      },300)
    }else{
      that.setData({
        isShowText:0,
        onFacus:1
      })
    }
  
  }

})