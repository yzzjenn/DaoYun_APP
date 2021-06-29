<template>
	<view class="signDetail">
		<view class="methods">
			<view class="code" @click="index = 0" :class="index===0?'activeMethods':''">
				<text>未签到</text>
			</view>
			<view class="code" @click="index = 1" :class="index===1?'activeMethods':''">
				<text>已签到</text>
			</view>
			<view class="code" @click="index = 2" :class="index===2?'activeMethods':''">
				<text>补签</text>
			</view>
		</view>
		<view class="notSign" v-show="index === 0">
			<!-- <text style="font-size: 34rpx;padding-left: 40rpx;color: red;">未签到</text> -->
			
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg" v-for="item in absences" :key="item.id">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">{{item.student['name']}}</text>
							<text style="font-size: 28rpx;color: #999999;">{{item.student['id']}}</text>
						</view>
					</template>
					<template slot="footer">
						<!-- <uni-icons type="checkbox" size="20" style="position: absolute;right: 0;" @click="reSign(item.id)"></uni-icons>
						 -->
						<button size="mini" style="position: absolute;right: 10rpx;top: 20rpx;"
							@click="reSign(item.id)">补签</button>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="isSign" v-show="index === 1">
			<!-- <text style="font-size: 34rpx;padding-left: 40rpx;color:#118EE9;">已签到</text> -->
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg" v-for="item in attendance" :key="item.id">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">{{item.student['name']}}</text>
							<text style="font-size: 28rpx;color: #999999;">{{item.student['id']}}</text>
						</view>
					</template>
					<template slot="footer">
						<!-- <uni-icons type="close" size="20" style="position: absolute;right: 0;" @click="closeSign(item.id)"></uni-icons> -->
						<button size="mini" style="position: absolute;right: 10rpx;"
							@click="closeSign(item.id)">取消签到</button>
					</template>

				</uni-list-item>
			</uni-list>
		</view>
		<view class="isSign" v-show="index === 2">
			<!-- <text style="font-size: 34rpx;padding-left: 40rpx;color:green;">补签</text> -->
			<uni-list>
				<uni-list-item direction="row"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg" v-for="item in resign" :key="item.id">
					<template slot="body">
						<view class="text">
							<text style="font-size: 32rpx;color: #333333;">{{item.student['name']}}</text>
							<text style="font-size: 28rpx;color: #999999;">{{item.student['id']}}</text>
						</view>
					</template>
					<template slot="footer">
						<!-- <uni-icons type="close" size="20" style="position: absolute;right: 0;" @click="closeSign(item.id)"></uni-icons> -->
						<button size="mini" style="position: absolute;right: 10rpx;top: 30rpx;"
							@click="closeSign(item.id)">取消签到</button>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				id: Number,
				attendance: [],
				absences: [],
				resign: [],
				index: 0
			}
		},
		components: {
			uniIcons
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			const params = {
				id: this.id
			}
			const that = this
			that.http.sendRequest2('/mobileApp/getSignRecord/byId', params, 'get').then(res => {
				console.log("111", res)
				res.forEach(item => {
					if (item.attendance === true) {
						that.attendance.push(item)
					} else {
						if (item.replenish === false) {
							that.absences.push(item)
						} else {
							that.resign.push(item)
						}
					}
				})
			})
		},
		methods: {
			reSign(signId) {
				const params = {
					id: signId,
					type: 2
				}
				const api = '/mobileApp/studentsignstatus/update'
				const that = this
				that.http.sendRequest3(api, params, 'get').then(res => {
					console.log(res)
					if (res.statusCode === 200) {
						for (let i = 0; i < that.absences.length; i++) {
							if (that.absences[i].id === signId) {
								that.resign.push(that.absences[i])
								that.absences.splice(i, 1)
							}
						}
						uni.showToast({
							title: '补签成功',
							duration: 3000
						})
					} else {
						uni.showToast({
							title: '补签失败',
							duration: 3000
						})
					}
				})
			},
			closeSign(signId) {
				const params = {
					id: signId,
					type: 0
				}
				const api = '/mobileApp/studentsignstatus/update'
				const that = this
				that.http.sendRequest3(api, params, 'get').then(res => {
					console.log(res)
					if (res.statusCode === 200) {
						for (let i = 0; i < that.attendance.length; i++) {
							if (that.attendance[i].id === signId) {
								that.absences.push(that.attendance[i])
								that.attendance.splice(i, 1)
							}
						}
						uni.showToast({
							title: '取消签到状态',
							duration: 3000
						})
					} else {
						uni.showToast({
							title: '取消失败',
							duration: 3000
						})
					}
				})
			}
		}
	}
</script>

<style>
	.notSign {
		/* margin-top: 20rpx; */
	}

	.isSign {
		/* margin-top: 20rpx; */
	}

	.text {
		display: flex;
		flex-direction: column;
	}

	button {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		color: white;
		border-radius: 60rpx;
		text-shadow: 1px 1px 1px rgba(255, 255, 255, .22);
	}

	.methods {
		width: 100%;
		height: 50px;
		display: flex;
	}

	.code {
		flex: 1;
		margin: 10px;
		text-align: center;
	}

	.activeMethods {
		color: #6495ED;
		border-bottom: 1px solid #007AFF;
	}
</style>
