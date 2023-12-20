/**
 * 已下线
 * @Author zs
 * @Date 2023-12-12
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React from "react";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import {Button} from "antd";
import usePublish from "../../../components/publish-manage/usePublish";

const Sunset = () => {
  const { btClick, tableData } = usePublish(3);
  return (
    <div>
      <NewsPublish tableData={tableData} button={id => <Button danger onClick={() => btClick(id)}>删除</Button>} />
    </div>
  )
}

export default Sunset;
