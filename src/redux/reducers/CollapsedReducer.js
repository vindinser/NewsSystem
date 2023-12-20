/**
 * 状态管理-侧边栏
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */
export const CollapsedReducer = (prevStatus = {
  isCollapsed: false
}, {type: actionType}) => {
  switch (actionType) {
    case "change_collapsed" :
      let newStatus = {...prevStatus}
      newStatus.isCollapsed = !newStatus.isCollapsed;
      return newStatus;
    default:
      return prevStatus;
  }
}
