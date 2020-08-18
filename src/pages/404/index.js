import React, { Component } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
function NotFound() {
  const styles = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Typography variant="subtitle1">Page Not Found</Typography>
        <Typography variant="h3">404</Typography>
        <Typography component={Link} to="/">
          Back to Home
        </Typography>
      </Paper>
    </Container>
  );
}

export default NotFound;
