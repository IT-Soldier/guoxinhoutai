import axios from 'axios'
import {baseURL} from '@/config/url'
import qs from 'qs'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  interceptors (instance) {
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      return res
    }, err => {
      return Promise.reject(err)
    })
  }

  create (options) {
    if (options.method === 'post' || options.method === 'put') {
      console.log(options)
      console.log(options.headers)
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // options.params = options.data
      // options.data = options.data
      options.data = qs.stringify(options.data)
    } else if (options.method) {
      options.params = options.data
    }
    console.log('请求参数')
    console.log(options)
    return axios.create(options)
  }

  request (options) {
    options = Object.assign(this.getInsideConfig(), options)

    const instance = this.create(options)

    this.interceptors(instance)

    return instance(options)
  }
}

export default HttpRequest
