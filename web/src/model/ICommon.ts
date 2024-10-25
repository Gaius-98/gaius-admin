export type Obj<T> = Record<string, T>
export interface PageParams {
  pageNumber: number
  pageSize: number
  keyword?: string
  [key:string]:any
}
export interface ResPage<T> {
  data: T
  total: number
}
