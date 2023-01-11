import { withFormik, Form, Field } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import helper from "../utils/helper";
import * as yup from "yup";

const PassReset = (props) => {
  const { values, touched, errors, handleChange, handleBlur } = props;
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
          helper
            .handleRanPass(props.values.p_email)
            .then((putRes) => {
              console.log(putRes);
              putRes?.data?.message &&     setMsg(putRes.data.message);
           
            });
  };

  return (
    <div className="container-reset">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card1 mb-3 px-2 bg-white">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Reset Your Password
                    </h5>
                    <p className="text-center small">
                      Please enter your email to reset your password
                    </p>
                    {msg ===""? <></> : <p style={{ color: "red" }}>{msg}</p>}
                  </div>
                  <Form
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit}>
                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="p_email"
                        className="form-control"
                        id="yourEmail"
                        value={values.p_email}
                        required
                      />
                      {touched.p_email && errors.p_email && (
                        <p style={{ color: "red" }}>{errors.p_email}</p>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label">
                        Confirm Email
                      </label>
                      <Field
                        type="email"
                        name="c_email"
                        className="form-control"
                        id="yourEmail"
                      />{" "}
                      {touched.c_email && errors.c_email && (
                        <p style={{ color: "red" }}>{errors.c_email}</p>
                      )}
                    </div>
                    <div className="col-12">
                      <button className="btn btn-success w-100" type="submit">
                        Submit{" "}
                      </button>
                    </div>
                  </Form>
                  <br />
                  <div className="col-12">
                    <p className="small mb-0">
                      {" "}
                      Go back to login ? <a href="/"> Log in </a>
                    </p>
                  </div>{" "}
                </div>
              </div>
              <footer className="bg-white1 sticky-footer">
                <div className="container my-auto">
                  <div className="text-center my-auto copyright">
                    {" "}
                    <span className=""> Copyright© NEXTEHEALTH </span>
                  </div>
                </div>{" "}
              </footer>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: (Values) => {
    return {
      p_email: Values.p_email || "",
      c_email: Values.c_email || "",
      msg: Values.msg || "init",
    };
  },
  validationSchema: yup.object().shape({
    p_email: yup.string().email("Invalid email").required("Required"),
    c_email: yup
      .string()
      .email("Invalid email")
      .required("Required")
      .oneOf([yup.ref("p_email"), null], "Email must match"),
  }),
  handleSubmit(values) {
    this.handleSubmit(values);
  },
})(PassReset);
