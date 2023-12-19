/**
 * 新闻分类
 * @Author zs
 * @Date 2023-12-12
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Form, Input, Modal, Table} from "antd";
import {DeleteOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {addNewsCategory, addUser, delCategory, editUser, getCategories, updateCategories} from "../../../apis/urls";
import UserForm from "../../../components/user-management/UserForm";

const { confirm } = Modal;

const NewsCategory = () => {
  // 列表数据
  const [dataSource, setDataSource] = useState([]);
  // 控制新增新闻分类弹窗的展示与隐藏
  const [isAddOpen, setIsAddOpen] = useState(false);

  // 表格编辑
  const handleSave = param => {
    (async () => {
      await updateCategories(param)
      getTableData();
    })();
  }

  // 列表列
  const columns = [
    { title: 'ID', dataIndex: 'id', render: id => <b>{ id }</b> },
    { title: '栏目名称', dataIndex: 'title', onCell:
      (record) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: "栏目名称",
        handleSave,
      })
    }, {
      title: '操作',
      render: (item) => <div>
        <Button danger shape="circle" icon={ <DeleteOutlined /> } onClick={() => confirmMethod(item)} />
      </div>
    }
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
        (async () => {
          await delCategory(item.id);
          getTableData();
        })();
      }
    });
  }

  // 获取列表数据
  const getTableData = () => {
    getCategories().then(res => {
      setDataSource(res);
    }).catch(err => {
      console.error(err);
      setDataSource([])
    });
  };

  // 获取权限列表数据
  useEffect(() => {
    getTableData();
  }, []);

  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  }

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  const [addNewsCategoryForm] = Form.useForm();
  const addNewsCategoryFormRef = useRef(null);

  const modelClose = () => {
    addNewsCategoryFormRef.current.resetFields();
    setIsAddOpen(false);
  }

  const addNewsCategoryConfirm = () => {
    addNewsCategoryFormRef.current.validateFields().then(({ value }) => {
      (async () => {
        await addNewsCategory({ value, title: value });
        modelClose();
        getTableData();
      })();
    }).catch(err => console.error(err));
  }

  return (
    <div>
      <Modal
        open={isAddOpen}
        title="添加新闻分类"
        okText="确定"
        cancelText="取消"
        onCancel={() => modelClose()}
        onOk={() => addNewsCategoryConfirm()}
      >
        <Form
          ref={addNewsCategoryFormRef}
          layout="vertical"
          form={addNewsCategoryForm}
        >
          <Form.Item
            name="value"
            label="栏目名称"
            rules={[{ required: true, message: '请输入栏目名称!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setIsAddOpen(true)}>添加新闻分类</Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={item => item.id}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
    </div>
  )
}

export default NewsCategory;
