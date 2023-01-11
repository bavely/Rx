import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import helper from "../utils/helper";
import "../css/bootstrap.min.css";
import "../css/CuroRX_homepage_Styles.css";
import curorx_re_site_logo from "../images/CuroRX_RE_SiteLogo.gif";
import patient_management_image from "../images/Index_PatientManagementImage.jpg";

export default function Login() {
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
    } else {
      setpassword("password");
      seteye(true);
    }
  };
  // ==================================================
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [btnFlag, setBtn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [logedin, setLogedin] = useState();

  helper.logedin = logedin;
  sessionStorage.setItem("logedin", logedin);
  console.log(logedin);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBtn(true);
    let payload = {};

    const { email, password } = user;
    if (user.email.includes("@")) {
      payload = { email, password };
    } else {
      payload = { phone: email, password };
    }

    helper
      .handleAuth(payload)
      .then((res) => {
        setBtn(false);
        if (res.data.user_type === "Admin") {
          sessionStorage.setItem("logedin", true);
          sessionStorage.setItem("user", res.data.user_id);
          sessionStorage.setItem("type", res.data.user_type);
          return navigate("/PharmaciesManagement");
        } else if (res.data.user_type === "pharmacyAdmin") {
          sessionStorage.setItem("logedin", true);
          sessionStorage.setItem("pharmacy", res.data.pharmacyID);
          sessionStorage.setItem("user", res.data.user_id);
          sessionStorage.setItem("type", res.data.user_type);
          return navigate("/AdminDashbard");
        } else if (
          res.data.user_type === "pharmacist" ||
          res.data.user_type === "user" ||
          res.data.user_type === "User"
        ) {
          sessionStorage.setItem("logedin", true);
          sessionStorage.setItem("pharmacy", res.data.pharmacyID);
          sessionStorage.setItem("user", res.data.user_id);
          sessionStorage.setItem("type", res.data.user_type);
          sessionStorage.setItem("Role", res.data.Role);
          return navigate("/Pharmacist_Dashboard");
        } else if (res.data.user_type === "provider") {
          sessionStorage.setItem("logedin", true);
          sessionStorage.setItem("pharmacy", res.data.pharmacyID);
          sessionStorage.setItem("user", res.data.user_id);
          sessionStorage.setItem("type", res.data.user_type);

          return navigate("/provider-dashboard");
        } else {
          res?.data?.data?.message && setMsg(res.data.data.message);
          sessionStorage.setItem("logedin", false);
          return null;
        }
      })
      .catch((err) => {
        err?.response?.data?.message && setMsg(err.response.data.message);
        setBtn(false);
      });
  };

  return (
    <div>
      <div className="container-fluid clearfix" id="index-top-logo-login-div">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={curorx_re_site_logo}
              className="img-fluid"
              id="curo-re-logo"
              alt="Welcome to CuroRX"></img>
          </div>
          <div className="col-md-6 text-end" id="top-login-div"></div>
        </div>
        <div id="index-welcome-div">
          <div className="col offset-0" id="index-welcome-div-login">
            <h1 className="fs-1 " id="index-welcome-div-h1">
              Welcome to <span className="curo">Curo</span>
              <span className="rx">RX</span>
            </h1>
            <p id="index-welcome-div-p">
              The all-in-one patient management platform designed with you in
              mind.
            </p>
            <form
              className="col-12  d-flex flex-column flex-wrap my-5 row"
              onSubmit={handleSubmit}>
              {msg === "fail" ? (
                <div
                  className="login-msg"
                  role="alert"
                  style={{ fontSize: "1.15rem" }}>
                  Something Went Wrong. Please Refresh The Page And Try Again.
                  If You Keep Getting This Error Please Contact The Admin.
                </div>
              ) : msg === "notapproved" ? (
                <div className="login-msg" role="alert">
                  Account Has Not Been Approved Yet.
                </div>
              ) : (
                <div className="col-12" role="alert">
                  {msg && <p className="login-msg">{msg}</p>}
                </div>
              )}
              <div className="d-flex flex-row gap-2 flex-wrap ">
                <div className="col-12 col-sm-5 col-md-4 col-lg-3">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email or Phone number"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                  &nbsp;
                </div>
                <div className="col-12 col-sm-5 col-md-4 col-lg-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type={password}
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      name="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-group-text">
                      <i
                        onClick={Eye}
                        className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-8 col-lg-6 d-flex flex-row flex-wrap justify-content-between align-content-center">
                <div className="register-links d-flex flex-column">
                  <Link to="/register"> REGISTER </Link>
                  <Link to="/resetpassword"> FORGOT YOUR PASSWORD ? </Link>
                </div>
                {btnFlag ? (
                  <button
                    className="btn btn-md btn-success col-12 col-sm-3 mt-2 mt-sm-0"
                    type="button"
                    disabled>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="btn btn-md btn-success col-12 col-sm-3 mt-2 mt-sm-0"
                    type="submit">
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div id="four-tiles-div">
          <div className="four-tiles-row">
            <div
              className="col-12 col-sm-6 col-lg-3 col-xl-3"
              id="tile-send-new-referral">
              <i
                className="fas fa-file-prescription d-lg-block d-xl-block justify-content-xxl-center"
                id="icon-send-new-referral"></i>
              <p
                className="d-lg-block d-xl-block fs-auto"
                id="tile-text-send-new-referral">
                SEND A NEW&nbsp;
                <strong>REFERRAL </strong>
              </p>
            </div>
            <div
              className="col-12 col-sm-6 col-lg-3 col-xl-3"
              id="tile-new-patient">
              <i
                className="fas fa-user-plus d-lg-block d-xl-block justify-content-xxl-center"
                id="icon-new-patient-registration"></i>
              <p
                className="d-lg-block d-xl-block fs-auto"
                id="tile-text-new-patient-registration">
                NEW PATIENT <strong> REGISTRATION </strong>
              </p>
            </div>
            <div
              className="col-12 col-sm-6 col-lg-3 col-xl-3"
              id="tile-register-as-new-provider">
              <i
                className="fas fa-user-md d-lg-block d-xl-block justify-content-xxl-center"
                id="icon-register-as-new-provider"></i>
              <p
                className="d-lg-block d-xl-block fs-auto"
                id="tile-text-register-as-new-provider">
                NEW PROVIDER <strong> REGISTRATION </strong>
              </p>
            </div>
            <div
              className="col-12 col-sm-6 col-lg-3 col-xl-3"
              id="tile-training-resources">
              <i
                className="fas fa-envelope d-lg-block d-xl-block justify-content-xxl-center"
                id="icon-training-resources"></i>
              <p
                className="d-lg-block d-xl-block fs-auto"
                id="tile-text-training-resources">
                SEND/RECEIVE<strong> MESSAGES </strong>
              </p>
            </div>
          </div>
        </div>
        <div id="manage-now-div">
          <div className="row" id="manage-now-div-row">
            <div className="col-md-6 col-lg-6" id="manage-now-div-image-column">
              <img
                className="img-fluid"
                id="manage-now-image"
                src={patient_management_image}
                alt="Patient Management by CuroRX"></img>
            </div>
            <div className="col-md-6 col-lg-6" id="manage-now-div-right-column">
              <p className="text-uppercase" id="manage-now-heading">
                Centralized, easy to use patient management
              </p>
              <button
                className="btn btn-success text-uppercase"
                id="manage-now-button"
                type="button"
                onClick={() => navigate("/register")}>
                Manage Now
              </button>
            </div>
          </div>
        </div>
        <div id="make-new-referral-div">
          <div className="row g-0" id="make-new-referral-row">
            <div
              className="col-sm-6 col-md-6 col-lg-6"
              id="make-new-referral-column-left">
              <p className="text-uppercase" id="make-new-referral-heading">
                Now it's easier than ever to refer a new patient
              </p>
              <button
                className="btn btn-success text-uppercase"
                id="make-new-referral-button"
                type="button"
                onClick={() => navigate("/register")}>
                Make a new referral now
              </button>
            </div>
          </div>
        </div>
      </div>
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact Us</h2>
            <p>
              NextEHealth develops custom software platforms and applications
              for healthcare professionals. With cutting-edge technologies, we
              improve patient care while meeting the unique business needs of
              our clients.
            </p>
          </div>
        </div>
        <div>
          <iframe
            style={{ border: 0, width: "100%", height: 350 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.5374884787257!2d-117.83781898534541!3d33.695038343917695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcde9f42dc2385%3A0x879606cd02e21109!2s16782%20Von%20Karman%20Ave%2C%20Irvine%2C%20CA%2092606!5e0!3m2!1sen!2sus!4v1642913520894!5m2!1sen!2sus"
            frameBorder={0}
            allowFullScreen
            title="company location"
          />
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="fas fa-location-arrow" />
                  <h4>Location:</h4>
                  <p>16782 Von Karman Ave, Irvine, CA 92606</p>
                </div>
                <div className="email">
                  <i className="fas fa-envelope" />
                  <h4>Email:</h4>
                  <p>info@nextehealth.com</p>
                </div>
                <div className="phone">
                  <i className="fas fa-phone" />
                  <h4>Call:</h4>
                  <p>+1 (866) 413-3156</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8 mt-5 mt-lg-0">
              <form
                action="forms/contact.php"
                method="post"
                className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={5}
                    placeholder="Message"
                    required
                    defaultValue={""}
                  />
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn-success">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
