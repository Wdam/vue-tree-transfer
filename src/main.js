import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' // 导入组件
import 'element-ui/lib/theme-chalk/index.css' // 导入样式

Vue.use(ElementUI) // 全局引用
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
