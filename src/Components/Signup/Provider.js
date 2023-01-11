import React, { useContext, useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import helper from "../../utils/helper";
import providerHelper from "../../utils/Provider_Helper";
import Codevalidator from "../CodeValidation/codevalidator";
// import {NpiRegistry} from 'npi-registry-api';

const Provider = (props) => {
  const [user, setUser] = useState({});
  const { touched, errors } = props;
  const [npidata, setnpIdata] = useState({});
  const [msg, setMsg] = useState("init");
  const [randctrl, setRand] = useState("init");
  const [isValid, setIsvalid] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const handleValidation = (isValidFlag, codeValue) => {
    setIsvalid(isValidFlag);
    setCodeValue(codeValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    providerHelper
      .NPI(props.values.NPI, props.values.FirstName, props.values.LastName)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.length === 0) {
            setMsg("invalid");
          }
          //All good
          setnpIdata(res);
          setRand("data");
        } else {
          // Please verify the NPI
          setMsg("invalid");
        }
      });
  };
  const handleConfirmed = () => {
    const obj = {
      role: "1",
      npi: npidata.data[0].number,
      first_name: npidata.data[0].basic.first_name,
      last_name: npidata.data[0].basic.last_name,
      Email: props.values.Email,
      Password: props.values.Password,
      license: npidata.data[0].taxonomies[0].license,
      address: npidata.data[0].addresses[0].address_1,
      city: npidata.data[0].addresses[0].city,
      state: npidata.data[0].addresses[0].state,
      postal_code: npidata.data[0].addresses[0].postal_code,
      telephone_number: npidata.data[0].addresses[0].telephone_number,
      fax_number: npidata.data[0].addresses[0].fax_number,
    };
    providerHelper.handleRegister(obj).then((res) => {
      if (res.status === 200) {
        helper.handleDeleteCode(codeValue);
      }
      console.log(obj);
      setMsg(res.data.message);
      console.log(res.data.message);
    });
    console.log(obj);
  };
  return (
    <>
      {isValid ? (
        <>
          {randctrl === "data" ? (
            <>
              <div className="m-4">
                <form>
                  <>
                    {msg != "init" ? (
                      <div className="alert alert-success" role="alert">
                        {" "}
                        {msg} <a href="/"> Log in </a>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                  <h1>
                    <span className="Curo">Curo</span>
                    <span className="RX">Rx</span>
                  </h1>
                  <p className="lead">Please confirm your information</p>
                  <label className="form-control mb-3">
                    NPI: {npidata.data[0].number}{" "}
                  </label>
                  <label className="form-control mb-3">
                    First Name: {npidata.data[0].basic.first_name}{" "}
                  </label>
                  <label className="form-control mb-3">
                    Last Name: {npidata.data[0].basic.last_name}{" "}
                  </label>
                  <label className="form-control mb-3">
                    Email Address: {props.values.Email}{" "}
                  </label>
                  <label className="form-control mb-3">
                    State License: {npidata.data[0].taxonomies[0].license}
                  </label>
                  <>
                    {npidata.data[0].addresses.length > 0 ? (
                      <>
                        <label className="form-control mb-3">
                          Address: {npidata.data[0].addresses[0].address_1}{" "}
                        </label>
                        <label className="form-control mb-3">
                          City: {npidata.data[0].addresses[0].city}{" "}
                        </label>
                        <label className="form-control mb-3">
                          State: {npidata.data[0].addresses[0].state}{" "}
                        </label>
                        <label className="form-control mb-3">
                          Zip Code: {npidata.data[0].addresses[0].postal_code}{" "}
                        </label>
                        <label className="form-control mb-3">
                          Phone Number:{" "}
                          {npidata.data[0].addresses[0].telephone_number}{" "}
                        </label>
                        <label className="form-control mb-3">
                          Fax Number: {npidata.data[0].addresses[0].fax_number}
                        </label>
                      </>
                    ) : (
                      <>
                        {" "}
                        <h3>Address: </h3>
                        <h3>City: </h3>
                        <h3>State: </h3>
                        <h3>Zip Code: </h3>
                        <h3>Phone Number: </h3>
                        <h3>Fax Number: </h3>
                      </>
                    )}
                  </>
                </form>
                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={handleConfirmed}
                  >
                    Confirm
                  </button>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => {
                      setRand("init");
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="card-body">
              <div className="pt-4 pb-2">
                <h1 className="text-center">
                  <span className="curo">Curo</span>
                  <span className="RX">RX</span>
                </h1>
                <h5 className="card-title text-center pb-0 fs-4">
                  Create an Account
                </h5>
                <p className="text-center small">
                  Enter your information to create account
                </p>
                {msg === "found" ? (
                  <div className="alert alert-danger" role="alert">
                    This Email Is Assigned To A Diffrent Acount.
                  </div>
                ) : msg === "created" ? (
                  <div className="alert alert-success" role="alert">
                    Account Has Been Created And Pending For Approval.
                  </div>
                ) : msg === "invalid" ? (
                  <div className="alert alert-danger" role="alert">
                    We Were Not Able To Verify The Provided NPI.
                  </div>
                ) : msg === "init" ? (
                  <></>
                ) : msg === "fail" ? (
                  <div className="alert alert-danger" role="alert">
                    Something Went Wrong. Please Refresh The Page And Try Again.
                    If You Keep Getting This Error Please Contact The Admin.
                  </div>
                ) : (
                  <></>
                )}
              </div>{" "}
              <Form
                className="row g-3 needs-validation"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label htmlFor="yourNPI" className="form-label">
                    {" "}
                    NPI{" "}
                  </label>{" "}
                  <Field
                    type="text"
                    name="NPI"
                    className="form-control"
                    placeholder="1324655789"
                    id="yourNPI"
                    required
                    value={user.NPI}
                  />
                  {touched.NPI && errors.NPI && (
                    <p style={{ color: "red" }}>{errors.NPI}</p>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="yourFirstName" className="form-label">
                    {" "}
                    First Name{" "}
                  </label>{" "}
                  <Field
                    type="text"
                    name="FirstName"
                    className="form-control"
                    placeholder="Your First Name"
                    id="yourFirstName"
                    required
                    value={user.FirstName}
                  />
                  {touched.FirstName && errors.FirstName && (
                    <p style={{ color: "red" }}>{errors.FirstName}</p>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="yourLastName" className="form-label">
                    {" "}
                    Last Name{" "}
                  </label>{" "}
                  <Field
                    type="text"
                    name="LastName"
                    className="form-control"
                    placeholder="Your Last Name"
                    id="yourLastName"
                    required
                    value={user.LastName}
                  />
                  {touched.LastName && errors.LastName && (
                    <p style={{ color: "red" }}>{errors.LastName}</p>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="yourEmail" className="form-label">
                    {" "}
                    Your Email{" "}
                  </label>{" "}
                  <Field
                    type="email"
                    name="Email"
                    className="form-control"
                    placeholder="YourEmail@email.com"
                    id="yourEmail"
                    required
                    value={user.Email}
                  />
                  {touched.Email && errors.Email && (
                    <p style={{ color: "red" }}>{errors.Email}</p>
                  )}
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="col-12">
                  <label htmlFor="yourPassword1" className="form-label">
                    {" "}
                    Password{" "}
                  </label>{" "}
                  <Field
                    type="password"
                    name="Password"
                    className="form-control"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    id="yourPassword1"
                    required
                    value={user.Password}
                  />{" "}
                  {touched.Password && errors.Password && (
                    <p style={{ color: "red" }}>{errors.Password}</p>
                  )}
                  <div className="invalid-feedback">
                    {" "}
                    Please enter your password!{" "}
                  </div>{" "}
                </div>{" "}
                <div className="col-12">
                  <label htmlFor="yourPassword" className="form-label">
                    {" "}
                    Confirm Password{" "}
                  </label>{" "}
                  <Field
                    type="password"
                    name="C_Password"
                    className="form-control"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    id="yourPassword"
                    required
                    value={user.C_Password}
                  />{" "}
                  {touched.C_Password && errors.C_Password && (
                    <p style={{ color: "red" }}>{errors.C_Password}</p>
                  )}
                  <div className="invalid-feedback">
                    {" "}
                    Please enter your password!{" "}
                  </div>{" "}
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="terms"
                      type="checkbox"
                      defaultValue
                      id="acceptTerms"
                      required
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      {" "}
                      I agree and accept the{" "}
                      <a href="#"> terms and conditions </a>
                    </label>
                    <div className="invalid-feedback">
                      {" "}
                      You must agree before submitting.{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit">
                    {" "}
                    Create Account{" "}
                  </button>{" "}
                </div>{" "}
                <div className="col-12">
                  <button
                    className="btn btn-outline-danger w-100"
                    type="submit"
                  >
                    {" "}
                    Cancel{" "}
                  </button>{" "}
                </div>
                <div className="col-12">
                  <p className="small mb-0">
                    {" "}
                    Already have an account ? <a href="/"> Log in </a>
                  </p>
                </div>{" "}
              </Form>{" "}
            </div>
          )}
        </>
      ) : (
        <>
          <Codevalidator onValidation={handleValidation} role="1" />
        </>
      )}
    </>
  );
};
export default withFormik({
  mapPropsToValues: (values) => {
    return {
      NPI: values.NPI || "",
      FirstName: values.FirstName || "",
      LastName: values.LastName || "",
      Email: values.Email || "",
      Password: values.Password || "",
      C_Password: values.C_Password || "",
    };
  },

  validationSchema: yup.object().shape({
    NPI: yup.string().required("Required"),
    FirstName: yup.string().required("Required"),
    LastName: yup.string().required("Required"),
    Email: yup.string().email("Invalid email").required("Required"),
    Password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    C_Password: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
  }),

  handleSubmit(values) {
    this.handleSubmit(values);
  },
})(Provider);
