// 接口地址统一管理
import request from './request';

// 获取菜单权限
const rights = () => request('rights?_embed=children');

export {
  rights
}
