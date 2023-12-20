/**
 * 自定义Hooks（获取待发布、已发布、已下线新闻列表）
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */
import {useEffect, useState} from "react";
import {delDraft, queryPublishList as getPublishList, updateNews} from "../../apis/urls";
import {notification} from "antd";

const usePublish = (publishState) => {
  const [tableData, setTableData] = useState([]);

  const { username: UserName } = JSON.parse(localStorage.getItem("token"));

  const getTableData = () => {
    getPublishList({
      userName: UserName,
      publishState
    }).then(res => {
      setTableData(res);
    }).catch(err => {
      console.error(err);
      setTableData([]);
    });
  }
  useEffect(() => {
    getTableData();
  }, [UserName, publishState]);

  /**
   * 列表操作按钮点击事件
   * @param {Number} id 操作的新闻项
   */
  const btClick = id => {
    (async param => {
      const apiName = param.publishState ? updateNews : delDraft;
      const description = (status =>
        (status ? `您可以到【发布管理/已${ status === 2 ? "发布" : "下线" }】中查看您的新闻` : "您已删除当前新闻")
      )(param.publishState);
      await apiName(param.publishState ? param : param.id);
      getTableData();
      notification.info({
        message: `通知`,
        description,
        placement: "topRight"
      });
    })({
      id,
      ...(publishState === 1 && {
        publishState: 2,
        publishTime: Date.now()
      }),
      ...(publishState === 2 && {
        publishState: 3
      })
    });
  }

  return {
    tableData,
    btClick
  }
}

export default usePublish;
