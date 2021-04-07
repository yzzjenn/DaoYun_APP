<template>
	<view class="signItem">
		<button><uni-icons type="checkbox" size="30"></uni-icons></button>
		<text>一键签到</text>
	</view>
</template>

<script>
	export default {
		name:"signItem",
		props:['backgroundColor',''],
		data() {
			return {
				btnStyle:{
					'background-color':''
				}
			};
		},
		beforeCreate:function(){
			this.btnStyle["background-color"]=backgroundColor;
		}
	}
</script>

<style>
	.signItem{
		text-align: center;
	}
text{
	font-size: 28rpx;
	color: #007AFF;
}
button{
	width: 124rpx;
	height: 124rpx;
	border-radius: 50%;
	/* background-color: #007AFF; */
	text-align: center;
	line-height: 124rpx;
}
</style>
