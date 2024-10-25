/// <reference types="vite/client" />
interface ImportMetaEnv {
  //默认请求base地址
  readonly VITE_REQ_BASE_URL: string
  //项目默认名称
  readonly VITE_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
