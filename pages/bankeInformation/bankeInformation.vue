<template>
	<view class="Information">
		<view class="member" v-show="index===0">
			<view class="top">
				<button></button>
				<view style="margin-top: 210rpx;position: absolute;margin-left: 320rpx;">
					<text style="color:#2697EB ;font-size: 26rpx;">发起签到</text>	
				</view>
			</view>
			<uni-list>
				<uni-list-item title="成员总数" rightText="4"></uni-list-item>
				<uni-list-item direction="row" title="1" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" link>
					<template slot="body">
						<member-item></member-item>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="infor" v-show="index===1">
			<view class="bankeImg">
				<image src="../../static/icon/drawable-xhdpi-icon.png"></image>
			</view>
			<uni-list>
				<uni-list-item v-for="(value,key,index) in inforText" :key="index" :title="key" :rightText="value"></uni-list-item>
			</uni-list>
			<view class="btn">
				<button style="background-color: #007AFF;text-align: center;color: white;font-size:24rpx ;">保存</button>
				<button style="background-color:#EE7AE9 ;text-align: center;color: white;font-size: 24rpx;">删除</button>
			</view>
		</view>
		<hans-tabber :list="list" style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></hans-tabber>
	</view>
</template>

<script>
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
				number:4,
				index:0,
				inforText:{
					'班课名称':'工程训练',
					'班课介绍':'无',
					'班课学期':'2020-2021-2',
					'学校及院系':'福大数计',
					'日常比重':'30%',
					'期末比重':'70%',
					'任课教师':'池',
					'班课学周':'11周',
					'班课学分':'3分',
					'考试安排':'项目考核'
				}
			}
		},
		methods: {
			tabChange(index){
				this.index=index;
			}
		},
		components: {
			hansTabber,
			memberItem
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
			
			button{
				border-radius: 50%;
				width: 124rpx;
				height: 124rpx;
				background-color: #118EE9;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}		

		}
		.bankeImg{
			width: 750rpx;
			height: 160rpx;
			text-align: center;
			line-height: 160rpx;
			background-color: #F2F2F2;
			
			image{
				width: 80rpx;
				height: 80rpx;
				display: inline-block;
				vertical-align: middle;
			}
		}
		
		.btn{
			display: flex;
			margin-top: 10rpx;
			
			button{
				width: 300rpx;
			}
		}


	}
</style>
