import request from '@/utils/request'
import type { PageParams,SystemSetting,ResPage } from '@/model'
export default {
  getList: (params: PageParams) => {
    return request<ResPage<SystemSetting[]>>({
      method: 'get',
      url: 'setting/list',
      params
    })
  },
  getDetail: (id: number) => {
    return request<SystemSetting>({
      method: 'get',
      url: 'setting/detail',
      params: {
        id
      }
    })
  },

  remove: (id: number) => {
    return request<string>({
      method: 'get',
      url: 'setting/remove',
      params: {
        id
      }
    })
  },
  add: (data: SystemSetting) => {
    return request({
      method: 'post',
      url: 'setting/add',
      data
    })
  },
  update: (data: SystemSetting) => {
    return request({
      method: 'post',
      url: 'setting/update',
      data
    })
  },
  getSettingByType: (type:string) => {
    return request<Record<string,string>[]>({
      method: 'get',
      url: 'setting/byType',
      params:{
        type
      }
    })
  }
}
