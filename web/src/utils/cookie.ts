import Cookies from 'js-cookie'

/** 存储数据到cookie中
 * @params {string} key
 * @params {string|number} value 最后都会转为string保存
 * @params {number} expires 默认过期时间为1天
 */
export const setCookie = (
  key: string,
  value: string | number,
  expires: number | Date | undefined = 1
) => {
  Cookies.set(key, value.toString(), { expires })
}

/** 获取cookie中的值
 * @params {string} key
 * @return {string} value
 */
export const getCookie = (key: string): string | undefined => Cookies.get(key)

/** 移除cookie中指定的数据项
 * @params {string} key
 */
export const removeCookie = (key: string) => {
  Cookies.remove(key)
}

/**
 * 处理cookie
 */
const cookie = {
  setCookie,
  getCookie,
  removeCookie
}

export default cookie
