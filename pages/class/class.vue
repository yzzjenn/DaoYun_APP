<template>
	<view class="banke">
		<view class="search">
			<!-- <uni-search-bar placeholder="搜索" @confirm="search" @cancel="cancel" cancel-text="取消">
			    <uni-icons slot="clearIcon" color="#999999" size="18" />
			</uni-search-bar> -->
			<uni-search-bar @confirm="search" @input="input" placeholder="搜索" :radius="100"></uni-search-bar>
			<banke-item-list></banke-item-list>
		</view>
	</view>
</template>

<script>
	import bankeItemList from '../../components/bankeItemList.vue'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			bankeItemList
		}
	}
</script>

<style lang="scss">
.banke{
	.search{
		width: 750rpx;
		height: 100rpx;
		border-bottom: 1px solid #F8F8FF;
	}
}
</style>
