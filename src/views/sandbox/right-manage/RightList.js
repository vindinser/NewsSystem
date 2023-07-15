// 权限
import React, {useEffect, useState} from "react";
import { Button, Table, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { rights, delRights } from "../../../apis/urls";

const { confirm } = Modal;

const RightList = () => {
  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  // 列表列
  const columns = [
    { title: 'ID', dataIndex: 'id', render: id => <b>{ id }</b> },
    { title: '权限名称', dataIndex: 'title' },
    { title: '权限路径', dataIndex: 'key', render: key => <Tag color="orange">{ key }</Tag> },
    {
      title: '操作',
      render: (item) => <div>
        <Button danger shape="circle" icon={ <DeleteOutlined /> } onClick={() => confirmMethod(item)} />
        <Button type="primary" shape="circle" icon={ <EditOutlined /> } />
      </div>
    },
  ];
  // 删除按钮点击事件
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      content: '提示',
      cancelText: '取消',
      okText: '确定',
      okType: 'danger',
      onOk() {
        console.log('OK', item);
        delRights(item.id).then(res => {
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

  // 获取列表数据
  const getTableData = () => {
    rights().then(res => {
      setDataSource(() => {
        res.forEach(item => {
          if(!item.children || item.children.length === 0) {
            item.children = null
          }
        })
        return res
      });
    }).catch(err => {
      console.error(err);
      setDataSource([])
    });
  };

  // 获取权限列表数据
  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default RightList
