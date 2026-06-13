# AGENTS.md

## Project Overview

React 18 news management system (全球新闻发布系统) with role-based auth, built on CRA.

## Running the App

**Two processes required:**

```bash
# Terminal 1: Start the JSON-server backend (NOT in package.json scripts)
npx json-server --watch db/db.json --port 5000

# Terminal 2: Start the React dev server
npm start
```

App runs at http://localhost:3000. Backend API at http://localhost:5000.

## Key Architecture Facts

- **Backend**: `db/db.json` is the entire database (json-server). Collections: users, roles, rights, children, news, categories, regions.
- **API layer**: `src/apis/request.js` — all API calls hardcode `baseUrl = 'http://localhost:5000/'`. Axios interceptors auto-toggle Redux loading state on every request.
- **API endpoints**: `src/apis/urls.js` — one exported function per endpoint. Query params use json-server syntax (`_embed`, `_expand`, `_sort`, `_limit`).
- **Auth**: Token stored as JSON in `localStorage.getItem("token")`. Contains full user object with nested `role.rights[]` (array of permission key strings like `/user-manage/list`). No JWT, no expiry.
- **Routing**: `src/route/index.js` uses `HashRouter`. Login required for all routes except `/login`, `/news`, `/detail/:id`.
- **Permission system**: `NewsRouter.js` maps route keys (e.g. `/news-manage/add`) to components via `LocalRouter` object. User's `role.rights` array determines access. Each menu item in db.json has `pagepermisson` (show in sidebar) and `routepermisson` (allow direct URL access).
- **State management**: Redux + redux-persist (localStorage). Two reducers: `CollapsedReducer` (sidebar toggle), `LoadingReducer` (global spinner, excluded from persist).
- **UI**: Ant Design 5, Chinese locale (`zh_CN`) configured in `src/index.js`.
- **Rich text editor**: `react-draft-wysiwyg` + `draft-js` in `src/components/news-mange/NewsEditor.js`. Content stored as HTML strings.
- **Styling**: SCSS. Component-scoped styles in co-located `.scss` files.

## Directory Structure

```
src/
  apis/          — API request wrapper and endpoint definitions
  components/
    news-mange/    — NewsEditor (rich text)
    publish-manage/— NewsPublish, usePublish hook
    sandbox/       — SideMenu, TopHeader, NewsRouter (layout shell)
    user-management/— UserForm
  redux/         — Store config and reducers (2 reducers)
  route/         — Top-level HashRouter config
  views/
    login/         — Login page
    news/          — Public news pages (News, Details)
    sandbox/       — All admin pages (news-mange, user-manage, right-manage, audit-manage, publish-manage, home)
  setupProxy.js  — Proxy config (proxies /api → maoyan.com, appears unused by actual API calls)
```

## Gotchas

- `setupProxy.js` proxies to `i.maoyan.com` but the actual API client (`request.js`) hardcodes `localhost:5000` — this proxy is dead code.
- No CI, no test scripts beyond CRA defaults. Run `npm test` for Jest.
- All comments and UI text are in Chinese.
- Redux action types are strings (`"change_loading"`, `"change_collapsed"`) — not constants.
- Login fetches user by username+password query params against json-server (plain text passwords in db.json — dev only).
- The `db/db.json` file contains seed data. Editing it directly is the way to reset/modify backend state.
