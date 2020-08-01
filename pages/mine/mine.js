// pages/mine/mine.js
var mine_data = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //打印全局数据中的个人信息
    console.log(mine_data.globalData.userInfo);
    //设置变量保存
    let that =this;
    console.log(that.data.userInfo);
    //更新data中的数据
    that.setData({
      userInfo:mine_data.globalData.userInfo
    }
    );
    console.log(that.data.userInfo);

    console.log(mine_data.globalData.userInfo);
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

  equipment:function(){
    wx.navigateTo({
      url:'../equipment/equipment'
    })
  },
  buy:function(){
    wx.navigateTo({
      url:'../buy/buy'
    })
  },
  customer:function(){
    wx.navigateTo({
      url:'../custmoer/customer'
    })
  },
  help:function(){
    wx.navigateTo({
      url:'../help/help'
    })
  },
  suggest:function(){
    wx.navigateTo({
      url:'../suggest/suggest'
    })
  },
  set:function(){
    wx.navigateTo({
      url:'../set/set'
    })
  },



})