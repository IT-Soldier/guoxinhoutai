import axios from '@/libs/axiosRequest'

// 获取订单列表
export const getOrderList = ({ page = 1, rows = 10 }) => {
  const data = {
    page: page,
    rows: rows
  }
  return axios.request({
    url: '/carscraporder-manager/order',
    data,
    method: 'get'
  })
}
