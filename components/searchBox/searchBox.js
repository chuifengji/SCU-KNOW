
Component({
  options: {
    addGlobalClass: true,
  },
  methods: {
    skipToSomePage:function(){
      this.triggerEvent('toSearchPage');
    }
  }
})
