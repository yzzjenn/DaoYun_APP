<template>
	<view class="bankeItem">
		<view class="top">
			<text class="name">工程实践</text>
			<text class="id">200327146</text>
		</view>
		<view class="middle">
			<text class="schoolYear">2021专硕</text>
		</view>
		<view class="bottom">
			<text>签到</text>
			<text>消息</text>
			<text>编辑</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "bankeItem",
		data() {
			return {

			};
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
	.bottom text:nth-child(1){
		margin-left: 0;
	}
</style>
