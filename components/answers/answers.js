
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgcolor: {
      type: String,
      value: ''
    },
    tcolor: {
      type: String,
      value: ''
    },
    question_content:{
      type: String,
      value: ''
    },
    question_title:{
      type:String,
      value: ''
    },
    animation_delay: {
      type: Number,
      value: 0
    }
  },

  methods: {
    change: function () {
      this.triggerEvent('bgchange');
    },


    

  },
  
})


