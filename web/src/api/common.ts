import request from '@/utils/request'
import type { Obj,SystemOrgTree,SystemUserNotice,ResPage } from '@/model'
export type DictTypes = string[]
export interface DictItem {
  value: string
  label: string
}
export default {
  getDict: (data: DictTypes) => {
    return request<Obj<DictItem[]>>({
      method: 'get',
      url: '/dict/dictByType',
      params: {
        dictType: data
      }
    })
  },
  getSetting:(type:string)=>{
    return request<Obj<string>>({
      method: 'get',
      url: '/setting/byType',
      params: {
        type
      }
    })
  },
  getOrgTree:(keyword?:string)=>{
    return request<SystemOrgTree[]>({
      url: 'org/orgTree',
      method: 'get',
        params:{
          keyword
        }
    })
  },
  getNotice:() =>{
    return request<ResPage<SystemUserNotice[]>>({
      url: 'notice/list/ByUser/limit',
      method: 'get',

    })
  }
}
