import Vue from 'vue'
import App from './App'
import http from './request.js'
import store from './store.js'
// import './assets/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.http = http
App.mpType = 'app'


const app = new Vue({
	store,
    ...App
})
app.$mount()

