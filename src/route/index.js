// 路由
import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/login/Login";
import NewSandBox from "../views/sandbox/NewSandBox";
import News from "../views/news/News";
import Details from "../views/news/Details";

const IndexRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* 游客系统 */}
        <Route path="/news" component={News} />
        <Route path="/detail/:id" component={Details} />
        {/*<Route path="/" component={NewSandBox} />*/}
        {/* 重定向 */}
        <Route path="/" render={() => localStorage.getItem("token")
          ? <NewSandBox />
          : <Redirect to="/login"/>
        } />
      </Switch>
    </HashRouter>
  )
}

export default IndexRouter
