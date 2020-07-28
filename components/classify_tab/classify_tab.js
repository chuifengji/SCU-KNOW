// components/classify_tab.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    TabContent:{
      type:String,
      value:''
    },
    tabcolor:{
      type:String,
      value:''
    },
    mt: {
      type: Number,
      value: ''
    },
    isshow:{
      type:Boolean,
      value:0
    },
    index: {
      type: Number,
      value: 0
    },
    iconName:{
      type: String,
      value: ''
    },
    base64:{
      type:String,
      value:''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isshow:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ishow: function (e) {
      var that=this
      this.setData({
        isshow: 1
      })
       var myVar=setTimeout(function(){
        that.setData({
          isshow:0
        }),
        clearTimeout(myVar)
      },500)
      this.triggerEvent('f4')
    },
  
  },
 
})
