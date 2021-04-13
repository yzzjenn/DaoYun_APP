<template>
	<view class="joinclass">
		<form>
			<input type="number" placeholder="请输入班课号">
			<button type="primary">加入</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.joinclass {
		position: relative;
		text-align: center;
	}

	button {
		width: 580rpx;
		height: 100rpx;
		text-align: center;
		margin-top: 100rpx;
	}
	form{
		position: absolute;
		top:200rpx;
		left: 100rpx;
	}
</style>
