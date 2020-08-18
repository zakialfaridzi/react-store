import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserSettings from "./user";
import StoreSettings from "./store";
import { Tabs, Tab, Paper } from "@material-ui/core";
import useStyles from "./styles/index";

function Settings(props) {
  const { location, history } = props;
  const handleChangeTab = (event, value) => {
    history.push(value);
  };
  const styles = useStyles();

  return (
    <Paper square>
      <Tabs
        value={location.pathname}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
      >
        <Tab label="User Settings" value="/settings/user" />
        <Tab label="Store Settings" value="/settings/store" />
      </Tabs>
      <div className={styles.tabContent}>
        <Switch>
          <Route path="/settings/user" component={UserSettings} />
          <Route path="/settings/store" component={StoreSettings} />
          <Redirect to="/settings/user" />
        </Switch>
      </div>
    </Paper>
  );
}

export default Settings;
