const mta = require('../../vendor/mta_analysis.js');
const app = getApp();
const config = require('../../config.js');
const db = wx.cloud.database()
const store = db.collection('store');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.947608,
    latitude: 22.528687,
    windowHeight: 600,
    mapSubKey: config.mapSubKey
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    mta.Page.init();
    store.get().then(res => {
      this.setData({
        stores: res.data,
        windowHeight: app.globalData.windowHeight,
      }, () => {
        wx.hideLoading();
        wx.showToast({
          title: '双指缩放可以调整地图可视区域，查看更多美食',
          icon: 'none'
        })
      })
    })

  },

  viewAll: function() {
    wx.navigateTo({
      url: '../list/list',
    })
  },
  adminLogin: function() {
    wx.cloud.callFunction({
      name: 'checkUserAuth'
    }).then(res => {
      if (res.result.data.is_administrator) {
        
      } else {
        wx.showToast({
          title: '您不是管理员，无法进入管理入口！',
          icon: 'none'
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我在' + config.appName + '上发现了好吃的，你也看看吧！',
      path: '/pages/map/map?_mta_ref_id=group',
      imageUrl: "/images/share.jpg"
    }
  }
})