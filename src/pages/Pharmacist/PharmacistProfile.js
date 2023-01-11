import React from "react";
import { useState, useEffect } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import img1 from "../../images/patient_placeholder.png";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";

function PharmacistProfile() {
  const logedin = sessionStorage.getItem("logedin");
  const userId = sessionStorage.getItem("user");

  const [msg, setMsg] = useState("");
  const [curUserInfo, setcurUserInfo] = useState({});
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    getProuserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProuserInfo = () => {
    pharmacistHelper.getProfile(userId).then((res) => {
      if (res.status === 200) {
        res.data.data.user[0].address =
          res.data.data.address.length > 0
            ? res.data.data.address
            : [
                {
                  street: "",
                  city: "",
                  state: "",
                  zip: "",
                },
              ];
        res?.data?.data?.user?.length > 0 &&
          setcurUserInfo(res.data.data.user[0]);
      } else {
        setMsg("fail");
      }
    });
  };

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const { handleProfileUpdate } = pharmacistHelper;

  useEffect(() => {
    setForm(curUserInfo);
  }, [curUserInfo]);

  const discardClickHandler = () => {
    setForm(curUserInfo);
    setIsEdit(false);
  };

  const changeHandler = (e) => {
    if (["street", "city", "zip", "state"].some((el) => el === e.target.name)) {
      setForm({
        ...form,
        address: [{ ...form.address[0], [e.target.name]: e.target.value }],
        passwordUpdated: false,
      });
    } else {
      // setForm({ ...form, [e.target.name]: e.target.value });
      if (
        e.target.name === "password" &&
        e.target.value !== curUserInfo.password
      ) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
          passwordUpdated: true,
        });
      } else {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
          passwordUpdated: false,
        });
      }
    }
    setIsDisabled(false);
  };

  const password2Handler = (e) => {
    setPassword2(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMsg("");
    const newForm = form;
    [
      "id",
      "contacts",
      "first",
      "last",
      "updatedAt",
      "createdAt",
      "userID",
      "active",
      "pharmacyID",
      "type",
    ].forEach((el) => delete newForm[el]);

    console.log(form.password);
    console.log(password2);
    if (form.password === password2 || form.passwordUpdated === false) {
      handleProfileUpdate(curUserInfo.id, newForm)
        .then((r) => {
          getProuserInfo();
          setMsg(r.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setMsg("Password doesn't match");
  };
  return (
    <div>
      {" "}
      {logedin === "true" ? (
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
                    <div className="alert alert-danger" role="alert">
                      Something Went Wrong. Please Refresh The Page And Try
                      Again. If You Keep Getting This Error Please Contact The
                      Admin.
                    </div>
                  </>
                ) : (
                  <p style={{ color: "red" }}>{msg}</p>
                )}
                <div className="wrapper">
                  {curUserInfo.id ? (
                    <section className="section profile container-fluid py-1">
                      <div className="row">
                        <div className="col-xl-4">
                          <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                              <img
                                src={img1}
                                alt="Profile"
                                className="rounded-circle mb-4"
                                width={180}
                              />
                              <h2>
                                {curUserInfo.first} {curUserInfo.last}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-8">
                          <div className="card">
                            <div className="card-body pt-3">
                              {/* Bordered Tabs */}
                              <ul className="nav nav-tabs nav-tabs-bordered">
                                <li className="nav-item">
                                  <button
                                    className={
                                      !isEdit ? "nav-link active" : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile-overview"
                                    onClick={() => setIsEdit(false)}>
                                    Overview
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className={
                                      isEdit ? "nav-link active" : "nav-link"
                                    }
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile-edit"
                                    onClick={() => setIsEdit(true)}>
                                    Edit Profile
                                  </button>
                                </li>
                              </ul>
                              <div className="tab-content pt-2 provider_info">
                                {!isEdit ? (
                                  <div
                                    className="tab-pane fade show active profile-overview"
                                    id="profile-overview">
                                    <h4 className="card-title text-center my-3">
                                      Profile Details
                                    </h4>
                                    <div className="row">
                                      <p className="col-lg-5 col-md-4  label fw-semibold">
                                        Full Name
                                      </p>
                                      <p className="col-lg-7 col-md-8">
                                        {curUserInfo.first} {curUserInfo.last}
                                      </p>
                                    </div>
                                    <div className="row">
                                      <p className="col-lg-5 col-md-4 label fw-semibold">
                                        Phone
                                      </p>
                                      <p className="col-lg-7 col-md-8">
                                        {curUserInfo.phone}
                                      </p>
                                    </div>
                                    <div className="row">
                                      <p className="col-lg-5 col-md-4 label fw-semibold">
                                        Email
                                      </p>
                                      <p className="col-lg-7 col-md-8">
                                        {curUserInfo.email}
                                      </p>
                                    </div>
                                    <div className="row">
                                      <p className="col-lg-5 col-md-4 label fw-semibold">
                                        Address
                                      </p>
                                      <p className="col-lg-7 col-md-8">
                                        {curUserInfo?.address?.length === 0 ? (
                                          <></>
                                        ) : (
                                          <>
                                            {curUserInfo.address[0].street},{" "}
                                            {curUserInfo.address[0].city},{" "}
                                            {curUserInfo.address[0].state}{" "}
                                            {curUserInfo.address[0].zip}
                                          </>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className="tab-pane active profile-edit pt-3"
                                    id="profile-edit">
                                    {/* Profile Edit Form */}
                                    <form onSubmit={submitHandler}>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="phone"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          Phone
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="phone"
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            value={form.phone}
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-2">
                                        <label
                                          htmlFor="email"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          email
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="email"
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={form.email}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="password"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          Password
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter a new password"
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="password2"
                                          className="col-md-4 col-lg-3 col-form-label"></label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={password2Handler}
                                            name="password2"
                                            type="password"
                                            className="form-control"
                                            id="password2"
                                            placeholder="Please confirm your password"
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="street"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          Street
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="street"
                                            type="text"
                                            className="form-control"
                                            id="street"
                                            value={form.address[0].street}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="city"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          City
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="city"
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            value={form.address[0].city}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="state"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          State
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="state"
                                            type="text"
                                            className="form-control"
                                            id="state"
                                            value={form.address[0].state}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor="zip"
                                          className="col-md-4 col-lg-3 col-form-label">
                                          Zip
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            onChange={changeHandler}
                                            name="zip"
                                            type="text"
                                            className="form-control"
                                            id="zip"
                                            value={form.address[0].zip}
                                          />
                                        </div>
                                      </div>

                                      {/* </div> */}
                                      {!isDisabled && (
                                        <div className="text-center ">
                                          <button
                                            type="submit"
                                            className="btn btn-success col-12 col-sm-3 my-2">
                                            Save
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-success bg-secondary border-secondary col-12 col-sm-3 mx-sm-5 my-md-1"
                                            onClick={() =>
                                              discardClickHandler()
                                            }>
                                            Cancel
                                          </button>
                                        </div>
                                      )}
                                    </form>
                                    {/* End Profile Edit Form */}
                                  </div>
                                )}
                                <div
                                  className="tab-pane fade pt-3"
                                  id="profile-settings"></div>
                              </div>
                              {/* End Bordered Tabs */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </>
                  )}
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
      ) : (
        <Logedout />
      )}{" "}
    </div>
  );
}

export default PharmacistProfile;
