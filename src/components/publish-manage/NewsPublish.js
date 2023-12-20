/**
 * 新闻管理 > 待发布、已发布、已下线 列表封装
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */
import React, {useEffect} from "react";
import {Table} from "antd"

const NewsPublish = (props) => {
  const columns = [
    { title: '新闻标题', dataIndex: 'title', render: (title, { id }) => <a href={`#/news-manage/preview/${ id }`}>{ title }</a> },
    { title: '作者', dataIndex: 'author' },
    { title: '新闻分类', dataIndex: 'category', render: category => category.title },
    {
      title: '操作',
      render: (item) => <div>{props.button(item.id)}</div>
    },
  ];

  return (
    <div>
      <Table dataSource={props.tableData} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
    </div>
  )
}

export default NewsPublish;
