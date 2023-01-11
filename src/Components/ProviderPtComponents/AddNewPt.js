import React, { useState, useEffect } from "react";
import helper from "../../utils/helper";
import providerHelper from "../../utils/Provider_Helper";
import Therapy from "../../Components/therapy" 

const AddPatient = (props) => {
  const logedin = sessionStorage.getItem("logedin");

  const [form, setForm] = useState(props.data);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [addresses, setAddresses] = useState(
    props.data.address.length > 1 ? props.data.address.length : 1
  );
  const [emContacts, setEmContacts] = useState(
    props.data.ContactInfo.length > 1 ? props.data.ContactInfo.length : 1
  );
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [inactiveformflag, setInActiveformflag] = useState(props.found);
const [addnewrxflag, setAddnewrxflag] = useState(false);
  const { handleAddpt } = providerHelper;

  console.log(form);
  console.log(inactiveformflag);

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
              (form.address[index] = props.data.address[0]),
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
            (form.ContactInfo[index] = form.ContactInfo[0]),
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
    setSuccessMsg("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleAddpt(form)
      .then((r) => {
        setForm(form);
        setInActiveformflag(true);
        r?.data?.message && setSuccessMsg(r.data.message);
      })
      .catch((err) => {
        setErrMsg(err.response?.data?.message || err?.message);
      });
  };

  useEffect(() => {
    const pharmacy = sessionStorage.getItem("pharmacy");
    const userId = sessionStorage.getItem("user");
    setForm({ ...form, pharmacyID: pharmacy, providerID: userId });
  }, []);

  return (
    <>
      <div className="row">
        <div className=" col-md">
          <button
            className=" border-0 btn btn-outline-primary"
            onClick={() => {
              props.onBackClicked();
            }}
          >
            <i className="fa fa-arrow-left fa-1x" aria-hidden="true"></i> Back
          </button>
        </div>
      </div>
      {addnewrxflag ? <Therapy pt ={form}/> : 
      <form className="container" onSubmit={submitHandler}>
        <p style={{color: "green"}}><strong>{successMsg}</strong></p>
        <fieldset disabled={inactiveformflag}>
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
                value={form.first}
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
                value={form.last}
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
                value={form.email}
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
                placeholder="ex: 1234567890"
                value={form.phone}
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
                value={form.DOB}
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
                value={form.gender}
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
                value={form.race}
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
                value={form.height}
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
                value={form.weight}
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
                value={form.SSN}
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
                        value={form.address[idx].name}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <label htmlFor="relation" className="form-label pt-1">
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
                        value={form.address[idx].relation}
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
                  {inactiveformflag ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <p className="form-label pt-1">
                        {idx === 0 ? "Add" : "Add/Remove"} Addditioanl Address
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
                      </button>{" "}
                    </>
                  )}
                  {idx >= 1 && !inactiveformflag && (
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
                    value={form.ContactInfo[idx].emName}
                  />
                </div>
                <div className="form-group col-12 col-md-4">
                  <label htmlFor="emRelation" className="form-label pt-1">
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
                    value={form.ContactInfo[idx].emRelation}
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
                    value={form.ContactInfo[idx].altPhone}
                  />
                </div>
                <div className="form-group col-12 col-md-6">
                  {inactiveformflag ? (
                    <></>
                  ) : (
                    <>
                      <p className="form-label pt-1">
                        {idx === 0 ? "Add" : "Add/Remove"} Addditioanl Contact
                      </p>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          setEmContacts(emContacts + 1);
                          setForm({
                            ...form,
                            ContactInfo: [
                              ...form.ContactInfo,
                              {
                                emName: "",
                                emRelation: "",
                                altPhone: "",
                              },
                            ],
                          });
                        }}
                      >
                        <i className="fas fa-solid fa-plus"></i>
                      </button>
                    </>
                  )}
                  {idx >= 1 && !inactiveformflag && (
                    <button
                      type="button"
                      className="btn btn-warning  mx-4"
                      onClick={() => {
                        setEmContacts(emContacts - 1);
                        setForm({
                          ...form,
                          ContactInfo: form.ContactInfo.filter(
                            (i) =>
                              form.ContactInfo.indexOf(i) !==
                              form.ContactInfo.length - 1
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
          {inactiveformflag ? (
            <></>
          ) : (
            <div className="container ">
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
          )}
        </fieldset>
        {inactiveformflag && (
          <div className="container float-end">
            <div className="row d-flex justify-content-between my-4">
              <button type="button" className="btn btn-success col-12 col-sm-3" onClick={()=>{
                setAddnewrxflag(true)
              }}>
                Next / Add Rx
                <i
                  class="fa fa-forward "
                  aria-hidden="true"
                  style={{ marginLeft: "10px" }}
                ></i>
              </button>
            </div>
          </div>
        )}
      </form>}
    </>
  );
};

export default AddPatient;
