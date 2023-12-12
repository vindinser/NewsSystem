// 沙箱组件
import React, {useEffect} from "react";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import NewsRouter from "../../components/sandbox/NewsRouter";
import NProgress from "nprogress";
// css
import "nprogress/nprogress.css";

import { Layout, theme } from 'antd';
const { Content } = Layout;

const NewSandBox = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  NProgress.start();

  useEffect(() => {
    NProgress.done();
  });

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <SideMenu />
      <Layout>
        <TopHeader />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto',
            background: colorBgContainer,
          }}
        >
          <NewsRouter />
        </Content>
      </Layout>
    </Layout>
  )
}

export default NewSandBox
