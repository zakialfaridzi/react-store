import React, { Component } from "react";
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
import { Link } from "react-router-dom";

function Registrasi() {
  const styles = useStyles();
  return (
    <Container maxWidth="xs">
      <Paper className={styles.paper}>
        <Typography variant="h5" component="h1" className={styles.title}>
          Create New Account
        </Typography>
        <form>
          <TextField
            id="email"
            type="email"
            name="email"
            margin="normal"
            label="Email Address"
            fullWidth
            required
          />
          <TextField
            id="password"
            type="password"
            name="password"
            margin="normal"
            label="Password"
            fullWidth
            required
          />
          <TextField
            id="ulangi_password"
            type="password"
            name="ulangi_password"
            margin="normal"
            label="Repeat Password"
            fullWidth
            required
          />

          <Grid container className={styles.buttons}>
            <Grid item xs>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
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
