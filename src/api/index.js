import axios from 'axios';

const request = axios.create({
  // 配置接口的请求路径
  baseURL: 'http://api.cpengx.cn/metashop/api'
})

//响应拦截器
request.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  } else {
    return response
  }
}, error => {
  return Promise.reject(error)
})


export const getHomePage = (params) => {
  return request({
    method: 'GET',
    url: '/homePage',
    params,
  })
}

export const getProducts = (params) => {
  return request({
    method: 'GET',
    url: '/products',
    params,
  })
}