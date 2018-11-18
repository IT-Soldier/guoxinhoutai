import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Home = () => import('@/views/Home')
const Order = () => import('@/views/order/Order')
const Login = () => import('@/views/login/Login')
const System = () => import('@/views/system/System')
const Role = () => import('@/views/system/components/role/Role')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
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
        },
        {
          name: 'System',
          path: '/system',
          component: System,
          children: [
            {
              name: 'Role',
              path: '/system/role',
              component: Role
            }
          ]
        }
      ]
    }
  ]
})

export default router
