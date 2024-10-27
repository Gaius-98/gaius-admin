# [gaius-admin](https://github.com/Gaius-98/gaius-admin)

## 简介

这是一个使用 **NestJS** 作为后端框架，**Vue 3** 和 **Ant Design Vue** 作为前端框架开发的后台管理系统。

## 技术栈

- **前端**: Vue3, Ant Design Vue
- **后端**: NestJS
- **数据库**: Mysql,Redis
- **其他**: TypeScript, Axios

## 目录结构
```
gaius-admin/
│
├── sql/     #数据库sql
├── web/      # 前端代码
│   ├── src/  #源代码
│   ├── public/
│   └── package.json
│
└── server/    # 后端代码
│   ├── src/   #源代码
│   ├── static/
│   └── package.json
└── package.json
```
## 安装和运行

### 前端
   ```web
   cd web
   //安装依赖
   pnpm install 
   //启动项目开发环境
   pnpm start:dev
   ```
### 后端
   ```server
   cd server
   //安装依赖
   pnpm install 
   //启动项目开发环境
   pnpm start:dev
   ```   
### 功能
+ 用户管理：提供用户注册、登录、信息编辑和角色分配功能，支持灵活的用户权限设置。
+ 机构管理：高效的机构信息维护与管理，适应不同组织结构的需求。
+ 角色管理：按照角色分配不同的角色权限。
+ 菜单管理：配置系统显示菜单。
+ 权限控制: 基于角色的访问控制(RBAC)模型进行系统的权限控制。
+ 消息通知：在系统内进行消息提示通知用户。
+ 资源管理：可以上传图片等资源。
+ 登录日志：记录用户登录信息，便于审计和安全分析。
+ 操作日志：全面追踪系统内的用户操作，基于(Nest的装饰器和拦截器)实现，方便扩展。

### 贡献
欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 
3. 提交你的变更 
4. 推送到分支
5. 提交 Pull Request
   
### 联系方式
   有使用问题或者建议,请联系邮箱(2388838628@qq.com)
   如果对你有帮助的话,麻烦:star2:   
### [使用手册](http://120.26.161.36:8080/project/gaius-admin/)
