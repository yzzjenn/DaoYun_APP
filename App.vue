<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// let userInfo = uni.getStorageInfoSync('USER_KEY')
			// if(userInfo['isLogined'] === true){
			// 	uni.switch({
			// 		url:'../class/class'
			// 	})
			// 	console.log('自动登录')
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/icon/iconfont.css");
</style>
