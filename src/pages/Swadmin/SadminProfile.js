import React from "react";
import { useState, useEffect } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import { Link } from "react-router-dom";
import PharmacistEmail from "../../Components/PharmacistInfoUpdate/PharmacistEmail";
import PharmacistAddress from "../../Components/PharmacistInfoUpdate/PharmacistAddress";
import PharmacistPhone from "../../Components/PharmacistInfoUpdate/PharmacistPhone";
import PharmacistTeam from "../../Components/PharmacistInfoUpdate/PharmacistTeam";
import PharmacistPassword from "../../Components/PharmacistInfoUpdate/PharmacistPassword";

import Nav from "./Nav";
import Header from "./Header";

export default function SadminProfile() {
  const logedin = sessionStorage.getItem("logedin");
  const userId = sessionStorage.getItem("user");
  const [msg, setMsg] = useState("init");
  const [userProfile, setuserProfile] = useState({});
  sessionStorage.removeItem("pt");
  console.log(userProfile);
  console.log(userId);

  // useEffect(async () => {
  //   await pharmacistHelper.getProfile(userId).then((res) => {
  //     console.log(res);
  //     if (res.status === 200) {
  //       return setuserProfile(res.data.user[0]);
  //     } else {
  //       setMsg("fail");
  //     }
  //   });
  // }, []);

  return (
    <div id="wrapper">
      <Nav />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <div className="pagetitle">
              <h1>Profile</h1>
            </div>
            {/* <Cards /> */}

            {msg === "fail" ? (
              <>
                {" "}
                <div className="alert alert-danger" role="alert">
                  Something Went Wrong. Please Refresh The Page And Try Again.
                  If You Keep Getting This Error Please Contact The Admin.
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="row">
              <div className="col">
                <div className="card shadow mb-3">
                  <div
                    className="card-header py-3"
                    style={{ backgroundColor: "steelblue" }}>
                    <p className="text-primary m-0 fw-bold">User Settings</p>
                  </div>
                  <li className="list-group-item list-group-item-action">
                    {" "}
                    <label className="form-label" htmlFor="email">
                      <strong>Email</strong>
                    </label>
                    admin@nextehealth.com
                  </li>
                  <li className="list-group-item list-group-item-action">
                    {" "}
                    <label className="form-label" htmlFor="password">
                      <strong>Password</strong>
                    </label>
                    {/* <PharmacistPassword data={{ ID: userProfile.id }} /> */}
                    **********
                    <button
                      className="btn btn-success btn-sm"
                      type="button"
                      style={{ float: "right" }}>
                      {" "}
                      Update Password
                    </button>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright">
              <span>Copyright © NEXTEHEALTH</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
