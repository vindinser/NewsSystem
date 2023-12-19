/**
 * 审核新闻
 * @Author zs
 * @Date 2023-12-12
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useEffect, useState} from "react";
import {getPublishList, updateNews} from "../../../apis/urls";
import {Button, notification, Table, Tag} from "antd";

const Audit = () => {

  const {
    roleId,
    region: roleRegion,
    username: userName
  } = JSON.parse(localStorage.getItem("token"));

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
        <Button type="primary" onClick={() =>
          handleBtnClick({
            id: item.id,
            auditState: 2,
            publishState: 1
          })
        }>通过</Button>
        <Button danger onClick={() =>
          handleBtnClick({
            id: item.id,
            auditState: 3,
            publishState: 0
          })
        }>驳回</Button>
      </div>
    }
  ];

  /**
   * 列表按钮点击事件
   * @param {Object} param 请求参数
   */
  const handleBtnClick = param => {
    (async () => {
      await updateNews(param);
      getTableData();
      notification.info({
        message: `通知`,
        description: `您可以到【审核管理/审核列表】中查看您的新闻`,
        placement: "topRight"
      });
    })();
  }

  const getTableData = () => {
    (async () => {
      const res = await getPublishList();
      setDataSource(res.reduce((pre, cur) => [
        ...pre,
        ...((roleId === 1 || cur.author === userName || (([3, 2, 1][roleId-1] > cur.roleId) && (cur.region === roleRegion))) ? [cur] : [])
      ], []));
    })();
  }
  // 获取列表
  useEffect(() => {
    getTableData();
  }, [roleId, roleRegion, userName]);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
    </div>
  )
}

export default Audit;
