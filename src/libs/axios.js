import axios from 'axios'
import {baseURL} from '@/config/url'
// import qs from 'qs'

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
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    options.params = options.data
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
