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
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'redux',
  storage,
  blacklist: ['LoadingReducer']
}

const reducer = combineReducers({
  CollapsedReducer,
  LoadingReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistedStore = persistStore(store);

export {
  store,
  persistedStore
};
