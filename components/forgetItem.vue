<template>
	<view class="forgetItem">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"forgetItem",
		props:[],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.forgetItem{
	display: flex;
}
.left{
	flex:2;
	padding-left: 20px;
}
.right{
	flex: 10;
}
</style>
