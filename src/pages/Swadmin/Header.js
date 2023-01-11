/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import adminHelper from "../../utils/Admin_Helper";
import React, { useEffect, useState } from "react";
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
  const [newNotification, setNewNotification] = useState({});

  const commentsRef = ref(database, "notifications/");

  useEffect(() => {
    getNots();
    onChildAdded(commentsRef, (data) => {
      setNewNotification(data.val());
      getNots();
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

        // ...
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
    adminHelper.getSadminProfile(userId).then((res) => {
      sessionStorage.setItem(
        "userName",
        res.data.data.last + ", " + res.data.data.first
      );

      return setuserProfile(res.data.data);
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

  return (
    <div className="headers">
      <div className="large-header">
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
          <div className="container-fluid">
            <ul className="navbar-nav flex-nowrap ms-auto">
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
              <Link to="/AdminDashbard" className="nav-item">
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
                <Nav.Item>
                  <Link className="nav-item" to="/PharmaciesManagement">
                    <i
                      className="fas fa-tachometer-alt"
                      style={{ fontSize: "22px" }}
                    />
                    <span> Pharmacies Management</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-item" to="/PrivilegeManagement">
                    <i
                      className="fas fa-bookmark"
                      style={{ fontSize: "25px" }}
                    />
                    <span> &nbsp;Privilege Managementt</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-item" to="/SadminProfile">
                    <i
                      className="fas fa-id-card"
                      style={{ fontSize: "22px" }}
                    />
                    <span> Profile</span>
                  </Link>
                </Nav.Item>

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
