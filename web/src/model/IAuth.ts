import type { SystemOrgItem } from "./ISystem"

export interface AuthLogin {
  username: string
  password: string
  captcha: string
}
export type AuthToken = string
export interface AuthInfo {
  avatar: string
  email: string
  username: string
  userId:string
  name: string
  roleIds: string[]
  createTime: Date
  id: string,
  orgId?:number,
  loginIp:string
  lastLoginIp:string
  phone?:string
}
export type CreateAuthInfo = Pick<AuthInfo, 'avatar' | 'email' | 'name' | 'roleIds' | 'username'|'orgId'|'phone'> & {
  password: string
  userId?:string
  status:string

}
export interface UserInfo {
  permissions:string[],
  roles:RoleInfo[],
  user:AuthInfo,
  org:SystemOrgItem
}

export interface RoleInfo {
  roleId?: string
  roleName: string
  roleMenus: string[] | {
    checked:string[]
  }
  dataPerm:string
  roleKey: string
  creatTime?: Date
  remark?: string
  status: string
}
export interface RoleDictItem {
  roleId: string
  roleName: string
}
