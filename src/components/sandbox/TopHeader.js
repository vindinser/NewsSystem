// 导航栏
import React, {useState} from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, theme, Button, Dropdown, Avatar  } from 'antd';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;

const TopHeader = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    role: { roleName },
    username
  } = JSON.parse(localStorage.getItem("token"));

  const items = [
    {
      key: '1',
      label: roleName,
    },
    {
      key: '4',
      danger: true,
      label: '退出登录',
      onClick: () => {
        localStorage.removeItem("token");
        props.history.replace("/login");
      }
    },
  ];

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div style={{ float: "right", marginRight: '16px' }}>
        <span style={{marginRight: "8px"}}>欢迎<span style={{color: "#1890ff"}}>{username}</span>回来</span>
        <Dropdown menu={{ items }}>
          <Avatar size='large' icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}

export default withRouter(TopHeader)
