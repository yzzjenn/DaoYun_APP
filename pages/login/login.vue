<template>
	<view>
		<!-- 登录方式导航 -->
		<view class="methods">
			<view class="code" @click="chooseMethods(0)" :class="index===0?'activeMethods':''">
				<text>验证码登录</text>
			</view>
			<view class="password" @click="chooseMethods(1)" :class="index===1?'activeMethods':''">
				<text>密码登录</text>
			</view>
		</view>
		<!-- 登录具体页面 -->
		<view class="codeLogin" v-show="index===0">
			<view class="phone">
				<view class="top">
					<view class="left">
						<uni-icons type="phone" size="20"></uni-icons>
					</view>
					<view class="right">
						<text>手机号</text>
					</view>
				</view>
				<view class="bottom">
					<input type="text" placeholder="仅支持大陆手机号">
				</view>
			</view>
			<view class="email">
				<view class="emailLeft">
					<view class="top">
						<view class="left">
							<uni-icons type="email" size="20"></uni-icons>
						</view>
						<view class="right">
							<text>验证码</text>
						</view>
					</view>
					<view class="bottom">
						<input type="number">
					</view>
				</view>
				<view class="emailRight">
					<button type="primary">获取验证码</button>
				</view>
			</view>
			<button type="primary" style="margin-top: 20px;margin-left: 50px;margin-right: 15px;"
					@click="login()">登录</button>
			<navigator url="../register/register">
				<view class="register">
					<text>注册新账号</text>
				</view>
			</navigator>
		</view>
		<view class="passwordLogin" v-show="index===1">
			<view class="account">
				<view class="top">
					<view class="left">
						<uni-icons type="person" size="20"></uni-icons>
					</view>
					<view class="right">
						<text>账号</text>
					</view>
				</view>
				<view class="bottom">
					<input type="text" placeholder="请输入手机号或者邮箱">
				</view>
			</view>
			<view style="margin-top: 20px;">
				<view class="top">
					<view class="left">
						<uni-icons type="locked" size="20"></uni-icons>
					</view>
					<view class="right">
						<text>密码</text>
					</view>
				</view>
				<view class="bottom">
					<input type="text" placeholder="请输入密码">
				</view>
			</view>
			<button type="primary" style="margin-top: 20px;margin-left: 50px;margin-right: 15px;"
					@click="login()">登录</button>
			<view style="margin-left: 50px;
						margin-right: 15px;
						text-align: center;
						font-size: 14px;
						margin-top: 20px;
						line-height: 14px;
						color: #007AFF;">
				<navigator url="../register/register">
					<text style="float: left;">注册新账号</text>
				</navigator>
				<navigator url="../forgetPassword/forgetPassword">
					<text style="float: right;">忘记密码</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0
			}
		},
		methods: {
			chooseMethods(methodsNumber) {
				this.index = methodsNumber
			},
			login(){
				uni.switchTab({
					url:'../class/class'
				})
			}
		}
	}
</script>

<style>
	.methods {
		width: 100%;
		height: 100px;
		display: flex;
	}

	.code {
		flex: 1;
		margin: 30px;
		text-align: center;
	}

	.password {
		flex: 1;
		margin: 30px;
		text-align: center;
	}

	.code text {
		line-height: 20px;
		margin: 20px 20px 0 20px;
	}

	.password text {
		line-height: 20px;
		margin: 20px 20px 0 10px;
	}

	.activeMethods {
		color: #6495ED;
		border-bottom: 1px solid #007AFF;
	}

	.top {
		display: flex;
		padding-left: 50px;

	}

	.left .right {
		flex: 1;
	}

	.right {
		margin-left: 10px;
		text-align: center;
		font-size: 16px;
	}

	.bottom {
		margin-top: 10px;
		margin-left: 50px;
		margin-right: 20px;
		border-bottom: 1px solid #555555;
	}
	.email{
		margin-top:20px;
		display: flex;
	}
	.emailLeft{
		flex:4;
	}
	.emailRight{
		flex:2;
		padding-right: 10px;
		padding-top: 5px;
	}
	.register{
		color:#007AFF;
		text-align: center;
		line-height: 14px;
		font-size: 14px;
		margin-top: 10px;
	}
</style>
