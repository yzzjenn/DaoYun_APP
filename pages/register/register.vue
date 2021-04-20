<template>
	<view class="register">
		<uni-forms ref="form" :value="formData" validate-trigger="bind" :rules="rules">
			<swiper  :current="current">
				<swiper-item class="first">
					<uni-forms-item label="手机号" name="phone">
						<uni-easyinput type="number" v-model="formData.phone" placeholder="请输入手机号码"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="密码" name="password">
						<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" ></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="确认密码" name="confirmPassword">
						<uni-easyinput type="password" v-model="formData.confirmPassword" placeholder="再次输入密码"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="验证码" name="code">
						<uni-easyinput type="number" v-model="formData.code" placeholder="请输入验证码" ></uni-easyinput>
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
					<uni-forms-item label="用户名" name="name">
						<uni-easyinput type="text" v-model="formData.nickname" placeholder="请输入用户名"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="学号/工号" name="studentNumber" required>
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
					<uni-forms-item label="学校" name="school">
						<picker mode="selector" @change="binddata" :range="finalGrade" 
						:range-key="'text'" v-model="formData.school">
						<uni-icons type="arrowright"></uni-icons>
						</picker>
					</uni-forms-item>
					<uni-forms-item label="学院" name="college">
						<uni-data-checkbox v-model="formData.college" :localdata="college"></uni-data-checkbox>
					</uni-forms-item>
					<view class="reBtn">
						<button type="primary" @click="previous" style="flex: 1;" size="mini">上一部</button>
						<button type="primary" @click="submit" style="flex: 1;" size="mini">注册</button>
					</view>	
				</swiper-item>
			</swiper>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				finalGrade:[
						{id:'01',text:'60%'},
						{id:'02',text:'70%'},
						{id:'03',text:'80%'}],
				current:0,
				status: [
					{
					text: '我是老师',
					value: 'teacher'
				    }, 
					{
					text: '我是学生',
					value: 'student'
				    }],
					sex:[{
						text:'男',
						value:'男'
					},{
						text:'女',
						value:'女'
					}
					],
				formData: {
					phone: '',
					email: '',
					name: '',
					password: '',
					confirmPassword: '',
					status: '',
					code: '',
					number:'',
					sex:'',
					nickname:'',
					dept:{
						id:8
					},
					school:{id:8},
					college:{
						id:8
					}
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
						label:'密码'
					},
					confirmPassword: {
						rules: [{
							required: true,
							errorMessage: '请再次输入密码'
						},{
							validateFunction:function(rule,value,data,callback){
								if(value !== data.password){
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
					identify: {
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
		methods: {
			submit: function(e) {
				this.$refs.form.submit().then(res => {
					uni.hideLoading()
					console.log('表单数据信息：', res);
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			getCode:function(){
				
			},
			next:function () {
				this.current++
			},
			previous:function () {
				this.current--
			},
			binddata:function(e) {
				console.log(e.target.value)
				// this.$refs.form.setValue(name,value)
				// console.log(value)
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
	swiper{
		height: 500px;
	}
</style>
