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
			<uni-list-item  direction="row">
				<template slot="header">
					<text>班课学期</text>
				</template>
				<template slot="footer">
					<uni-data-picker @change="onChange($event,0)" popup-title="请选择班课" :localdata="semester" >
						<text>{{semCheckedText}}</text>
						<uni-icons type="arrowright"></uni-icons>
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template slot="header">
					<text>学校及院系</text>
				</template>
				<template slot="footer">
					<uni-data-picker @change="onChange($event,1)" popup-title="请选择学校院系" :localdata="school" >
						<text>{{scoCheckedText+depCheckedText}}</text>
						<uni-icons type="arrowright"></uni-icons>
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>日常比重</text>
				</template>
				<template slot="footer">
					<uni-data-picker @change="onChange($event,2)" popup-title="请选择日常比重" :localdata="usualPerformance" >
						<text>{{usuCheckedText}}</text>
						<uni-icons type="arrowright"></uni-icons>
					</uni-data-picker>
				</template>
			</uni-list-item>
			<uni-list-item direction="row">
				<template slot="header">
					<text>期末比重</text>
				</template>
				<template slot="footer">
					<uni-data-picker @change="onChange($event,3)" popup-title="请选择期末比重" :localdata="finalGrade" >
						<text>{{finCheckedText}}</text>
						<uni-icons type="arrowright"></uni-icons>
					</uni-data-picker>
				</template>
			</uni-list-item>
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
				// picker组件的值
				semester:[
						{value:'01',text:'2020-2021-01'},
						{value:'02',text:'2019-2020-02'},
						{value:'03',text:'2019-2020-01'}
					],
				school:[
						{value:'01',
						text:'福州农林大学',
						children:[{value:'001',text:'美术学院'},
								{value:'002',text:'数计学院'},
								{value:'003',text:'经管学院'}]
						},
						{value:'02',
						text:'福州大学',
						children:[{value:'001',text:'美术学院'},
								{value:'002',text:'数计学院'},
								{value:'003',text:'经管学院'}],
						},
						{value:'03',
						text:'福州医科大学',
						children:[{value:'001',text:'美术学院'},
								{value:'002',text:'数计学院'},
								{value:'003',text:'经管学院'}],
						},
						{value:'04',
						text:'福建师范大学',
						children:[{value:'001',text:'美术学院'},
								{value:'002',text:'数计学院'},
								{value:'003',text:'经管学院'}],
						}],
				usualPerformance:[
						{value:'01',text:'40%'},
						{value:'02',text:'30%'},
						{value:'03',text:'20%'}],
				finalGrade:[
						{value:'01',text:'60%'},
						{value:'02',text:'70%'},
						{value:'03',text:'80%'}],
				// picker组件选择中的值
				semCheckedText:'',
				scoCheckedText:'',
				depCheckedText:'',
				usuCheckedText:'',
				finCheckedText:''
			}
		},
		methods: {
			onChange(e,index){
				switch(index){
					case 0:
						this.semCheckedText=e.detail.value[0].text
						break
					case 1:
						console.log(e)
						this.scoCheckedText=e.detail.value[0].text
						this.depCheckedText=e.detail.value[1].text
						break
					case 2:
						this.usuCheckedText=e.detail.value[0].text
						break
					case 3:
						this.finCheckedText=e.detail.value[0].text
						break
					default:
						break	
				}
			}

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
	uni-data-picker{
		transform: scale(0.8);
	}
</style>
