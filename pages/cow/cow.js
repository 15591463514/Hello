// pages/cow/cow.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour:null,
    minute:null,
    minute_num:false
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

    //从全局的数据中获取时间，并更新此界面中的时间
    let hour = app.globalData.hour;
    let minute = app.globalData.minute;
    this.setData({
      hour,
      minute
    })
    wx.setStorage({
      key:"hour",
      data:hour
    });

    //分钟的格式为0-59，当事件为0-9时显示为0,1,2，···，应该让分钟为0-9时显示为 01, 02，03,···
    if(minute <= 9){
      if(minute != null){
        let minute_num = this.data.minute_num;
        minute_num = !minute_num;
        console.log(minute_num);
        this.setData({
          minute_num
        }) 
      }
   
    }
    

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

  }
})