import request from '@/utils/request'
import type { PageParams, ResPage } from '@/model'
export interface ImageItem {
  path: string
  originalname: string
  size: number
  createTime: string
  id: string
}
export default {
  getList: (params: PageParams) => {
    return request<ResPage<ImageItem[]>>({
      method: 'get',
      url: 'upload/list',
      params
    })
  },
  remove: (id: string) => {
    return request<string>({
      method: 'get',
      url: 'upload/remove',
      params: {
        id
      }
    })
  },
  add: (data: any) => {
    return request<ImageItem>({
      method: 'post',
      url: 'upload/images',
      data
    })
  }
}
