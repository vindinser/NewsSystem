/**
 * 新闻更新（编辑）
 * @Author zs
 * @Date 2023-12-19
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Input, message, notification, Select, Steps} from "antd";
import {getCategories, getNewsDetail, updateNews} from "../../../apis/urls";
import {PageHeader} from "@ant-design/pro-layout";
import style from "./News.module.scss";
import NewsEditor from "../../../components/news-mange/NewsEditor";

const NewsUpdate = (props) => {
  const [stepCurrent, setStepCurrent] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);
  const NewsFromRef = useRef(null);
  const [formInfo, setFormInfo] = useState({});
  const [reachText, setReachText] = useState("");

  // 下一步按钮点击事件
  const handleNext = () => {
    if(stepCurrent === 0) {
      NewsFromRef.current.validateFields().then(res => {
        setFormInfo(res);
        setStepCurrent(stepCurrent+1);
      }).catch(err => {
        message.warning("请认真填写表单！");
        console.error(err);
      });
    } else {
      if(reachText === "" || reachText.trim() === "<p></p>") return message.warning("新闻内容不能为空！");
      setStepCurrent(stepCurrent+1);
    }
  }
  // 上一步按钮点击事件
  const handlePrevious = () => setStepCurrent(() => stepCurrent-1);

  /**
   * 保存/提交审核 按钮点击事件
   * @param {Number} auditState 0 草稿箱 1 提交审核
   */
  const handleSave = (auditState) => {
    updateNews({
      id: props.match.params.id,
      ...formInfo,
      auditState,
      "content": reachText
    }).then(res => {
      const path = auditState === 0 ? "/news-manage/draft" : "/audit-manage/list";
      props.history.push(path);

      notification.info({
        message: `通知`,
        description: `您可以到${ auditState === 0 ? "草稿箱" : "审核列表" }中查看您的新闻`,
        placement: "topRight"
      });
    }).catch(err => {
      console.error(err);
    })
  }

  // 获取新闻分类
  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategoriesList(res);
    })();
  }, []);

  // 获取新闻详情
  useEffect(() => {
    (async id => {
      const { title, categoryId, content } = await getNewsDetail(id);
      NewsFromRef.current.setFieldsValue({ title, categoryId });
      setReachText(content);
    })(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <PageHeader title="更新新闻" onBack={() => props.history.goBack()} />
      <Steps
        current={stepCurrent}
        items={[
          {
            title: '基本信息',
            description: "新闻标题，新闻分类"
          },
          {
            title: '新闻内容',
            description: "新闻主体内容"
          },
          {
            title: '新闻提交',
            description: "保存草稿或者提交审核"
          }
        ]}
      />

      <div style={{marginTop: "50px"}}>
        <div className={stepCurrent === 0 ? "" : style.active}>
          <Form
            ref={NewsFromRef}
            layout="vertical"
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            // form={form}
          >
            <Form.Item
              name="title"
              label="新闻标题"
              rules={[{required: true, message: '请输入新闻标题!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="新闻分类"
              rules={[{required: true, message: '请选择新闻分类!'}]}
            >
              <Select
                fieldNames={{ label: "title", value: "id" }}
                options={categoriesList}
              />
            </Form.Item>
          </Form>
        </div>
        <div className={stepCurrent === 1 ? "" : style.active}>
          <NewsEditor getRichText={(val) => setReachText(val)} content={reachText} />
        </div>
        <div className={stepCurrent === 2 ? "" : style.active}></div>
      </div>

      <div style={{marginTop: "50px"}}>
        {
          stepCurrent === 2 && <span>
            <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
            <Button danger onClick={() => handleSave(1)}>提交审核</Button>
          </span>
        }
        {
          stepCurrent < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
        }
        {
          stepCurrent > 0 && <Button onClick={handlePrevious}>上一步</Button>
        }
      </div>
    </div>
  );
}

export default NewsUpdate;
