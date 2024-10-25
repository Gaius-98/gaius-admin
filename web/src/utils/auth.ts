import { setCookie, getCookie, removeCookie } from './cookie'
class Auth {
  _token: string | null = ''
  constructor() {
    const token = getCookie('admin-token')
    if (token) {
      this._token = token
    }
  }
  set(token: string) {
    setCookie('admin-token', token)
    this._token = token
  }
  get() {
    return this._token
  }
  remove() {
    removeCookie('admin-token')
    this._token = null
  }
}
export default new Auth()
