/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import img1 from "../../images/provider_placeholder.jpg";
import pharmacistHelper from "../../utils/Pharmacist_Helper";

const ProviderDetails = ({ curUserInfo, setDetails }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const { updateProviderInfo } = pharmacistHelper;
  const {
    first,
    last,
    phone,
    email,
    NPI,
    referralSource,
    DEA,
    stateLicense,
    website,
    faxNumber,
    address,
  } = curUserInfo;

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
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setIsDisabled(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
      "password",
      "pharmacyID",
      "type",
    ].forEach((el) => delete newForm[el]);
    delete newForm.address[0].userID;
    updateProviderInfo(curUserInfo.id, newForm)
      .then(() => {
        setDetails(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return curUserInfo.id ? (
    <div className="wrapper">
      <section className="section profile container-fluid py-1">
        <button
          className="btn btn-success mb-3"
          onClick={() => setDetails(false)}>
          Go back
        </button>
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
                  Dr. {first} {last}
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
                      className={!isEdit ? "nav-link active" : "nav-link"}
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                      onClick={() => setIsEdit(false)}>
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={isEdit ? "nav-link active" : "nav-link"}
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                      onClick={() => setIsEdit(true)}>
                      Edit Provider
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2 provider_info">
                  {!isEdit ? (
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview">
                      <h4 className="card-title text-center my-3">
                        Provider Details
                      </h4>
                      <div className="row">
                        <p className="col-lg-5 col-md-4  label fw-semibold">
                          Full Name
                        </p>
                        <p className="col-lg-7 col-md-8">
                          {first} {last}
                        </p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Phone
                        </p>
                        <p className="col-lg-7 col-md-8">{phone}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Fax
                        </p>
                        <p className="col-lg-7 col-md-8">{faxNumber}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Email
                        </p>
                        <p className="col-lg-7 col-md-8">{email}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Website
                        </p>
                        <p className="col-lg-7 col-md-8">{website}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Address
                        </p>
                        <p className="col-lg-7 col-md-8">
                          {address[0].street}, {address[0].city},{" "}
                          {address[0].state} {address[0].zip}
                        </p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          NPI
                        </p>
                        <p className="col-lg-7 col-md-8">{NPI}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          DEA
                        </p>
                        <p className="col-lg-7 col-md-8">{DEA}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          State License
                        </p>
                        <p className="col-lg-7 col-md-8">{stateLicense}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label h5 fw-semibold">
                          Referral Source
                        </p>
                        <p className="col-lg-7 col-md-8">{referralSource}</p>
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
                            htmlFor="faxNumber"
                            className="col-md-4 col-lg-3 col-form-label">
                            Fax
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="faxNumber"
                              type="text"
                              className="form-control"
                              id="faxNumber"
                              value={form.faxNumber}
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
                            htmlFor="website"
                            className="col-md-4 col-lg-3 col-form-label">
                            Website
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="website"
                              type="text"
                              className="form-control"
                              id="website"
                              value={form.website}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="NPI"
                            className="col-md-4 col-lg-3 col-form-label">
                            NPI
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="NPI"
                              type="text"
                              className="form-control"
                              id="NPI"
                              value={form.NPI}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="DEA"
                            className="col-md-4 col-lg-3 col-form-label">
                            DEA
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="DEA"
                              type="text"
                              className="form-control"
                              id="DEA"
                              value={form.DEA}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="stateLicense"
                            className="col-md-4 col-lg-3 col-form-label">
                            State License
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="stateLicense"
                              type="text"
                              className="form-control"
                              id="stateLicense"
                              value={form.stateLicense}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="referralSource"
                            className="col-md-4 col-lg-3 col-form-label">
                            Referral Source
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="referralSource"
                              type="text"
                              className="form-control"
                              id="referralSource"
                              value={form.referralSource}
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
                              onClick={() => discardClickHandler()}>
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
    </div>
  ) : (
    <div>
      <h3>Loading.....</h3>
    </div>
  );
};

export default ProviderDetails;
