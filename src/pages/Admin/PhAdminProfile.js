import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Header from "./Header";
import { useModal } from "react-hooks-use-modal";
import adminHelper from "../../utils/Admin_Helper";

function PhAdminProfile() {
  const [Modal, open, close] = useModal("root", {
    preventScroll: true,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  });

  const userId = sessionStorage.getItem("user");
  const [msg, setMsg] = useState("");
  const [userProfile, setuserProfile] = useState({});
  const [randflag, setrandflag] = useState("");
  sessionStorage.removeItem("pt");

  useEffect(() => {
    adminHelper.getPhadminProfile(userId).then((res) => {
      if (res.status === 200) {
        setuserProfile(res.data.data);
      } else {
        setMsg(res.response.data.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [input, setInput] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const handleChanges = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminHelper.handleUpdatePhadminProfile(userId, input).then((res) => {
      if (res.status === 200) {
        setMsg(res.data.message);
      } else {
        setMsg(res.response.data.message);
      }
    });
  };

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
                <div className="card shadow mb-3 ">
                  <div
                    className="card-header py-3"
                    style={{ backgroundColor: "steelblue" }}>
                    <p className="text-primary m-0 fw-bold">User Settings</p>
                  </div>
                  <div class="card-body">
                    <li className="list-group-item list-group-item-action mt-3">
                      {" "}
                      <label className="form-label m-2" htmlFor="email">
                        <strong>Email:</strong>
                      </label>
                      {userProfile.email}
                      <button
                        className="btn btn-success ph-admin-profile"
                        type="button"
                        style={{ float: "right" }}
                        onClick={() => {
                          open();
                          setrandflag("email");
                        }}>
                        Update Email
                      </button>
                    </li>
                    <li className="list-group-item list-group-item-action mt-3">
                      {" "}
                      <label className="form-label m-2" htmlFor="password">
                        <strong>Password:</strong>
                      </label>
                      {/* <PharmacistPassword data={{ ID: userProfile.id }} /> */}
                      **********
                      <button
                        className="btn btn-success ph-admin-profile "
                        type="button"
                        style={{ float: "right" }}
                        onClick={() => {
                          open();
                          setrandflag("password");
                        }}>
                        Update Password
                      </button>
                    </li>
                    <li className="list-group-item list-group-item-action mt-3">
                      <label className="form-label m-2" htmlFor="Phone">
                        <strong>Phone Number:</strong>
                      </label>
                      {/* <PharmacistPassword data={{ ID: userProfile.id }} /> */}
                      {userProfile.phone}
                      <button
                        className="btn btn-success ph-admin-profile "
                        type="button"
                        style={{ float: "right" }}
                        onClick={() => {
                          open();
                          setrandflag("phone");
                        }}>
                        Update Phone Number
                      </button>
                    </li>

                    <Modal>
                      <div class="card">
                        <div class="card-header">
                          {randflag === "email"
                            ? "Update Email"
                            : randflag === "password"
                            ? "Update Password"
                            : "Update Phone Number"}
                        </div>
                        <div class="card-body">
                          {msg !== "" ? <></> : msg}
                          <form class="row gy-2 gx-3 align-items-center">
                            {randflag === "email" ? (
                              <div class="col-auto">
                                <label
                                  class="visually-hidden"
                                  for="autoSizingInput">
                                  Email
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="autoSizingInput"
                                  placeholder="New Email"
                                  name="email"
                                  onChange={handleChanges}
                                />
                              </div>
                            ) : randflag === "password" ? (
                              <div class="col-auto">
                                <label
                                  class="visually-hidden"
                                  for="autoSizingInput">
                                  Password
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="autoSizingInput"
                                  placeholder="New Password"
                                  name="password"
                                  onChange={handleChanges}
                                />
                              </div>
                            ) : (
                              <div class="col-auto">
                                <label
                                  class="visually-hidden"
                                  for="autoSizingInput">
                                  Phone
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="autoSizingInput"
                                  placeholder="New Phone"
                                  name="phone"
                                  onChange={handleChanges}
                                />
                              </div>
                            )}

                            <div class="col-auto mt-3">
                              <button
                                type="submit"
                                class="btn btn-success"
                                onClick={handleSubmit}>
                                Submit
                              </button>
                            </div>
                          </form>
                          <button onClick={close} class="btn btn-success">
                            Close
                          </button>
                        </div>
                      </div>
                    </Modal>
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
  );
}

export default PhAdminProfile;
