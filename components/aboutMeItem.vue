<template>
	<view>
		<view class="aboutMeItem">
			<text>{{message}}</text>
			<view class="icon">
				<uni-icons type="arrowright" size="30"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"aboutMeItem",
		props:['message'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.aboutMeItem{
	width: 740rpx;
	height: 90rpx;
	margin-left: 10rpx;
	border-bottom: 1px solid #CCCCCC;
	text{
		float:left;
		font-size:28rpx ;
		line-height: 90rpx;
	}
	.icon{
		float: right;
		margin: 0;
		padding: 0;
		uni-icons{
			color:#999;
		}
		
	}
	
}
</style>
