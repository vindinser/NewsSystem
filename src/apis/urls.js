// 接口地址统一管理
import request from './request';

// 获取菜单权限/权限列表-表格数据
const rights = () => request('rights?_embed=children');

// 权限列表-删除菜单
const delRights = id => request(`rights/${ id }`, 'delete');

// 权限列表-修改菜单展示/隐藏
const editRights = ({ apiName, id, data }) => request(`${ apiName }/${ id }`, 'patch', data)

// 获取角色列表
const roles = () => request('roles');
// 角色列表-删除角色
const delRoles = id => request(`roles/${ id }`, 'delete');
// 角色列表-修改角色权限
const editRole = ({ apiName, id, data }) => request(`roles/${ id }`, 'patch', data)

// 获取用户列表
const getUsers = () => request(`users?_expand=role`)
// 新增用户
const addUser = data => request(`users`, "post", data)
// 删除用户
const delUser = id => request(`users/${ id }`, "delete")
// 需改用户状态
const editUserStatus = (id, data) => request(`users/${ id }`, 'patch', data)
// 修改用户信息
const editUser = data => request(`users/${ data.id }`, "patch", data)

// 获取区域
const getRegions = () => request(`regions`)

// 登录
const login = ({ username, password }) => request(`users?username=${ username }&password=${ password }&roleStatus=true&_expand=role`)

// 获取菜单（平铺路由）
const menuList = () => Promise.all([request(`rights`), request(`children`)]);

// 获取新闻分类
const getCategories = () => request(`categories`);
// 新增新闻（保存草稿箱/提交审核）
const addNews = data => request(`news`, "post", data);

// 草稿箱列表
const getDraftList = ({ author, auditState }) => request(`news?author=${ author }&auditState=${ auditState }&_expand=category`);
// 删除草稿
const delDraft = id => request(`news/${ id }`, "delete")
// 获取新闻详情
const getNewsDetail = id => request(`news/${ id }?_expand=category&_expand=role`)
// 更新（修改）新闻
const updateNews = data => request(`news/${ data.id }`, "patch", data)

// 获取审核列表
const getAuditList = userName => request(`news?author=${ userName }&auditState_ne=0&publishState_lte=1&_expand=category`)

export {
  rights,
  delRights,
  editRights,
  roles,
  delRoles,
  editRole,
  getUsers,
  getRegions,
  addUser,
  delUser,
  editUserStatus,
  editUser,
  login,
  menuList,
  getCategories,
  addNews,
  getDraftList,
  delDraft,
  getNewsDetail,
  updateNews,
  getAuditList
}
