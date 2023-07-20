// 接口地址统一管理
import request from './request';

// 获取菜单权限/权限列表-表格数据
const rights = () => request('rights?_embed=children');

// 权限列表-删除菜单
const delRights = id => request(`rights/${ id }`, 'delete')

// 权限列表-修改菜单展示/隐藏
const editRights = ({ apiName, id, data }) => request(`${ apiName }/${ id }`, 'patch', data)

export {
  rights,
  delRights,
  editRights
}
