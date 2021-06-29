<template>
	<view class="memberItem">
		<view class="memberName">
			<text>{{student.name}}</text>
		</view>
		<view class="memberInfor">
			<text class="studentId">{{student.studentNumber}}</text>
			<text class="empirical">经验值:{{student.experience}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"memberItem",
		props:['student'],
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
			// margin:0 0 0 200rpx;
			position: absolute;
			right: 40rpx;
		}
	}
}
</style>
