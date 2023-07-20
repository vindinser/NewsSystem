*目录*

- [NewsSystem](#NewsSystem)
  - [创建项目](#创建项目)
  - [路由](#路由)
  - [引入antd](#引入antd)
  - [JsonServer](#JsonServer)
  - [权限控制](#权限控制)


# NewsSystem

  作者：zs

  版本：1.0.0

  版权：zs

## 创建项目

  ``` javascript
    // 创建项目
    npx create-react-app news_system
    
    // 引入sass
    npm i --save sass
    
    // 引入axios
    npm i --save axios
    
    // 安装模块配置请求代理解决跨域问题，在src文件夹下创建 setupProxy.js文件进行配置
    npm i --save http-proxy-middleware
    
  ```

## 路由

  ![路由架构](./imgs/route-architecture.png)
  
  ### 搭建路由

  ``` javascript
    // 直接安装是6，课程中使用的是5.2.0
    npm i --save react-router-dom@5.2.0
  ```

  - 创建 文件： src/route/index.js
  - import {HashRouter, Route} from "react-router-dom";

## 引入antd
  `antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

### 安装antd
  
  ``` powershell
    npm install antd --save
  ```

  > 如果是antd5，不许要引入样式

### 基本布局

  *使用antd的Layout进行基本页面布局（导航栏、侧边栏、主体）*

## [JsonServer](https://www.npmjs.com/package/json-server)
  > 在不到30秒的时间内获得零编码的完全假冒REST API;用<3为需要快速后端进行原型设计和模拟的前端开发人员创建。

  - 安装json-server
    ``` powershell
      npm install -g json-server
    ```
  - 创建一个 `db.json` 文件
    ``` json
      {
        "posts": [
          { "id": 1, "title": "json-server", "author": "typicode" }
        ],
        "comments": [
          { "id": 1, "body": "some comment", "postId": 1 }
        ],
        "profile": { "name": "typicode" }
      }
    ```
  - 启动 json-server
    ``` js
      json-server --watch db.json --port 5000 // 启动 json-server 于5000端口
    ```
  - 访问 `http://localhost:3000/posts/1`
  - curd
    ``` javascript
      get     // 查
      post    // 增
      put     // 改
      patch   // 更新
      delete  // 删
      _embed  // 联合集合查询
      _expand // 向上查询（可返回子集的父级）
    ```
    
### 模拟后端服务

  - 封装axios方法
  - 接口统一管理
  - 动态渲染侧边栏

  *动态获取侧边栏后改变选中侧边栏，URL改变页面不刷新，经查阅是严格模式的问题*
    
  ``` javascript
    // index.js中的原写法
    <React.StrictMode>
      <App />
    </React.StrictMode>
    
    // 取消严格模式
    <App />
  ```

## 权限控制

  ![权限控制](./imgs/access-control.png)

### 权限列表

### 角色列表

### 用户列表