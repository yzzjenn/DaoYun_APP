<template>
	<view class="aboutMe">
		<view class="message">
			<view class="image">
				<view class="box">
					<uni-icons type="person" size="30"></uni-icons>
				</view>
			</view>
			<view class="text">
				<text>jakcic</text>
				<text>工号</text>
			</view>
			<navigator class="arrowRight" url="../userTeacher/userTeacher">
				<uni-icons type="arrowright" size="30"></uni-icons>
			</navigator>
		</view>
		<view class="choice" v-for="(item,index) in choices" :key="index">
			<about-me-item :message="item"></about-me-item>
		</view>
		<button>退出当前账号</button>
	</view>
</template>

<script>
	import aboutMeItem from '../../components/aboutMeItem.vue'
	export default {
		data() {
			return {
				choices:['用户协议','隐私政策','缓存管理','反馈投诉建议','关于我们','设置']
			}
		},
		methods: {
			
		},
		components:{
			aboutMeItem
		}
	}
</script>

<style lang="scss">
.aboutMe{
	margin: 0;
	padding: 0;
	.message{
		display: flex;
		border-top: 1px solid white;
		width: 750rpx;
		height: 170rpx;
		background-color: #027DB4;
		.image{
			height: 170rpx;
			width:170rpx ;
			.box{
				height: 100rpx;
				width: 100rpx;
				border-radius: 50rpx;
				background-color: #00E5EE;
				margin: 35rpx;
				text-align: center;
				line-height: 100rpx;
			}
		}
		.text{
			height: 170rpx;
			width: 512rpx;
			color: white;
			text{
				display: block;
				height: 85rpx;
				line-height: 85rpx;
			}
		}
		.arrowRight{
			width: 68rpx;
			height: 170rpx;
			line-height: 170rpx;
			color: #999999;
			text-align: center;
			padding-right:0;
			uni-icons{
				display: block;
				float: right;
			}
		}
	}
	.choice{
		margin-top: 10rpx;
	}
	button{
		background-color: #F59A23;
		color: white;
		margin-top:20rpx;
		border-radius: 60rpx;
		text-shadow: 1px 1px 1px rgba(255,255,255, .22);
	}
}
</style>
