/**
 * 游客系统-新闻详情
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */

import React, {useEffect, useState} from "react";
import {getNewsDetail, updateNews} from "../../apis/urls";
import {PageHeader} from "@ant-design/pro-layout";
import {Descriptions} from "antd";
import moment from "moment/moment";
import { HeartTwoTone } from '@ant-design/icons';

const Details = (props) => {
  const [newsInfo, setNewsInfo] = useState(null);

  // 获取新闻详情
  useEffect(() => {
    (async id => {
      const data = await getNewsDetail(id);
      await setNewsInfo({
        ...data,
        view: data.view + 1
      });
      // 访问量 + 1
      await updateNews({
        id,
        view: data.view + 1
      });
    })(props.match.params.id);
  }, [props.match.params.id]);

  // 小红心按钮点击事件
  const handleStartClick = () => {
    (async () => {
      await setNewsInfo({
        ...newsInfo,
        star: newsInfo.star + 1
      });
      // 访问量 + 1
      await updateNews({
        id: props.match.params.id,
        star: newsInfo.star + 1
      });
    })();
  }

  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title={newsInfo?.title ?? '--'}
        subTitle={
          <div>
            <span>{newsInfo?.category?.title ?? '--'}</span>
            <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStartClick()} />
          </div>
        }
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{newsInfo?.author ?? '--'}</Descriptions.Item>
          <Descriptions.Item label="发布时间">
            { newsInfo?.publishTime ? moment(newsInfo?.publishTime || '').format("YYYY-MM-DD HH:mm:ss") : "--" }
          </Descriptions.Item>
          <Descriptions.Item label="区域">{newsInfo?.region ?? '--'}</Descriptions.Item>
          <Descriptions.Item label="访问数量">{
            <span style={{ color: "green" }}>{newsInfo?.view ?? 0}</span>
          }</Descriptions.Item>
          <Descriptions.Item label="点赞数量">{
            <span style={{ color: "red" }}>{newsInfo?.star ?? 0}</span>
          }</Descriptions.Item>
          <Descriptions.Item label="评论数量">0</Descriptions.Item>
        </Descriptions>
      </PageHeader>

      <div dangerouslySetInnerHTML={{
        __html: newsInfo?.content ?? "--"
      }} style={{
        border: "1px solid gray",
        padding: "0 12px",
        margin: "24px"
      }}>
      </div>
    </div>
  )
}

export default Details;
