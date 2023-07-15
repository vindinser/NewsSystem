// 侧边栏
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import {
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.scss';
import { rights } from '../../apis/urls';

const { Sider } = Layout;

const iconList = {
  '/home': <UserOutlined />,
}

const SideMenu = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState([]);
  let defaultSelectedKeys = [props.location.pathname];
  let defaultOpenKeys = [`/${ props.location.pathname.split('/')[1] }`];

  const handleFormatMenu = (item) => {
    return (isChildren => ({
      label: item.title,
      key: item.key,
      icon: iconList[item.key] ?? '',
      disabled: item.pagepermisson === 0,
      ...(!isChildren && {
        onClick: ({ key }) => {
          defaultSelectedKeys = [key];
          defaultOpenKeys = [`/${ key.split('/')[1] }`];
          props.history.push(key);
        },
      }),
      ...(isChildren && {
        children: item.children.map(items => handleFormatMenu(items))
      })
    }))(item.children && item.children.length > 0);
  }

  // 获取菜单权限
  useEffect(() => {
    rights().then(res => {
      const arr = res.map(item => handleFormatMenu(item)).filter(({ disabled }) => !disabled);
      setMenu(arr);
    }).catch(err => {
      console.error(err);
      setMenu([]);
    });
  }, []);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
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

export default withRouter(SideMenu)
