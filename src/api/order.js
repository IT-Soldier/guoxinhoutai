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
// 获取所有订单列表
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
// 调用登陆之后,后台返回了cookie值
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
// 获取订单详情
export const getOrderDetail = (id) => {
  return axios.request({
    url: `/carscraporder-manager/order/${id}`,
    method: 'get'
  })
}
// 派单信息,业务员的选择
export const selectSalesman = (data) => {
  return axios.request({
    url: `/carscraporder-manager/user/queryReceiveUser`,
    data: data,
    method: 'get'
  })
}
// 获取常用联系人信息
export const selectConnectionPerson = (data) => {
  return axios.request({
    url: `/carscraporder-manager/commonContacts`,
    data,
    method: 'get'
  })
}
// 配件编辑页面-配件大类下拉框
export const selectReplacementClass = () => {
  return axios.request({
    url: `/carscraporder-manager/carPartsCategory`,
    method: 'get'
  })
}
// 配件编辑页面-配件名称下拉框
export const selectReplacementName = (data) => {
  return axios.request({
    url: `/carscraporder-manager/carPartsCategory`,
    data,
    method: 'get'
  })
}
// 旧件订单暂存功能
export const partOrdertemporaryStorage = (id, data) => {
  return axios.request({
    url: `/carscraporder-manager/order/${id}`,
    data,
    method: 'put'
  })
}
// 旧件订单派单功能
export const normalPartOrder = (id, data) => {
  return axios.request({
    url: `/carscraporder-manager/order/audit/${id}`,
    data,
    method: 'put'
  })
}
// 旧件订单派单异常
export const abnormalPartOrder = (id, data) => {
  return axios.request({
    url: `/carscraporder-manager/order/audit/${id}`,
    data,
    method: 'put'
  })
}
