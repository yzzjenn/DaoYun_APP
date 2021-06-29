<template>
	<view class="banke">
		<view class="search">
			<view style="width: 90%;">
				<uni-search-bar @confirm="search" @cancel="cancel" placeholder="输入课程的名称" v-model="searchValue">
				    <uni-icons slot="searchIcon" color="#999999" size="18" type="search" />
				</uni-search-bar>
			</view>
			<uni-icons type="scan" size="30" class="scan" @click="scan"></uni-icons>
		</view>
			<banke-item-list :courses="search_a?searchCourses:courses" :user_status="status"></banke-item-list>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="success" title="加入成功" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import bankeItemList from '../../components/bankeItemList.vue'
	export default {
		data() {
			return {
				user_id:Number,
				status:'',
				courses:[],
				searchValue:'',
				searchCourses:[],
				search_a:false
			}
		},
		methods: {
			scan:function(){
				let that = this
				uni.scanCode({
					success:function(res){
						const coursesCode = res.result
						const api = '/mobileApp/join/course?userId='+that.user_id+'&courseCode='+courseCode
						that.http.sendRequest2(api,{},'get').then(res=>{
							if(res){
								uni.showToast({
									title:res.message,
									icon:'none',
									duration:3000
								})
							}else{
								that.$refs.popup.open()		
							}	
						})
					}
				})
			},
			close:function(done){
				done()
			},
			confirm:function(done){
				done()
			},
			search:function(){
				this.courses.forEach((item)=>{
					if(item.courseName == this.searchValue){
						this.searchCourses.push(item)
					}
				})
				console.log(this.searchCourses)
				this.search_a = true
			},
			cancel:function(){
				this.search_a = false
				console.log(2)
			}
		},
		onLoad(){
			let that = this
			uni.getStorage({
				key:'user',
				success:function(res){
					that.user_id = res.data.id
					console.log(that.user_id)
				}
			})
		},
		onShow(){
			let that = this
			uni.getStorage({
				key: 'user',
				success: function(res) {
					console.log("onShowClass")
					let userId = res.data.id
					that.status = res.data.status
					if (res.data.status === "教师") {
						that.http.sendRequest2('/mobileApp/course/belong?id=' + userId, {}, 'get').then(
						res => {
							that.courses = res
							console.log(that.courses)
						})
					} else if (res.data.status === "学生") {
						that.http.sendRequest2('/mobileApp/course/join?id=' + userId, {}, 'get').then(res => {
							that.courses = res
							console.log(that.courses)
						})
					}
				}
			})
		},
		components:{
			bankeItemList,
			uniIcons
		}
	}
</script>

<style lang="scss">
.banke{
	.search{
		width: 750rpx;
		height: 100rpx;
		border-bottom: 1px solid #F8F8FF;
		display: flex;
	}
}

.scan{
	position: absolute;
	right:2rpx;
	top:20rpx;
}
</style>
