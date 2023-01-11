import React from "react";
import providerHelper from "../../utils/Provider_Helper";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Example from "./Animation/Commercial";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  onChildAdded,
  update,
  remove,
} from "firebase/database";
import firebase from "../../utils/Firebase_Helper";

function Header() {
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(firebase.app());

  //  const db = getDatabase();

  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({});
  // let newNotification = {}
  // let notifications = []

  const commentsRef = ref(database, "notifications/");

  useEffect(() => {
    getNots();
    onChildAdded(commentsRef, (data) => {
      // console.log(data.val());
      setNewNotification(data.val());
      getNots();
    });
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
          // console.log(snapshot.val());
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

  // console.log(notifications);
  // console.log(newNotification);
  // =================== Firebase ===================
  const [showNotifications, setshowNotifications] = useState(false);
  const handleShowNotification = () => {
    setshowNotifications(!showNotifications);
  };
  const userId = sessionStorage.getItem("user");
  const [userProfile, setuserProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    providerHelper.getProfile(userId).then((res) => {
      console.log(res);
      sessionStorage.setItem("userName", res.data.data.user[0].last + ", " + res.data.data.user[0].first);

      return setuserProfile(res.data.data.user[0]);
    });
  }, []);

  const handleLogout = () => {
    sessionStorage.setItem("logedin", false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("pt");
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div className="container-fluid">
          <button
            className="btn btn-link d-md-none rounded-circle me-3"
            id="sidebarToggleTop"
            type="button">
            <i className="fas fa-bars" />
          </button>
          {/*<div className="fade1">*/}
          {/*          <Example/>*/}
          {/*          </div>*/}

          <ul className="navbar-nav flex-nowrap ms-auto">
            <li className="nav-item dropdown d-sm-none no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="#">
                <i className="fas fa-search" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                aria-labelledby="searchDropdown">
                <form className="me-auto navbar-search w-100">
                  <div className="input-group">
                    <input
                      className="bg-light form-control border-0 small"
                      type="text"
                      placeholder="Search for ..."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-success py-0" type="button">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </form>
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
                    className="fas fa-bell fa-fw"
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
                      }}>
                      {notifications.map((item) => {
                        return (
                          <div
                            key={item[0]}
                            className=" list-group list-group-horizontal">
                            <div
                              className=" list-group-item"
                              style={{ border: "none", minWidth: "20px" }}>
                              <a
                                style={{ border: "none" }}
                                href={item[1].url}
                                key={item[0]}
                                onClick={() => handleread(item)}
                                className={`${
                                  item[1].unread
                                    ? "list-group-item list-group-item-action list-group-item-light"
                                    : "list-group-item list-group-item-action list-group-item-success"
                                }`}>
                                {item[1].body}
                              </a>
                              <span>{item[1].timestamp}</span>
                            </div>
                            <div
                              className=" list-group-item"
                              style={{ border: "none", minWidth: "20px" }}>
                              <button
                                onClick={() => handleDelete(item)}
                                type="button"
                                style={{ border: "none", float: "right" }}
                                className="btn btn-outline-danger">
                                <i
                                  className="fas fa-trash"
                                  style={{ fontSize: "11px", border: "none" }}
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
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="me-3">
                      <div className="bg-primary icon-circle">
                        <i className="fas fa-file-alt text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">
                        December 12, 2019
                      </span>
                      <p>A new monthly report is ready to download!</p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="me-3">
                      <div className="bg-success icon-circle">
                        <i className="fas fa-donate text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">
                        December 7, 2019
                      </span>
                      <p>$290.29 has been deposited into your account!</p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="me-3">
                      <div className="bg-warning icon-circle">
                        <i className="fas fa-exclamation-triangle text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">
                        December 2, 2019
                      </span>
                      <p>
                        Spending Alert: We've noticed unusually high spending
                        for your account.
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#">
                    Show All Alerts
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#">
                  <span className="badge bg-danger badge-counter">7</span>
                  <i
                    className="fas fa-envelope fa-fw"
                    style={{ fontSize: "25px" }}
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="dropdown-list-image me-3">
                      <img
                        className="rounded-circle"
                        src="assets/img/avatars/avatar4.jpeg"
                      />
                      <div className="bg-success status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          Hi there! I am wondering if you can help me with a
                          problem I've been having.
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">
                        Emily Fowler - 58m
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="dropdown-list-image me-3">
                      <img
                        className="rounded-circle"
                        src="assets/img/avatars/avatar2.jpeg"
                      />
                      <div className="status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          I have the photos that you ordered last month!
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">Jae Chun - 1d</p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="dropdown-list-image me-3">
                      <img
                        className="rounded-circle"
                        src="assets/img/avatars/avatar3.jpeg"
                      />
                      <div className="bg-warning status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          Last month's report looks great, I am very happy with
                          the progress so far, keep up the good work!
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">
                        Morgan Alvarez - 2d
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#">
                    <div className="dropdown-list-image me-3">
                      <img
                        className="rounded-circle"
                        src="assets/img/avatars/avatar5.jpeg"
                      />
                      <div className="bg-success status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          Am I a good boy? The reason I ask is because someone
                          told me that people say this to all dogs, even if they
                          aren't good...
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">
                        Chicken the Dog · 2w
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#">
                    Show All Alerts
                  </a>
                </div>
              </div>
              <div
                className="shadow dropdown-list dropdown-menu dropdown-menu-end"
                aria-labelledby="alertsDropdown"
              />
            </li>
            <div className="d-none d-sm-block topbar-divider" />
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#">
                  <span className="d-none d-lg-inline me-2 text-gray-600 small">
                    Welcome Back Dr.{userProfile.last}
                  </span>
                  {/* <img
                      className="border rounded-circle img-profile"
                      src="assets/img/avatars/avatar1.jpeg"
                    /> */}

                  <div className="d-flex flex-column" id="content-wrapper">
                    <button
                      type="button"
                      className="btn btn-secondary rounded-pill"
                      onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Activity log
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Header;
