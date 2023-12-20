// 侧边栏
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import {
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.scss';
import { rights } from '../../apis/urls';
import {connect} from "react-redux";

const { Sider } = Layout;

const iconList = {
  '/home': <UserOutlined />,
}

const SideMenu = (props) => {
  const [menu, setMenu] = useState([]);
  let defaultSelectedKeys = [props.location.pathname];
  let defaultOpenKeys = [`/${ props.location.pathname.split('/')[1] }`];

  const { role: { rights: roleRights } } = JSON.parse(localStorage.getItem("token"));

  /**
   * 递归 处理 菜单
   * @param arr 接收需要处理的菜单项
   * @returns {Array} 返回处理好格式的数组
   */
  const handleFormatMenu = (arr) => {
    return arr.reduce((pre, cur) => {
      if(roleRights.includes(cur.key) && cur.pagepermisson === 1) {
        const isChildren = cur.children && cur.children.length > 0;
        pre.push({
          label: cur.title,
          key: cur.key,
          icon: iconList[cur.key] ?? '',
          disabled: cur.pagepermisson === 0,
          ...(!isChildren && {
            onClick: ({ key }) => {
              defaultSelectedKeys = [key];
              defaultOpenKeys = [`/${ key.split('/')[1] }`];
              props.history.push(key);
            },
          }),
          ...(isChildren && {
            children: handleFormatMenu(cur.children)
          })
        });
      }
      return pre;
    }, []);
  }

  // 获取菜单权限
  useEffect(() => {
    rights().then(res =>
      setMenu(() => handleFormatMenu(res))
    ).catch(err => {
      console.error(err);
      setMenu([]);
    });
  }, []);

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div className="sider-box">
        <div className="sider-box_logo">
          全球新闻发布管理系统
        </div>
        <div className="sider-box_menu">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            items={menu}
          />
        </div>
      </div>
    </Sider>
  )
}

export default connect(({ CollapsedReducer: { isCollapsed } }) => ({
  isCollapsed
}))(withRouter(SideMenu))
