import request from '@/utils/request'
import type { SystemDictItem, ResPage, PageParams, SystemDictTypeItem } from '@/model'
export interface DictPageParams extends PageParams {
  dictType: string
}
export default {
  getTypeList: (params: PageParams) => {
    return request<ResPage<SystemDictTypeItem[]>>({
      method: 'get',
      url: 'dict/list/type',
      params
    })
  },
  getTypeDetail: (id: string) => {
    return request<SystemDictTypeItem>({
      method: 'get',
      url: 'dict/detail/type',
      params: {
        id
      }
    })
  },
  getDictDetail:(id:string)=>{
      return request<SystemDictItem>({
        method: 'get',
        url: 'dict/detail/data',
        params: {
          id
        }
      })
  },
  removeType: (id: string) => {
    return request<string>({
      method: 'get',
      url: 'dict/remove/type',
      params: {
        id
      }
    })
  },
  removeData: (id: string) => {
    return request<string>({
      method: 'get',
      url: 'dict/remove/data',
      params: {
        id
      }
    })
  },
  addType: (data: SystemDictTypeItem) => {
    return request({
      method: 'post',
      url: 'dict/add/type',
      data
    })
  },
  addData: (data: SystemDictItem) => {
    return request({
      method: 'post',
      url: 'dict/add/data',
      data
    })
  },
  updateType: (data: SystemDictTypeItem) => {
    return request({
      method: 'post',
      url: 'dict/update/type',
      data
    })
  },
  updateData: (data: SystemDictItem) => {
    return request({
      method: 'post',
      url: 'dict/update/data',
      data
    })
  },
  getDictTypeList: () => {
    return request<SystemDictTypeItem[]>({
      method: 'get',
      url: 'dict/dictTypeList'
    })
  }
}
