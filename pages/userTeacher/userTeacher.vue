<template>
	<view class="personal-data">
		<view class="list">
		  <view class="item acea-row row-between-wrapper">
		    <view class="title">昵称</view>
		    <view class="input">
		      <input type="text" v-model="user.name" />
		    </view>
		  </view>
		  <view class="item acea-row row-between-wrapper">
		    <view class="title">ID号</view>
		    <view class="input acea-row row-between-wrapper">
		      <input type="text" :value="user.number" disabled class="id" />
		      <text class="iconfont icon-suozi"></text>
		    </view>
		  </view>
		  <view class="item acea-row row-between-wrapper">
		    <view class="title">手机号</view>
		    <view class="input">
		      <input type="text" v-model="user.phone" />
		    </view>
		  </view>
		<view class="item acea-row row-between-wrapper">
		    <view class="title">邮箱</view>
		    <view class="input">
		      <input type="text" v-model="user.email" />
		    </view>
		  </view>
		</view>
		<view class="bottom">
			<uni-list>
				<uni-list-item direction="row">
					<template slot="header">
						<text style="font-size: 28rpx;
						justify-content: space-between;
						color:#3b4144;
						overflow: hidden;">学校院系</text>
					</template>
					<template slot="footer">
						<uni-data-picker popup-title="请选择学校院系" :localdata="school" @change="onChange($event)">
							<text>{{scoCheckedText+depCheckedText}}</text>
							<uni-icons type="arrowright" style="float: right;"></uni-icons>
						</uni-data-picker>
					</template>
				</uni-list-item>
				<uni-list-item direction="row">
					<template slot="header">
						<text style="font-size: 28rpx;
						justify-content: space-between;
						color:#3b4144;
						overflow: hidden;">身份</text>
					</template>
					<template slot="footer">
						<radio-group style="transform: scale(0.8);"
						@change="radioStatusChange">
							<radio v-for="(item, index) in status" 
							:key="item" 
							:value="item"
							:checked="item === user.status"
							>{{item}}</radio>
						</radio-group>
					</template>
				</uni-list-item>
				<uni-list-item direction="row">
					<template slot="header">
						<text style="font-size: 28rpx;
						justify-content: space-between;
						color:#3b4144;
						overflow: hidden;">性别</text>
					</template>
					<template slot="footer">
						<radio-group style="transform: scale(0.8);" @change="radioSexChange">
							<radio v-for="(item, index) in sex" 
							:key="item" 
							:value="item"
							:checked="item === user.sex"
							>{{item}}</radio>
						</radio-group>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<button type="primary" @click="save">保存</button>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import userTeacherItem from '../../components/userTeacherItem.vue'
	export default {
		data() {
			return {
				user:{},
				school:[],
				scoCheckedText: '',
				depCheckedText: '',
				status:['教师','学生'],
				sex:['男','女'],
				scoCheckedValue:Number,
				depCheckedValue:Number
			}
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key:'user',
				success:function(res){
					that.user = res.data
					that.scoCheckedText = res.data.school
					that.depCheckedText = res.data.college
				}
			})
		},
		created: function() {
			uni.hideLoading()
			this.http.sendRequest2('/mobileApp/college',{},'get').then(res=>{
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
			chooseImage() {
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
				        // 预览图片
				        uni.previewImage({
				            urls: res.tempFilePaths,
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
				    }
				    });
			},
			onChange: function(e) {
				console.log(e)
				this.scoCheckedValue = e.detail.value[0].value
				this.depCheckedValue = e.detail.value[1].value
				this.scoCheckedText = e.detail.value[0].text
				this.depCheckedText = e.detail.value[1].text
			},
			save:function(){
				if(this.user.status == '教师'){
					uni.showToast({
						title:'教师请前往后台更改'
					})
					return 
				}
				const resetUser = {
					"id":this.user.id,
					"name":this.user.name,
					"phone":this.user.phone,
					"sex":this.user.sex,
					"status":this.user.status,
					"school":this.scoCheckedValue,
					"college":this.depCheckedValue,
					"number":this.user.number
				}
				this.http.sendRequest2("/mobileApp/student/update", resetUser, 'post')
					.then(res=>{
						resetUser.school = this.scoCheckedText
						resetUser.college = this.depCheckedText
						resetUser.email = this.user.email
						uni.setStorage({
							key:'user',
							data:resetUser
						})
				})
			},
			radioStatusChange:function(res){
				this.user.status = res.detail.value
			},
			radioSexChange:function(res){
				this.user.sex = res.detail.value
			}
		},
		components:{
			userTeacherItem,
			uniIcons
		}
	}
</script>

<style>

		.bottom{
			margin: 20rpx 10rpx auto 10rpx;
		}
		
		button{
			margin: 40rpx 10rpx auto 10rpx;
			border-radius: 30rpx;
			color: white;
			background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		}
		
		.personal-data .list {
		  background-color: #fff;
		}
		
		.personal-data .list .item {
		  padding: 24rpx 30rpx;
		  border-bottom: 1px solid #f2f2f2;
		  margin-left: 0.3 * 100rpx;
		  font-size: 0.32 * 100rpx;
		  color: #282828;
		  display: flex;
		  overflow: hidden;
		}
		
		.title{
			font-size: 28rpx;
			color: rgb(59, 65, 68);
		}
		
		.personal-data .list .item .input {
		  width: 4.15 * 100rpx;
		  text-align: right;
		  color:rgb(59, 65, 68);
		  font-size: 28rpx;
		  position: absolute;
		  right: 10rpx;
		}
		
		.personal-data .list .item .input text{
		  text-align: right;
		 position: absolute;
		  right: 10rpx;
		  bottom: 10rpx;
		}
		
		.personal-data .list .item .input input {
		  color: rgb(59, 65, 68);
		  text-align: center;
		  width: 100%;
		}
		
		.personal-data .list .item .input .id {
		  width: 3.65 * 100rpx;
		}
		
		.personal-data .list .item .input .iconfont {
		  font-size: 0.35 * 100rpx;
		}
</style>
