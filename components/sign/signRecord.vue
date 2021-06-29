<template>
		<view class="signRecord" >
			<uni-list>
				<uni-list-item 
				thumb="../../static/icon/title.png"
				thumb-size="lg"
				direction="row" 
				v-for="(item,index) in history" 
				:key="index" 
			>
					<template slot="body">
						<view>
							<view style="display: block;">
								<text style="font-size: 28rpx;color: #118EE9;">{{item.day}}</text>
								<text>&nbsp;&nbsp;&nbsp;</text>
								<text style="font-size: 28rpx;color: #FFC601;float: right;position: absolute;right: 0;">实际/总人数&nbsp;&nbsp;{{item.attendance}}/{{item.attendance + item.absence}}人</text>
							</view>
							<view>
								<text style="font-size: 28rpx;color: #118EE9;">{{item.time}}</text>
								<text style="font-size: 28rpx;color: #118EE9;position: absolute;right: 0;" @click="onClick(item.id)">历史详情</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
</template>

<script>
	export default{
		name:'signRecord',
		props:['history'],
		data(){
			return{
				
			}
		},
		methods:{
			onClick(id){
				console.log(id)
				uni.navigateTo({
					url:'../signDetail/signDetail?id='+id
				})
			}
		}
		
	}
</script>

<style>
</style>
