import type { VNode } from 'vue'
import type { AuthInfo, UserInfo } from './IAuth'
export interface SystemMenuItem {
  key: string
  label: string
  title?: string
  icon?: string
  [key: string]: any
  children?: SystemMenuItem[]
}
export interface UIMenuItem extends Pick<ResMenuItem, 'id' | 'label'> {
  icon?: VNode | string
  children?: UIMenuItem[]
  key: string
  [key: string]: any
}
export interface ResMenuItem {
  id?: string
  label: string
  pid?: string
  menuType: 'app' | 'directory'| 'permission'
  desc?: string
  icon?: string
  sortNum: number
  address?: string
  status:number
  // table 预置列表页 page 预置设计页面 front 前端代码页面 form 表单页面
  type: 'table' | 'page' | 'front' | 'form' | 'iframe'
  openType: '_blank' | '_self'
  permissionId?:string
  children?: ResMenuItem[]
}
export interface ResMenuDict {
  id: string
  label: string
  children: ResMenuDict[]
}
export enum LayoutCategory {
  horizontal = 'horizontal',
  vertical = 'vertical'
}
export type LayoutType = keyof typeof LayoutCategory
export enum ThemeCategory {
  light = 'light',
  dark = 'dark'
}
export type themeType = keyof typeof ThemeCategory
export interface SystemThemeCfg {
  projectName: string
  colorPrimary: string
  headerBgColor: string
  headerFontColor: string
  layoutMode: LayoutType
  watermarkVisible: boolean
  watermarkText: string
  menuTheme: themeType
  logo: string
  loginBg: string
}
export interface SystemDictTypeItem {
  dictType: string
  dictTypeDesc: string,
  remark?:string
  status:string

}
export interface SystemDictItem  {
  id?: string
  label: string
  value: string
  sortNum: number
  status:string
  dictType:string
}

export interface SystemSetting {
  id?:number
  settingKey: string;
  settingValue: string;
  settingType: string;
  remark?: string;
  status: string;
}
export interface SystemOrgItem {
  id?:number
  pid?:number
  name:string
  status:string
  sortNum:number
  remark?:string
}

export interface SystemOrgTree extends SystemOrgItem {
  children?:SystemOrgItem[]

}
export interface SystemLoginLog {
  id?:string
  ip:string
  address:string
  username:string
  os:string
  browser:string
  createTime:Date
}
export interface SystemOptLog {
  id:number
  username:string
  ip: string
  location: string
  reqType: string
  reqUrl: string
  reqParam: string
  moduleName: string
  funcName: string
  optModule: string
  optType: string
  resStatus: string
  resTime: string
  res: string
  errMsg: string
  createTime: string
}
export interface SystemNotice {
  id?:number
  title:string
  content:string
  createTime?:Date
  createBy?:string
}
export interface SystemUserNotice  {
  id:number
  noticeId:number
  recevieId:string
  status:string
  createTime?:Date
  readTime?:Date
  notice:SystemNotice
  userInfo?:AuthInfo
}