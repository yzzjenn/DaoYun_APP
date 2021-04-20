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
			<uni-forms ref="codeform" :value="FormData" validate-trigger="bind" :rules="rules">
				<view class="phone">
					<view class="top">
						<view class="left">
							<uni-icons type="phone" size="20"></uni-icons>
						</view>
						<view class="right">
							<text>手机号</text>
						</view>
					</view>
					<uni-forms-item name="phone" style="margin-top: 10px;margin-left: 50px;margin-right: 20px;">
						<uni-easyinput type="number" v-model="FormData.phone" placeholder="请输入手机号码"></uni-easyinput>
					</uni-forms-item>
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
						<uni-forms-item name="code" style="margin-top: 10px;margin-left: 50px;margin-right: 20px;">
							<uni-easyinput type="number" placeholder="请输入验证码" v-model="FormData.code">
							</uni-easyinput>
						</uni-forms-item>
					</view>
				</view>
				<view class="reBtn">
					<button type="primary" style="flex: 1;" @click="getCode">获取验证码</button>
					<button type="primary" style="flex: 1;" @click="codesubmit">登录</button>
				</view>
			</uni-forms>
			<navigator url="../register/register">
				<view class="register">
					<text>注册新账号</text>
				</view>
			</navigator>
		</view>

		<view class="passwordLogin" v-show="index===1">
			<uni-forms ref="passform" :value="FormData" validate-trigger="bind" :rules="rules">
				<view class="account">
					<view class="top">
						<view class="left">
							<uni-icons type="person" size="20"></uni-icons>
						</view>
						<view class="right">
							<text>账号</text>
						</view>
					</view>
					<uni-forms-item name="account" style="margin-top: 10px;margin-left: 50px;margin-right: 20px;">
						<uni-easyinput type="text" placeholder="请输入手机号码" v-model="FormData.account">
						</uni-easyinput>
					</uni-forms-item>
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
					<uni-forms-item name="password" style="margin-top: 10px;margin-left: 50px;margin-right: 20px;">
						<uni-easyinput type="text" placeholder="请输入密码" v-model="FormData.password"></uni-easyinput>
					</uni-forms-item>
				</view>
				<button type="primary" style="margin-top: 20px;margin-left: 50px;margin-right: 15px;"
					@click="passsubmit">登录</button>
			</uni-forms>
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
				index: 0,
				FormData: {
					phone: '',
					code: '',
					account: '',
					password: ''
				},
				rules: {
					phone: {
						rules: [{
							required: true,
							errorMessage: '请输入电话号码'
						}, {
							pattern: /^1[3456789]\d{9}$/,
							errorMessage: '请输入正确的手机号码'
						}]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码'
						}]
					},
					account: {
						rules: [{
							required: true,
							errorMessage: '请输入账号'
						},{
							pattern: /^1[3456789]\d{9}$/,
							errorMessage: '请输入正确的手机号码'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码'
						}, {
							minLength: 6,
							maxLength: 20,
							errMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
						}],
						label: '密码'
					},
				}
			}
		},
		methods: {
			chooseMethods(methodsNumber) {
				this.index = methodsNumber
			},
			codesubmit: function(e) {
				this.$refs.codeform.submit().then(res => {
					uni.hideLoading()
					console.log('表单数据信息：', res);
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			passsubmit: function(e) {
				this.$refs.passform.submit().then(res => {
					uni.hideLoading()
					console.log('表单数据信息：', res);
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			getCode: function() {

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


	.email {
		margin-top: 20px;
		display: flex;
	}

	.emailLeft {
		flex: 4;
	}

	.emailRight {
		flex: 2;
		padding-right: 10px;
		padding-top: 5px;
	}

	.register {
		color: #007AFF;
		text-align: center;
		line-height: 14px;
		font-size: 14px;
		margin-top: 10px;
	}

	.reBtn {
		display: flex;
	}

	button {
		border-radius: 10%;
		margin: 10rpx;
	}
</style>
