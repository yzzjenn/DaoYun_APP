import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// 所有的共享数据都放到state里面存储
	state:{
		
	},
	
	// mutation用于变更store里面的数据，在vuex中不允许直接通过组件修改共享数据
	// 在mutation中不能写异步的代码
	mutations:{
		
	},
	
	// 在actions中执行异步操作，在action中通过异步触发mutations中的操作改变数据
	// action是不能直接修改state中的数据，只有通过context.commit()执行某个mutation才行
	actions:{
		
	},
	
	// getters不会修改state的值，只是包装state中的值返回
	getters:{
		
	}
})
