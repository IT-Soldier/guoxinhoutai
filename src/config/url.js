// axios请求的默认地址,生产环境地址暂且未知
export const baseURL = process.env.NODE_ENV === 'production'
  ? ''
  : '/'
