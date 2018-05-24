// page/more/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theaters: true,
    soon: false,
    offset: 0,
    // thea: [
    //   {
    //     url: '/images/2.jpg',
    //     title: 123,
    //     d: 123.,
    //     player: 123,
    //     score: 8.8,
    //     style: 123,
    //     peop: 12312
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.more)
    if(options.more == 'theaters'){
      this.setData({ theaters: true, soon: false });
      this.getmore(options.more);
    } else {
      this.setData({ theaters: false, soon: true });
      this.getmore(options.more);      
    };
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getmore: function(more){
    var url;
    if (more == 'theaters') {
      url = app.globalData.doubanbase + app.globalData.theaters;
    } else {
      url = app.globalData.doubanbase + app.globalData.soon;
    }
    wx.request({
      url: url,
      data: {
        'start': this.data.offset,
        'count': 5
      },
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        this.thea(res.data.subjects)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  active: function(e){
    console.log(e.target.dataset.id)
    this.getmore(e.target.dataset.id)
    if (e.target.dataset.id == 'theaters'){
      this.setData({
        theaters: true,
        soon: false
      })
    } else {
      this.setData({
        theaters: false,
        soon: true
      })
    }
  },

  thea: function(data){
    console.log(data)
    var thea1 = [];
    var dir;
    var player;
    data.forEach(ele => {
      dir = ele.directors.map(ele => ele.name)
      player = ele.casts.map(ele => ele.name)
      thea1.push({
        url: ele.images.small,
        title: ele.title,
        d: dir,
        player: player,
        score: ele.rating.average,
        style: ele.genres,
        peop: ele.collect_count,
        id: ele.id
      })
    }
    )
    this.setData({
      thea: thea1
    })
  },

  kan:function(){
    wx.showToast({
      title: '看你妹啊！！！赶紧去学习',
      icon: 'none',
      duration: 2000
    })
  },

  shua: function(){
    var type1;
    if (this.data.theaters){
      type1 = 'theaters'
    } else{
      type1 = 'soon'
    }
    this.setData({
      offset: this.data.offset += 5
    })
    this.getmore(type1)
  },
  
  fandou: function(handel, time){
    var lasttime = 0;
    return function(){
      var nowtime = new Date().getTime();
      if((nowtime - lasttime) > time){
        handel();
        lasttime = nowtime;
      }
    }
  },

  showinfo: function(e){
    console.log(e)
    wx.navigateTo({
      url: '/page/info/index?id='+ e.currentTarget.dataset.id,
    })
  },

})