const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    navH: app.globalData.navHeight
  },
  methods: {
    skipToSomePage:function(){
      this.triggerEvent('toFeedback');
    }
  }
})

