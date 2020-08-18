import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { useFirebase } from "./../../../components/FirebaseProvider";

function Home() {
  const { auth } = useFirebase();
  return (
    <>
      <h1>Store Homepage</h1>
    </>
  );
}

export default Home;
