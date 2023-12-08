// 用户
import React, {useEffect, useRef, useState} from "react";
import {addUser, delUser, editUser, editUserStatus, getRegions, getUsers} from "../../../apis/urls";
import {Button, Modal, Switch, Table} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserForm from "../../../components/user-management/UserForm";

const UserList = () => {
  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  // 控制新增用户弹窗的展示与隐藏
  const [isAddOpen, setIsAddOpen] = useState(false);
  // 区域列表
  const [regionList, setRegionList] = useState([]);
  // 是否是编辑
  const [isEdit, setIsEdit] = useState(false);
  // 是否更新禁用 区域选择
  const [isEditDisable, setIsEditDisable] = useState(false);
  // 当前点击的item（列表）项
  const [currentItem, setCurrentItem] = useState(null);

  const addFormRef = useRef(null);


  // 列表列
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: region => <b>{ region === "" ? "全球" : region }</b>,
      filters: [
        ...(regionList.map(({ region: value, title: text }) => ({ value, text }))),
        { value: "", text: "全球" }
      ],
      onFilter: (value, record) => record.region === value
    },
    { title: '角色名称', dataIndex: 'role', render: role => role?.roleName ?? "--"},
    { title: '用户名', dataIndex: 'username' },
    { title: '用户状态', dataIndex: 'roleState', render: (roleState, item) =>
      <Switch defaultChecked={roleState} disabled={item.default} onChange={() => handleStatusChange(item)} />
    },
    {
      title: '操作',
      render: item => <div>
        <Button danger shape="circle" icon={ <DeleteOutlined /> } disabled={item.default} onClick={() => delUserBtnClick(item)} />
        <Button type="primary" shape="circle" icon={ <EditOutlined /> } disabled={item.default} onClick={() => editUserBtnClick(item)} />
      </div>
    }
  ];

  // 获取列表数据
  const getTableData = () => {
    getUsers().then(res =>
      setDataSource(res)
    ).catch(err => {
      console.error(err);
      setDataSource([])
    });
  };

  useEffect(() => {
    // 获取权限列表数据
    getTableData();
  }, []);

  // 获取区域
  useEffect(() => {
    getRegions().then(region =>
      setRegionList(region.map(({ value: region, title }) => ({ region, title })))
    );
  }, []);

  // 确定 添加/修改 用户按钮点击事件
  const addFormConfirm = () => {
    addFormRef.current.validateFields().then(val => {
      try {
        (async (param) =>
            await(isEdit ? editUser(param) : addUser(param))
        )({
          ...val,
          ...(isEdit && { id: currentItem.id }),
          ...(!isEdit && {
            "roleState": true,
            "default": false
          })
        });
        modelClose().then(() => {});
        getTableData();
      } catch (e) {
        console.error(e)
      }
    }).catch(err => console.error(err));
  }

  /**
   * 删除用户按钮点击事件
   * @param id 删除用户的id
   * @returns {Promise<void>}
   */
  const delUserBtnClick = async ({ id }) => {
    await delUser(id);
    // getTableData();
    setDataSource(() => dataSource.filter(item => item.id !== id));
  }

  /**
   * 用户状态改变
   * @param item 点击的列表项
   */
  const handleStatusChange = (item) => {
    item.roleState = !item.roleState;
    editUserStatus(item.id, {
      roleState: item.roleState
    }).then(() =>
      setDataSource([...dataSource])
    ).catch(err =>
      console.error(err)
    )
  }

  /**
   * 修改用户信息按钮点击事件
   * @param item 点击的列表项
   */
  const editUserBtnClick = async (item) => {
    await setIsEdit(true);
    await setIsEditDisable(item.roleId === 1);
    await setIsAddOpen(true);
    await setCurrentItem(item);
    addFormRef.current.setFieldsValue({...item});
  }

  // 关闭新增/修改用户信息弹窗
  const modelClose = async () => {
    await setIsEdit(false);
    await setIsEditDisable(!isEditDisable);
    await setCurrentItem(null);
    addFormRef.current.resetFields();
    setIsAddOpen(false);
  }

  return (
    <div>
      <Modal
        open={isAddOpen}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => modelClose()}
        onOk={() => addFormConfirm()}
      >
        <UserForm ref={addFormRef} regionList={regionList} isEditDisable={isEditDisable && isEdit} />
      </Modal>
      <Button type="primary" onClick={() => setIsAddOpen(true)}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
    </div>
  )
}

export default UserList
