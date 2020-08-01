var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen:false,
    last:null,
    timestamp:null,
    timestamp1:null,
    disabled:0,
    hour:null,
    minute:null
  },
  
  handleButton(e){
    
  /*
      点击按钮的功能：
      1、获取缓存中的按钮出于的状态
      2、如果状态处于打开，点击按钮则变成关闭状态
      3、如果状态处于关闭，点击按钮则变成打开状态
  */
    
    //根据缓存的数据判断是否是打开的
    
    //更新按钮处于的状态
    let isOpen = !this.data.isOpen;
   
    this.setData({
      isOpen
    });
    //将状态缓存到本地
    wx.setStorage({
      key:"isOpen",
      data:isOpen
    });

    if(this.data.isOpen){
      //发送请求数据
      wx.request({
        url:"http://api.qixingyun.com/data/send?appId=bd28ba07899da9f081&toCard=395804&content=%E6%89%93%E5%BC%80%E5%BC%80%E5%85%B3&dataType=1",
        success(res){
          console.log(res.data);
          
        }
      });
      wx.showToast({
        title: '成功打开水槽',
        icon: 'success',
        duration: 2000
      })
      
      var myDate = new Date();//获取系统当前时间
      var hour = myDate.getHours(); //获取当前小时数(0-23)
      var minute = myDate.getMinutes(); //获取当前分钟数(0-59)

      //console.log(myDate.getHours());
      //console.log(myDate.getMinutes());
      //更新main的data
      this.setData({
        hour:hour,
        minute:minute,
      })
      //更新全局的data
      app.globalData.hour = hour;
      app.globalData.minute = minute;

     

    }else{

      wx.request({
        url:"http://api.qixingyun.com/data/send?appId=bd28ba07899da9f081&toCard=395804&content=%E5%85%B3%E9%97%AD%E5%BC%80%E5%85%B3&dataType=1",
        success(res){
          console.log(res.data);
     
        }
      });

      wx.showToast({
        title: '成功关闭水槽',
        icon: 'success',
        duration: 2000
      })
    }
    
    var timestamp1 = Date.parse( new Date());
    this.setData({
      timestamp1:timestamp1
    })
    //console.log(this.data.timestamp1);



    
    //执行完后，设置按钮禁用状态
    this.setData({
      disabled:1
    })

    let sqs = this;
    //10秒后，设置为可以点击的状态
    setTimeout(function(back){
      
      var fun = function(){
        sqs.setData({
          disabled:0
        })
      }
      fun();
    },10000)
      


  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取本地的缓存数据
    let stage = wx.getStorageSync('isOpen');

  
    //判断按钮的状态
    if(stage){
      //每次进去默认的状态是false，如果缓存中的状态是false则不需要更新状态，
      //                          如果缓存中状态是true的话则需要更新状态.
      this.setData({
        isOpen:true
      })
    }

    
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
    
  }
})