var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mess: [{
    //   url: '/images/1.jpg',
    //   h: '钢铁侠', 
    //   fen: 8.6,
    //   p: '95413'
    // }]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var theatersurl = app.globalData.doubanbase + app.globalData.theaters + '?start=0&count=10'
    var soonurl = app.globalData.doubanbase + app.globalData.soon + '?start=0&count=10'
    
    this.gettheatersurl(theatersurl);
    this.getsoonurl(soonurl);
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

  search: function(){
    wx.navigateTo({
      url: '/page/search/index',
    })
  },

  gettheatersurl: function(url){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    }),
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        this.showthe(res.data.subjects)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        wx.hideToast()
      }
    })
  },

  showthe: function(data){
    // console.log(data)
    var mess1 = [];
    data.forEach(ele => {
      mess1.push({
        url: ele.images.small,
        h: ele.title,
        fen: ele.rating.average,
        star: ele.rating.average.toFixed(0),
        p: ele.collect_count,
        id: ele.id
      })
    })
    this.setData({
      theaters: mess1
    })
  },

  getsoonurl: function(url){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    }),
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success:(res) => {
        this.soon(res.data.subjects)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        wx.hideToast()
      }
    })
  },

  soon:function(data){
    var soon1 = [];
    data.forEach(ele => {
      soon1.push({
        url: ele.images.small,
        h: ele.title,
        star: ele.rating.average.toFixed(0),
        fen: ele.rating.average,
        p: ele.collect_count,
        id: ele.id        
      })
    })
    this.setData({
      soon: soon1
    })
  },

  bindtomore: function(e){
    // console.log(e.currentTarget.dataset.more)
    wx.navigateTo({
      url: '/page/more/index?more=' + e.currentTarget.dataset.more,
    })
  },

  getinfo: function(e){
    wx.navigateTo({
      url: '/page/info/index?id=' + e.currentTarget.dataset.id,
    })
  },

})