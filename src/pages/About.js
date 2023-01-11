import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import { Link } from "react-router-dom";
import helper from "../utils/helper";

export default function About() {
  console.log(helper.logedin);
  const logedin = sessionStorage.getItem("logedin");

  console.log(helper.tokenSwith);

  const authUser = useContext(UserContext);
  console.log(authUser);
  if (logedin === "true") {
    console.log(authUser);

    return <div></div>;
  } else {
    return (
      <div>
        <p>
          Please <Link to="/">Login</Link> or
          <Link to="/register">Register</Link> if you don't have an account.
        </p>
      </div>
    );
  }
}
