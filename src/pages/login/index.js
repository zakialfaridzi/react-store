import React, { Component, useState } from "react";
// import button material ui
import Button from "@material-ui/core/Button";
// import container material ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

// react-router-dom buat routing login
import { Link, Redirect } from "react-router-dom";
// import validator buat form validation
import isEmail from "validator/lib/isEmail";
// import firebase hooks
import { useFirebase } from "./../../components/FirebaseProvider";
import AppLoading from "./../../components/Loading/index";
import { app } from "firebase";

function Login(props) {
  const { location } = props;
  const styles = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newError = { ...error };
    if (!form.email) {
      newError.email = "you forgot this or what?";
    } else if (!isEmail(form.email)) {
      newError.email = "Email is not valid!";
    }

    if (!form.password) {
      newError.password = "seriously? fill this please!";
    }

    return newError;
  };

  const { auth, user, loading } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErrors = validate();
    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      try {
        setSubmitting(true);
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "User not found!";
            break;
          case "auth/invalid-email":
            newError.email = "Email is invalid!";
            break;
          case "auth/wrong-password":
            newError.password = "Password is wrong!";
            break;
          case "auth/user-disabled":
            newError.email = "User has been disabled!";
            break;
          default:
            newError.email = "Failure happened, please try again. Sorry!";
            break;
        }
        setError(newError);
        setSubmitting(false);
      }
    }
  };

  //conditional rendering
  if (loading) {
    return <AppLoading />;
  }

  if (user) {
    const redirectTo =
      location.state && location.state.from && location.state.from.pathname
        ? location.state.from.pathname
        : "/";
    return <Redirect to={redirectTo} />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={styles.paper}>
        <Typography variant="h5" component="h1" className={styles.title}>
          Log In
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            name="email"
            margin="normal"
            label="Email Address"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            helperText={error.email}
            error={error.email ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            margin="normal"
            label="Password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            helperText={error.password}
            error={error.password ? true : false}
            disabled={isSubmitting}
          />

          <Grid container className={styles.buttons}>
            <Grid item xs>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                Log In
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/registrasi"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <div>
            <Typography
              component={Link}
              to="/forgotpass"
              className={styles.forgotpassword}
            >
              Forgot Password?
            </Typography>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
