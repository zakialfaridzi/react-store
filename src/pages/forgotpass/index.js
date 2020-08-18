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
// import notistack for snackbar notif
import { SnackbarProvider } from "notistack";
import { useSnackbar } from "notistack";

// react-router-dom buat routing login
import { Link, Redirect } from "react-router-dom";
// import validator buat form validation
import isEmail from "validator/lib/isEmail";
// import firebase hooks
import { useFirebase } from "./../../components/FirebaseProvider";
import AppLoading from "./../../components/Loading/index";
import { app } from "firebase";

function ForgotPass() {
  const styles = useStyles();

  const [form, setForm] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: "",
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

    return newError;
  };

  const { auth, user, loading } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErrors = validate();
    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      try {
        setSubmitting(true);
        const actionCodeSettings = {
          url: `${window.location.origin}/login`,
        };
        await auth.sendPasswordResetEmail(form.email, actionCodeSettings);
        enqueueSnackbar(
          `For password reset, kindly check your email inbox! (${form.email}).`,
          {
            variant: "success",
          }
        );
        setSubmitting(false);
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "User not found!";
            break;
          case "auth/invalid-email":
            newError.email = "Email is invalid!";
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
          Forgot Password
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

          <Grid container className={styles.buttons}>
            <Grid item xs>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                Submit
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

export default ForgotPass;
