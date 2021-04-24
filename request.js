const api = 'http://49.232.29.120:8000'
function sendRequest(url, data, method, header={
	'Content-Type': 'application/json',
}){
	var promise = new Promise(function(resolve,reject){
		uni.showLoading({
			title:'加载中'
		})
		uni.request({
			url:api+url,
			method:method,
			data:data,
			header:header,
			success:function(res){
				uni.hideLoading()
				resolve(res)
			},
			fail:function(err){
				uni.hideLoading()
				console.log('网络出错了')
				uni.showToast({
					title:'接口请求失败'
				})
				reject(err)
			}	
		})	
	})
	return promise
}
function sendRequest2(url, data, method, header={
	'Content-Type': 'application/json',
}){
	var promise = new Promise(function(resolve,reject){
		uni.showLoading({
			title:'加载中'
		})
		uni.request({
			url:api+url,
			method:method,
			data:data,
			header:header,
			success:function(res){
				uni.hideLoading()
				resolve(res.data)
			},
			fail:function(err){
				uni.hideLoading()
				console.log('网络出错了')
				uni.showToast({
					title:'接口请求失败'
				})
				reject(err)
			}	
		})	
	})
	return promise
}
module.exports.sendRequest= sendRequest
module.exports.sendRequest2= sendRequest2