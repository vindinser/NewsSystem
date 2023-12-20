/**
 * 游客系统-新闻
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */

import React, {useEffect, useState} from "react";
import {getHomeData} from "../../apis/urls";
import {PageHeader} from "@ant-design/pro-layout";
import {Card, Col, List, Row} from "antd";
import _ from "lodash";

const News = () => {

  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getHomeData();
      data?.[2] && setList(Object.entries(_.groupBy(data?.[2], item => item.category.title)));
    })();
  }, []);

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      <PageHeader
        title="全球大新闻"
        subTitle="查看新闻"
      />
      <Row gutter={[16, 16]}>
        {
          list.map(item => (
            <Col span={8} key={item[0]}>
              <Card title={item?.[0] ?? "--"} hoverable>
                <List
                  size="small"
                  dataSource={item?.[1] ?? []}
                  pagination={{ pageSize: 3 }}
                  renderItem={({ title, id }) => <List.Item>
                    <a href={`#detail/${id}`}>{title}</a>
                  </List.Item>}
                />
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default News;
