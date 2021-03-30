<template>
	<view class="creatClass">
		<view class="header">
			<view class="image">
			</view>
		</view>
		<uni-list>
			<uni-list-item direction="row">
				<template slot="header">
					<text>班课名称</text>
				</template>
				<template slot="body">
					<input type="text" placeholder="请输入班课名称" />
				</template>
			</uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>班课介绍</text>
				</template>
				<template slot="body">
					<input type="text" placeholder="请输入班课介绍" />
				</template>
			</uni-list-item>
			<uni-list-item title="学期班级" link></uni-list-item>
			<uni-list-item title="学校及院系" link></uni-list-item>
			<uni-list-item title="日常比重" link></uni-list-item>
			<uni-list-item title="期末比重" link></uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>任课教师</text>
				</template>
				<template slot="body">
					<input type="text" placeholder="请输入教师姓名" />
				</template>
			</uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>班课学周</text>
				</template>
				<template slot="body">
					<input type="text" placeholder="请输入班课学周" />
				</template>
			</uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>班课学分</text>
				</template>
				<template slot="body">
					<input type="text" placeholder="请输入班课学分" />
				</template>
			</uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>考试安排</text>
				</template>
				<template slot="body">
					<input type="text" placeholder="请输入考试安排" />
				</template>
			</uni-list-item>
		</uni-list>
		<button type="primary">创建</button>
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

<style lang="scss">
	.creatClass {
		margin: 0;
		padding: 0;

		.header {
			position: relative;
			width: 750rpx;
			height: 140rpx;
			background-color: #F8F8FF;
			

			.image {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				border: 1px dashed #CFCFCF;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
	text{
		font-size: 28rpx;
		color: #3b4144;
		// justify-content: space-around;
	}
	input{
		transform: scale(0.8)
	}
	button{
		border-radius: 40rpx;
		margin-top: 10rpx;
	}
</style>
