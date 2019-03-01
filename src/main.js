import Vue from 'vue'
import App from './App.vue'
import './common/style/common.less'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')