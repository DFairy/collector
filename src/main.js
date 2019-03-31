import Vue from 'vue'
import App from './App.vue'
import './common/style/common.less'
import ElementUI from 'element-ui';
import api from './api'
import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios'
Vue.use(ElementUI);
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')