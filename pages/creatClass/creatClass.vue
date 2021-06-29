<template>
	<view>
		<uni-nav-bar  :title="status === '教师'?'创建班课':'加入班课'" backgroundColor="#1B82D2" color="white"></uni-nav-bar>
		<view v-if="status === '教师'" class="forget-bg">
			<uni-forms ref="form" :value="formData" class="forget-card">
				<uni-forms-item label="课程名称" name="courseName" class="forget-input forget-margin-b">
					<uni-easyinput type="text" v-model="formData.courseName" placeholder="请输入课程名称"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="班级" name="className" class="forget-input forget-margin-b">
					<uni-easyinput type="text" v-model="formData.className" placeholder="请输入班级"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="学期" name="semester" class="forget-input forget-margin-b">
					<picker mode="selector" :value="index" :range="semester" @change="semesterChange">
						<view class="uni-input" style="border: 1px solid dashed;">{{semester[index]}}</view>
					</picker>
				</uni-forms-item>
				<uni-forms-item label="学校院系" class="forget-input forget-margin-b">
					<uni-data-picker popup-title="请选择学校院系" :localdata="school" @change="onChange($event)">
						<text>{{scoCheckedText+depCheckedText}}</text>
						<uni-icons type="arrowright" style="float: right;"></uni-icons>
					</uni-data-picker>
				</uni-forms-item>
				<button type="primary" @click="submit">创建班课</button>
			</uni-forms>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="success" title="创建成功" :duration="2000" :before-close="true" @close="close"
					@confirm="confirm">
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="joinclass" v-if="status ==='学生'">
			<view>
				<uni-easyinput type="number" 
				placeholder="请输入班课号" 
				v-model="courseCode"  
				suffixIcon="search" 
				@iconClick="check" 
				style="transform: scale(0.9);"></uni-easyinput>
			</view>
			<uni-card title="班课信息" is-shadow="true" note="true" v-show="info">
				<uni-list>
					<uni-list-item title="班课名称:" direction="row">
						<text slot="footer">{{courseInfo.courseName}}</text>
					</uni-list-item>
					<uni-list-item title="班级:" direction="row">
						<text slot="footer">{{courseInfo.className}}</text>
					</uni-list-item>
					<uni-list-item title="任课老师:" direction="row">
						<text slot="footer">{{courseInfo.teacherName}}</text>
					</uni-list-item>
					<uni-list-item title="学院:" direction="row">
						<text slot="footer">{{courseInfo.college['name']}}</text>
					</uni-list-item>
					<uni-list-item title="学期:" :rightText="courseInfo.semester" direction="row">
						<text slot="footer">{{courseInfo.semester}}</text>
					</uni-list-item>
				</uni-list>
				<template v-slot:footer>
					<view class="footer-box">
						<button type="primary" @click="joinClass()">加入</button>
					</view>
				</template>
			</uni-card>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="success" title="加入成功" :duration="2000" :before-close="true" @close="close"
					@confirm="confirm">
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>

</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar
		},
		data() {
			return {
				formData: {
					courseName: '',
					className: '',
					semester: '',
					school: {
						id: Number
					},
					college: {
						id: Number
					},
					teacherName: '',
					createUser: {
						id: Number
					}

				},
				index: 0,
				// picker组件的值
				semester: ['2021-2022-1', '2020-2021-02', '2019-2020-02', '2019-2020-01'],
				school: [],
				scoCheckedText: '',
				depCheckedText: '',
				status: '',
				courseCode: '',
				userId: Number,
				courseInfo: {
					college: {}
				},
				info:false
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.status = res.data.status
					that.userId = res.data.id
				}
			})
		},
		onHide(){
			console.log('消失了')
			this.info = false
			this.courseCode = ''
		},
		created: function() {
			uni.hideLoading()
			this.http.sendRequest2('/mobileApp/college', {}, 'get').then(res => {
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
			})
		},
		methods: {
			semesterChange: function(e) {
				this.formData.semester = e.target.value
			},
			check() {
				const that = this
				const params = {
					courseCode: that.courseCode
				}
				that.http.sendRequest2('/mobileApp/course/info', params, 'get').then(res => {
						console.log(res)
						that.courseInfo = res
						that.info = true
					}

				)
			},
			onChange: function(e) {
				this.scoCheckedText = e.detail.value[0].text
				this.depCheckedText = e.detail.value[1].text
				this.formData.school.id = e.detail.value[0].value
				this.formData.college.id = e.detail.value[1].value
			},
			submit: function() {
				let that = this
				const user = uni.getStorage({
					key: 'user',
					success: function(res) {
						that.formData.teacherName = res.data.name
						that.formData.createUser.id = res.data.id
						that.http.sendRequest2('/mobileApp/course', that.formData, 'post').then(res => {
							that.$refs.popup.open()
						})
					}
				})
			},
			close: function(done) {
				done()
			},
			confirm: function(done) {
				uni.switchTab({
					url:'../class/class'
				})	
				this.courseCode = ''
				this.courseInfo={
					college: {}
				}
				this.info=false
				done()
			},
			joinClass: function() {
				const api = '/mobileApp/join/course?userId=' + this.userId + '&courseCode=' + this.courseCode
				this.http.sendRequest2(api, {}, 'get').then(res => {
					console.log(res)
					if (res) {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 3000
						})
					} else {
						this.$refs.popup.open()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	text {
		font-size: 28rpx;
		color: #3b4144;
		// justify-content: space-around;
	}


	uni-data-picker {
		transform: scale(0.8);
	}

	.joinclass {
		position: relative;
		padding-top: 100rpx;
	}

.uni-card__content--pd{
	padding:0 12px 12px 12px !important;
}
	button {
		width: 580rpx;
		height: 100rpx;
		text-align: center;
		margin-top: 10rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		;
		border-radius: 40rpx;
	}

	// form{
	// 	position: absolute;
	// 	top:200rpx;
	// 	left: 100rpx;
	// }

	.forget-btn {
		padding: 10upx 20upx;
		margin-top: 380upx;
	}

	.forget-margin-b {
		margin-bottom: 25upx;
	}

	.forget-input {
		padding: 10upx 20upx;
		overflow: auto;
	}

	.forget-card {
		background: #fff;
		border-radius: 12upx;
		padding: 60upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 120upx;
	}

	.forget-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));

	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));

	}
</style>
