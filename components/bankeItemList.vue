<template>
	<view>
		<uni-list>
			<uni-list-item
				thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				thumb-size="lg" link>
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
		components: {
			bankeItem
		}
	}
</script>

<style>

</style>
