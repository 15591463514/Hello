var app = getApp();

//封装一个倒计时的函数
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
   // console.log("Time Out...");
   that.setData({
    second: 0
   });
   return ;
  }
  var time = setTimeout(function(){
   that.setData({
    second: second - 1
   });
   countdown(that);
  }
  ,1000)
 }


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
    lastStatus:null,
    lastTime:null,
    second:10,
    num:0,
    new_time:"请下拉刷新",
    equipment_liststatus:false,
    equipment_id:1
  },
  
  handleButton(e){
 
    /**
     * 点击按钮切换状态
     */
    
    //根据缓存的数据判断是否是打开的
    
    //更新按钮处于的状态
    let isOpen = !this.data.isOpen;
   
    this.setData({
      isOpen
    });

    // //将状态缓存到本地
    wx.setStorage({
      key:"isOpen",
      data:isOpen
    });


    /**
     * 点击按钮发送请求
     */


    if(this.data.isOpen){
      //发送请求数据
      wx.request({
        url:"http://api.qixingyun.com/data/send?appId=bd28ba07899da9f081&toCard=951140&content=%E6%89%93%E5%BC%80%E6%B0%B4%E4%BA%95&dataType=1",
        success(res){
          console.log(res.data);
        }
      });
      wx.showToast({
        title: '正在打开水井',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function(){
        wx.showToast({
          title: '水井已打开',
        })
      },2000)

    }else{

      wx.request({
        url:"http://api.qixingyun.com/data/send?appId=bd28ba07899da9f081&toCard=951140&content=%E5%85%B3%E9%97%AD%E6%B0%B4%E4%BA%95123456&dataType=1",
        success(res){
          console.log(res.data);
        }
      });
      wx.showToast({
        title: '正在关闭水井',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function(){
        wx.showToast({
          title: '水井已关闭',
        })
      },2000)
    }
    
    var timestamp1 = Date.parse( new Date());
    this.setData({
      timestamp1:timestamp1
    })
    //console.log(this.data.timestamp1);


    /**
     * 点击按钮一段时间禁止再次点击
     */
    
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

    /**
     * 点击按钮启动倒计时
     */
    this.setData({
      second: 10
     });
    countdown(this);
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    /*
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
    */


    /**
     * 利用发送请求，准确获取水井的状态
     */
    // 水井已打开	A4CBAEBEAED2D1B4F2BFAA
    // 水井已关闭	A4CBAEBEAED2D1B9D8B1D5
    let lastStatus = wx.getStorageSync('lastStatus');
    if(lastStatus == "A4CBAEBEAED2D1B4F2BFAA"){
      this.setData({
        isOpen:true
      });
      console.log("水井已打开");
    }
    else if(lastStatus == "A4CBAEBEAED2D1B9D8B1D5"){
      this.setData({
        isOpen:false
      });
      console.log("水井已关闭");
    }else{
      //这种情况是牧场的终端发回来的牛的数量，这种情况下按钮的状态也应该是打开的
      this.setData({
        isOpen:true
      });
      console.log("水井已打开");
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
    
  },

  /**
   * 下拉刷新,刷新牛的数量和时间
   */
  onPullDownRefresh(){

    //如果状态是关闭禁止下拉刷新
    if(!this.data.isOpen){
      wx.stopPullDownRefresh();
    }


    if(this.data.isOpen){

      let that = this;

      //如果按钮处于打开状态,则请求数据
      wx.request({
        url: 'http://api.qixingyun.com/data/list?appId=bd28ba07899da9f081&toCard=951140&msgId=0',
        success(cow_num){

          /**牛羊数量 */
          //获取到短报文原文内容
          var result = cow_num.data.result.receiveMsgs[(cow_num.data.result.receiveMsgs.length-1)].content;
          //进行解码操作:
          //获取到的字符串去掉前两位
          result = result.slice(2);

          //将字符串转化为数组
          result=result.split(''); 

          //去掉奇数位的数字，留下偶数位的数字重新组合新的字符串
          var num = "";
          for(var j=0;j<result.length;j++){
            if(j%2==0){
              result[j]="";
            }
            num += result[j]+"";
          }
          console.log(num);

          if(num.length<=4){
            that.setData({
            num:num});
          }
          

          /**更新时间 */

          var time = cow_num.data.result.receiveMsgs[(cow_num.data.result.receiveMsgs.length-1)].createdTime;
          console.log(time);

          that.setData({
            lastTime:time
          });

          //获取到时间的格式为2020-08-03 10:25:35，只保留时间部分
          var new_time = time.slice(11);
          console.log(new_time);
          
          that.setData({
            new_time:new_time
          });

        }
      });

    
    setTimeout(function(){
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
      })
    },1000)
   
  }
},



/**
 * 点击menu，弹出设备列表
 */
menu(){

  // 更新显示或者隐藏的状态
  let equipment = !this.data.equipment_liststatus;
  this.setData({
    equipment_liststatus:equipment
  })

}


});





