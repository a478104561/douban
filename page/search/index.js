// page/search/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  first:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  input: function(e){
    var value = e.detail.value;
    var url = app.globalData.doubanbase + app.globalData.v2 + value + '&count=10';
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        this.getlist(res.data.subjects)
        //title
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  getlist: function(data){
    // console.log(data)
    var list = [];
    data.forEach((ele) => {
      // console.log(ele.directors[0].name)
      // var name1 = ele.directors.map(ele => ele.name)
      list.push({
        h: ele.title,
        url: ele.images.small,
        year: ele.year,
        score: ele.rating.average,
        // name: name1,
        // name: ele.directors[0].name,
        name: '我是歌手，你打我啊',
        id: ele.id
      })
    })
    // console.log(list)
    this.setData({
      list: list
    })
  },
  
  showmain: function(e){
    wx.navigateTo({
      url: '/page/info/index?id=' + e.currentTarget.dataset.id,
    })
  },

})