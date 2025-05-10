// app.js

App({
	globalData:{
		UserInfo:null,
		NickName:'123',
		userAvatarUrl:'',
		userID:'',
		isLoginALL:false
	},

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-1giqybc3cf682113',
        traceUser: true,
      });
    }
	// this.globalData = {};
	
	//获取openid
	wx.cloud.callFunction({
		name:'login',
		success:res =>{
				this.globalData.userID=res.result.openid
			console.log(this.globalData.userID)
			
			const db = wx.cloud.database()
			const _ = db.command

			db.collection('newuserdata').where({
				userID:_.eq(this.globalData.userID)
			}).get().then(res=>{
					console.log(res.data)

					this.globalData.UserInfo=res.data
					this.globalData.NickName=res.data[0].username
					this.globalData.userAvatarUrl=res.data[0].image
					console.log(this.globalData.NickName)
					if(res.data.length == 0){
						this.globalData.isLoginALL = false
						console.log(this.globalData.isLoginALL)
					}else{
						this.globalData.isLoginALL = true
						console.log(this.globalData.isLoginALL)
					}
				})
				
				
		}
	})


  }
});
