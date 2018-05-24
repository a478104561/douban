// page/info/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: '展开',
    zhan: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    this.setData({
      id: options.id
    })
    console.log(this.data.id)
    var id = this.data.id
    var url = app.globalData.doubanbase + app.globalData.info + '/' + id;
    wx.request({
      url: url,
      header:{
        'content-type': 'json'
      },
      success: (res) => {
        this.show(res.data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
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

  open: function(){
    var zhan;
    var open;
    if(this.data.zhan == ''){
      zhan = 'open'
      open = '收缩'
    }else{
      zhan = ''
      open = '展开'
    }
    this.setData({
      zhan: zhan,
      open: open
    })
  },

  show: function(data){
    console.log(data)
    var style = data.genres
    var style1 = style.join('/')
    this.setData({
      year: data.year,
      style: style1,
      aka: data.title,
      country: data.countries[0],
      title: data.aka[0],
      url: data.images.small,
      p: data.summary
    })
  },

})