<template>
	<view>
		<view class="oneSign">
			<button @click="oneSign">{{signText[signIndex]}}</button>
		</view>
		<view class="notSign" v-if="absences.length != 0">
			<text style="font-size: 34rpx;padding-left: 40rpx;color: #FF0000;">未签到</text>
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg"
					v-for="(item,index) in absences"
					:key="index">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">{{item.studentName}}</text>
							<text style="font-size: 28rpx;color: #999999;">{{item.studentNumber}}</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="isSign" v-if="attendances.length != 0">
			<text style="font-size: 34rpx;padding-left: 40rpx;color: #007AFF;">已签到</text>
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg"
					v-for="(item,index) in attendances"
					:key="index">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">{{item.studentName}}</text>
							<text style="font-size: 28rpx;color: #999999;">{{item.studentNumber}}</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				signText: ['发起签到', '结束签到'],
				signIndex: 0,
				end: false,
				absences: [],
				attendances: [],
				startTime: Date
			}
		},
		components: {
			uniNavBar
		},
		onLoad: function(option) {
			// console.log(option.classId)
			this.classId = option.classId
		},
		onNavigationBarButtonTap: function() {
			console.log('点击了')
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			console.log('返回')
			this.goBack()
			return true
		},
		methods: {
			oneSign: function() {
				if (this.signIndex === 0) {
					const json = {
						'course': {
							'id': this.classId
						},
						'code': '123456',
						'sign_type':0,
						'during_time':0
					}
					this.startTime = new Date()
					console.log(this.startTime)
					this.http.sendRequest3('/mobileApp/release/sign', json, 'post').then(res => {
						console.log(res)
							uni.showToast({
								title: '已发起签到，请通知学生进行签到',
								icon: 'none',
								duration: 3000
							})
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					const api = '/mobileApp/sign/close?courseId=' + this.classId
					this.http.sendRequest2(api, {}, 'get').then(res => {
						console.log('结束签到')
						console.log(res)
						this.attendances = res.attendances
						this.absences = res.absences
						uni.showToast({
							title: '签到已结束',
							icon: 'none',
							duration: 3000
						})
					})
				}
				this.end = !this.end
				this.signIndex = this.end ? 1 : 0
			},
			goBack: function() {
				let pages = getCurrentPages()
				let nowPage = pages[pages.length - 1]
				let prePage = pages[pages.length - 2]
				prePage.$vm.absences = this.absences
				prePage.$vm.attendances = this.attendances
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.oneSign {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
		width: 320rpx;
		height: 320rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		color: white;
		font-size: 32rpx;
		border-radius: 160rpx;
		text-align: center;
		line-height: 320rpx;
		margin-top: 50rpx;
	}
	
	.text {
		display: flex;
		flex-direction: column;
	}
</style>
