/**
 * 审核列表
 * @Author zs
 * @Date 2023-12-12
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useEffect, useState} from "react";
import {getAuditList, updateNews} from "../../../apis/urls";
import {Button, notification, Table, Tag} from "antd";

const AuditList = (props) => {
  const { username: UserName } = JSON.parse(localStorage.getItem("token"));

  // 列表数据
  const [dataSource, setDataSource] = useState([]);

  // 列表列
  const columns = [
    { title: '新闻标题', dataIndex: 'title', render: (title, { id }) => <a href={`#/news-manage/preview/${ id }`}>{ title }</a> },
    { title: '作者', dataIndex: 'author' },
    { title: '新闻分类', dataIndex: 'category', render: category => category.title },
    { title: '审核状态', dataIndex: 'auditState', render: auditState =>
      <Tag color={ auditState === 1 ? "orange" : auditState === 2 ? "green" :auditState === 3 ? "red" : "" }>
        { auditState === 1 ? "审核中" : auditState === 2 ? "已通过" :auditState === 3 ? "未通过" : "--" }
      </Tag>
    },
    {
      title: '操作',
      render: (item) => <div>
        {
          item.auditState === 1 && <Button type="primary" danger onClick={() =>
            handleBtnclick({
              id: item.id,
              auditState: 0
            })
          }>撤销</Button>
        }
        {
          item.auditState === 2 && <Button type="dashed" danger onClick={() =>
            handleBtnclick({
              id: item.id,
              publishState: 2
            })
          }>发布</Button>
        }
        {
          item.auditState === 3 && <Button type="primary" onClick={() =>
            props.history.push(`/news-manage/update/${ item.id }`)
          }>编辑</Button>
        }
      </div>
    },
  ];

  /**
   * 撤销/发布 按钮点击事件
   * @param {Number} id 被撤销新闻的 id
   * @param {Number} auditState 审核状态
   * @param {Number} publishState 发布状态 若有发布状态，则按钮为发布按钮点击；否则为撤销按钮点击
   */
  const handleBtnclick = param => {
    (async () => {
      await updateNews(param);
      getTableData();
      notification.info({
        message: `通知`,
        description: `您可以到${ param.publishState ? "【发布管理/已经发布】" : "草稿箱" }中查看您的新闻`,
        placement: "topRight"
      });
    })();
  }

  const getTableData = () => {
    (async () => {
      const res = await getAuditList(UserName);
      setDataSource(res);
    })();
  }

  // 获取列表数据
  useEffect(() => {
    getTableData();
  }, [UserName]);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
    </div>
  )
}

export default AuditList;
