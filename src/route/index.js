// 路由
import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/login/Login";
import NewSandBox from "../views/sandbox/NewSandBox";

const IndexRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
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
