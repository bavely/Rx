import React, { useContext, useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import Codevalidator from "../CodeValidation/codevalidator";
import helper from "../../utils/helper";
const Pharmacist = (props) => {
  const { touched, errors } = props;
  const [msg, setMsg] = useState("init");
  const [btn, setBtn] = useState("init");
  const [user, setUser] = useState({});
  const [isValid, setIsvalid] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const handleValidation = (isValidFlag, codeValue) => {
    setIsvalid(isValidFlag);
    setCodeValue(codeValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBtn("loading");
    pharmacistHelper
      .handleRegister({
        NPI:props.values.NPI,
        PharmacyName: props.values.PharmacyName,
        Team: props.values.Teams,
        first_name: props.values.FirstName,
        last_name: props.values.LastName,
        Email: props.values.Email,
        Password: props.values.Password,
      })
      .then((res) => {
        console.log(res);
        setBtn("init");
        if (res.status === 200) {
          setMsg(res.data.message);
          helper.handleDeleteCode(codeValue);
        } else {
          setMsg("fail");
        }
      });
  };

  return (
    <>
      {isValid ? (
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

            {msg === "init" ? (
              <></>
            ) : msg === "fail" ? (
              <div className="alert alert-danger" role="alert">
                Something Went Wrong. Please Refresh The Page And Try Again. If
                You Keep Getting This Error Please Contact The Admin.
              </div>
            ) : (
              <div className="alert alert-success" role="alert">
                {msg} <a href="/"> Log in </a> Please
              </div>
            )}
          </div>{" "}
          <Form className="row g-3 needs-validation" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="Teams" className="form-label">
                {" "}
                Select Your Team{" "}
              </label>{" "}
              <Field as="select" name="Teams">
                <option value="">Select a team</option>
                <option value="IVIG">IVIG</option>
                <option value="Chronic">Chronic</option>
                <option value="Acute">Acute</option>
              </Field>
              {touched.Teams && errors.Teams && (
                <p style={{ color: "red" }}>{errors.Teams}</p>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="PharmacyName" className="form-label">
                {" "}
                Select Pharmacy Name{" "}
              </label>{" "}
              <Field as="select" name="PharmacyName">
                <option value="">Pharmacy Name</option>
                <option value="1">RE Pharmacy</option>
              </Field>
              {touched.PharmacyName && errors.PharmacyName && (
                <p style={{ color: "red" }}>{errors.PharmacyName}</p>
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
              <label htmlFor="NPI" className="form-label">
                {" "}
                NPI{" "}
              </label>{" "}
              <Field
                type="text"
                name="NPI"
                className="form-control"
                placeholder="NPI"
                id="NPI"
                required
                value={user.NPI}
              />
              {touched.NPI && errors.NPI && (
                <p style={{ color: "red" }}>{errors.NPI}</p>
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
                  I agree and accept the <a href="#"> terms and conditions </a>
                </label>
                <div className="invalid-feedback">
                  {" "}
                  You must agree before submitting.{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12">
              {btn === "init" ? (
                <button className="btn btn-primary w-100" type="submit">
                  {" "}
                  Create Account{" "}
                </button>
              ) : btn === "loading" ? (
                <button className="btn btn-primary w-100" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button className="btn btn-primary w-100" type="submit">
                  {" "}
                  Create Account{" "}
                </button>
              )}
            </div>{" "}
            <div className="col-12">
              <a
                href="/"
                className="btn btn-outline-danger w-100"
                type="submit"
              >
                {" "}
                Cancel{" "}
              </a>{" "}
            </div>
            <div className="col-12">
              <p className="small mb-0">
                {" "}
                Already have an account ? <a href="/"> Log in </a>
              </p>
            </div>{" "}
          </Form>{" "}
        </div>
      ) : (
        <>
          <Codevalidator onValidation={handleValidation} role="2" />
        </>
      )}
    </>
  );
};

export default withFormik({
  mapPropsToValues: (values) => {
    return {
      NPI: values.NPI || "",
      PharmacyName: values.PharmacyName || "",
      Teams: values.Teams || "",
      FirstName: values.FirstName || "",
      LastName: values.LastName || "",
      Email: values.Email || "",
      Password: values.Password || "",
      C_Password: values.C_Password || "",
    };
  },

  validationSchema: yup.object().shape({
    NPI: yup.string().required("NPI is required"),
    PharmacyName: yup.string().required("Pharmacy Name is required"),
    Teams: yup.string().required("Required"),
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
})(Pharmacist);
