import React, { Component } from "react";
// BrowserRouter buat metode routing di html historyAPI(biar nav nya kaya multi page app)
// Route buat render component dengan cocokin pathurl(redirect)
//Switch buat pilih 1 component route berdasarkan pathurl yang cocok, kalo lebih dari 1 yg cocok maka pilih yang paling awal
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registrasi from "./pages/registrasi";
import Login from "./pages/login/";
import ForgotPass from "./pages/forgotpass";
import NotFound from "./pages/404";
import Private from "./pages/private";
import "bootstrap/dist/css/bootstrap.css";
import PrivateRoute from "./components/PrivateRoute";
import FirebaseProvider from "./components/FirebaseProvider";

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Switch>
          <Route path="/registrasi" component={Registrasi} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpass" component={ForgotPass} />
          <PrivateRoute path="/" exact component={Private} />
          <PrivateRoute path="/settings" component={Private} />
          <PrivateRoute path="/produk" component={Private} />
          <PrivateRoute path="/transaksi" component={Private} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
