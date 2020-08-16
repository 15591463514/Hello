//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '第一次使用请先授权',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lastStatus:null,
    lastTime:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../main/main'
    })
  },
  onLoad: function () {



    /**
     * 获取当前水井的状态：
     *        通过发送请求，返回获取消息内容（content，createdTime），更新到data中。
     */
    let that = this;
    wx.request({
      url: 'http://api.qixingyun.com/data/list?appId=bd28ba07899da9f081&toCard=951140&msgId=2',
      success(A){
        console.log(A.data.result.receiveMsgs[(A.data.result.receiveMsgs.length-1)].content);
        console.log(A.data.result.receiveMsgs[(A.data.result.receiveMsgs.length-1)].createdTime);
        var lastStatus = A.data.result.receiveMsgs[(A.data.result.receiveMsgs.length-1)].content;
        var lastTime = A.data.result.receiveMsgs[(A.data.result.receiveMsgs.length-1)].createdTime;
        //将获取的状态和时间更到data中
        that.setData({
          lastStatus : lastStatus,
          lastTime : lastTime
        });
        //将获取的数据缓存到本地，供其他的页面使用该数据
        wx.setStorage({
          data: lastStatus,
          key: 'lastStatus',
        });
        wx.setStorage({
          data: lastTime,
          key: 'lastTime',
        })
      }
    })








    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true 
      })
  
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
          
        })
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: '../main/main'
    })
  }
  ,

 
})


