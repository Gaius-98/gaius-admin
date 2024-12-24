
# Gaius Admin Server

## 简介 | Introduction

Gaius Admin Server 是一个基于 NestJS 框架构建的后台管理系统。该系统提供了字典管理、用户管理、权限控制等功能，旨在为开发者提供一个高效、易用的后台管理解决方案。

Gaius Admin Server is a backend management system built on the NestJS framework. It provides features such as dictionary management, user management, and access control, aiming to offer developers an efficient and user-friendly backend management solution.

## 目录结构 | Directory Structure

```
gaius-admin/
├── src/
│   ├── common/                      # 公共模块 | Common modules
│   │   ├── decorator/               # 装饰器 | Decorators
│   │   │   └── public/
│   │   │       └── public.decorator.ts
│   │   └── filter/                  # 异常过滤器 | Exception filters
│   │       └── http-exception/
│   │           └── api.exception.ts
│   ├── modules/                     # 功能模块 | Feature modules
│   │   └── system/
│   │       ├── dict/                # 字典管理模块 | Dictionary management module
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   ├── dict.controller.ts
│   │       │   └── dict.service.ts
│   │       ├── user/                # 用户管理模块 | User management module
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   ├── user.controller.ts
│   │       │   └── user.service.ts
│   │       ├── auth/                # 权限控制模块 | Authentication module
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   ├── auth.controller.ts
│   │       │   └── auth.service.ts
│   │       ├── login-log/           # 登录日志模块 | Login log module
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   ├── login-log.controller.ts
│   │       │   └── login-log.service.ts
│   │       ├── menu/                # 菜单管理模块 | Menu management module
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   ├── menu.controller.ts
│   │       │   └── menu.service.ts
│   │       ├── role/                # 角色管理模块 | Role management module
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   ├── role.controller.ts
│   │       │   └── role.service.ts
│   └── main.ts                      # 应用入口文件 | Application entry file
├── sql/                             # 数据库 SQL 文件 | Database SQL files
│   └── schema.sql                   # 数据库表结构 | Database schema
├── 

README.md


└── 

tsconfig.json


```

## 安装 | Installation

1. 克隆项目到本地 | Clone the project to your local machine:

```bash
git clone https://github.com/Gaius-98/gaius-admin.git
```

2. 进入项目目录并安装依赖 | Navigate to the project directory and install dependencies:

```bash
cd gaius-admin/server
npm install
```

## 启动前准备 | Preparation Before Running

在启动项目之前，请确保使用 `/sql` 文件夹中的 SQL 文件增加对应的数据表。

Before starting the project, make sure to use the SQL files in the `/sql` folder to create the corresponding database tables.

## 运行 | Running

1. 启动开发服务器 | Start the development server:

```bash
npm run start:dev
```

2. 访问 `http://localhost:3000` 查看项目运行情况 | Visit `http://localhost:3000` to see the project running.

## 贡献 | Contributing

欢迎提交问题和拉取请求。如果您有任何建议或改进，请随时与我们联系。

We welcome issues and pull requests. If you have any suggestions or improvements, please feel free to contact us.

## 许可证 | License

本项目采用 MIT 许可证。

This project is licensed under the MIT License.
