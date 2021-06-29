<template>
	<view class="userTeacherItem">
		<ul>
			<li>
				<text></text>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name:"userTeacherItem",
		data() {
			return {
				
			};
		},
		props:["leftText","rightText"]
	}
</script>

<style lang="scss">
.userTeacherItem{
	width: 750rpx;
	height:84rpx;
	margin: 0;
	padding: 0 0 0 72rpx;
	.left{
		height: 84rpx;
		// width: 80rpx;
		line-height: 84rpx;
		text-align: center;
		background-color: #C0C0C0;
		
	}
	.right{
		float:right;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
	}
}
</style>
