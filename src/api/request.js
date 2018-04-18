/**
 * Created by fjywan on 2018/3/13.
 */
import axios from 'axios'
import Vue from 'vue'

const baseURL = __BASEURL__
const request = axios.create({
  baseURL,
  withCredentials: true,
  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'csrftoken',
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-CSRFToken'
})

request.interceptors.response.use(function (response) {
  if (response.data.retcode === -100) {
    window.location.href = baseURL + '/api/admin/login/' + '?redirect=' + encodeURI(window.location.href)
  } else if (response.data.retcode) {
    Vue.prototype.$message.error(response.data.message)
  }
  return response.data
}, function (error) {
  if (error.request && error.request.status === 401) {
    window.location.href = (baseURL + '/api/admin/login/' + '?redirect=' + encodeURI(window.location.href))
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

export default request
export { baseURL }
