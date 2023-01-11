import React, { useContext, useEffect, useState } from "react";
import helper from "../utils/helper";
import { UserContext } from "../hooks/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Homepage() {
  const logedin = sessionStorage.getItem("logedin");
  console.log(logedin);
  const authUser = useContext(UserContext);
  const navigate = useNavigate();
  if (logedin === "true") {
    const handleLogout = () => {
      sessionStorage.setItem("logedin", false);
      sessionStorage.removeItem("user");
      navigate("/");
    };

    return (
      <div>
        <h1> home page </h1> <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {" "}
          Please <Link to="/">Login</Link> or{" "}
          <Link to="/register">Register</Link> if you don't have an account.
        </p>
      </div>
    );
  }
}

export default Homepage;
