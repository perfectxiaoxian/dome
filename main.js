import Vue from 'vue'
import App from './App'
import api from './api/api.js'
Vue.config.productionTip = false
import cookie from 'js-cookie';
Vue.prototype.$cookie = cookie; 
App.mpType = 'app'
// 挂在API
Vue.prototype.$API = api
const app = new Vue({
    ...App
})
app.$mount()
