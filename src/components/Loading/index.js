import React, { Component } from "react";
// import material ui components
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

function AppLoading() {
  const styles = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={styles.loadingBox}>
        <Typography variant="h6" component="h2" className={styles.title}>
          Store App
        </Typography>
        <LinearProgress />
      </div>
    </Container>
  );
}

export default AppLoading;
