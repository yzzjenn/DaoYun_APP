<template>
	<view class="Information">
		<view class="member" v-show="index===0">
			<view class="top">
				<view class="qrimg">
					<tki-qrcode ref="qrcode" :val="courseCode" :size="size" :unit="unit" :background="background"
						:foreground="foreground" :pdground="pdground" :lv="lv" :onval="onval" :loadMake="loadMake"
						@result="qrR" />
				</view>
			</view>
			<uni-list>
				<uni-list-item title="成员总数" :rightText="course.studentCount+''">
				</uni-list-item>
				<uni-list-item direction="row" title="1"
					thumb="../../static/icon/title.png"
					v-for="(item, index) in courseStudent" :key="index">
					<template slot="body">
						<member-item :student="item"></member-item>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="infor" v-show="index===1" style="width: 100%;">
			<view class="bankeImg">
				<image src="../../static/icon/title.png"></image>
			</view>
			<uni-list v-if="user.status == '教师'">
				<uni-list-item title="班课名称" direction="row">
					<input slot="footer" type="text" :value="course.courseName" @input="onCourseName" />
				</uni-list-item>
				<uni-list-item title="班课编号" direction="row">
					<input slot="footer" type="number" :value="course.courseCode" disabled="" />
				</uni-list-item>
				<uni-list-item title="任课老师" direction="row">
					<input slot="footer" type="text" :value="course.teacherName" @input="onTeacherName" />
				</uni-list-item>
				<uni-list-item title="班级" direction="row">
					<input slot="footer" type="text" :value="course.className" @input="onClassName" />
				</uni-list-item>
				<uni-list-item title="学期" direction="row">
					<input slot="footer" type="text" :value="course.semester" @input="onSemester" />
				</uni-list-item>
				<uni-list-item title="学院" direction="row">
					<input slot="footer" type="text" :value="course.college['name']" disabled />
				</uni-list-item>
				<uni-list-item title="是否允许加入" direction="row">
					<radio-group style="transform: scale(0.8);" @change="radioJoinChange" slot="footer">
						<radio v-for="item in radio" 
						:key="item.id" 
						:value="item.code"
						:checked="item.code === course.joinPermission+''"
						>{{item.text}}</radio>
					</radio-group>
				</uni-list-item>
				<uni-list-item title="班课是否结束" direction="row" >
					<radio-group style="transform: scale(0.8);" @change="radioEndChange" slot="footer">
						<radio v-for="item in radio" 
						:key="item.id" 
						:value="item.code"
						:checked="item.code === course.enabled+''"
						>{{item.text}}</radio>
					</radio-group>
				</uni-list-item>
			</uni-list>
			<uni-list v-if="user.status == '学生'">
				<uni-list-item title="班课名称" direction="row">
					<input slot="footer" type="text" :value="course.courseName" disabled />
				</uni-list-item>
				<uni-list-item title="班课编号" direction="row">
					<input slot="footer" type="number" :value="course.courseCode" disabled  />
				</uni-list-item>
				<uni-list-item title="任课老师" direction="row">
					<input slot="footer" type="text" :value="course.teacherName" disabled  />
				</uni-list-item>
				<uni-list-item title="班级" direction="row">
					<input slot="footer" type="text" :value="course.className" disabled  />
				</uni-list-item>
				<uni-list-item title="学期" direction="row">
					<input slot="footer" type="text" :value="course.semester" disabled  />
				</uni-list-item>
				<uni-list-item title="学院" direction="row">
					<input slot="footer" type="text" :value="course.college['name']" disabled />
				</uni-list-item>
				<uni-list-item title="是否允许加入" direction="row">
					<input slot="footer" type="text" :value="course.joinPermission?'允许加入':'禁止加入'" disabled />
				</uni-list-item>
				<uni-list-item title="班课是否结束" direction="row" >
					<input slot="footer" type="text" :value="course.enabled?'未结束':'已结束'" disabled />
				</uni-list-item>
			</uni-list>
			<view class="btn" v-if="user.status == '教师'">
				<button style="background-color: #007AFF;text-align: center;color: white;font-size:24rpx ;"
					@click="update">保存</button>
				<button style="background-color:#EE7AE9 ;text-align: center;color: white;font-size: 24rpx;">删除</button>
			</view>
			<view v-if="user.status == '学生'">
				<button style="background-color: #007AFF;text-align: center;color: white;" @click="quit">退出班课</button>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="success" title="退出班课成功!" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
		<hans-tabber :list="list" style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange">
		</hans-tabber>
	</view>
</template>

<script>
	import tkiQrcode from 'tki-qrcode'
	import hansTabber from '../../components/hans-tabbar.vue'
	import memberItem from '../../components/memberItem.vue'
	export default {
		data() {
			return {
				list: [{
						"text": "成员",
						"iconPath": '../../static/icon/correct.png',
						"selectedIconPath": '../../static/icon/correct-select.png'
					},
					{
						"text": '详情',
						"iconPath": '../../static/icon/analyse.png',
						"selectedIconPath": '../../static/icon/analyse-select.png'
					}
				],
				number: 4,
				index: 0,
				courseCode: Number,
				// 二维码相关变量
				size: 250,
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				lv: 3,
				onval: true,
				unit: 'upx',
				loadMake: true,
				course: {
					college: {}
				},
				user: {},
				courseStudent: [],
				classInfo: {
					'id': '',
					'courseCode': '',
					'courseName': '',
					'className': '',
					'teacherName': '',
					'semester': '',
					'joinPermission': true,
					'enabled': false,
				},
				radio:[
					{
						text:'是',
						code:'true'
					},
					{
						text:'否',
						code:'false'
					}
				]
			}
		},
		onLoad(option) {
			// console.log(option.courseCode)
			this.courseCode = option.courseCode
			let that = this
			that.http.sendRequest2('/mobileApp/course/info?courseCode=' + option.courseCode, {}, 'get')
				.then(res => {
					console.log(res)
					that.course = res
					that.classInfo.courseName = that.course.courseName
					that.classInfo.teacherName = that.course.teacherName
					that.classInfo.className = that.course.className
					that.classInfo.semester = that.course.semester
					that.classInfo.courseCode = that.courseCode
					that.classInfo.id = that.course.id
					that.course.studentCount = that.course.studentCount
					that.http.sendRequest2('/mobileApp/course/student?id=' + res.id, {}, 'get').then(data => {
						that.courseStudent = data
					})
				})
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.user = res.data
				}
			})
		},
		methods: {
			tabChange(index) {
				this.index = index;
			},
			goToSign() {
				uni.navigateTo({
					url: '../sign/sign'
				})
			},
			close: function(done) {
				done()
			},
			confirm: function(done) {
				uni.switchTab({
					url:'../class/class'
				})
				done()
			},
			qrR() {
				console.log(1)
			},
			quit: function() {
				const that = this
				that.http.sendRequest2('/mobileApp/quit/course?courseCode=' + that.courseCode + '&userId=' + that.user
						.id, {}, 'get')
					.then(res => {
						that.$refs.popup.open()		
					})
			},
			onCourseName: function(event) {
				// console.log(event)
				this.classInfo.courseName = event.target.value
			},
			onTeacherName: function(event) {
				this.classInfo.teacherName = event.target.value
			},
			onClassName: function(event) {
				this.classInfo.className = event.target.value
			},
			onSemester: function(event) {
				this.classInfo.semester = event.target.value
			},
			radioJoinChange:function(res){
				this.classInfo.joinPermission = res.detail.value
			},
			radioEndChange:function(res){
				this.classInfo.enabled = res.detail.value
			},
			update:function(){
				console.log(this.classInfo)
				this.http.sendRequest2('/mobileApp/course/update',this.classInfo,'put').then(res=>{
					if(res){
						uni.showToast({
							title:res.message,
							icon:'none',
							duration:3000
						})
					}else{
						uni.showToast({
							title:'修改班课成功',
							icon:'none',
							duration:3000
						})
					}
				})
			}
		},
		components: {
			hansTabber,
			memberItem,
			tkiQrcode
		}
	}
</script>

<style lang="scss">
	.Information {
		margin: 0;
		padding: 0;

		.top {
			position: relative;
			width: 750rpx;
			height: 300rpx;
			text-align: center;
			line-height: 300rpx;
			
			.qrimg{
				padding-top:30rpx;
			}

		}

		.bankeImg {
			width: 750rpx;
			height: 160rpx;
			text-align: center;
			line-height: 160rpx;
			background-color: #F2F2F2;

			image {
				width: 80rpx;
				height: 80rpx;
				display: inline-block;
				vertical-align: middle;
			}
		}

		.btn {
			display: flex;
			margin-top: 10rpx;

			button {
				width: 300rpx;
			}
		}
	}
	
	input{
		font-size: 28rpx;
		color: #3b4144;
	}
</style>
