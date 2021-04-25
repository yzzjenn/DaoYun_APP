<template>
	<view style="justify-content: center;">
		<!-- 登录方式导航 -->
		<view class="methods">
			<view class="code" @click="chooseMethods(0)" :class="index===0?'activeMethods':''">
				<text>验证码登录</text>
			</view>
			<view class="password" @click="chooseMethods(1)" :class="index===1?'activeMethods':''">
				<text>密码登录</text>
			</view>
		</view>
		<view class="main">
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
						<uni-forms-item name="phoneNumber" style="margin-top: 10px;">
							<uni-easyinput type="number" v-model="FormData.phoneNumber" placeholder="请输入手机号码">
							</uni-easyinput>
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
								<button type="primary" size="mini"
									style="position: absolute;right:0;bottom: 1px;margin: 0;" @click="getCode"
									class="button-login">
									{{time ==0 ?'获取验证码':'重新发送('+time+')'}}
								</button>
							</view>
							<uni-forms-item name="code" style="margin-top: 10px;">
								<uni-easyinput type="number" placeholder="请输入验证码" v-model="FormData.code">
								</uni-easyinput>
							</uni-forms-item>
						</view>
					</view>
					<view class="reBtn">
						<button type="primary" style="flex: 1;" @click="codesubmit" class="button-login"
							hover-class="button-hover">登录</button>
					</view>
				</uni-forms>
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
						<uni-forms-item name="account" style="margin-top: 10px;">
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
						<uni-forms-item name="password">
							<uni-easyinput type="password" placeholder="请输入密码" v-model="FormData.password">
							</uni-easyinput>
						</uni-forms-item>
					</view>
					<button class="button-login" hover-class="button-hover" type="primary" style="margin-top: 20px;"
						@click="passsubmit">登录</button>
				</uni-forms>
			</view>
		</view>

		<view class="other_login cuIcon">
			<view class="login_icon">
				<view class="cuIcon-weixin" @tap="login"></view>
			</view>
			<view class="login_icon">
				<view class="cuIcon-weibo" @tap="login"></view>
			</view>
			<view class="login_icon">
				<view class="cuIcon-github" @tap="login"></view>
			</view>
		</view>
		<view class="footer">
			<navigator url="../forgetPassword/forgetPassword" open-type="navigate">找回密码</navigator>
			<text>|</text>
			<navigator url="../register/register" open-type="navigate">注册账号</navigator>
		</view>
		<uni-popup ref="popup400" type="dialog">
			<uni-popup-dialog type="error" title="密码错误" content="前往忘记密码页面" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm('../forgetPassword/forgetPassword',0)"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup404" type="dialog">
			<uni-popup-dialog type="error" title="用户不存在" content="前往注册页面" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm('../register/register',0)"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="success" title="登陆成功" content="前往主页面" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm('../class/class',1)"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: 0,
				code: '',
				index: 0,
				FormData: {
					phoneNumber: '',
					code: '',
					account: '',
					password: ''
				},
				rules: {
					phoneNumber: {
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
						}, {
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
					if (this.code !== parseInt(res.code)) {
						uni.showToast({
							title: '验证码错误',
							icon: 'none'
						})
					} else {
						this.$refs.popup.open()
					}
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			passsubmit: function(e) {
				let that = this
				this.$refs.passform.submit().then(res => {
					const passData = {
						username: res.account,
						password: res.password
					}
					that.http.sendRequest('/mobileApp/login', passData, 'post').then(res => {
						console.log(res)
						if (res.data.message == '登录失败,密码错误') {
							that.$refs.popup400.open()
						} else if (res.statusCode === 500) {
							that.$refs.popup404.open()
						} else {
							that.$refs.popup.open()
							let userInfo = uni.getStorage({
								key: 'USER_KEY'
							})
							userInfo['phone'] = passData.username
							that.http.sendRequest('/mobileApp/userInfo?phone=' + passData.username, {},
								'get').then(res => {
								uni.hideLoading()
								userInfo = res.data
								userInfo['isLogined'] = true
								uni.setStorage({
									key: 'USER_KEY',
									data: userInfo
								})
							})
						}
					})
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			getCode: function() {
				if (this.time !== 0) {
					uni.showToast({
						title: '请' + this.time + 's后再重新获取'
					})
				}
				this.http.sendRequest('/mobileApp/check?phone=' + this.FormData.phoneNumber, {}, 'get').then(res => {
					console.log(res)
					if (res.statusCode === 200) {
						this.http.sendRequest('/api/code/phoneCode?phoneNumber=' + this.FormData.phoneNumber, {}, 'post').then(
							res => {
								this.code = res.data
							})
					} else {
						uni.showToast({
							title: '手机号未注册',
							icon: 'none'
						})
					}
				})
				const that = this
				that.time = 60
				const fn = setInterval(function() {
					that.time--
					if (that.time == 0) {
						clearInterval(fn)
					}
				}, 1000)
			},
			close: function(done) {
				done()
			},
			confirm: function(url, index) {
				if (index === 0) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.switchTab({
						url: url
					})
				}

			},
			login() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '开发中...'
				});
			}
		},
	}
</script>

<style>
	@import url("../../common/css/icon.css");

	.methods {
		width: 100%;
		height: 100px;
		display: flex;
	}

	.main {
		padding-left: 70rpx;
		padding-right: 70rpx;
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
		position: relative;

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
		margin: 10rpx;
	}

	.other_login {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 256rpx;
		text-align: center;
	}

	.login_icon {
		border: none;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0, 0, 0, 0.7)
	}

	.wechat_color {
		color: #83DC42;
	}

	.weibo_color {
		color: #F9221D;
	}

	.github_color {
		color: #24292E;
	}

	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.footer text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.button-login {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}
</style>
