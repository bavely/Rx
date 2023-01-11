import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import adminHelper from "../../utils/Admin_Helper";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/Untitled1.png";

function Header() {
  const userId = sessionStorage.getItem("user");
  const [userProfile, setuserProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    adminHelper.getPhadminProfile(userId).then((res) => {
      sessionStorage.setItem("userName", res.data.data.last);

      return setuserProfile(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    sessionStorage.setItem("logedin", false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("pt");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("pharmacy");
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
                  <Link className="nav-item" to="/AdminDashbard">
                    <i
                      className="fas fa-tachometer-alt"
                      style={{ fontSize: "22px" }}
                    />
                    <span> Dashboard</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-item" to="/Admin">
                    <i
                      className="fas fa-bookmark"
                      style={{ fontSize: "22px" }}
                    />
                    <span> Auth Code Management</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-item" to="/AddUser">
                    <i
                      className="fas  fa-user-plus"
                      style={{ fontSize: "22px" }}
                    />
                    <span> Add New User</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-item" to="/RolesManagement">
                    <i
                      className="fas fa-user-edit"
                      style={{ fontSize: "22px" }}
                    />
                    <span> Roles Management</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="nav-item" to="/PhAdminProfile">
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
