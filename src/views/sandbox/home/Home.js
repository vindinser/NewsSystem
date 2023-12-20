// 首页
import React, {useEffect, useRef, useState} from "react";
import {Avatar, Card, Col, Drawer, List, Row} from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import {getHomeData} from "../../../apis/urls";
import * as echarts from "echarts";
import _ from "lodash";

const Home = () => {
  const { username: UserName, region: Region, role: { roleName: RoleName } } = JSON.parse(localStorage.getItem("token"));
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [pieList, setPieList] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getHomeData();
      setViewList(res?.[0] ?? []);
      setStarList(res?.[1] ?? []);
      if(res?.[2]) {
        renderBarView(_.groupBy(res?.[2], item => item.category.title));
        const list = (obj => {
          let arr = [];
          for(let k in obj) {
            arr.push({
              value: obj[k].length,
              name: k
            })
          }
          return arr;
        })(_.groupBy(res[2].filter(item => item.author === UserName), item => item.category.title));
        setPieList(list);
      }
    })();

    return () => {
      // 销毁监听窗口变化事件
      window.onresize = null;
    }
  }, []);

  const barRef = useRef();
  // 数据可视化-柱状图
  const renderBarView = obj => {
    const xAxisData = Object.keys(obj);
    const seriesData = Object.values(obj).map(item => item.length);

    // 基于准备好的dom，初始化echarts实例
    // const myChart = echarts.init(document.getElementById('main'));
    const myChart = echarts.init(barRef.current);

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        axisLabel: {
          rotate: "45",
          internal: true
        },
        data: xAxisData
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: seriesData
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.onresize = () => {
      // 窗口大小改变，重新渲染柱状图
      myChart.resize();
    }
  }

  const [drawVisible, setDrawVisible] = useState(false);
  const pieRef = useRef(null);
  const [pieChart, setPieChart] = useState(null);
  // 数据可视化-饼状图
  const renderPieView = () => {
    console.log(pieList)
    // 基于准备好的dom，初始化echarts实例
    let myChart;
    if(!pieChart) {
      myChart = echarts.init(pieRef.current);
      setPieChart(myChart)
    } else {
      myChart = pieChart;
    }

    const option = {
      title: {
        text: `${ UserName }新闻分类图示`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: pieList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览">
            <List
              size="small"
              dataSource={viewList}
              renderItem={({title, id}) => <List.Item>
                <a href={`#/news-manage/preview/${id}`}>{title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多">
            <List
              size="small"
              dataSource={starList}
              renderItem={({title, id}) => <List.Item>
                <a href={`#/news-manage/preview/${id}`}>{title}</a>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={async () => {
                await setDrawVisible(true);
                renderPieView();
              }}/>,
              <EditOutlined key="edit"/>,
              <EllipsisOutlined key="ellipsis"/>,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel"/>}
              title={UserName}
              description={
                <div>
                  <b>{Region || "全球"}</b>
                  <span style={{marginLeft: "20px"}}>{RoleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      {/* 抽屉 */}
      <Drawer title="个人新闻分类" placement="right" onClose={() => setDrawVisible(false)} open={drawVisible} width={500}>
        {/* 饼状图 */}
        <div ref={pieRef} id="main" style={{ width: "100%", height: "600px", marginTop: "50px" }}></div>
      </Drawer>
      {/* 柱状图 */}
      <div ref={barRef} id="main" style={{ width: "100%", height: "600px", marginTop: "50px" }}></div>
    </div>
  )
}

export default Home
