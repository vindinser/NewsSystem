// 角色
import React, { useState, useEffect } from "react";
import {Button, Modal, Table, Tree} from "antd";
import { DeleteOutlined, PicCenterOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { roles, delRoles, rights, editRole } from "../../../apis/urls";

const { confirm } = Modal;

const RoleList = () => {
  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  // 列表列
  const columns = [
    { title: 'ID', dataIndex: 'id', render: id => <b>{ id }</b> },
    { title: '角色名称', dataIndex: 'roleName' },
    {
      title: '操作',
      render: (item) => <div>
        <Button danger shape="circle" icon={ <DeleteOutlined /> } onClick={() => confirmMethod(item)} />
        <Button type="primary" shape="circle" icon={ <PicCenterOutlined /> } onClick={() => {
          setCurrentRights(item.rights);
          setCurrentId(item.id);
          setIsModalOpen(true);
        }} />
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
        delRoles(item.id).then(() => {
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

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    getRightList();
  }, []);

  // 获取角色列表
  const getTableData = () => {
    roles().then(res => {
      setDataSource(res);
    }).catch(err => {
      console.error(err);
      setDataSource([])
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹出框的展示与隐藏
  // 弹窗确定按钮点击事件
  const handleOk = () => {
    console.log(currentRights, currentId)
    setDataSource(dataSource.map(item => {
      if(item.id === currentId) {
        return {
          ...item,
          rights: currentRights
        }
      } else {
        return item
      }
    }))
    editRole({
      id: currentId,
      data: {
        rights: currentRights
      }
    }).then(() =>
      setIsModalOpen(false)
    ).catch(err => console.error(err));
  }

  const [rightList, setRightList] = useState([]); // 权限列表
  const [currentRights, setCurrentRights] = useState([]); // 当前用户具有的权限
  const [currentId, setCurrentId] = useState(0); // 当前点击的是哪位用户
  // 获取权限列表
  const getRightList = () => {
    rights().then(res => {
      setRightList(() => {
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
  }

  // 树形控件点击事件
  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked);
  };

  return (
    <div>
      {/* 列表 */}
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={ ({ id }) => id } />
      {/* 角色弹出框 */}
      <Modal title="权限分配" open={isModalOpen} onOk={() => handleOk()} onCancel={() => setIsModalOpen(false)}>
        {/* 树形控件 */}
        <Tree
          checkable
          checkStrictly
          checkedKeys={currentRights}
          onCheck={onCheck}
          treeData={rightList}
        />
      </Modal>
    </div>
  )
}

export default RoleList
