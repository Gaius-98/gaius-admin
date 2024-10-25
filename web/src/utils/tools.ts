import { v4 as uuidv4 } from 'uuid'
import type { Obj } from '@/model'
/**
 *
 * @param content string -- 文件内容
 * @param fileName string --文件名称
 * @param fileType string --文件类型  文件后缀名
 */
export const downloadFile = (content: string, fileName?: string, fileType = 'json') => {
  const a = document.createElement('a')
  // 构造一个blob对象来处理数据
  const blob = new Blob([content])
  fileName = `${decodeURI(encodeURI(fileName || uuidv4()))}.${fileType}`
  // URL.createObjectURL()会产生一个url字符串，可以像使用普通 URL 那样使用它，比如用在 img.src 上
  a.href = URL.createObjectURL(blob)
  // a标签里有download属性可以自定义文件名
  a.setAttribute('download', fileName)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const uninstallPreLoad = () => {
  const element = document.querySelector('.pre-loading')
  if (element) {
    element.remove()
  }
}

export const getDeepValue = (obj: Obj<any>, path: string) => {
  const paths = path.split('.')
  return paths.reduce((pre, cur) => {
    if (pre == undefined) {
      return undefined
    }
    return pre[cur] || null
  }, obj) as any
}
export const setDeepValue = (obj: Obj<any>, path: string, value: any) => {
  const paths = path.split('.')
  paths.reduce((pre, cur, index) => {
    if (index === paths.length - 1) {
      pre[cur] = value || undefined
    } else if (!pre[cur]) {
      pre[cur] = {}
    }
    return pre[cur]
  }, obj)
}

/**
 * 判断是否为真
 * @param val 
 * @returns 
 */
export const isTruth = (val:string|number) =>{
  if(typeof val === 'string'){
    return Number(val) === 0 ?  false :true
  }else if(typeof val === 'number') {
    return val === 0 ? false :true
  }
}
