// HTTP状态码
export enum ApiErrorCode {
  SUCCESS = 200, //成功
  ERROR_USER_TOKEN = 10000, //token失效
  ERROR_OTHER = 500, // 服务端错误
}
