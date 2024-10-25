import request from '@/utils/request'
import type { SystemOrgItem,SystemOrgTree } from '@/model'

export default {
  getList: (keyword: string) => {
    return request<SystemOrgItem[]>({
      url: '/org/list',
      method: 'get',
      params: {
        keyword
      }
    })
  },
  getDetail: (id: number) => {
    return request<SystemOrgItem>({
      url: '/org/detail',
      method: 'get',
      params: {
        id
      }
    })
  },
  remove: (id: number) => {
    return request({
      url: '/org/remove',
      method: 'get',
      params: {
        id
      }
    })
  },
  update: (data: SystemOrgItem) => {
    return request({
      url: '/org/update',
      method: 'post',
      data
    })
  },
  add: (data: SystemOrgItem) => {
    return request({
      url: '/org/add',
      method: 'post',
      data
    })
  },


}
