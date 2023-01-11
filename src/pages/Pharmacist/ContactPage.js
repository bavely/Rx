import React, { useState } from "react";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import Cards from "../Provider/Cards";
import helper from "../../utils/helper";

const Pharmacist_Contact_Page = () => {
  const logedin = sessionStorage.getItem("logedin");

  const [data, setData] = useState({});
  const [msg, setMsg] = useState("init");
  const [btn, setBtn] = useState("init");

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.name);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setBtn("loading");
    event.preventDefault();
    console.log(data);
    helper.contactUs(data).then((res) => {
      setBtn("init");
      console.log(res);

      if (res.status === 200) {
        setMsg("succsess");
      } else {
        setMsg("fail");
      }
    });
  };

  return (
    <div>
      {logedin === "true" ? (
        <div>
          <div id="wrapper">
            <Nav />
            <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <Header />
                <div className="container-fluid">
                  <div className="pagetitle">
                    <h1>Contact</h1>
                    <Cards />
                  </div>
                  <div className="dime">
                    <div className="card shadow">
                      <div
                        className="card-header py-3"
                        style={{ backgroundColor: "steelblue" }}>
                        <p className="text-primary m-0 fw-bold">Conatct Card</p>
                      </div>

                      <div className="col gy-4">
                        <div className="col1-xl-6">
                          <div className="row center">
                            <div className="col-lg-6">
                              <div className="info-box card">
                                <i className="bi bi-geo-alt" />
                                <h3>Address</h3>
                                <p>
                                  16782 Von Karan Ave,
                                  <br />
                                  Irvine, CA 92606
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="info-box card">
                                <i className="bi bi-telephone" />
                                <h3>Call Us</h3>
                                <p>
                                  +1 5589 55488 55
                                  <br />
                                  +1 6678 254445 41
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="info-box card">
                                <i className="bi bi-envelope" />
                                <h3>Email Us</h3>
                                <p>
                                  info@nextehealth.com
                                  <br />
                                  contact@nextehealth.com
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="info-box card">
                                <i className="bi bi-clock" />
                                <h3>Open Hours</h3>
                                <p>
                                  Monday - Friday
                                  <br />
                                  9:00AM - 05:00PM
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col2-xl-6">
                          <div className="card p-4">
                            <form onSubmit={handleSubmit}>
                              <div className="row gy-4">
                                <div className="col-md-6">
                                  <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-6 ">
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Your Email"
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-12">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    placeholder="Subject"
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-12">
                                  <textarea
                                    className="form-control"
                                    name="message"
                                    rows={6}
                                    placeholder="Message"
                                    required
                                    defaultValue={""}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-md-12 text-center">
                                  <>
                                    {msg === "fail" ? (
                                      <div className="alert alert-danger">
                                        {" "}
                                        Something Went Wrong. Please Try Again
                                      </div>
                                    ) : msg === "succsess" ? (
                                      <div className="alert alert-success">
                                        Your message has been sent. Thank you!
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  <>
                                    {btn === "init" ? (
                                      <button
                                        type="submit"
                                        className="btn btn-success">
                                        Send Message
                                      </button>
                                    ) : btn === "loading" ? (
                                      <button
                                        className="btn btn-success"
                                        type="button"
                                        disabled>
                                        <span
                                          className="spinner-grow spinner-grow-sm"
                                          role="status"
                                          aria-hidden="true"></span>
                                        Loading...
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                  <div className="text-center my-auto copyright">
                    <span>Copyright © NEXTEHEALTH</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
};

export default Pharmacist_Contact_Page;
