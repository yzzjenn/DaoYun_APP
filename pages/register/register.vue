<template>
	<view class="register">
		<uni-forms ref="form" :value="formData" validate-trigger="bind" :rules="rules">
			<swiper :current="current" disable-touch="true">
				<swiper-item class="first">
					<uni-forms-item label="手机号" name="phone">
						<uni-easyinput type="number" v-model="formData.phone" placeholder="请输入手机号码"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="密码" name="password">
						<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="确认密码" name="confirmPassword">
						<uni-easyinput type="password" v-model="formData.confirmPassword" placeholder="再次输入密码">
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="验证码" name="code">
						<uni-easyinput type="number" v-model="formData.code" placeholder="请输入验证码"></uni-easyinput>
					</uni-forms-item>
					<view class="reBtn">
						<button type="primary" style="flex: 1;" @click="getCode" size="mini">获取验证码</button>
						<button type="primary" style="flex: 1;" @click="next" size="mini">下一步</button>
					</view>
				</swiper-item>
				<swiper-item>
					<uni-forms-item label="姓名" name="name">
						<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="用户名" name="nickname">
						<uni-easyinput type="text" v-model="formData.nickname" placeholder="请输入用户名"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="学号/工号" name="number" required>
						<uni-easyinput type="text" v-model="formData.number" placeholder="请输入学号/工号"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="邮箱" name="email">
						<uni-easyinput type="text" v-model="formData.email" placeholder="请输入邮箱"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="选择身份" name="status">
						<uni-data-checkbox v-model="formData.status" :localdata="status"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item label="性别" name="sex">
						<uni-data-checkbox v-model="formData.sex" :localdata="sex"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item label="学校">
						<uni-data-picker popup-title="请选择学校院系" :localdata="school" @change="onChange($event)">
							<text>{{scoCheckedText+depCheckedText}}</text>
							<uni-icons type="arrowright" style="float: right;"></uni-icons>
						</uni-data-picker>
					</uni-forms-item>
					<view class="reBtn">
						<button type="primary" @click="previous" style="flex: 1;" size="mini">上一步</button>
						<button type="primary" @click="submit" style="flex: 1;" size="mini">注册</button>
					</view>
				</swiper-item>
			</swiper>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="success" title="注册成功" content="前往登录页面"
				:duration="2000" :before-close="true" @close="close"@confirm="confirm">
				</uni-popup-dialog>
			</uni-popup>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				school: [],
				scoCheckedText: '',
				depCheckedText: '',
				current: 0,
				status: [{
						text: '我是老师',
						value: 'teacher'
					},
					{
						text: '我是学生',
						value: 'student'
					}
				],
				sex: [{
					text: '男',
					value: '男'
				}, {
					text: '女',
					value: '女'
				}],
				formData: {
					phone: '',
					email: '',
					name: '',
					password: '',
					confirmPassword: '',
					status: '',
					code: '',
					number: '',
					sex: '',
					nickname: '',
					dept: {
						id: 8
					},
					school: {
						id: 8
					},
					college: {
						id: 8
					}
				},
				studentForm: {
					phone: '',
					name: '',
					password: '',
					sex: '',
					email: '',
					studentNumber: '',
					status: '',
					dept: {
						id: 8
					},
					school: {
						id: 8
					},
					college: {
						id: 8
					},
					type: 3
				},
				teacherForm: {
					phone: '',
					username: '',
					nickname: '',
					password: '',
					gender: '',
					email: '',
					status: '',
					dept: {
						id: 8
					},
					school: {
						id: 8
					},
					college: {
						id: 8
					},
					enabled: true,
					type: 2
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
					email: {
						rules: [{
							required: true,
							errorMessage: '请输入邮箱'
						}, {
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入昵称'
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
					confirmPassword: {
						rules: [{
							required: true,
							errorMessage: '请再次输入密码'
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value !== data.password) {
									callback('两次输的密码不一致')
								}
								return true
							}
						}]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码'
						}]
					},
					status: {
						rules: [{
							required: true,
							errorMessage: '请选择身份'
						}]
					}
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		created: function() {
			this.http.sendRequest('/mobileApp/college', {}, 'get', {
				'Content-Type': 'application/json',
			}).then(res => {
				console.log(res)
				for (let i = 0; i < res.length; i++) {
					let tmp = {
						value: res[i].id,
						text: res[i].label,
						children: []
					}
					if (res[i].hasChildren) {
						for (let j = 0; j < res[i].children.length; j++) {
							let keys = {
								value: res[i].children[j].id,
								text: res[i].children[j].label,
								children: []
							}
							tmp.children.push(keys)
						}
					}
					this.school.push(tmp)
				}
				console.log(this.school)
			})

		},
		methods: {
			submit: function(e) {
				this.$refs.form.submit().then(res => {
					uni.hideLoading()
					if (res.status === 'student') {
						this.studentForm = {
							phone: this.formData.phone,
							password: this.formData.password,
							name: this.formData.name,
							sex: this.formData.sex,
							studentNumber: this.formData.number,
							status: this.formData.status,
							email: this.formData.email,
							school: this.formData.school,
							college: this.formData.college,
							dept: this.formData.dept,
							type: 3
						}
						console.log(this.studentForm)
						this.http.sendRequest('/mobileApp/student/register',this.studentForm,'post',{
							'Content-Type': 'application/json',
						}).then(res=>{
							this.$refs.popup.open()
						})
					}
					if (res.status === 'teacher') {
						this.teacherForm = {
							phone: this.formData.phone,
							password: this.formData.password,
							nickname: this.formData.name,
							username:this.formData.nickname,
							gender: this.formData.sex,
							status: this.formData.status,
							email: this.formData.email,
							school: this.formData.school,
							college: this.formData.college,
							dept: this.formData.dept,
							enabled:true,
							type: 2
						}
						console.log(this.teacherForm)
						this.http.sendRequest('/mobileApp/teacher/register',this.teacherForm,'post',{
							'Content-Type': 'application/json',
						}).then(res=>{
							this.$refs.popup.open()
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			onChange: function(e) {
				console.log(e)
				this.scoCheckedText = e.detail.value[0].text
				this.depCheckedText = e.detail.value[1].text
				this.formData.school.id = e.detail.value[0].value
				this.formData.college.id = e.detail.value[1].value
			},
			getCode: function() {
				
			},
			next: function() {
				this.current++
			},
			previous: function() {
				this.current--
			},
			close(done) {
				done()
			},
			confirm(done, value) {
				uni.navigateTo({
					url:'../login/login'
				})
			}
		},
		components: {}
	}
</script>

<style>
	.register {
		padding: 40rpx;
	}

	.reBtn {
		display: flex;
	}

	button {
		margin: 10rpx;
	}

	swiper {
		height: 500px;
	}
</style>
