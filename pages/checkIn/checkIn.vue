<template>
	<view class="checkIn">
		<uni-search-bar @confirm="search" @input="input" placeholder="搜索" :radius="100"></uni-search-bar>
		<view class="notSign">
			<view>
				<text style="font-size: 34rpx;padding-left: 40rpx;margin-bottom: 30rpx;">未签到</text>
				<text style="color:#007AFF;float: right;" @click="selectAll">多选</text>
			</view>
			<view class="uni-list box">
				<checkbox-group>
					<label v-for="(item,index) in items" :key="index">
						<checkbox :value="item.id" :checked="item.checked">
							<view class="member">
								<image style="width: 100rpx;height: 100rpx;background-color: #007AFF; border-radius: 30rpx;
										margin-right: 40rpx;" src="../../static/icon/drawable-xhdpi-icon.png"></image>
								<view class="text">
									<text style="font-size: 32rpx;color: #333333;">{{item.name}}</text>
									<text style="font-size: 28rpx;color: #999999;">{{item.id}}</text>
								</view>
							</view>
						</checkbox>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="isSign">
			<text style="font-size: 34rpx;padding-left: 40rpx;margin-bottom: 30rpx;">已签到</text>
			<view class="uni-list box">
				<label v-for="(item,index) in items" :key="index">
					<checkbox :value="item.id" :checked="item.checked">
						<view class="member">
							<image style="width: 100rpx;height: 100rpx;background-color: #007AFF; border-radius: 30rpx;
									margin-right: 40rpx;" src="../../static/icon/drawable-xhdpi-icon.png"></image>
							<view class="text">
								<text style="font-size: 32rpx;color: #333333;">{{item.name}}</text>
								<text style="font-size: 28rpx;color: #999999;">{{item.id}}</text>
							</view>
						</view>
					</checkbox>
				</label>
				</checkbox-group>
			</view>
		</view>
		<button type="primary" style="border-radius: 30rpx;margin-top: 20rpx;width: 700rpx;">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[{
					id:'200327146',
					name:'却云飞',
					checked:'true'
				},
				{
					id:'1233455',
					name:'郑爽'
				},
				{
					id:'223435465',
					name:'taylor',
					checked:'true'
				}]
			}
		},
		methods: {
			selectAll(){
				for(let i=0;i<this.items.length;i++){
					this.$set(this.items[i], 'checked',true)
				}
			}
		}
	}
</script>

<style lang="scss">
	.member {
		display: flex;
		padding-left: 30rpx;
	}

	.text {
		display: flex;
		flex-direction: column;
	}
	.notSign {
		
		// margin-bottom: 40rpx;
		// border-bottom: 1px solid #797979;
	}
	
	.isSign {
		
		// margin-top: 40rpx;
	}
	checkbox{
		width: 750rpx;
		border-bottom: 1px solid #797979;
		// border-top:1px solid #797979 ;
		margin-top: 20rpx;
	}
	.box{
		margin-top: 40rpx;
	}
</style>
