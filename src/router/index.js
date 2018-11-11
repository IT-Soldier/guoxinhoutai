import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Home = () => import('@/views/Home')
const Order = () => import('@/views/order/Order')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'Order',
          path: '/order',
          component: Order
        }
      ]
    }
  ]
})

export default router
