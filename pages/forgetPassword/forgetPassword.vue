<template>
	<view>
		<view class="first" v-show="index===0">
			<view class="top">
				<forget-item>
					<template v-slot:left>
						<uni-icons type="person-filled" size="20"></uni-icons>
					</template>
					<template v-slot:right>
						<input type="number" placeholder="请输入手机号" />
					</template>
				</forget-item>
			</view>
			<view class="bottom">
				<view class="left">
					<forget-item>
						<template v-slot:left>
							<uni-icons type="locked-filled" size="20"></uni-icons>
						</template>
						<template v-slot:right>
							<input type="number" placeholder="请输入验证码">
						</template>
					</forget-item>
				</view>
				<view class="right">
					<button type="primary" size="mini">获取验证码</button>
				</view>
			</view>
			<button type="primary" class="next" @click="goNext()">下一步</button>
		</view>
		<view class="second" v-show="index===1">
			<view class="resetPassWord">
				<input type="text" placeholder="请设置密码" />
			</view>
			<view class="tipsBox">
				<ul class="tips">
					<li>8-16位</li>
					<li>包含字母</li>
					<li>包含数字</li>
					<li>包含特殊字符</li>
				</ul>
			</view>
			<navigator url="../login/login">
				<button type="primary">完成</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	import forgetItem from '../../components/forgetItem.vue'
	export default {
		data() {
			return {
				index: 0
			}
		},
		methods: {
			goNext() {
				this.index++;
			}
		},
		components: {
			forgetItem
		}
	}
</script>

<style>
	.top {
		margin: 100px 50px auto 50px;
		border-bottom: 1px solid #808080;
		padding-bottom: 10px;
	}

	.bottom {
		display: flex;
	}

	.left {
		flex: 5;
		margin: 50px auto auto 50px;
		border-bottom: 1px solid #808080;
		padding-bottom: 10px;
	}

	.right {
		flex: 4;
		padding-top: 50px;
		padding-right: 30px;
	}

	.next {
		margin: 50px 50px auto 50px;
	}
	.tips{
		width: 200px;
		height: 100px;
		list-style-type: circle;
	}
	.tips li{
		width: 100px;
		float: left;
		color: #999999;
	}
	.resetPassWord{
		margin: 100px 50px auto 50px;
		border-bottom: 1px solid #8F8F94;
	}
	.tipsBox{
		margin: 30px 50px auto 30px;
	}
</style>
