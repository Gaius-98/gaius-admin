/**
 * 用户信息枚举
 */
export enum AuthEnum {
  /**
   * redis缓存用户token前缀
   */
  AUTH_REDIS_USER_PREFIX = 'gaius_user:',
  /**
   * request携带用户信息键名
   */
  AUTH_REQUEST_USER_KEY = 'gaius-user',
  /**
   * request携带的验证码键名
   */
  AUTH_REQUEST_COOKIE_CAPTCHA = 'admin-captcha',
}
