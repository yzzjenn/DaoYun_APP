<template>
	<view class="memberItem">
		<view class="memberName">
			<text>却云飞</text>
		</view>
		<view class="memberInfor">
			<text class="studentId">200327146</text>
			<text class="empirical">11经验值</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"memberItem",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.memberItem{
		
	.memberName{
		font-size:32rpx;
	}
	.memberInfor{
		padding: 0;
		.studentId{
			font-size:28rpx;
			color: #999999;
		}
		.empirical{
			font-size: 26rpx;
			color:#F59A23 ;
			margin:0 0 0 200rpx;
		}
	}
}
</style>
