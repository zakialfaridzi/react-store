import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserSettings from "./user";
import StoreSettings from "./store";

function Settings() {
  return (
    <Switch>
      <Route path="/settings/user" component={UserSettings} />
      <Route path="/settings/store" component={StoreSettings} />
      <Redirect to="/settings/user" />
    </Switch>
  );
}

export default Settings;
