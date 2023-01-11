import React, { useEffect, useMemo } from "react";

import "../../css/bootstrap.min1.css";
import image1 from "../../images/Untitled1.png";
import { useState, useCallback } from "react";
import * as nav from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
  const [isActive, setInactive] = useState( sessionStorage.getItem("isActive"))



  useEffect(() => {
    setInactive(sessionStorage.getItem("isActive"))
  }, [isActive]);

  if (isActive === null || isActive === "true" || isActive === undefined){
    sessionStorage.setItem("isActive", "true")
  }

  const handleToggle = () => {
    // setActive(!isActive);

    if ( isActive === "true"){
      sessionStorage.setItem("isActive", "false")
      setInactive(sessionStorage.getItem("isActive"))
    }else if(isActive === "false"){
      sessionStorage.setItem("isActive", "true")
      setInactive(sessionStorage.getItem("isActive"))
    }
  };

  console.log(isActive, "active ?");
  const [menu, setMenu] = useState({
    dashboard: false,
    new_rx: false,
    referrals: false,
    patients: false,
    profile: false,
    Contact: false,
    Addpatient:false,
    messages: false,
  });

  const loaction = nav.useLocation().pathname;

  useEffect(() => {
    if (loaction === "/provider-dashboard") {
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
    } else if (loaction === "/patient_manage") {
      setMenu({
        patients: true,
      });
    } else if (loaction === "/provider-profile") {
      setMenu({
        profile: true,
      });
    } else if (loaction === "/contact") {
      setMenu({
        Contact: true,
      });
    }else if (loaction === "/add_patients") {
      setMenu({
        Addpatient: true,
      });
    }else if (loaction === "/ messages_provider") {
      setMenu({
        messages: true,
      });
    }
  }, []);

  return (
    <nav
      className={ 
        isActive === "true"
          ? "navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
          : isActive === "false" ? "navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 toggled"
          : "navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
      }
    >
      <div className="container-fluid d-flex flex-column p-0">
        <img src={image1} style={{ height: 70, width: "100%" }} />
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link
              className={
                menu.dashboard === true ? "nav-link active" : "nav-link"
              }
              to="/provider-dashboard"
            >
              <i className="fas fa-tachometer-alt"  style={{ fontSize: "22px"}}/>
              <span>Dashboard</span>
            </Link>
          </li>  
          <li className="nav-item">
            <Link
              className={
                menu.Addpatient === true ? "nav-link active" : "nav-link"
              }
              to="/add_patients"
            >
                <i className="fas fa-procedures" style={{ fontSize: "17px" }}>
                  <span className="addSybmol">&#43;</span>
                </i>
              <span>Add Patient</span>
            </Link>
          </li> 
          <li className="nav-item">
            <Link
              className={
                menu.patients === true ? "nav-link active" : "nav-link"
              }
              to="/patient_manage"
            >
              <i className="fas fa-procedures" style={{ fontSize: "22px"}}/>
              <span>Manage Patients</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={menu.new_rx === true ? "nav-link active" : "nav-link"}
              to="/rx_manage"
            >
              <i className="fas fa-prescription" style={{ fontSize: "22px"}}/>
              <span>E-Prescribe</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={menu.new_rx === true ? "nav-link active" : "nav-link"}
              to="/messages_provider"
            >
              <i className="fas fa-envelope" style={{ fontSize: "22px" }} ></i>
              <span>Messages</span>
            </Link>
          </li>
  
        {/* messages_provider */}

          <li className="nav-item">
            <Link
              className={menu.profile === true ? "nav-link active" : "nav-link"}
              to="/provider-profile"
            >
              <i className="fas fa-user-edit" style={{ fontSize: "22px"}}/>
              <span>Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={menu.Contact === true ? "nav-link active" : "nav-link"}
              to="/contact"
            >
              <i className="fas fa-id-card" style={{ fontSize: "22px"}}/>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
            onClick={handleToggle}
          ></button>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
