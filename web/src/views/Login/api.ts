import request from '@/utils/request'
import type { AuthLogin, AuthToken } from '@/model'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
export default {
  login: (data: AuthLogin) => {
    return request<AuthToken>({
      method: 'post',
      url: '/auth/login',
      data: data
    })
  },
  getCaptcha: (): Promise<AxiosResponse<string>> => {
    return axios({
      baseURL: import.meta.env.VITE_REQ_BASE_URL,
      method: 'get',
      url: '/auth/captcha'
    })
  }
}
