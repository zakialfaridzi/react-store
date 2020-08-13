import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Settings from "./settings/index";
import Produk from "./produk/index";
import Transaksi from "./transaksi/index";
import Home from "./home/index";

function Private() {
  return (
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/produk" component={Produk} />
      <Route path="/transaksi" component={Transaksi} />
      <Route component={Home} />
    </Switch>
  );
}

export default Private;
