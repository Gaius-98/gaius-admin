import request from '@/utils/request'
import type { PageParams,SystemLoginLog,ResPage  } from '@/model'
export default {
  getList: (params: PageParams) => {
    return request<ResPage<SystemLoginLog[]>>({
      method: 'get',
      url: 'loginlog/list',
      params
    })
  },


}
