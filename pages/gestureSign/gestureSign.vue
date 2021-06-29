<template>
	<view class="gestrueSign">
		<view class="creatPattern" id="creatPattern"></view>
		<view id="actionButton">
			<button type="primary" value="Refresh" id="refresh-captcha">重设</button>
			<button type="primary" value="Submit" id="submit-captcha">提交</button>
		</view>
	</view>
</template>

<script>
	import PatternLock from 'patternlock';
	
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		onLoad() {
			const patternLock = new PatternLock('#creatPattern',{
				onDraw(pattern){
					
				}
			})
		}
	}
</script>

<style>
#actionButton{
	display: flex;
}
button{
	flex:1;
	margin-left: 40rpx;
	margin-right: 40rpx;
}
</style>
