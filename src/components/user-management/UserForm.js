/**
 * 新增用户 表单
 * @Author zs
 * @Date 2023-12-07
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期四
 */
import React, {forwardRef, useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import {roles as getRoles} from "../../apis/urls";

const UserForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  // 用户列表
  const [roleList, setRoleList] = useState([]);
  // 区域列表
  const [regionList, setRegionList] = useState([]);
  // 是否禁用
  const [isDisabled, setIsDisabled] = useState(false);

  const { roleId: userRolesId, region: roleRegion } = JSON.parse(localStorage.getItem("token"));

  // 获取角色
  useEffect(() => {
    getRoles().then(role =>
      setRoleList(role.map(({ id: roleId, roleName }) => ({
        roleId,
        roleName,
        disabled: userRolesId === 1 ? false : [3, 2, 1][userRolesId-1] > roleId
      })))
    );
  }, [props.isEdit]);

  // 获取大区
  useEffect(() => {
    setRegionList(() => props.regionList.map(item => ({
      ...item,
      disabled: userRolesId === 1 ? false : props.isEdit ? (userRolesId !== 1) : (item.region !== roleRegion)
    })));
  }, [props.isEdit]);

  // 编辑时若角色为超级管理员则 区域禁用
  useEffect(() => {
    setIsDisabled(props.isEditDisable);
  }, [props.isEditDisable]);

  return (
    <Form
      ref={ref}
      layout="vertical"
      form={form}
      // name="form_in_modal"
      // initialValues={{
      //   modifier: 'public',
      // }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={!isDisabled && [{ required: true, message: '请选择区域!' }]}
      >
        <Select
          fieldNames={{ label: "title", value: "region" }}
          options={regionList}
          disabled={isDisabled}
        />
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: '请选择角色!' }]}
      >
        <Select
          fieldNames={{ label: "roleName", value: "roleId" }}
          onChange={(val) => {
            const isDisabled = val === 1;
            setIsDisabled(isDisabled);
            // isDisabled && ref.current.setFieldsValue({
            //   region: ""
            // });
            isDisabled && form.setFieldValue("region", "");
          }}
          options={roleList}
        />
      </Form.Item>
    </Form>
  )
})

export default UserForm;
