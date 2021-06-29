<template>
	<view class="sign">
		<view class="signMethods">
			<sign-item :signItemStyle="signItemStyle" :classId = 'courseId'></sign-item>
		</view>
		<view class="historyText">
			<text>历史签到记录</text>
			<text>历史详情</text>
		</view>
		<sign-record :history="signHistory"></sign-record>
	</view>
</template>

<script>
	import signItem from '../../components/signItem.vue'
	import signRecord from '../../components/sign/signRecord.vue'
	export default {
		data() {
			return {
				signItemStyle: [{
						backgroundColor: '#118EE9',
						color: '#118EE9',
						type: 'iconfont icon-qiandaox',
						text: '一键签到'
					},
					{
						backgroundColor: '#FFC601',
						color: '#FFC601',
						type: 'iconfont icon-anzhuo-',
						text: '限时签到'
					}
				],
				courseId:Number,
				absences:[],
				attendances:[],
				courseCode:Number,
				signHistory:[]
			}
		},
		onLoad:function(option){
			this.courseId = option.courseId
			this.courseCode = option.courseCode
			const api = '/mobileApp/course/info?courseCode='+this.courseCode
			const that = this
			that.http.sendRequest2(api,{},'get').then(res=>{
				console.log('history',res)
				that.signHistory = that.getSignDate(res.signHistory)
			})
		},
		methods: {
			getSignDate:function(date){
				for(let index in date){
					const now = new Date(date[index].createTime)
					const year = now.getFullYear()
					const month  = now.getMonth()+1
					const day = now.getDate()
					const hour = now.getHours()
					const minute = now.getMinutes()
					const second = now.getSeconds()
					date[index]['day'] = year + '/' +month+'/'+day
					date[index]['time']=hour+':'+minute+':'+second
				}
				return date
			}
		},
		components: {
			signItem,
			signRecord
		}
	}
</script>

<style>
	@import '../../assets/iconfont/iconfont.css'
	.signMethods {
		margin-top: 80rpx;
		margin-bottom: 60rpx;
	}

	.historyText {
		border-bottom: 1px solid #797979;
	}
	
	.historyText text:nth-child(1){
		font-size: 26rpx;
		color: #797979;
		/* text-align: left; */
		/* float: left;
		position: absolute;
		left: 10rpx; */
	}
	
	.historyText text:nth-child(2){
		font-size:26rpx;
		color:#2697EB;
		/* text-align: right; */
		float: right;
		position: absolute;
		right: 10rpx;
	}
</style>
