// pages/order/order.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
		list:[],
		order:[
			{order:[{name:''},{number:''}]}
		],
		Order:[],
		userID:app.globalData.userID
    },

	getOrderData:function(e){
		const db = wx.cloud.database()
        const _ = db.command
		db.collection('order').where({
			userid: _.eq(this.data.userID)
		}).orderBy('time','desc').get()
			.then(res=>{
				console.log('res:',res)
				this.setData({
					list:res.data
				})
			})
			
	},
	OneAgain:function(e){
		console.log(e.currentTarget.dataset.id)
		wx.navigateTo({
		  url: '../seller/seller?id='+e.currentTarget.dataset.id,
		})
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		this.getOrderData()
		this.setData({
			userID:app.globalData.userID,
		})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
		this.getOrderData()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
		this.getOrderData()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})