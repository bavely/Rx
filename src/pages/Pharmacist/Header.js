/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/Untitled1.png";
import {
  getDatabase,
  ref,
  onValue,
  onChildAdded,
  update,
} from "firebase/database";
import firebase from "../../utils/Firebase_Helper";

function Header() {
  const userId = parseInt(sessionStorage.getItem("user"), 10);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(firebase.app());

  //  const db = getDatabase();

  const [notifications, setNotifications] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [newNotification, setNewNotification] = useState({});
  const [privilege, setPrivilege] = useState([]);

  function timeConvert(time) {
    let dateFormat = new Date(time);
    let date = dateFormat.getMonth() + 1 + "/" + dateFormat.getDate();

    let hours = `${
      dateFormat.getHours() > 12
        ? dateFormat.getHours() - 12
        : dateFormat.getHours() === 0
        ? 12
        : dateFormat.getHours()
    }:${
      dateFormat.getMinutes() < 10
        ? "0" + dateFormat.getMinutes()
        : dateFormat.getMinutes()
    } ${dateFormat.getHours() > 12 ? " pm" : " am"}`;

    return `${date} ${hours}`;
  }

  const commentsRef = ref(database, "notifications/");

  useEffect(() => {
    getNots();
    onChildAdded(commentsRef, (data) => {
      setNewNotification(data.val());
      getNots();
    });
    pharmacistHelper.getPriv(sessionStorage.getItem("Role")).then((res) => {
      setPrivilege(res.data.data.map((x) => x.name));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNots = () => {
    return onValue(
      ref(database, "notifications/"),
      (snapshot) => {
        if (snapshot.val() !== null) {
          setNotifications(
            Object.entries(snapshot.val()).filter(
              ([key, note]) =>
                note.receiver === sessionStorage.getItem("user") &&
                note.sender !== sessionStorage.getItem("user")
            )
          );
        } else {
          setNotifications([]);
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  const handleread = (note) => {
    const updates = {};
    updates["/notifications/" + note[0]] = {
      ...note[1],
      unread: false,
    };
    update(ref(database), updates);
    getNots();
  };

  const handleDelete = (note) => {
    const updates = {};
    updates["/notifications/" + note[0]] = null;
    update(ref(database), updates);
    getNots();
  };

  // =================== Firebase ===================

  const [userProfile, setuserProfile] = useState({});
  const navigate = useNavigate();
  const [showNotifications, setshowNotifications] = useState(false);

  useEffect(() => {
    pharmacistHelper.getProfile(userId).then((res) => {
      sessionStorage.setItem(
        "userName",
        res.data.data.user[0].last + ", " + res.data.data.user[0].first
      );

      return setuserProfile(res.data.data.user[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    sessionStorage.setItem("logedin", false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("pt");
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  const handleShowNotification = () => {
    setshowNotifications(!showNotifications);
  };

  return (
    <div className="headers">
      <div className="large-header">
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
          <div className="container-fluid">
            <ul className="navbar-nav flex-nowrap ms-auto">
              <li className="nav-item dropdown no-arrow mx-1">
                <div className="nav-item dropdown no-arrow position-relative">
                  <a
                    className="dropdown-toggle nav-link"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="#">
                    <span className="badge bg-danger badge-counter">0</span>
                    <i
                      className="fas fa-bell fa-fw"
                      style={{ fontSize: "25px" }}
                    />
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1">
                <div className="nav-item dropdown no-arrow">
                  <a
                    className="dropdown-toggle nav-link"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="#"
                    onClick={handleShowNotification}>
                    <span className="badge bg-danger badge-counter">
                      {notifications.filter((i) => i[1].unread === true).length}
                    </span>
                    <i
                      className="fas fa-envelope fa-fw"
                      style={{ fontSize: "25px" }}
                    />
                  </a>
                  <>
                    {showNotifications ? (
                      <div
                        className="list-group position-absolute top-50 end-50 "
                        style={{
                          alignItems: "end",
                          backgroundColor: "white",
                          zIndex: "1000",
                          maxHeight: "18rem",
                          overflow: "scroll",
                          overflowX: "hidden",
                        }}>
                        {notifications
                          .sort(function (a, b) {
                            return a[1].timestamp > b[1].timestamp
                              ? -1
                              : b[1].timestamp > a[1].timestamp
                              ? 1
                              : 0;
                          })
                          .map((item) => {
                            return (
                              <div
                                key={item[0]}
                                className=" list-group list-group-horizontal ">
                                <div
                                  className=" list-group-item mx-0"
                                  style={{ border: "none", minWidth: "15rem" }}>
                                  <a
                                    style={{ border: "none", fontSize: "15px" }}
                                    href={item[1].url}
                                    key={item[0]}
                                    onClick={() => handleread(item)}
                                    className={`${
                                      item[1].unread
                                        ? "list-group-item list-group-item-action list-group-item-light"
                                        : "list-group-item list-group-item-action list-group-item-success"
                                    }`}>
                                    {item[1].sender_name}
                                    <p className="mb-2">
                                      {item[1].message
                                        ? `${item[1].message.slice(0, 30)} ...`
                                        : ""}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "10px",
                                        color: "GrayText",
                                      }}>
                                      {timeConvert(item[1].timestamp)}
                                    </p>
                                  </a>
                                </div>
                                <div
                                  className=" list-group-item mr-1"
                                  style={{ border: "none", minWidth: "20px" }}>
                                  <button
                                    onClick={() => handleDelete(item)}
                                    type="button"
                                    style={{ border: "none", float: "right" }}
                                    className="btn btn-outline-danger">
                                    <i
                                      className="fas fa-trash"
                                      style={{
                                        fontSize: "11px",
                                        border: "none",
                                      }}
                                    />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                </div>
                <div
                  className="shadow dropdown-list dropdown-menu dropdown-menu-end"
                  aria-labelledby="alertsDropdown"
                />
              </li>
              <div className="d-none d-sm-block topbar-divider" />
              <li className="nav-item dropdown no-arrow">
                <div className="nav-item dropdown no-arrow">
                  <div className="dropdown-toggle nav-link">
                    <span className="d-none d-md-inline me-2 text-gray-600 small">
                      Welcome {userProfile.first} {userProfile.last}
                    </span>
                    <div className="d-flex flex-column" id="content-wrapper">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        style={{
          minWidth: "100%",
          position: "fixed",
          top: "0",
          zIndex: 10,
        }}>
        <Navbar
          bg="white"
          expand="lg"
          color="dark"
          style={{
            minHeight: "4.4rem",
            marginBottom: "1rem",
          }}
          className="shadow small-header">
          <Container className="d-flex justify-content-between p-0">
            <Navbar.Brand>
              <Link to="/Pharmacist_Dashboard" className="nav-item">
                <img
                  src={logo}
                  alt="curoRx-logo"
                  style={{
                    margin: "0",
                    padding: "0",
                    height: "auto",
                  }}
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              style={{ position: "relative", right: "1rem" }}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto gap-4">
                {privilege.includes("Dashboard") && (
                  <Nav.Item>
                    <Link to="/Pharmacist_Dashboard" className="nav-item">
                      <i
                        className="fas fa-tachometer-alt"
                        style={{ fontSize: "22px" }}
                      />
                      <span>&nbsp;&nbsp;Dashboard</span>
                    </Link>
                  </Nav.Item>
                )}

                {privilege.includes("Add Provider") && (
                  <Nav.Item>
                    <Link to="/addprovider" className="nav-item">
                      <i
                        className="fas fa-user-md"
                        style={{ fontSize: "17px" }}>
                        <span className="addSybmol">&#43;</span>
                      </i>
                      <span>Add provider</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Manage Providers") && (
                  <Nav.Item>
                    <Link to="/provider_manage" className="nav-item">
                      <i
                        className="fas fa-user-md"
                        style={{ fontSize: "22px" }}></i>
                      <span>&nbsp;&nbsp;Manage Providers</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Add Patient") && (
                  <Nav.Item>
                    <Link to="/addpatient" className="nav-item">
                      <i
                        className="fas fa-procedures"
                        style={{ fontSize: "17px" }}>
                        <span className="addSybmol">&#43;</span>
                      </i>
                      <span>Add Patient</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Manage Patients") && (
                  <Nav.Item>
                    <Link to="/patient_manage_ph" className="nav-item">
                      <i
                        className="fas fa-procedures"
                        style={{ fontSize: "22px" }}></i>
                      <span>&nbsp;&nbsp;Manage Patients</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Messages") && (
                  <Nav.Item>
                    <Link to="/messages" className="nav-item">
                      <i
                        className="fas fa-envelope"
                        style={{ fontSize: "22px" }}
                      />
                      <span>&nbsp;&nbsp;Messages</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Mass Texting") && (
                  <Nav.Item>
                    <Link to="/mass-texting" className="nav-item">
                      <i
                        className="fas fa-regular fa-comment-dots"
                        style={{ fontSize: "22px" }}
                      />
                      <span>&nbsp;&nbsp;Mass Texting</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Surveys") && (
                  <Nav.Item>
                    <Link to="/survey_builder" className="nav-item">
                      <i className="fas fa-poll" style={{ fontSize: "22px" }} />
                      <span>&nbsp;&nbsp;Surveys</span>
                    </Link>
                  </Nav.Item>
                )}
                {privilege.includes("Profile") && (
                  <Nav.Item>
                    <Link to="/Pharmacist_Profile" className="nav-item">
                      <i
                        className="fas fa-user-edit"
                        style={{ fontSize: "22px" }}
                      />
                      <span>&nbsp;&nbsp;Profile</span>
                    </Link>
                  </Nav.Item>
                )}
                <Nav.Item className="align-self-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill mb-3"
                    onClick={handleLogout}>
                    Logout
                  </button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
export default Header;
