const App = getApp();
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    isShowModal: { //是否显示整个modal框
      type: Boolean,
      value: false
    },
    isShowTitle: { // 是否显示标题
      type: Boolean,
      value: true
    },
    modalTitle: { // 标题内容
      type: String,
      value: "标题"
    },
    placeholder: { // input框提示文字
      type: String,
      value: "请输入提示文字"
    },
    showDesc: { // 备注文字
      type: String,
      value: ""
    },
    inputType: { // input框类型
      type: String,
      value: 'text'
    },
    isShowInput: { // 是否显示 input框
      type: Boolean,
      value: true
    },
    inputVal: {
      type: [String, Number],
      value: ''
    }
  },
  data: {
   

  },
  methods: {
  
    cancle() {
      this.triggerEvent('cancle')
    },
    _confirm(e) {
      this.triggerEvent("confirm");
    }
  }
})
