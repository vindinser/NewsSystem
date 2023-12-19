/**
 * 草稿箱
 * @Author zs
 * @Date 2023-12-12
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useEffect, useState} from "react";
import {Button, Modal, notification, Table} from "antd";
import {DeleteOutlined, ExclamationCircleFilled, EditOutlined, UploadOutlined} from "@ant-design/icons";
import {delDraft, getDraftList, updateNews} from "../../../apis/urls";

const { confirm } = Modal;

const NewsDraft = (props) => {
  const { username: UserName } = JSON.parse(localStorage.getItem("token"));

  // 列表数据
  const [dataSource, setDataSource] = useState([]);

  // 列表列
  const columns = [
    { title: 'ID', dataIndex: 'id', render: id => <b>{ id }</b> },
    { title: '新闻标题', dataIndex: 'title', render: (title, { id }) => <a href={`#/news-manage/preview/${ id }`}>{ title }</a> },
    { title: '作者', dataIndex: 'author' },
    { title: '新闻分类', dataIndex: 'category', render: category => category.title },
    {
      title: '操作',
      render: (item) => <div>
        <Button danger shape="circle" icon={ <DeleteOutlined /> } onClick={() => confirmMethod(item)} />
        <Button shape="circle" icon={ <EditOutlined /> } onClick={() => props.history.push(`/news-manage/update/${ item.id }`)} />
        <Button type="primary" shape="circle" icon={ <UploadOutlined /> } onClick={() => handelUpdate(item.id)} />
      </div>
    },
  ];

  // 删除按钮点击事件
  const confirmMethod = (item) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleFilled />,
      content: '你确定要删除吗?',
      cancelText: '取消',
      okText: '确定',
      okType: 'danger',
      onOk() {
        delDraft(item.id).then(() => {
          getTableData();
        }).catch(err => {
          console.error(err);
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  /**
   * 提交审核按钮点击事件
   * @param {Number} id 提交审核新闻的id
   * @param {Number} auditState 审核状态
   */
  const handelUpdate = (id, auditState = 1) => {
    console.log(id, "提交审核按钮点击事件")
    updateNews({
      id,
      auditState,
    }).then(() => {
      props.history.push("/audit-manage/list");
      notification.info({
        message: `通知`,
        description: `您可以到审核列表中查看您的新闻`,
        placement: "topRight"
      });
    }).catch(err => {
      console.error(err);
    })
  };

  // 获取草稿箱列表
  useEffect(() => {
    getTableData();
  }, [UserName]);

  // 获取草稿箱列表
  const getTableData = () => {
    getDraftList({
      author: UserName,
      auditState: 0
    }).then(res => {
      setDataSource(res);
    }).catch(err => {
      console.error(err);
      setDataSource([])
    });
  }

  return (
    <div>
      {/* 列表 */}
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={ ({ id }) => id } />
    </div>
  )
}

export default NewsDraft;
