import React, { useEffect, useState } from "react";
import "../../css/bootstrap.min1.css";
import image1 from "../../images/Untitled1.png";
import * as nav from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
  const [isActive, setIsActive] = useState(
    sessionStorage.getItem("isActive") === "true" ? true : false
  );

  const handleToggle = () => {
    setIsActive(!isActive);
    sessionStorage.setItem("isActive", !isActive);
  };

  const [menu, setMenu] = useState({
    dashboard: false,
    pharmaciesManagment: false,
    privManagment: false,
    provider: false,
    profile: false,
    Contact: false,
    patient: false,
    messages: false,
    rx_processing: false,
    survey_builder: false,
    Csvupload: false,
  });

  const loaction = nav.useLocation().pathname;

  useEffect(() => {
    if (loaction === "/PharmaciesManagement") {
      setMenu({
        pharmaciesManagment: true,
      });
    } else if (loaction === "/PrivilegeManagement") {
      setMenu({
        privManagment: true,
      });
    } else if (loaction === "/Referrals") {
      setMenu({
        referrals: true,
      });
    } else if (loaction === "/provider_manage") {
      setMenu({
        provider: true,
      });
    } else if (loaction === "/SadminProfile") {
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
    }
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
          alt="main_logo"
        />
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link
              className={
                menu.pharmaciesManagment === true
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/PharmaciesManagement">
              <i
                className="fas fa-tachometer-alt"
                style={{ fontSize: "22px" }}
              />
              <span> Pharmacies Management</span>
            </Link>
            <Link
              className={
                menu.privManagment === true ? "nav-link active" : "nav-link"
              }
              to="/PrivilegeManagement">
              <i className="fas fa-bookmark" style={{ fontSize: "25px" }} />
              <span> Privilege Managementt</span>
            </Link>
            <Link
              className={menu.profile === true ? "nav-link active" : "nav-link"}
              to="/SadminProfile">
              <i className="fas fa-id-card" style={{ fontSize: "22px" }} />
              <span> Profile</span>
            </Link>
          </li>
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
