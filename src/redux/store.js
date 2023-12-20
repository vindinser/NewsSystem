/**
 * 状态管理 store
 * @Author zs
 * @Date 2023-12-20
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期三
 */
import {combineReducers, legacy_createStore as createStore} from "redux";
import {CollapsedReducer} from "./reducers/CollapsedReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";

const reducer = combineReducers({
  CollapsedReducer,
  LoadingReducer
});

const store = createStore(reducer);

export default store;
