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
    cods: false,
    addUser: false,
    RolesManagement: false,
    profile: false,
    Contact: false,
  });

  const loaction = nav.useLocation().pathname;

  useEffect(() => {
    if (loaction === "/AdminDashbard") {
      setMenu({
        dashboard: true,
      });
    } else if (loaction === "/Admin") {
      setMenu({
        cods: true,
      });
    } else if (loaction === "/AddUser") {
      setMenu({
        addUser: true,
      });
    } else if (loaction === "/RolesManagement") {
      setMenu({
        RolesManagement: true,
      });
    } else if (loaction === "/PhAdminProfile") {
      setMenu({
        Profile: true,
      });
    } else if (loaction === "/contact") {
      setMenu({
        Contact: true,
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
          alt="curoRx-logo"
        />
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link
              className={
                menu.dashboard === true ? "nav-link active" : "nav-link"
              }
              to="/AdminDashbard">
              <i
                className="fas fa-tachometer-alt"
                style={{ fontSize: "22px" }}
              />
              <span> Dashboard</span>
            </Link>
            <Link
              className={menu.cods === true ? "nav-link active" : "nav-link"}
              to="/Admin">
              <i className="fas fa-bookmark" style={{ fontSize: "22px" }} />
              <span> Auth Code Management</span>
            </Link>
            <Link
              className={menu.addUser === true ? "nav-link active" : "nav-link"}
              to="/AddUser">
              <i className="fas  fa-user-plus" style={{ fontSize: "22px" }} />
              <span> Add New User</span>
            </Link>
            <Link
              className={
                menu.RolesManagement === true ? "nav-link active" : "nav-link"
              }
              to="/RolesManagement">
              <i className="fas fa-user-edit" style={{ fontSize: "22px" }} />
              <span> Roles Management</span>
            </Link>
            <Link
              className={menu.Profile === true ? "nav-link active" : "nav-link"}
              to="/PhAdminProfile">
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
            onClick={() => {
              handleToggle();
            }}></button>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
