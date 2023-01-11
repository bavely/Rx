import React, { useContext, useEffect, useState } from "react";
import helper from "../../utils/helper";

export default function Codevalidator(props) {
  console.log(props.role);
  const [authCode, setCode] = useState({});
  const [msg, setMsg] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setCode({
      ...authCode,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(authCode);
    helper
      .handleCodeVerification(authCode.code)
      .then((res) => {
        if (res.data.Message === "Code is valid") {
          setMsg(res.data.message);
          if(res.data.data[0].role === props.role){props.onValidation(true, authCode.code);}else{props.onValidation(false, authCode.code);}
          
        } else {
          setMsg(
            `${res.data.Message} please try a valid code or contact your code provider`
          );
          props.onValidation(false, authCode.code);
        }
      })
      .catch((err) => {});
  };

  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <h1>
          <span className="curo">
            Curo<span className="rx">Rx</span>
          </span>
        </h1>
        <hr />
        <div className="col-auto">
          <label for="inputPassword2" className="visually-hidden">
            SignUp Authorization Code
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword2"
            placeholder="SignUp Authorization Code"
            name="code"
            onChange={handleChange}
            size="22"
            required
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Confirm identity
          </button>
        </div>
      </form>
      {msg}
    </div>
  );
}
