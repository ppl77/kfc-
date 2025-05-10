export var userInfo = false
//export var isLoginALL=false
import {NickName} from '../../app'
import {userAvatarUrl} from '../../app'
import {userID} from '../../app'
import {UserInfo} from '../../app'
import {isLoginALL} from '../../app'

const app = getApp()
var isLogin = app.globalData.isLoginALL
Page({
    data: {
		UserInfo:[],
		isLogin:app.globalData.isLoginALL,
        userAvatarUrl:app.globalData.userAvatarUrl,
        NickName:app.globalData.NickName,
        user_Info:false,
        isSetdata:true,
		userID:app.globalData.userID,
		buttonHidden:false
    },
    inputNickName:function(e){
        this.data.NickName = e.detail.value;
    },
    chooseImage:function(e){
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success:res => {
                console.log(res.tempFiles[0].tempFilePath)
                this.setData({
                    userAvatarUrl:res.tempFiles[0].tempFilePath
                })
                
                var cloudPath = new Date().getTime();
              wx.cloud.uploadFile({
                cloudPath: cloudPath+".png", // 上传至云端的路径
                filePath: this.data.userAvatarUrl, // 小程序临时文件路径
                success: res => {
                  // 返回文件 ID
                  console.log(res.fileID)
                  this.setData({
                    userAvatarUrl:res.fileID,
                    user_Info:true
                })
                },
                fail: console.error
              })
              
            }
          })   
    },
    //登录
    Login:function(e){
        if(this.data.userAvatarUrl != null && this.data.NickName != null){
			const db = wx.cloud.database()
			const _ = db.command

			db.collection('newuserdata').add({
				data:{
					userID:app.globalData.userID,
					username:this.data.NickName,
					image:this.data.userAvatarUrl
				},
				success:res=>{
					this.setData({
						buttonHidden:true
					})
				}
			})
        }else{
            wx.showModal({
                title: '提示',
                content: '头像或者昵称未设置',
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
        }
        
    },

    onLoad(options) {
		// this.data.isLogin=isLoginALL
		this.setData({
			isLogin:app.globalData.isLoginALL,
			userAvatarUrl:app.globalData.userAvatarUrl,
			NickName:app.globalData.NickName,
			userID:app.globalData.userID
		})
		console.log(this.data.isLogin,app.globalData.isLoginALL)
		console.log(this.data.NickName)
		if(this.data.isLogin = false){
			this.onLoad()
		}
    },
    onReady() {

    },
    onShow() {

    },
    onHide() {

    },
    onUnload() {

    },
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