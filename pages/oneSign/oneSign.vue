<template>
	<view class="oneSign">
		<button @click="oneSign" :disabled="sign">{{text}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '123456',
				courseId: Number,
				user_id: Number,
				sign: false,
				text: '',
				signType: Number,
				during_time: Number
			}
		},
		onLoad: function(option) {
			console.log(option)
			this.courseId = option.courseId
			this.signType = option.signType
			this.during_time = option.during_time
			if (option.signType === "0") {
				this.text = "开始签到"
			} else {
				let timer = setInterval(() => {
					this.during_time--
					if (this.during_time === 0) {
						this.sign=true
						clearInterval(timer)
					}
					this.text=this.during_time+'s后签到结束'
				}, 1000)	
			}
			let that = this
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.user_id = res.data.id
				}
			})
		},
		methods: {
			oneSign: function() {
				const that = this
				let api = '/mobileApp/sign/student?courseId=' + that.courseId + '&code=' + that.password +
					'&studentId=' + that.user_id
				that.http.sendRequest3(api, {}, 'get').then(res => {
					console.log(res)
					if (res.statusCode === 200) {
						that.sign = true
						that.text = '签到成功'
						uni.showToast({
							title: "签到成功",
							duration: 3000
						})
					} else {
						that.text = "重新签到"
						uni.showToast({
							title: "签到失败",
							duration: 3000
						})
					}
				})


			}
		}
	}
</script>

<style>
	.oneSign {
		/* text-align: center; */
		/* 	position: relative; */
		/* height: 100%;
		width: 100%; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
		width: 320rpx;
		height: 320rpx;
		background-color: #00ABEA;
		color: white;
		font-size: 32rpx;
		border-radius: 160rpx;
		text-align: center;
		line-height: 320rpx;
		margin-top: 200rpx;
	}
</style>
