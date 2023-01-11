import React, { useState } from "react";
import helper from "../utils/helper";

export default function Register(props) {
  const [user, setUser] = useState({
    BIN: "",
    pharmacyID: "",
    code: "",
    email: "",
    phone: "",
    password: "",
    first: "",
    last: "",
    type: "",
  });
  const [validated, setValidated] = useState({ pharmacy: false, user: false });
  const [messageHandler, setMessageHandler] = useState({
    type: "error",
    message: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setMessageHandler({ ...messageHandler, message: "" });
  };

  const handleBINSubmit = (event) => {
    event.preventDefault();
    const { BIN } = user;
    helper
      .validatePharmacy({ BIN })
      .then((res) => {
        if (res) {
          setUser({ ...user, pharmacyID: res.data.pharmacyID[0].id });
          setValidated({ ...validated, pharmacy: true });
        }
      })
      .catch((err) => {
        setMessageHandler({
          ...messageHandler,
          message: err.response.data.message,
        });
      });
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    const { code } = user;
    helper
      .validateUser({ code })
      .then((res) => {
        if (res) {
          setUser({ ...user, type: res.data.data[0].userType });
          setValidated({ ...validated, user: true });
        }
      })
      .catch((err) => {
        setMessageHandler({
          ...messageHandler,
          message: err.response.data.message,
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, phone, password, first, last, type } = user;
    helper
      .userRegister({ email, phone, password, first, last, type })
      .then((res) => {
        if (res) {
          helper
            .registerUserToPharmacy({
              pharmacyID: user.pharmacyID,
              userID: res.data.user[0].id,
            })
            .then((resp) => {
              setMessageHandler({
                type: "success",
                message:
                  "Successfully Registered, you will be redirected to Login",
              });
              setTimeout(() => {
                if (resp) {
                  window.location.replace("/");
                }
              }, 5000);
            });
        }
      })
      .catch((err) => {
        setMessageHandler({
          ...messageHandler,
          message: err.response.data.message,
        });
      });
  };

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                  </div>
                  {validated.pharmacy === false ? (
                    // pharmacy validation
                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleBINSubmit}>
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Enter pharmacy BIN code
                        </label>
                        <input
                          type="text"
                          name="BIN"
                          className="form-control"
                          id="yourEmail"
                          placeholder="BIN"
                          onChange={handleChange}
                          value={user.BIN}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid BIN code!
                        </div>
                      </div>
                      <button className="btn btn-success w-100" type="submit">
                        validate pharmacy
                      </button>
                      {messageHandler.message && (
                        <div
                          className="alert alert-transparency text-danger my-1 text-center"
                          role="alert">
                          <p className="register-msg">
                            {messageHandler.message}
                          </p>
                        </div>
                      )}
                    </form>
                  ) : validated.pharmacy === true &&
                    validated.user === false ? (
                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleUserSubmit}>
                      <div className="col-12">
                        <label className="form-label">Enter user code</label>
                        <input
                          type="text"
                          name="code"
                          className="form-control"
                          id="yourEmail"
                          placeholder="Code"
                          onChange={handleChange}
                          value={user.code}
                          required
                        />
                      </div>
                      <button className="btn btn-success w-100" type="submit">
                        validate user
                      </button>
                      {messageHandler.message && (
                        <div
                          className="alert alert-transparency text-danger my-1 text-center"
                          role="alert">
                          <p className="register-msg">
                            {messageHandler.message}
                          </p>
                        </div>
                      )}
                    </form>
                  ) : validated.pharmacy === true && validated.user === true ? (
                    <div>
                      <p className="text-center small">
                        Enter your personal details to create account
                      </p>
                      <form
                        className="row g-3 needs-validation"
                        noValidate
                        onSubmit={handleSubmit}>
                        <div className="col-12">
                          <label htmlFor="yourFirst" className="form-label">
                            Your first name
                          </label>
                          <input
                            type="text"
                            name="first"
                            className="form-control"
                            id="yourFirst"
                            placeholder="fisrt name"
                            onChange={handleChange}
                            value={user.first}
                            required
                          />
                          <div className="invalid-feedback">
                            Please, enter your fisrt name!
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourName" className="form-label">
                            Your last name
                          </label>
                          <input
                            type="text"
                            name="last"
                            className="form-control"
                            id="yourName"
                            placeholder="last name"
                            onChange={handleChange}
                            value={user.last}
                            required
                          />
                          <div className="invalid-feedback">
                            Please, enter your last name!
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourEmail" className="form-label">
                            Your Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                            placeholder="email"
                            onChange={handleChange}
                            value={user.email}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a valid Email adddress!
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">
                            Your phone number
                          </label>

                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            id="yourPhoneNumber"
                            placeholder="2223334444"
                            onChange={handleChange}
                            value={user.phone}
                            required
                          />
                          <div className="invalid-feedback">
                            Please choose a phone number.
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            placeholder="password"
                            onChange={handleChange}
                            value={user.password}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              name="terms"
                              type="checkbox"
                              value=""
                              id="acceptTerms"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acceptTerms">
                              I agree and accept the{" "}
                              <a href="#">terms and conditions</a>
                            </label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-success w-100"
                            type="submit">
                            Create Account
                          </button>
                        </div>
                        {messageHandler.message && (
                          <div
                            className="alert alert-transparency text-danger mt-1 mb-4 text-center"
                            role="alert">
                            {messageHandler.type === "success" ? (
                              <p className=" col-12" id="success-msg">
                                {messageHandler.message}
                              </p>
                            ) : (
                              <p className="register-msg col-12">
                                {messageHandler.message}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account?{" "}
                            <a href="pages-login.html">Log in</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="credits"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
