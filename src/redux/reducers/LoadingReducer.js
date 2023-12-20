/**
 * 控制全局 loading 的显示与隐藏
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */

export const LoadingReducer = (prevStatus = {
  isLoading: false
}, {type: actionType, payload: isLoading}) => {
  switch (actionType) {
    case "change_loading" :
      let newStatus = {...prevStatus}
      newStatus.isLoading = isLoading;
      return newStatus;
    default:
      return prevStatus;
  }
}
