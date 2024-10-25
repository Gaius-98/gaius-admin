import request from '@/utils/request'
import type { PageParams,SystemOptLog,ResPage  } from '@/model'
export default {
  getList: (params: PageParams) => {
    return request<ResPage<SystemOptLog[]>>({
      method: 'get',
      url: 'operationlog/list',
      params
    })
  },


}
