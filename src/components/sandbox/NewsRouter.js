/**
 * 路由权限
 * @Author zs
 * @Date 2023-12-12
 * @Version 1.0
 * @Last Modified by : ZS
 * @Last Modified time :星期二
 */
import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../../views/sandbox/home/Home";
import UserList from "../../views/sandbox/user-manage/UserList";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import RightList from "../../views/sandbox/right-manage/RightList";
import NoPermission from "../../views/sandbox/nopermission/NoPermission";
import NewsAdd from "../../views/sandbox/news-mange/NewsAdd";
import NewsDraft from "../../views/sandbox/news-mange/NewsDraft";
import NewsCategory from "../../views/sandbox/news-mange/NewsCategory";
import NewsPreview from "../../views/sandbox/news-mange/NewsPreview";
import NewsUpdate from "../../views/sandbox/news-mange/NewsUpdate";
import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/AuditList";
import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Published from "../../views/sandbox/publish-manage/Published";
import Sunset from "../../views/sandbox/publish-manage/Sunset";
import {menuList} from "../../apis/urls";

const LocalRouter = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset
}

const NewsRouter = () => {
  const [routerList, setRouterList] = useState([]);

  // 获取路由
  useEffect(() => {
    menuList().then(res =>
      setRouterList([...res[0], ...res[1]])
    ).catch(err => {
      console.error(err);
    })
  }, []);

  /**
   * 检查是否有当前路由
   * @param key
   * @param pagepermisson
   * @returns {Boolean}
   */
  const checkRouter = (key, pagepermisson, routepermisson) => LocalRouter[key] && (pagepermisson || routepermisson)

  const { role: { rights: userRights } } = JSON.parse(localStorage.getItem("token"));
  /**
   * 当前用户是否有权限访问当前菜单
   * @param key
   * @returns {Boolean}
   */
  const checkUserPremission = (key) => userRights.includes(key)

  return (
    <Switch>
      {
        routerList.map(({ key, pagepermisson, routepermisson }) => (
          (checkRouter(key, pagepermisson, routepermisson) && checkUserPremission(key)) && <Route path={key} component={LocalRouter[key]} key={key} exact />
        ))
      }

      {/* 重定向 */}
      <Redirect from="/" to="/home" exact />
      {
        routerList.length > 0 && <Route path="*" component={NoPermission} />
      }
    </Switch>
  )
}

export default NewsRouter;
