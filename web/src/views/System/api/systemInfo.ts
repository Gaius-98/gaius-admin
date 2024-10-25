import request from '@/utils/request'

export default {
  getSystemInfo: () => {
    return request<any>({
      method: 'get',
      url: 'systemInfo/all',
    })
  },

}
