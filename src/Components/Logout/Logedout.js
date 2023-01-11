import React from "react";
import { Link } from "react-router-dom";

export default function Logedout() {
  return (
    <div>
      <p>
        {" "}
        Please <Link to="/">Login</Link> or <Link to="/register">Register</Link>{" "}
        if you don't have an account.
      </p>
    </div>
  );
}
