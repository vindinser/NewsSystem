// 侧边栏
import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.scss';

const { Sider } = Layout;

const SideMenu = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: '/home',
      icon: <UserOutlined />,
      label: 'nav 1',
      onClick: ({ key }) => {
        console.log(key, props)
        props.history.push(key)
      }
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ]
    },
  ]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        全球新闻发布管理系统
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['2']}
        items={items}
      />
    </Sider>
  )
}

export default withRouter(SideMenu)
