<template>
	<view class="sign">
		<view class="signMethods">
			<sign-item :signItemStyle="signItemStyle"></sign-item>
		</view>
		<view class="historyText">
			<text>历史签到记录</text>
			<text>历史详情</text>
		</view>
	</view>
</template>

<script>
	import signItem from '../../components/signItem.vue'
	export default {
		data() {
			return {
				signItemStyle: [{
						backgroundColor: '#118EE9',
						color: '#118EE9',
						type: 'iconfont icon-qiandaox',
						text: '一键签到'
					},
					{
						backgroundColor: '#FFC601',
						color: '#FFC601',
						type: 'iconfont icon-anzhuo-',
						text: '手势签到'
					},
					{
						backgroundColor: '#2CD7AA',
						color: '#2CD7AA',
						type: 'iconfont icon-qiandao',
						text: '手工登记'
					}
				]
			}
		},
		methods: {

		},
		components: {
			signItem
		}
	}
</script>

<style>
	.signMethods {
		margin-top: 80rpx;
		margin-bottom: 60rpx;
	}

	.historyText {
		border-bottom: 1px solid #797979;
	}
	
	.historyText text:nth-child(1){
		font-size: 26rpx;
		color: #797979;
		text-align: left;
		/* float: left;
		position: absolute;
		left: 10rpx; */
	}
	
	.historyText text:nth-child(2){
		font-size:26rpx;
		color:#2697EB;
		/* text-align: right; */
		float: right;
		position: absolute;
		right: 10rpx;
	}
</style>
