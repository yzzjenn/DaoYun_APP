<template>
	<view class="signDetail">
		<uni-search-bar @confirm="search" @input="input" placeholder="搜索" :radius="100"></uni-search-bar>
		<view class="notSign">
			<text style="font-size: 34rpx;padding-left: 40rpx;">未签到</text>
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">却云飞</text>
							<text style="font-size: 28rpx;color: #999999;">200327146</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="isSign">
			<text style="font-size: 34rpx;padding-left: 40rpx;">已签到</text>
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">却云飞</text>
							<text style="font-size: 28rpx;color: #999999;">200327146</text>
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

			}
		},
		methods: {

		}
	}
</script>

<style>
	.notSign {
		margin-top: 40rpx;
		/* 	display: flex;
		flex-direction: column; */
	}

	.isSign {
		margin-top: 40rpx;
		/* display: flex;
		flex-direction: column; */
	}

	.text {
		display: flex;
		flex-direction: column;
	}
</style>
