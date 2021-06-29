<template>
	<view >
		<view class="forget-bg">
			<uni-forms ref="form"  class="forget-card">
				<uni-forms-item label="项目经理" 
				class="forget-input forget-margin-b">
					<uni-easyinput type="text" 
					value="许文霖" disabled
					></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="移动端" 
				class="forget-input forget-margin-b">
					<uni-easyinput type="text" 
					value="却云飞" disabled></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="后端" 
				class="forget-input forget-margin-b">
					<uni-easyinput type="text"
					value="杨子珍" disabled></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="前端"
				class="forget-input forget-margin-b">
					<uni-easyinput type="text"
					value="张丽媛" disabled></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</view>
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
	.forget-btn{
		padding: 10upx 20upx;
		margin-top: 380upx;
	}
	
	.forget-margin-b{
		margin-bottom: 25upx;
	}
	.forget-input{
		padding: 10upx 20upx;
		overflow: auto;
	}
	.forget-card{
		background: #fff;
		border-radius: 12upx;
		padding: 60upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0,0,0,0.12);
		position: relative;
		margin-top: 120upx;
	}
	.forget-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));;
	}
	
	.landing{
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));;
	}
</style>
