import request from '@/utils/request'
import type { PageParams, ResPage, RoleInfo } from '@/model'
export default {
  getList: (params: PageParams) => {
    return request<ResPage<RoleInfo[]>>({
      method: 'get',
      url: 'role/list',
      params
    })
  },
  getDetail: (id: string) => {
    return request<RoleInfo>({
      method: 'get',
      url: 'role/detail',
      params: {
        id
      }
    })
  },
  remove: (id: string) => {
    return request<string>({
      method: 'get',
      url: 'role/remove',
      params: {
        id
      }
    })
  },
  add: (data: RoleInfo) => {
    return request({
      method: 'post',
      url: 'role/add',
      data
    })
  },
  update: (data: RoleInfo) => {
    return request({
      method: 'post',
      url: 'role/update',
      data
    })
  }
}
