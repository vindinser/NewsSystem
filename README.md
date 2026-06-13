# 全球新闻发布管理系统

基于 React 18 + Ant Design 5 + Redux 的新闻管理后台，支持多角色权限控制、新闻发布审核流程。

## 技术栈

- React 18 + CRA
- Ant Design 5
- Redux + redux-persist
- react-router-dom v5 (HashRouter)
- json-server (mock 后端)
- react-draft-wysiwyg (富文本编辑器)
- SCSS

## 快速开始

需要同时启动后端和前端：

```bash
# 终端 1：启动 json-server 后端
npx json-server --watch db/db.json --port 5000

# 终端 2：启动前端开发服务器
npm start
```

- 前端：http://localhost:3000
- 后端 API：http://localhost:5000

## 测试账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 超级管理员 | admin | 123456 |
| 区域管理员 | 铁锤 | 123 |
| 区域编辑 | 西门吹灯 | 123 |

## 功能模块

- 用户管理：增删改查，角色分配
- 权限管理：菜单权限、角色权限配置
- 新闻管理：撰写、草稿箱、分类管理
- 审核管理：新闻审核流程
- 发布管理：待发布、已发布、已下线
- 首页：数据统计、图表展示

## 项目结构

```
src/
├── apis/              # API 接口定义
├── components/        # 公共组件
├── redux/             # 状态管理
├── route/             # 路由配置
└── views/             # 页面组件
    ├── login/         # 登录
    ├── news/          # 游客新闻页
    └── sandbox/       # 后台管理页面
```

## 说明

- 数据库文件：`db/db.json`，可直接编辑修改数据
- 权限控制：基于 `roles.rights` 数组匹配路由 key
- 新闻内容：富文本 HTML 存储
