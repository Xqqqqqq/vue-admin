import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store/store.js'
import './plugins/element.js' //引入icons
import '@/icons' // 引入svg-icon
import './assets/css/normalize.css';
import './assets/css/common.css';

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import '../node_modules/echarts/map/js/world.js' // 引入世界地图

Vue.config.productionTip = false

const that = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default that;
