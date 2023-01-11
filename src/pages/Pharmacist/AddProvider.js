import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Header from "./Header";
import Logedout from "../../Components/Logout/Logedout";
import { useNavigate } from "react-router-dom";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import helper from "../../utils/helper";
import providerHelper from "../../utils/Provider_Helper";

const initialForm = {
  first: "",
  last: "",
  email: "",
  phone: "",
  referralSource: "",
  DEA: "",
  NPI: "",
  stateLicense: "",
  website: "",
  faxNumber: "",
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
      name: "",
      relation: "",
      altPhone: "",
    },
  ],
  pharmacyID: "",
};

const AddProvider = () => {
  const logedin = sessionStorage.getItem("logedin");
  const { addNewProvider } = pharmacistHelper;

  const [form, setForm] = useState(initialForm);
  const [errMsg, setErrMsg] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [npiSuggestions, setNpiSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleGetNpi = (e) => {
    const { name, value } = e.target;

    if (name === "NPI" && value !== "") {
      providerHelper.NPI(value, "", "").then((res) => {
        setNpiSuggestions(res.data);
      });
    } else if (name === "first" && value !== "") {
      providerHelper.NPI("", value, "").then((res) => {
        setNpiSuggestions(res.data);
      });
    } else if (name === "last" && value !== "") {
      providerHelper.NPI("", "", value).then((res) => {
        setNpiSuggestions(res.data);
      });
    }
  };
 
  const handleGetAddress = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setAddressSuggestions([]);
    } else {
      helper.handleAddresses(value).then((res) => {
        setAddressSuggestions(res);
      });
    }
  };

  const changeHandler = (e) => {
    if (["street", "city", "zip", "state"].some((el) => el === e.target.name)) {
      if (e.target.name === "street" && e.target.value.split(",")) {
        let addrauto = e.target.value.split(",");
        let state = addrauto[addrauto.length - 1].split(" ").length > 1 ? addrauto[addrauto.length - 1].split(" ") : ["", ""];
        setForm({
          ...form,
          address: [
            {
              ...form.address[0],
              street: addrauto[0],
              city: addrauto[1],
              state: state[0],
              zip: state[1],
            },
          ],
        });
      } else {
        setForm({
          ...form,
          address: [{ ...form.address[0], [e.target.name]: e.target.value }],
        });
      }
    } else if(["NPI", "first", "last"].some((el) => el === e.target.name)){

    if(e.target.value.split(",")[0].split(":")[1])  {

      let first = e.target.value.split(",")[0].split(":")[1];
      let last = e.target.value.split(",")[1].split(":")[1];
      let npi = e.target.value.split(",")[2].split(":")[1];
     let addressFromNpi = npiSuggestions.filter((el) => el.number === npi.trim() )

      setForm({
        ...form,
        NPI: npi.trim(),
        first: first.trim(),
        last: last.trim(),
        phone: addressFromNpi.length > 0 ? addressFromNpi[0].addresses[0].telephone_number.replace(/[^0-9\.]+/g, ''):form.phone,
        address: addressFromNpi.length > 0 ? [{...form.address[0],street: addressFromNpi[0].addresses[0].address_1, city: addressFromNpi[0].addresses[0].city, state: addressFromNpi[0].addresses[0].state, zip: addressFromNpi[0].addresses[0].postal_code}]:[{...form.address}]
      });
    }else{

      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }


      
    

    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setErrMsg("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNewProvider(form)
      .then(() => {
        setForm(initialForm);
        navigate("/provider_manage");
      })
      .catch((err) => setErrMsg(err.response.data.message));
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
                <h1>Add New Provider</h1>
                <form className="container" onSubmit={submitHandler}>
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
                        onKeyUp={handleGetNpi}
                        list="npiSuggestionsName"
                      />
                      <datalist id="npiSuggestionsName">
                        {npiSuggestions.length > 0 ? (
                          npiSuggestions.map((item, key) => (
                            <option
                              key={key}
                              value={`First Name: ${item.basic.first_name},---Last Name: ${item.basic.last_name},---NPI: ${item.number}`}
                            />
                          ))
                        ) : (
                          <>No Data</>
                        )}
                      </datalist>
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
                        onKeyUp={handleGetNpi}
                        list="npiSuggestionslName"
                      />
                      <datalist id="npiSuggestionslName">
                        {npiSuggestions.length > 0 ? (
                          npiSuggestions.map((item, key) => (
                            <option
                              key={key}
                              value={`First Name: ${item.basic.first_name},---Last Name: ${item.basic.last_name},---NPI: ${item.number}`}
                            />
                          ))
                        ) : (
                          <>No Data</>
                        )}
                      </datalist>
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
                    <div className="form-group col">
                      <label htmlFor="website" className="form-label pt-1">
                        WebSite
                      </label>
                      <input
                        name="website"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="website"
                        placeholder="ex: www.provider.com"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="NPI" className="form-label pt-1">
                        NPI
                      </label>
                      <input
                        onKeyUp={handleGetNpi}
                        name="NPI"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="NPI"
                        value={form.NPI}
                        list="npiSuggestionsNpi"
                      />
                      <datalist id="npiSuggestionsNpi">
                        {npiSuggestions.length > 0 ? (
                          npiSuggestions.map((item, key) => (
                            <option
                              key={key}
                              value={`First Name: ${item.basic.first_name},---Last Name: ${item.basic.last_name},---NPI: ${item.number}`}
                            />
                          ))
                        ) : (
                          <>No Data</>
                        )}
                      </datalist>
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="DEA" className="form-label pt-1">
                        DEA
                      </label>
                      <input
                        name="DEA"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="DEA"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="stateLicense" className="form-label pt-1">
                        State License
                      </label>
                      <input
                        name="stateLicense"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="stateLicense"
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label
                        htmlFor="referralSource"
                        className="form-label pt-1"
                      >
                        Referral Source
                      </label>
                      <input
                        name="referralSource"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="referralSource"
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
                        value={form.phone}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6 ">
                      <label htmlFor="faxNumber" className="form-label pt-1">
                        Fax Number
                      </label>
                      <input
                        name="faxNumber"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="faxNumber"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <label htmlFor="street" className="form-label pt-1">
                        Street
                      </label>
                      <input
                        onKeyUp={handleGetAddress}
                        name="street"
                        onChange={changeHandler}
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder="ex: 123 Main street"
                        list="addressesList"
                        value={form.address[0].street}
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
                  </div>
                  <div className="row">
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
                        value={form.address[0].city}
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
                        value={form.address[0].state}
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
                        value={form.address[0].zip}
                      />
                    </div>
                  </div>
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

export default AddProvider;
