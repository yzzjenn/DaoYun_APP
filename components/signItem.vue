<template>
	<view class="signItem">
		<view v-for="(item , index) in signItemStyle" :key="index" class="signItemChild">
			<button :style="{
				backgroundColor:item.backgroundColor}" @click="goToSign(index)">
				<view :class="item.type"></view>
			</button>
			<text :style="{
				color:item.color
			}">{{item.text}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"signItem",
		props:['signItemStyle'],
		data() {
			return {
				navigateUrl:['../oneSign/oneSign','../gestureSign/gestureSign','../checkIn/checkIn']
			};
		},
		methods:{
			goToSign(index){
				uni.navigateTo({
					url:this.navigateUrl[index]
				})
			}
		}
	
	}
</script>

<style>
	.signItem{
		text-align: center;
		display:flex;
	}
	.signItemChild{
		flex:1;
	}
text{
	font-size: 28rpx;
	/* color: #007AFF; */
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
