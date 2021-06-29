<template>
	<view>
		<view class="notSign">
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg"
					v-for="(item, index) in signDetail" :key="index">
					<template slot="body">
						<view class="text">
							<view>
								<text style="font-size: 32rpx;color: #333333;">{{courseName}}</text>
								<text style="position: absolute;right: 10rpx; font-size: 28rpx;"
								:class="[item.attendance?'signClass':'notSignClass']">
									{{item.attendance?'已签到':'未签到'}}
								</text>
							</view>
							<view style="font-size: 28rpx;color: #999999;letter-spacing: 5rpx;">{{item.day}}&nbsp;&nbsp;{{item.time}}</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseName:'',
				classId:Number,
				studentId:Number,
				signDetail:[]
			}
		},
		methods: {
			getSignDate:function(date){
				for(let index in date){
					const now = new Date(date[index].time)
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
		onLoad:function(option){
			const that = this
			that.courseName = option.name
			that.classId = option.id
			uni.getStorage({
				key:'user',
				success:function(res){
					console.log(res)
					that.studentId = res.data.id
					const api = '/mobileApp/sign/history?courseId='+that.classId+'&studentId='+that.studentId
					that.http.sendRequest2(api,{},'get').then(res=>{
						that.signDetail = that.getSignDate(res)
						// console.log(res)
					})
				}
			})
			
		}
	}
</script>

<style>
.signClass{
	color: #007AFF;
}

.notSignClass{
	color: #FF0000;
}
</style>
