import request from '@/utils/request'
import type { PageParams,SystemNotice,ResPage,SystemUserNotice } from '@/model'
export default {
  getList: (params: PageParams) => {
    return request<ResPage<SystemNotice[]>>({
      method: 'get',
      url: 'notice/list',
      params
    })
  },
  getDetail: (id: number) => {
    return request<SystemNotice>({
      method: 'get',
      url: 'notice/detail',
      params: {
        id
      }
    })
  },

  remove: (id: number) => {
    return request<string>({
      method: 'get',
      url: 'notice/remove',
      params: {
        id
      }
    })
  },
  add: (data: SystemNotice) => {
    return request({
      method: 'post',
      url: 'notice/add',
      data
    })
  },
  update: (data: SystemNotice) => {
    return request({
      method: 'post',
      url: 'notice/update',
      data
    })
  },
  getNoticeList: (params: PageParams) => {
    return request<ResPage<SystemUserNotice[]>>({
      method: 'get',
      url: 'notice/list/byUser',
      params
    })
  },
  getNoticeDetail:(id:number)=>{
     return request<SystemUserNotice>({
      method: 'get',
      url: 'notice/detail/byUser',
      params: {
        id
      }
    })
  }
}