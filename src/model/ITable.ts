export interface LCTableCfg {
  name: string
  description?: string
  createTime?: string
  id?: string
  status: number
  columns: Partial<LCTableColumnCfg>[]
  global: Partial<LCTableGlobalCfg>
  dataSource: LCTableDataSource
  variablePool: Partial<LCTableVariableCfg>
}
export enum AlignType {
  left = 'left',
  center = 'center',
  right = 'right'
}
export enum FixedType {
  left = 'left',
  right = 'right'
}
export enum ColumnType {
  text = 'text',
  link = 'link',
  image = 'image'
}
export interface LCTableColumnCfg {
  id: string
  dataIndex: string
  title: string
  type: keyof typeof ColumnType
  width: number
  align: keyof typeof AlignType
  fixed: keyof typeof FixedType
  children: LCTableColumnCfg[]
}
export interface LCTablePaginationCfg {
  current: number
  pageSize: number
  pageSizeOptions: string[] | number[]
  total: number
}
export interface LCActionCfg {
  formId: string
  show: boolean
  actionCfg?: {
    interfaceUrl: string
    beforeHandleFunc?: string
  }
}
export interface LCTableInteractionCfg extends Partial<LCActionCfg> {
  //按钮标识
  id: string
  //按钮名称
  name: string
  //按钮位置
  position: 'row' | 'header'
  // 点击是否请求接口
  request: boolean
  //接口地址
  interfaceUrl: string
  //处理函数
  AfterHandleFunc: string
  //点击事件类型
  event: 'modal' | 'link'
  //链接地址
  linkUrl: string
}
export interface LCTableGlobalCfg {
  bordered: boolean
  actionCfg: Partial<LCTableInteractionCfg>[]
  filterCfg: LCActionCfg
}
export enum DataSourceType {
  static = 'static',
  dynamic = 'dynamic'
}
export interface LCTableDataSource {
  type: keyof typeof DataSourceType
  interfaceUrl: string
  handlerFunc: string
}
export interface VariableItemCfg {
  key: string
  defaultValue: string
}
export type LCTableVariableCfg = VariableItemCfg[]
export interface VariablePool {
  [key: string]: any
}
