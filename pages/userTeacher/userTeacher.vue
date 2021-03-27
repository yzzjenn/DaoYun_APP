<template>
	<view class="userTeacher">
		<view class="image">
			<view class="chooseImage" @click="chooseImage">
			</view>
		</view>
		<view class="middle">
			<uni-list v-for="(item,index) in leftTextMiddle" :key="index">
				<uni-list-item :title="item" :rightText="rightTextMiddle[index]"></uni-list-item>
			</uni-list>
		</view>
		<view class="bottom">
			<uni-list>
				<uni-list-item title="所在学校" note="福州大学数学与计算机科学学院" link></uni-list-item>
				<uni-list-item direction="row">
					<template slot="header">
						<text style="font-size: 28rpx;
						justify-content: space-between;
						color:#3b4144;
						overflow: hidden;">选择身份</text>
					</template>
					<template slot="footer">
						<radio-group style="transform: scale(0.8);">
							<radio value="老师">我是老师</radio>
							<radio value="学生">我是学生</radio>
						</radio-group>
					</template>
				</uni-list-item>
				<uni-list-item title="学号/工号" :rightText="rightTextMiddle[4]"></uni-list-item>
			</uni-list>
		</view>
		<button type="primary">保存</button>
	</view>
</template>

<script>
	import userTeacherItem from '../../components/userTeacherItem.vue'
	export default {
		data() {
			return {
				leftTextMiddle:['姓名','昵称','性别','出生年月'],
				rightTextMiddle:['jakcic','菲菲','男','19980713','200327146'],
			}
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
			}
		},
		components:{
			userTeacherItem
		}
	}
</script>

<style lang="scss">
	.userTeacher {
		padding: 0;
		margin: 0;
		background-color: #F8F8FF;
		.image {
			height: 180rpx;
			width: 750rpx;
			// background-color: #F8F8FF;
			padding: 10rpx 295rpx;
			text-align: center;
			line-height: 180rpx;

			.chooseImage {
				width: 160rpx;
				height: 160rpx;
				background-color: #F59A23;
				border-radius: 80rpx;
			}
		}
		.middle{
			margin: 20rpx 10rpx auto 10rpx;
			background-color: white;
		}
		.bottom{
			margin: 20rpx 10rpx auto 10rpx;
		}
		button{
			margin: 40rpx 10rpx auto 10rpx;
			border-radius: 30rpx;
			color: white;
		}
	}
</style>
