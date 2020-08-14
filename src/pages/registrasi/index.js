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

function Registrasi() {
  const styles = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
    ulangi_password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    ulangi_password: "",
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
      newError.email = "Email is required!";
    } else if (!isEmail(form.email)) {
      newError.email = "Email is not valid!";
    }

    if (!form.password) {
      newError.password = "Password is required!";
    }

    if (!form.ulangi_password) {
      newError.ulangi_password = "Repeat password is required!";
    } else if (form.ulangi_password !== form.password) {
      newError.ulangi_password = "Password did not match!";
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
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case "auth/email-already-in-use":
            newError.email = "Email already in use!";
            break;
          case "auth/invalid-email":
            newError.email = "Email is invalid!";
            break;
          case "auth/weak-password":
            newError.password = "Password is weak!";
            break;
          case "auth/operation-not-allowed":
            newError.email = "Unsupported registration credentials!";
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
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={styles.paper}>
        <Typography variant="h5" component="h1" className={styles.title}>
          Create New Account
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
          <TextField
            id="ulangi_password"
            type="password"
            name="ulangi_password"
            margin="normal"
            label="Repeat Password"
            fullWidth
            required
            value={form.ulangi_password}
            onChange={handleChange}
            helperText={error.ulangi_password}
            error={error.ulangi_password ? true : false}
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
                Register
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/login"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Registrasi;
