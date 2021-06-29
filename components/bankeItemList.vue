<template>
	<view>
		<uni-list>
			<uni-list-item
				thumb="../../static/icon/title.png"
				thumb-size="lg" v-for="(item,index) in courses" :key="index">
				<template slot="body">
					<view class="bankeItem">
						<view class="top">
							<text class="name">{{item.courseName}}</text>
							<text class="id">{{item.courseCode}}</text>
						</view>
						<view class="middle">
							<text class="schoolYear">{{item.className}}</text>
						</view>
						<view class="bottom">
							<text v-if="user_status == '教师'" @click="teaSign(item.id,item.courseCode)">发起签到</text>
							<text v-if="user_status == '学生'" @click="stuSign(item.id)">签到</text>
							<text v-if="user_status == '教师'">消息</text>
							<text v-if="user_status == '教师'">编辑</text>
							<text v-if="user_status == '学生'" @click="signDetail(item.courseName,item.id)">签到记录</text>
						</view>
					</view>
				</template>
				<template slot="footer">
					<uni-icons type="arrowright" size="30" class="redo" @click="goBanInfo(item.courseCode)">
					</uni-icons>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		name: "bankeItemList",
		components:{
			uniIcons
		},
		data() {
			return {
				status: ''
			};
		},
		created() {},
		// 父组件传送班课id来跳转到相应的班课信息页面
		props: ['id', 'courses', 'user_status'],
		methods: {
			goBanInfo: function(id) {
				console.log(id)
				uni.navigateTo({
					url: '../bankeInformation/bankeInformation?courseCode=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			stuSign: function(id) {
				let statusApi = '/mobileApp/sign/student/getstatus?courseId='+ id
				const that = this
				const api = '/mobileApp/sign/check?courseId=' + id
				that.http.sendRequest(api, {}, 'get').then(res => {
					console.log(res)
					if (res.statusCode !== 200) {
						uni.showToast({
							title: '未发起签到',
							icon: 'none',
							duration: 3000
						})
					} else {
						that.http.sendRequest2(statusApi,{},'get').then(res=>{
							console.log(res)
							const signType = res.sign_type
							const during_time = res.during_time
							uni.navigateTo({
								url: '../oneSign/oneSign?courseId=' + id+'&signType='+signType+'&during_time='+during_time,
								success: res => {},
								fail: () => {},
								complete: () => {}
							})
						})
					}
				})
			},
			teaSign: function(id, code) {
				uni.navigateTo({
					url: '../sign/sign?courseId=' + id + '&courseCode=' + code,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			signDetail: function(name, id) {
				uni.navigateTo({
					url: '../userSignDetail/userSignDetail?name=' + name + '&id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			}
		}
	}
</script>

<style>
	.top {
		position: relative;
	}

	.name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.id {
		color: #169BD5;
		font-size: 28rpx;
		position: absolute;
		left: 300rpx;
	}

	.schoolYear {
		font-size: 28rpx;
		color: #999999;
	}

	.bottom {
		display: flex;
	}

	.bottom text {
		font-size: 26rpx;
		color: #7F7F7F;
		margin: 0 32rpx;
	}

	.bottom text:nth-child(1) {
		margin-left: 0;
	}

	.redo {
		position: absolute;
		right: 10rpx;
		top:30%;
	}
</style>
