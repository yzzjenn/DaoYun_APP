const api = 'http://49.232.29.120:8000'
function sendRequest(url, data, method, header){
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
				if(res.statusCode === 200){
					resolve(res.data)
				}else{
					resolve(res.data)
				}
			},
			fail:function(res){
				uni.HideLoading()
				console.log('网络出错了')
				reject('网络出错')
			}	
		})	
	})
	return promise
}

module.exports.sendRequest = sendRequest