// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// index.html的样式
import '@/assets/css/index.css'
// 所有的组件均基于element-ui,所以必须引入
import ElementUI from 'element-ui'
// 所以相应的css样式也务必引入
import 'element-ui/lib/theme-chalk/index.css'
import MyBreadcrumb from '@/components/MyBreadcrumb'
// ElementUI为插件,当然要先注册后,全局使用
Vue.use(ElementUI)
Vue.component(
  MyBreadcrumb.name, MyBreadcrumb
)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
