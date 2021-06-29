<template>
	<view class="aboutMe">
		<view class="message">
			<view class="image">
				<view class="box">
					<uni-icons type="person" size="30"></uni-icons>
				</view>
			</view>
			<view class="text">
				<text>{{user.name}}</text>
				<text>{{user.number}}</text>
			</view>
			<navigator class="arrowRight" url="../userTeacher/userTeacher">
				<uni-icons type="arrowright" size="30"></uni-icons>
			</navigator>
		</view>
		<view class="choice" v-for="(item,index) in choices" :key="index">
			<about-me-item :message="item"></about-me-item>
		</view>
		<button @click="logout">退出当前账号</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="success" title="退出登录" content="是否确定退出" 
			:duration="2000" :before-close="true" @close="close"
			@confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import aboutMeItem from '../../components/aboutMeItem.vue'
	export default {
		data() {
			return {
				choices: [{
					text:'用户协议',
					page:'../userAgreement/userAgreement'
				},{
					text:'隐私政策',
					page:"../safe/safe"
				},{
					text:'缓存管理',
					page:""
				},{
					text:'反馈投诉建议',
					page:""
				},{
					text:'关于我们',
					page:"../aboutUs/aboutUs"
				},{
					text:'设置',
					page:""
				}],
				user: {}
			}
		},
		onLoad: function() {
			let that = this
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.user = res.data
					console.log(res.data)
				}
			})
		},
		components: {
			aboutMeItem,
			uniIcons
		},
		methods:{
			logout:function(){
				this.$refs.popup.open()
			},
			close:function(done){
				done()
			},
			confirm:function(done){
				uni.removeStorage({
					key:'user'
				})
				uni.reLaunch({
					url:"../login/login"
				})
				done()
			},
		}
	}
</script>

<style lang="scss">
	.aboutMe {
		margin: 0;
		padding: 0;

		.message {
			display: flex;
			border-top: 1px solid white;
			width: 750rpx;
			height: 170rpx;
			background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));

			.image {
				height: 170rpx;
				width: 170rpx;

				.box {
					height: 100rpx;
					width: 100rpx;
					border-radius: 50rpx;
					background-color: #00E5EE;
					margin: 35rpx;
					text-align: center;
					line-height: 100rpx;
				}
			}

			.text {
				height: 170rpx;
				width: 512rpx;
				color: white;

				text {
					display: block;
					height: 85rpx;
					line-height: 85rpx;
				}
			}

			.arrowRight {
				width: 68rpx;
				height: 170rpx;
				line-height: 170rpx;
				color: #999999;
				text-align: center;
				padding-right: 0;

				uni-icons {
					display: block;
					float: right;
				}
			}
		}

		.choice {
			margin-top: 10rpx;
		}

		button {
			background:linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
			color: white;
			margin-top: 20rpx;
			border-radius: 60rpx;
			text-shadow: 1px 1px 1px rgba(255, 255, 255, .22);
		}
	}
</style>
