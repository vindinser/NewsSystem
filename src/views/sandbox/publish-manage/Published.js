/**
 * 已发布
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

const Published = () => {
  const { btClick, tableData } = usePublish(2);

  return (
    <div>
      <NewsPublish tableData={tableData} button={id => <Button type="primary" danger onClick={() => btClick(id)}>下线</Button>} />
    </div>
  )
}

export default Published;
