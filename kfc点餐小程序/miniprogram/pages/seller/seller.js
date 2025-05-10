// pages/seller/seller.js

//获取app页面实例
const app = getApp()

Page({

    data: {
		id:'',
		list:[],
		menu:[],
		activeIndex: 0,
        toView: "a0",
        cartList: [],
        currentType: 0,
        currentIndex: 0,
        sumMonney: 0, // 总价钱
        cupNumber: 0, // 购物车里商品的总数量
        showCart: false, // 是否展开购物车
        loading: false,
        containerH: '',
        userID:app.globalData.userID
    },
    // 点击左侧菜单项选择
  selectMenu: function(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: "a" + index,
    })
  },
	getshopDetail:function(e){
		const db = wx.cloud.database()
        const _ = db.command
		db.collection('shop').where({
			_id: _.eq(this.data.id)
		}).get()
			.then(res=>{
				this.setData({
					list:res.data,
					menu:res.data[0].menu
				})
				console.log(this.data.list)
				console.log(this.data.menu)
			})
	},
	addToCart:function(e){
        var type = e.currentTarget.dataset.type;
        var index = e.currentTarget.dataset.index;
        this.setData({
            currentType: type,
            currentIndex: index,
        });
        var a = this.data
        // 声明数组addItem
        var addItem = {
            "name": a.menu[a.currentType].foods[a.currentIndex].name,
            "price": a.menu[a.currentType].foods[a.currentIndex].price,
            "number": 1,
            "sum": a.menu[a.currentType].foods[a.currentIndex].price,
        }
        var sumMonney = a.sumMonney + a.menu[a.currentType].foods[a.currentIndex].price;
        // 把新数组(addItem) push到 原数组cartList
		var cartList = this.data.cartList;
		cartList.push(addItem);
        
        this.setData({
            cartList: cartList,
            showModalStatus: false,
            sumMonney: sumMonney,
            cupNumber: a.cupNumber + 1
        })
        console.log(this.data.cartList)
    },
    // 展开购物车
  showCartList: function() {
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }
  },
  // 购物车添加商品数量
  addNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    })

  },
  // 购物车减少商品数量
  decNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber - 1
    });
  },
  // 清空购物车
  clearCartList: function() {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0,
      cupNumber: 0
    })
  },
  takeOrder:function(e){
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('order').add({
			data:{
				shopname:this.data.list[0].shopname,
				shopImage:this.data.list[0].shopImage,
				sum:this.data.sumMonney,
				order:this.data.cartList,
				userid:this.data.userID,
				shopID:this.data.id,
				time:wx.cloud.database().serverDate()
			},
			success:res =>{
				wx.showToast({
					title: '购买成功',
					icon: 'success',
					duration: 2000 //持续的时间
				  })
				  this.clearCartList()
			}
		})
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		//获取index传过来的id值
		this.setData({
			id:options.id,
			userID:app.globalData.userID
		})
		console.log(this.data.id)

		this.getshopDetail()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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