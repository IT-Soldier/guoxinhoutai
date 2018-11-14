import axios from '@/libs/axiosRequest'

// 获取订单列表(刷新页面时,进入的是未处理订单)
export const getOrderList = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    orderStatus: getData.orderStatus,
    keyWord: getData.keyWord
  }
  return axios.request({
    url: '/carscraporder-manager/order',
    data,
    method: 'get'
  })
}
// 获取已处理订单列表
export const getHistoryOrderList = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    keyWord: getData.keyWord
  }
  return axios.request({
    url: '/carscraporder-manager/order/history',
    data,
    method: 'get'
  })
}
export const getAllOrderList = (getData) => {
  const data = {
    page: getData.page,
    rows: getData.rows,
    keyWord: getData.keyWord
  }
  return axios.request({
    url: '/carscraporder-manager/order/getAll',
    data,
    method: 'get'
  })
}
// 调用登陆之后,后台在浏览器种了cookie,有名也有值
export const login = ({name = 'admin', password = 'admin1', rememberMe = true}) => {
  const data = {
    name: name,
    password: password,
    rememberMe: rememberMe
  }
  return axios.request({
    url: '/carscraporder-manager/account/login',
    data,
    method: 'post'
  })
}
