import React, { useEffect, useMemo } from "react";

import "../../css/bootstrap.min1.css";
import image1 from "../../images/Untitled1.png";
import { useState, useCallback } from "react";
import * as nav from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFilePrescription,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "../../Components/Notifications/Notifications";
import adminHelper from "../../utils/Admin_Helper";
import pharmacistHelper from "../../utils/Pharmacist_Helper";

function Nav() {
  const [isActive, setIsActive] = useState(
    sessionStorage.getItem("isActive") === "true" ? true : false
  );

  const handleToggle = () => {
    setIsActive(!isActive);
    sessionStorage.setItem("isActive", !isActive);
  };

  const [privilege, setPrivilege] = useState([]);

  const [menu, setMenu] = useState({
    dashboard: false,
    new_rx: false,
    referrals: false,
    provider: false,
    profile: false,
    Contact: false,
    patient: false,
    messages: false,
    rx_processing: false,
    survey_builder: false,
    Csvupload: false,
    addPatient: false,
    addProvider: false,
    massText: false,
  });

  const loaction = nav.useLocation().pathname;

  useEffect(() => {
    if (loaction === "/Pharmacist_Dashboard") {
      setMenu({
        dashboard: true,
      });
    } else if (loaction === "/rx_manage") {
      setMenu({
        new_rx: true,
      });
    } else if (loaction === "/Referrals") {
      setMenu({
        referrals: true,
      });
    } else if (loaction === "/provider_manage") {
      setMenu({
        provider: true,
      });
    } else if (loaction === "/Pharmacist_Profile") {
      setMenu({
        profile: true,
      });
    } else if (loaction === "/Pharmacist_Contact_Page") {
      setMenu({
        Contact: true,
      });
    } else if (loaction === "/patient_manage_ph") {
      setMenu({
        patient: true,
      });
    } else if (loaction === "/messages") {
      setMenu({
        messages: true,
      });
    } else if (loaction === "/rx_processing") {
      setMenu({
        rx_processing: true,
      });
    } else if (loaction === "/survey_builder") {
      setMenu({
        survey_builder: true,
      });
    } else if (loaction === "/uploadcsv") {
      setMenu({
        Csvupload: true,
      });
    } else if (loaction === "/addpatient") {
      setMenu({
        addPatient: true,
      });
    } else if (loaction === "/addprovider") {
      setMenu({
        addProvider: true,
      });
    } else if (loaction === "/mass-texting") {
      setMenu({
        massText: true,
      });
    }
    pharmacistHelper.getPriv(sessionStorage.getItem("Role")).then((res) => {
      setPrivilege(res.data.data.map((x) => x.name));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`main-nav navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 ${
        isActive ? "toggled" : ""
      }`}>
      <div className="container-fluid d-flex flex-column p-0">
        <img
          src={image1}
          style={{ height: 70, width: "100%" }}
          alt="curoRx-logo"
        />
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          {privilege.includes("Dashboard") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.dashboard === true ? "nav-link active" : "nav-link"
                }
                to="/Pharmacist_Dashboard">
                <i
                  className="fas fa-tachometer-alt"
                  style={{ fontSize: "22px" }}
                />
                <span>&nbsp;&nbsp;Dashboard</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Add Provider") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.addProvider === true ? "nav-link active" : "nav-link"
                }
                to="/addprovider">
                <i className="fas fa-user-md" style={{ fontSize: "17px" }}>
                  <span className="addSybmol">&#43;</span>
                </i>
                <span>Add provider</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Manage Providers") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.provider === true ? "nav-link active" : "nav-link"
                }
                to="/provider_manage">
                <i className="fas fa-user-md" style={{ fontSize: "22px" }}></i>
                <span>&nbsp;&nbsp;Manage Providers</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Add Patient") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.addPatient === true ? "nav-link active" : "nav-link"
                }
                to="/addpatient">
                <i className="fas fa-procedures" style={{ fontSize: "17px" }}>
                  <span className="addSybmol">&#43;</span>
                </i>
                <span>Add Patient</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Manage Patients") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.patient === true ? "nav-link active" : "nav-link"
                }
                to="/patient_manage_ph">
                <i
                  className="fas fa-procedures"
                  style={{ fontSize: "22px" }}></i>
                <span>&nbsp;&nbsp;Manage Patients</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Messages") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.messages === true ? "nav-link active" : "nav-link"
                }
                to="/messages">
                <i className="fas fa-envelope" style={{ fontSize: "22px" }} />
                <span>&nbsp;&nbsp;Messages</span>
              </Link>
            </li>
          ) : null}
          {privilege.includes("Mass Texting") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.massText === true ? "nav-link active" : "nav-link"
                }
                to="/mass-texting">
                {/* <i
                  className="fas fa-comment-sms"
                  style={{ fontSize: "22px" }}
                /> */}
                <i
                  className="fas fa-regular fa-comment-dots"
                  style={{ fontSize: "22px" }}
                />
                <span>&nbsp;&nbsp;Mass Texting</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Surveys") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.survey_builder === true ? "nav-link active" : "nav-link"
                }
                to="/survey_builder">
                <i className="fas fa-poll" style={{ fontSize: "22px" }} />
                <span>&nbsp;&nbsp;Surveys</span>
              </Link>
            </li>
          ) : null}

          {privilege.includes("Profile") ? (
            <li className="nav-item">
              <Link
                className={
                  menu.profile === true ? "nav-link active" : "nav-link"
                }
                to="/Pharmacist_Profile">
                <i className="fas fa-user-edit" style={{ fontSize: "22px" }} />
                <span>&nbsp;&nbsp;Profile</span>
              </Link>
            </li>
          ) : null}
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
            onClick={handleToggle}></button>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
