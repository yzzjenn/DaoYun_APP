<template>
	<view>
		<uni-list>
			<uni-list-item
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				thumb-size="lg" link to="/pages/bankeInformation/bankeInformation">
				<template slot="body">
					<banke-item></banke-item>
				</template>
				
				</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import bankeItem from './bankeItem.vue'
	export default {
		name: "bankeItemList",
		data() {
			return {

			};
		},
		// 父组件传送班课id来跳转到相应的班课信息页面
		props:['id'],
		components: {
			bankeItem
		},
		methods:{
			bankeInformation(){
				uni.navigateTo({
					url:"../pages/bankeInformation/bankeInformation"
				})
			}
		}
	}
</script>

<style>

</style>
