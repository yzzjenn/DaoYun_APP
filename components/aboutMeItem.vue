<template>
	<view>
		<view class="aboutMeItem" @click="goto(message.page)">
			<text>{{message.text}}</text>
			<view class="icon">
				<uni-icons type="arrowright" size="30"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		name:"aboutMeItem",
		components:{
			uniIcons
		},
		props:['message'],
		data() {
			return {
				
			};
		},
		methods:{
			goto:function(url){
				uni.navigateTo({
					url:url
				})
			}
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
