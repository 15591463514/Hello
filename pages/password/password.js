// pages/password/password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:"",
    hasCard:true,
    cardIsTrue:true,
    pwd:"",
    hasPwd:true,
    pwdIsTrue:true,
    pwd2:"",
    hasPwd2:true,
    pwdIsSame:true,
    check_status:'',
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
   * 获取卡号内容
   */
  card:function(card){
    console.log(card.detail.value);
    this.setData({
      card:card.detail.value
    })
  },
  /**
   * 获取密码
   */
  pwd:function(pwd){
    console.log(pwd.detail.value);
    this.setData({
      pwd:pwd.detail.value
    })
  },
  pwd2:function(pwd2){
    console.log(pwd2.detail.value);
    this.setData({
      pwd2:pwd2.detail.value
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击绑定按钮的功能：
   *  1.检测卡号是否是6位
   *  2.密码格式是否正确
   *  3.两次的密码是否一致
   *  4.判断是否同意相关的服务条款
   */
  binding:function(){
    
    //判断卡号是否正确
    console.log(this.data.card);
    if(this.data.card == ""){
      this.setData({
        hasCard:false,
        cardIsTrue:true
      })
    }else{
      if(this.data.card.length != 6){
        this.setData({
          hasCard:true,
          cardIsTrue:false,
        })
      }else{
        this.setData({
          hasCard:true,
          cardIsTrue:true,
        })
      }
    }

    //判断密码是否正确
    console.log(this.data.pwd);
    if(this.data.pwd == ""){
      this.setData({
        hasPwd:false,
        pwdIsTrue:true
      })
    }else{
      if(this.data.pwd.length <= 7){
        this.setData({
          hasPwd:true,
          pwdIsTrue:false,
        })
      }else{
        this.setData({
          hasPwd:true,
          pwdIsTrue:true,
        })
      }
    }
    
    










    // 判断用户是否同意了服务条款
    if(this.data.check_status == 1){
      // 同意了服务条款
    }else if(this.data.check_status == ""){
      // 没有同意服务条款
     
    }


  },

  check_onclick:function(){
    // 点击复选框切换状态，并更新状态值到data
    if(this.data.check_status == ''){
      this.setData({
        check_status:1
      })
    }else if(this.data.check_status == 1){
      this.setData({
        check_status:''
      })
    }

  }

})

console.log(Page);