import request from '@/utils/request'
import type { PageParams, AuthInfo, ResPage, CreateAuthInfo, RoleDictItem,UserInfo } from '@/model'
export default {
  getList: (params: PageParams) => {
    return request<ResPage<AuthInfo[]>>({
      method: 'get',
      url: 'user/list',
      params
    })
  },
  getDetail: (userId: string) => {
    return request<CreateAuthInfo>({
      method: 'get',
      url: 'user/detail',
      params: {
        userId
      }
    })
  },
  getUserInfo: () => {
    return request<UserInfo>({
      method: 'get',
      url: 'auth/userInfo'
    })
  },
  remove: (userId: string) => {
    return request<string>({
      method: 'get',
      url: 'user/remove',
      params: {
        userId
      }
    })
  },
  add: (data: CreateAuthInfo) => {
    return request({
      method: 'post',
      url: 'user/register',
      data
    })
  },
  update: (data: CreateAuthInfo) => {
    return request({
      method: 'post',
      url: 'user/update',
      data
    })
  },
  getRoleDict: () => {
    return request<RoleDictItem[]>({
      method: 'get',
      url: 'role/dict'
    })
  }
}
