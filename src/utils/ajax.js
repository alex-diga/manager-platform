/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
// 定义超时重新请求
import axios from 'axios'
import { Modal, message } from 'antd'


// axios.defaults.timeout = 15000; //超时时间
// axios.defaults.retry = 3; //请求次数
// axios.defaults.retryDelay = 1000; //请求间隙

// var loadinginstace

const init = function() {
  axios.interceptors.request.use(function(config) {
    return config
  })

  axios.interceptors.response.use(function(response) {
      // console.log(response)
      const { status, data } = response
      const headers = response.headers
      // loadinginstace.close();
      if (status === 200) {
        if (data.code === 4003) {
          Modal.warning({
            title: '重新登录',
            content: '没有权限访问，请重新登录',
            okText: '确认',
            onOk() {
              window.location.href = '/login'
            }
          })
        } else if (data.code === 4018) {
          window.location.href = '/login'
        } else if (data.code === 501) {
          message.error('服务异常！请联系技术人员。')
        } else {
          return data
        }
      } else if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
        return response.data
      } else {
        return response
      }
      // return response.data
    },
    // err => {
    //   // 请求超时， 重新请求
    //   var config = err.config
    //   // If config does not exist or the retry option is not set, reject
    //   if (!config || !config.retry) return Promise.reject(err)

    //   // Set the variable for keeping track of the retry count
    //   config.__retryCount = config.__retryCount || 0

    //   // Check if we've maxed out the total number of retries
    //   if (config.__retryCount >= config.retry) {
    //     // Reject with the error
    //     return Promise.reject(err)
    //   }

    //   // Increase the retry count
    //   config.__retryCount += 1

    //   // Create new promise to handle exponential backoff
    //   var backoff = new Promise(function(resolve) {
    //     setTimeout(function() {
    //       resolve()
    //     }, config.retryDelay || 1)
    //   })

    //   // Return the promise in which recalls axios to retry the request
    //   return backoff.then(function() {
    //     return axios(config)
    //   })
    // }
    function(err) {
      const { config, code, msg } = err
      if (code === 'ECONNABORTED' || msg === 'Network Error') {
        console.warn(`请求超时，请稍后重试`)
      }
      return Promise.reject(err)
    }
  )
}

export default {
  init
}