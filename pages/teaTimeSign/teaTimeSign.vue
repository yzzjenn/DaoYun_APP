<template>
	<view>
		<view class="timeSign">
			<view style="display: flex;">
				<text style="margin-right: 40rpx; font-size: 30rpx;font-weight: 800;">签到时限:</text>
				<input placeholder="请输入签到限时时间(秒)" type="number" @input="onInput"/>
			</view>
			<button class="btn" v-if="show" @click="start">发起签到</button>
			<button class="btn" v-if="!show">{{time}}s后结束</button>
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
	import wybButton from '../../components/wyb-button/wyb-button.vue'
	export default {
		data() {
			return {
				classId: Number,
				time: Number,
				show: true,
				attendances:[],
				absences:[]
			}
		},
		onLoad: function(option) {
			this.classId = option.classId
		},
		methods: {
			start: function() {
				const json = {
					'course': {
						'id': this.classId
					},
					'code': '123456',
					'sign_type':1,
					'during_time':Number(this.time)
				}
				const api = '/mobileApp/sign/close?courseId=' + this.classId
				this.http.sendRequest2('/mobileApp/release/sign', json, 'post').then(res => {
						console.log('发起签到')
						console.log(res)
						uni.showToast({
							title: '已发起签到，请通知学生进行签到',
							icon: 'none',
							duration: 3000
						})
					})
				this.show = false
				let timer = setInterval(() => {
					this.time--
					if (this.time === 0) {
						this.http.sendRequest2(api, {}, 'get').then(res => {
							console.log('结束签到')
							this.attendances = res.attendances
							this.absences = res.absences
							uni.showToast({
								title: '签到已结束',
								icon: 'none',
								duration: 3000
							})
						})
						this.show = true
						clearInterval(timer)
					}
				}, 1000)
			},
			onInput:function(event){
				this.time = event.target.value
			}
		},
		components: {
			wybButton
		}
	}
</script>

<style>
	.timeSign {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 200rpx;
	}

	.btn {
		align-items: center;
		justify-content: center;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		font-size: 40rpx;
		border-radius: 160rpx;
		text-align: center;
		line-height: 320rpx;
		margin-top: 50rpx;
		width: 320rpx;
		height: 320rpx;
	}
</style>
