import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Header from "./Header";
import Logedout from "../../Components/Logout/Logedout";
import { useNavigate, Link } from "react-router-dom";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import helper from "../../utils/helper";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const initialForm = {
  first: "",
  last: "",
  email: "",
  phone: "",
  DOB: "",
  gender: "",
  race: "",
  height: "",
  weight: "",
  SSN: "",
  address: [
    {
      name: "",
      relation: "",
      street: "",
      city: "",
      zip: "",
      state: "",
    },
  ],
  ContactInfo: [
    {
      emName: "",
      emRelation: "",
      altPhone: "",
    },
  ],
  pharmacyID: "",
};

const AddPatient = () => {
  const logedin = sessionStorage.getItem("logedin");

  const [form, setForm] = useState(initialForm);
  const [errMsg, setErrMsg] = useState("");
  const [addresses, setAddresses] = useState(1);
  const [emContacts, setEmContacts] = useState(1);
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const { addNewPatient } = pharmacistHelper;
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add new patients from a CSV file
    </Tooltip>
  );

  const handleAddresses = (e) => {
    if (e.target.value === "") {
      setAddressSuggestions([]);
    } else {
      helper.handleAddresses(e.target.value).then((res) => {
        setAddressSuggestions(res);
      });
    }
  };

  const changeHandler = (e) => {
    if (
      ["street", "city", "zip", "state", "name", "relation"].some(
        (el) => el === e.target.name
      )
    ) {
      let index = Number(e.target.attributes.order.value);
      if (e.target.name === "street") {
        let addrauto = e.target.value.split(",");
        let state =
          addrauto[addrauto.length - 1].split(" ").length > 1
            ? addrauto[addrauto.length - 1].split(" ")
            : ["", ""];
        console.log(state);

        if (form.address[index]) {
          setForm({
            ...form,
            address: form.address.map((el, idx) => {
              if (idx !== index) {
                return el;
              } else {
                return {
                  ...el,
                  street: addrauto[0],
                  city: addrauto[1],
                  state: state[0],
                  zip: state[1],
                };
              }
            }),
          });
        } else {
          setForm({
            ...form,
            address: [
              ...form.address,
              (form.address[index] = initialForm.address[0]),
            ],
          });
          setForm({
            ...form,
            address: form.address.map((el, idx) => {
              if (idx !== index) {
                return el;
              } else {
                return {
                  ...el,
                  street: addrauto[0],
                  city: addrauto[1],
                  state: state[0],
                  zip: state[1],
                };
              }
            }),
          });
        }
      } else {
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
            (form.ContactInfo[index] = initialForm.ContactInfo[0]),
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
    setErrMsg("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNewPatient(form)
      .then(() => {
        setForm(initialForm);
        navigate("/patient_manage_ph");
      })
      .catch((err) => {
        setErrMsg(err.response?.data?.message || err?.message);
      });
  };

  useEffect(() => {
    const pharmacy = sessionStorage.getItem("pharmacy");
    setForm({ ...form, pharmacyID: pharmacy });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {logedin ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <h1>Add New Patient</h1>
                <form className="container" onSubmit={submitHandler}>
                  <div className="row">
                    <div className=" col-md-6">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <Link
                          to="/bulk_create_patients"
                          className="mb-3"
                          style={{
                            textDecorationLine: "none",
                            color: "#25649e",
                          }}
                        >
                          <i
                            className="fa fa-upload "
                            style={{ marginRight: "5px" }}
                          ></i>
                          Upload CSV File
                        </Link>
                      </OverlayTrigger>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="first" className="form-label pt-1">
                        First Name&nbsp;<span className="requiredField">*</span>
                      </label>
                      <input
                        name="first"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="first"
                        placeholder="ex: John"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="last" className="form-label pt-1">
                        Last Name&nbsp;<span className="requiredField">*</span>
                      </label>
                      <input
                        name="last"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="last"
                        placeholder="ex: Smith"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="email" className="form-label pt-1">
                        Email Address
                      </label>
                      <input
                        name="email"
                        onChange={changeHandler}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="ex: name@example.com"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="phone" className="form-label pt-1">
                        Phone
                      </label>
                      <input
                        name="phone"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="phone"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="DOB" className="form-label pt-1">
                        Date of Birth
                      </label>
                      <input
                        name="DOB"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="DOB"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="gender" className="form-label pt-1">
                        Gender
                      </label>
                      <input
                        name="gender"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="gender"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="race" className="form-label pt-1">
                        Race
                      </label>
                      <input
                        name="race"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="race"
                      />
                    </div>

                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="height" className="form-label pt-1">
                        Height
                      </label>
                      <input
                        name="height"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="height"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="weight" className="form-label pt-1">
                        Weight
                      </label>
                      <input
                        name="weight"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="weight"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="SSN" className="form-label pt-1">
                        SSN
                      </label>
                      <input
                        name="SSN"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="SSN"
                      />
                    </div>
                  </div>
                  {[...Array(addresses)].map((el, idx) => {
                    return (
                      <div className="row" key={idx}>
                        {idx > 0 && (
                          <>
                            <div className="form-group col-12 col-md-6">
                              <label htmlFor="name" className="form-label pt-1">
                                In Care Of
                              </label>
                              <input
                                name="name"
                                onChange={changeHandler}
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="ex: John Smith"
                                order={idx}
                              />
                            </div>
                            <div className="form-group col-12 col-md-6">
                              <label
                                htmlFor="relation"
                                className="form-label pt-1"
                              >
                                Relation
                              </label>
                              <input
                                name="relation"
                                onChange={changeHandler}
                                type="text"
                                className="form-control"
                                id="relation"
                                placeholder="ex: Father"
                                order={idx}
                              />
                            </div>
                          </>
                        )}
                        <div className="form-group col-12">
                          <label htmlFor="street" className="form-label pt-1">
                            Street
                          </label>
                          <input
                            name="street"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="street"
                            placeholder="ex: 123 Main street"
                            order={idx}
                            onKeyUp={handleAddresses}
                            list="addressesList"
                            value={form.address[idx].street}
                          />
                          <datalist id="addressesList">
                            {addressSuggestions.length > 0 ? (
                              addressSuggestions.map((item, key) => (
                                <option
                                  key={key}
                                  value={`${item.street},${item.city},${item.state} ${item.postal}`}
                                />
                              ))
                            ) : (
                              <>No Data</>
                            )}
                          </datalist>
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <label htmlFor="city" className="form-label pt-1">
                            City
                          </label>
                          <input
                            name="city"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="ex: Los Angeles"
                            order={idx}
                            value={form.address[idx].city}
                          />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <label htmlFor="state" className="form-label pt-1">
                            State
                          </label>
                          <input
                            name="state"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="state"
                            placeholder="ex: CA"
                            order={idx}
                            value={form.address[idx].state}
                          />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <label htmlFor="zip" className="form-label pt-1">
                            Zip
                          </label>
                          <input
                            name="zip"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="zip"
                            placeholder="ex: 55555"
                            order={idx}
                            value={form.address[idx].zip}
                          />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <p className="form-label pt-1">
                            {idx === 0 ? "Add" : "Add/Remove"} Addditioanl
                            Address
                          </p>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              setAddresses(addresses + 1);
                              setForm({
                                ...form,
                                address: [
                                  ...form.address,
                                  {
                                    name: "",
                                    relation: "",
                                    street: "",
                                    city: "",
                                    state: "",
                                    zip: "",
                                  },
                                ],
                              });
                            }}
                          >
                            <i className="fas fa-solid fa-plus"></i>
                          </button>
                          {idx >= 1 && (
                            <button
                              type="button"
                              className="btn btn-warning  mx-4"
                              onClick={() => {
                                setAddresses(addresses - 1);
                                setForm({
                                  ...form,
                                  address: form.address.filter(
                                    (i) =>
                                      form.address.indexOf(i) !==
                                      form.address.length - 1
                                  ),
                                });
                              }}
                            >
                              <i className="fas fa-solid fa-minus"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <h6 className="mt-3">Emeregency Contacts</h6>
                  {[...Array(emContacts)].map((el, idx) => {
                    return (
                      <div className="row" key={idx}>
                        <div className="form-group col-12 col-md-4">
                          <label htmlFor="emName" className="form-label pt-1">
                            Full Name
                          </label>
                          <input
                            name="emName"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="emName"
                            placeholder="ex: John Smith"
                            order={idx}
                          />
                        </div>
                        <div className="form-group col-12 col-md-4">
                          <label
                            htmlFor="emRelation"
                            className="form-label pt-1"
                          >
                            Relation
                          </label>
                          <input
                            name="emRelation"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="emRelation"
                            placeholder="ex: Cousin"
                            order={idx}
                          />
                        </div>
                        <div className="form-group col-12 col-md-4">
                          <label htmlFor="altPhone" className="form-label pt-1">
                            Phone Number
                          </label>
                          <input
                            name="altPhone"
                            onChange={changeHandler}
                            type="text"
                            className="form-control"
                            id="altPhone"
                            order={idx}
                          />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <p className="form-label pt-1">
                            {idx === 0 ? "Add" : "Add/Remove"} Addditioanl
                            Contact
                          </p>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              setEmContacts(emContacts + 1);
                            }}
                          >
                            <i className="fas fa-solid fa-plus"></i>
                          </button>
                          {idx >= 1 && (
                            <button
                              type="button"
                              className="btn btn-warning  mx-4"
                              onClick={() => setEmContacts(emContacts - 1)}
                            >
                              <i className="fas fa-solid fa-minus"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="container">
                    <div className="row d-flex justify-content-between my-4">
                      <button
                        type="submit"
                        className="btn btn-success col-12 col-sm-3"
                      >
                        Submit
                      </button>
                      <p className="text-center text-danger col-12 col-sm-9 h6 align-self-end errMSg align-self-xs-start">
                        {errMsg}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
};

export default AddPatient;
