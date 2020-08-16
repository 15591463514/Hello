// pages/cow/cow.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastStatus:null,
    status:false,
    disabled_on:0,
    disabled_off:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log(this.data.status);
    
    /**
     * 获取手机的地理位置
     */
    wx.getLocation({
      altitude: 'false',
      success:(Location)=>{
        console.log(Location);
      }
    })

    /**
     * 获取本地的按钮状态缓存
     */
    let lastStatus = wx.getStorageSync('status');
    console.log(lastStatus);
    this.setData({
      status:lastStatus,
    });


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

  /**
   * 点击ON打开栅栏
   */
  ON:function(){

    
  let status = this.data.status;
   if(!status){

    status = !status;
    
    this.setData({
      status,
      disabled_on:1,
      disabled_off:0
    });
    console.log(this);


    //将状态缓存到本地
    wx.setStorage({
      data: status,
      key: 'status',
    })
    //发送请求数据
    wx.request({
      url:"http://api.qixingyun.com/data/send?appId=bd28ba07899da9f081&toCard=951140&content=%E5%8D%87%E8%B5%B7%E5%9B%B4%E6%A0%8F123456&dataType=1",
      success(res){
        console.log(res.data);
      }
    });
    //提示正在打开的对话框
    wx.showToast({
      title: '正在打开围栏',
      icon: 'loading',
      duration: 1000
    });
    //延时2秒显示成功
    setTimeout(function(){
      wx.showToast({
        title: '围栏已打开',
      })
     
    },2000)
       
  }

  },

  /**
   * 点击OFF打开栅栏
   */
  OFF:function(){

    let status = this.data.status;
    if(status){
      status = !status;
      this.setData({
        status,
        disabled_on:0,
        disabled_off:1
      });
      console.log(this.data.status);
        //将状态缓存到本地
        wx.setStorage({
          data: status,
          key: 'status',
        })
      //发送请求数据
      wx.request({
        url:"http://api.qixingyun.com/data/send?appId=bd28ba07899da9f081&toCard=951140&content=%E8%90%BD%E4%B8%8B%E5%9B%B4%E6%A0%8F123456&dataType=1",
        success(res){
          console.log(res.data);
        }
      });
      wx.showToast({
        title: '正在关闭围栏',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function(){
        wx.showToast({
          title: '围栏已关闭',
        });
      
      },2000)
    

      

    }


  }
})


