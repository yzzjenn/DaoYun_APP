<template>
	<view class="register">
		<form>
			<view class="formItem">
				<text class="left">手机号</text>
				<input type="number" placeholder="请输入手机号" class="right" />
			</view>
			<view class="formItem">
				<text class="left">邮箱</text>
				<input type="text" placeholder="请输入邮箱" class="right" />
			</view>
			<view class="formItem">
				<text class="left">昵称</text>
				<input type="text" placeholder="请输入昵称" class="right" />
			</view>
			<view class="formItem">
				<text class="left">密码</text>
				<input type="text" placeholder="请输入密码" class="right" />
			</view>
			<view class="formItem">
				<text class="left">确认密码</text>
				<input type="text" placeholder="请再次输入密码" class="right" />
			</view>
			<view class="code">
				<view class="codeText">
					<text class="left">验证码</text>
					<input placeholder="请输入验证码" class="right" />
				</view>
				<button type="primary" size="mini" class="codeBtn">获取验证码</button>
			</view>
			<view style="display: flex;margin: 30px auto auto 30px;">
				<text style="flex:2">选择身份</text>
				<view style="flex:6;">
					<radio-group>
						<radio value="老师">老师</radio>
						<radio value="学生">学生</radio>
					</radio-group>
				</view>
			</view>
			<navigator url="../login/login">
				<button type="primary" style="margin: 30px 30px auto 30px;">注册</button>
			</navigator>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ['手机号', '邮箱', '昵称', '密码', '确认密码']
			}
		},
		methods: {

		},
		components: {}
	}
</script>

<style>
	.formItem {
		display: flex;
		margin: 30px;
		border-bottom: 1px solid #999999;
		height: 30px;
	}

	.left {
		flex: 2;
		padding-left: 10px;
		margin: 0;
	}

	.right {
		flex: 6;
		margin: 0;
	}

	.formItem:nth-child(1) {
		margin-top: 100px;
	}

	.code {
		display: flex;
		height: 30px;
		margin: 30px 30px auto 30px;
	}

	.codeText {
		display: flex;
		flex: 6;
		border-bottom: 1px solid #999999;
	}

	.codeBtn {
		flex: 2;
	}
</style>
