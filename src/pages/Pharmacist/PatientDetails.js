/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import img1 from "../../images/patient_placeholder.png";
import pharmacistHelper from "../../utils/Pharmacist_Helper";

const PatientDetails = ({ curUserInfo, setDetails }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const { updatePatientInfo } = pharmacistHelper;
  const {
    first,
    last,
    phone,
    email,
    DOB,
    SSN,
    gender,
    weight,
    race,
    height,
    address,
    ContactInfo,
  } = curUserInfo;

  useEffect(() => {
    setForm(curUserInfo);
  }, [curUserInfo]);

  const discardClickHandler = () => {
    setForm(curUserInfo);
    setIsEdit(false);
  };

  const changeHandler = (e) => {
    if (
      ["street", "city", "zip", "state", "name", "relation"].some(
        (el) => el === e.target.name
      )
    ) {
      let index = Number(e.target.attributes.order.value);
      if (form.address[index]) {
        setForm({
          ...form,
          address: form.address.map((el, idx) => {
            if (idx !== index) {
              return el;
            } else {
              return { ...el, [e.target.name]: e.target.value };
            }
          }),
        });
      } else {
        setForm({
          ...form,
          address: [
            ...form.address,
            (form.address[index] = {
              name: "",
              relation: "",
              street: "",
              city: "",
              zip: "",
              state: "",
            }),
          ],
        });
        setForm({
          ...form,
          address: form.address.map((el, idx) => {
            if (idx !== index) {
              return el;
            } else {
              return { ...el, [e.target.name]: e.target.value };
            }
          }),
        });
      }
    } else if (
      ["emName", "emRelation", "altPhone"].some((el) => el === e.target.name)
    ) {
      let index = Number(e.target.attributes.order.value);
      if (form.ContactInfo[index]) {
        setForm({
          ...form,
          ContactInfo: form.ContactInfo.map((el, idx) => {
            if (idx !== index) {
              return el;
            } else {
              return { ...el, [e.target.name]: e.target.value };
            }
          }),
        });
      } else {
        setForm({
          ...form,
          ContactInfo: [
            ...form.ContactInfo,
            (form.ContactInfo[index] = {
              emName: "",
              emRelation: "",
              altPhone: "",
            }),
          ],
        });
        setForm({
          ...form,
          ContactInfo: form.ContactInfo.map((el, idx) => {
            if (idx !== index) {
              return el;
            } else {
              return { ...el, [e.target.name]: e.target.value };
            }
          }),
        });
      }
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
    newForm.address.forEach((el) => delete el.userID);
    newForm.ContactInfo.forEach((el) => delete el.userID);
    updatePatientInfo(curUserInfo.id, newForm)
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
                  {first} {last}
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
                      Edit Patient
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2 provider_info">
                  {!isEdit ? (
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview">
                      <h4 className="card-title text-center my-3">
                        Patient Details
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
                          DOB
                        </p>
                        <p className="col-lg-7 col-md-8">{DOB}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label h5 fw-semibold">
                          Gender
                        </p>
                        <p className="col-lg-7 col-md-8">{gender}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Weight
                        </p>
                        <p className="col-lg-7 col-md-8">{weight}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Height
                        </p>
                        <p className="col-lg-7 col-md-8">{height}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Race
                        </p>
                        <p className="col-lg-7 col-md-8">{race}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          SSN
                        </p>
                        <p className="col-lg-7 col-md-8">{SSN}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Phone
                        </p>
                        <p className="col-lg-7 col-md-8">{phone}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Email
                        </p>
                        <p className="col-lg-7 col-md-8">{email}</p>
                      </div>
                      <div className="row">
                        <p className="col-lg-5 col-md-4 label fw-semibold">
                          Address
                        </p>
                        {address[0].street && (
                          <p className="col-lg-7 col-md-8">
                            {address[0].street}, {address[0].city},{" "}
                            {address[0].state} {address[0].zip}
                          </p>
                        )}
                      </div>
                      {curUserInfo.address.length > 1 ||
                      curUserInfo.ContactInfo[0].altPhone ? (
                        <hr />
                      ) : null}
                      {curUserInfo.address.length > 1 &&
                        curUserInfo.address[0].street &&
                        curUserInfo.address.map((el, idx) => {
                          return (
                            idx > 0 && (
                              <div className="row" key={idx}>
                                <p className="col-lg-5 col-md-4 label fw-semibold mb-md-0">
                                  Additional Address
                                  {curUserInfo.address.length > 2 && idx}
                                </p>
                                <p className="col-lg-7 col-md-8 fs-6">
                                  {el.street}, {el.city}, {el.state} {el.zip}
                                  <br />
                                  <strong>C/O</strong>: {el.name} -&nbsp;
                                  {el.relation}
                                </p>
                              </div>
                            )
                          );
                        })}
                      {curUserInfo.ContactInfo[0].altPhone &&
                        ContactInfo.map((el, idx) => {
                          return (
                            <div key={idx * 5} className="row my-1">
                              <p className="col-lg-5 col-md-4 label fw-semibold ">
                                Emergency Contact{" "}
                                {ContactInfo.length > 1 && idx + 1}
                              </p>
                              {el.altPhone ? (
                                <p className="col-lg-7 col-md-8  fs-6">
                                  {el.emName} - {el.emRelation} - {el.altPhone}
                                </p>
                              ) : null}
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div
                      className="tab-pane active profile-edit pt-3"
                      id="profile-edit">
                      {/* Profile Edit Form */}
                      <form onSubmit={submitHandler}>
                        <div className="row mb-2">
                          <label
                            htmlFor="DOB"
                            className="col-md-4 col-lg-3 col-form-label">
                            DOB
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="DOB"
                              type="text"
                              className="form-control"
                              id="DOB"
                              value={form.DOB}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="gender"
                            className="col-md-4 col-lg-3 col-form-label">
                            Gender
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="gender"
                              type="text"
                              className="form-control"
                              id="gender"
                              value={form.gender}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="weight"
                            className="col-md-4 col-lg-3 col-form-label">
                            Weight
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="weight"
                              type="text"
                              className="form-control"
                              id="weight"
                              value={form.weight}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="height"
                            className="col-md-4 col-lg-3 col-form-label">
                            Height
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="height"
                              type="text"
                              className="form-control"
                              id="height"
                              value={form.height}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="race"
                            className="col-md-4 col-lg-3 col-form-label">
                            Race
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="race"
                              type="text"
                              className="form-control"
                              id="race"
                              value={form.race}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <label
                            htmlFor="SSN"
                            className="col-md-4 col-lg-3 col-form-label">
                            SSN
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              onChange={changeHandler}
                              name="SSN"
                              type="text"
                              className="form-control"
                              id="SSN"
                              value={form.SSN}
                            />
                          </div>
                        </div>
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
                            htmlFor="street"
                            className="col-md-4 col-lg-3 col-form-label">
                            Street
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              order={0}
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
                              order={0}
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
                              order={0}
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
                              order={0}
                              onChange={changeHandler}
                              name="zip"
                              type="text"
                              className="form-control"
                              id="zip"
                              value={form.address[0].zip}
                            />
                          </div>
                        </div>
                        {(form.address.length > 1 ||
                          form.ContactInfo.length > 0) && (
                          <div>
                            <hr />
                            <h4 className="text-center mb-4">
                              Additional Information
                            </h4>
                            {form.address.length > 1 &&
                              form.address.map((el, idx) => {
                                return (
                                  idx > 0 &&
                                  el.street && (
                                    <div key={idx * 23}>
                                      <p className="col-lg-7 col-md-7 ">
                                        Additional Address
                                        {curUserInfo.address.length > 2 && idx}
                                      </p>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor={`street${idx}`}
                                          className="col-md-4 col-lg-3 col-form-label">
                                          Street
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            order={idx}
                                            onChange={changeHandler}
                                            name="street"
                                            type="text"
                                            className="form-control"
                                            id={`street${idx}`}
                                            value={form.address[idx].street}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor={`city${idx}`}
                                          className="col-md-4 col-lg-3 col-form-label">
                                          City
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            order={idx}
                                            onChange={changeHandler}
                                            name="city"
                                            type="text"
                                            className="form-control"
                                            id={`city${idx}`}
                                            value={form.address[idx].city}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor={`state${idx}`}
                                          className="col-md-4 col-lg-3 col-form-label">
                                          State
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            order={idx}
                                            onChange={changeHandler}
                                            name="state"
                                            type="text"
                                            className="form-control"
                                            id={`state${idx}`}
                                            value={form.address[idx].state}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor={`zip${idx}`}
                                          className="col-md-4 col-lg-3 col-form-label">
                                          Zip
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            order={idx}
                                            onChange={changeHandler}
                                            name="zip"
                                            type="text"
                                            className="form-control"
                                            id={`zip${idx}`}
                                            value={form.address[idx].zip}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor={`name${idx}`}
                                          className="col-md-4 col-lg-3 col-form-label">
                                          C/O
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            order={idx}
                                            onChange={changeHandler}
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            id={`name${idx}`}
                                            value={form.address[idx].name}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <label
                                          htmlFor={`relation${idx}`}
                                          className="col-md-4 col-lg-3 col-form-label">
                                          relation
                                        </label>
                                        <div className="col-md-8 col-lg-9">
                                          <input
                                            order={idx}
                                            onChange={changeHandler}
                                            name="relation"
                                            type="text"
                                            className="form-control"
                                            id={`relation${idx}`}
                                            value={form.address[idx].relation}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                );
                              })}
                            {form.ContactInfo.length > 0 &&
                              form.ContactInfo[0].altPhone &&
                              form.ContactInfo.map((el, idx) => {
                                return (
                                  <div key={idx * 50}>
                                    <p className="col-lg-7 col-md-7 ">
                                      Emeregency contact&nbsp;
                                      {form.ContactInfo.length > 1 && idx + 1}
                                    </p>
                                    <div className="row mb-2">
                                      <label
                                        htmlFor={`emName${idx}`}
                                        className="col-md-4 col-lg-3 col-form-label">
                                        Name
                                      </label>
                                      <div className="col-md-8 col-lg-9">
                                        <input
                                          order={idx}
                                          onChange={changeHandler}
                                          name="emName"
                                          type="text"
                                          className="form-control"
                                          id={`emName${idx}`}
                                          value={form.ContactInfo[idx].emName}
                                        />
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <label
                                        htmlFor={`emRelation${idx}`}
                                        className="col-md-4 col-lg-3 col-form-label">
                                        Relation
                                      </label>
                                      <div className="col-md-8 col-lg-9">
                                        <input
                                          order={idx}
                                          onChange={changeHandler}
                                          name="emRelation"
                                          type="text"
                                          className="form-control"
                                          id={`emRelation${idx}`}
                                          value={
                                            form.ContactInfo[idx].emRelation
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <label
                                        htmlFor={`altPhone${idx}`}
                                        className="col-md-4 col-lg-3 col-form-label">
                                        Phone
                                      </label>
                                      <div className="col-md-8 col-lg-9">
                                        <input
                                          order={idx}
                                          onChange={changeHandler}
                                          name="altPhone"
                                          type="text"
                                          className="form-control"
                                          id={`altPhone${idx}`}
                                          value={form.ContactInfo[idx].altPhone}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
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

export default PatientDetails;
