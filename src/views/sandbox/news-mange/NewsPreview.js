/**
 * 新闻预览
 * @Author zs
 * @Date 2023-12-19
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useEffect, useState} from "react";
import {PageHeader} from "@ant-design/pro-layout";
import {Descriptions} from "antd";
import {getNewsDetail} from "../../../apis/urls";
import moment from "moment";

const NewsPreview = (props) => {
  const [newsInfo, setNewsInfo] = useState(null);

  // 获取新闻详情
  useEffect(() => {
    (async id => {
      const data = await getNewsDetail(id);
      console.log(data);
      setNewsInfo(data);
    })(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title={newsInfo?.title ?? '--'}
        subTitle={newsInfo?.category?.title ?? '--'}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{newsInfo?.author ?? '--'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{moment(newsInfo?.createTime ?? '').format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
          <Descriptions.Item label="发布时间">
            { newsInfo?.publishTime ? moment(newsInfo?.publishTime || '').format("YYYY-MM-DD HH:mm:ss") : "--" }
          </Descriptions.Item>
          <Descriptions.Item label="区域">{newsInfo?.region ?? '--'}</Descriptions.Item>
          <Descriptions.Item label="审核状态">
            <div style={{
              color: newsInfo?.auditState === 0 ? "black"
                : newsInfo?.auditState === 1 ? "orange"
                  : newsInfo?.auditState === 2 ? "green"
                    :newsInfo?.auditState === 3 ? "red"
                      : "--",
              fontWeight: "bold" }}
            >
              {
                newsInfo?.auditState === 0 ? "未审核"
                  : newsInfo?.auditState === 1 ? "审核中"
                    : newsInfo?.auditState === 2 ? "已通过"
                      :newsInfo?.auditState === 3 ? "未通过"
                        : "--"
              }
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="发布状态">
            <div
              style={{color: newsInfo?.publishState === 0 ? "black"
                : newsInfo?.publishState === 1 ? "orange"
                  : newsInfo?.publishState === 2 ? "green"
                    : newsInfo?.publishState === 3 ? "red"
                      : "--",
                fontWeight: "bold"}}
            >
              {
                newsInfo?.publishState === 0 ? "未发布"
                  : newsInfo?.publishState === 1 ? "待发布"
                    : newsInfo?.publishState === 2 ? "已上线"
                      : newsInfo?.publishState === 3 ? "未上线"
                        : "--"
              }
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="访问数量">{newsInfo?.view ?? 0}</Descriptions.Item>
          <Descriptions.Item label="点赞数量">{newsInfo?.star ?? 0}</Descriptions.Item>
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

export default NewsPreview;
