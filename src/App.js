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
import PrivateRoute from "./components/PrivateRoute";
// firebase context provider
import FirebaseProvider from "./components/FirebaseProvider";
// material ui components
import CssBaseline from "@material-ui/core/CssBaseline";
// themeprovider material ui
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./config/theme";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
