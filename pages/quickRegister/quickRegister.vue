<template>
	<view class="content">
		<view class="header">
			<image src="../../static/icon/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="../../static/icon/1.png"></image>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="../../static/icon/3.png"></image>
				<input class="sl-input" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		<view class="button-login" hover-class="button-hover" @tap="bindLogin">
			<text>注册</text>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="success" title="注册成功" content="前往登录页面"
			:duration="2000" :before-close="true" @close="close"@confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	var _this, js;
	export default {
		onLoad() {
			_this = this;

		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phone: '',
				code: '',
				showPassword: false,
				second: 0,
				conCode: '',
				studentForm: {
					phone: '',
					name: '',
					password: '',
					sex: '',
					email: '',
					studentNumber: '',
					status: '',
					dept: {id:16},
					college: {
						id:17},
					type: 3
				},
			};
		},
		computed: {
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		onUnload() {
			this.clear()
		},
		methods: {
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			display() {
				this.showPassword = !this.showPassword
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
			},
			getcode() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				//请求业务
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)
				this.http.sendRequest('/api/code/phoneCode?phoneNumber=' + this.phone, {}, 'post').then(
					res => {
						this.conCode = res.data
					})
			},
			bindLogin() {
				this.studentForm = {
					phone: this.phone,
					password: '',
					name: this.phone,
					sex: '男',
					studentNumber: '',
					status: 'student',
					email: '',
					college:{
						id:16
					} ,
					dept: {
						id:17
					},
					type: 3
				}
				if (this.conCode !== parseInt(this.code)) {
					uni.showToast({
						title: '验证码输入错误',
						icon: 'none'
					})
				} else {
					this.http.sendRequest('/mobileApp/student/register',this.studentForm , 'post').then(res => {
						if (res.statusCode == 200) {
							this.$refs.popup.open()
						} else {
							uni.showToast({
								title: '注册失败',
								icon: 'none'
							})
						}
					})
				}
			},
			close(done) {
				done()
			},
			confirm() {
				uni.switchTab({
					url:'../class/class'
				})
			}
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid #FFA800;
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.agreement {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreement image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
