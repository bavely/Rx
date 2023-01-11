import React, { useState, useEffect } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import helper from "../../utils/helper";
function Addprovider(props) {
  // ============================================================//
  // ============================================================//
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  // ============================================================//
  // ============================================================//

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: 1,
    NPI: "",
    referralSource: "",
    DEA: "",
    stateLicense: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zipCode: "",
    keyContact: "",
    phoneNumber_1: "",
    phoneNumber_2: "",
    website: "",
    faxNumber: "",
  });

  const [flag, setFlag] = useState(false);
  const [msg, setMsg] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addressval, setAddressval] = useState({
    city: formData.city,
    postal: formData.zipCode,
    state: formData.state,
    street: formData.address_1,
  });

  // useEffect(() => {
  //   setFormData({formData
  //   })
  // }, [formData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(event.target.value);
    if (event.target.name === "address_1" && event.target.value !== "") {
      helper.handleAddresses(event.target.value).then((res) => {
        console.log(res);
        setAddresses(res);
      });
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    let target = e.target.value.split(",");
    console.log(target[2]);
    if (
      target[0] !== "" &&
      target[1] === undefined &&
      target[2] === undefined &&
      target[3] === undefined &&
      target[4] === undefined
    ) {
      console.log("I am here");
      return null;
    } else {
      formData.address_1 = target[0];
      formData.city = target[1];
      formData.state = target[2];
      formData.zipCode = target[3];
      setFormData(formData);
    }
    console.log(formData);
    console.log(target);
  };
  console.log(formData);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    pharmacistHelper.handleAddProvider(formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setMsg(res.data.message);
        setFlag(true);
      }
    });
  };
  return (
    <div>
      <h1>Add New Provider</h1>
      <form
        className="row g-3 needs-validation"
        onSubmit={handleSubmit}
        noValidate>
        <div className="col-md-6">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            onChange={handleChange}
            name="firstName"
            type="text"
            className="form-control"
            id="fname"
            required
          />
          <div className="invalid-feedback">Please Enter First Name.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            onChange={handleChange}
            name="lastName"
            type="text"
            className="form-control"
            id="lname"
            required
          />
          <div className="invalid-feedback">Please Enter First Name.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="inputEmail4"
            required
          />
          <div className="invalid-feedback">Please Enter An Email.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="inputPassword4"
            required
          />
          <div className="invalid-feedback">Please Create A Password.</div>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            onSelect={handleSelect}
            onChange={handleChange}
            value={formData.address_1}
            list="datalistOptions"
            name="address_1"
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
          <datalist id="datalistOptions">
            {addresses.map((address, i) => (
              <option key={i}>
                {address.street},{address.city},{address.state},{address.postal}
              </option>
            ))}
          </datalist>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            onChange={handleChange}
            name="address_2"
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            value={formData.city}
            onChange={handleChange}
            name="city"
            type="text"
            className="form-control"
            id="inputCity"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <input
            value={formData.state}
            onChange={handleChange}
            name="state"
            type="text"
            className="form-control"
            id="inputCity"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            value={formData.zipCode}
            onChange={handleChange}
            name="zipCode"
            type="text"
            className="form-control"
            id="inputZip"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="NPI" className="form-label">
            NPI
          </label>
          <input
            onChange={handleChange}
            name="NPI"
            type="number"
            className="form-control"
            id="NPI"
            required
          />
          <div className="invalid-feedback">Please Enter An NPI.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="referralSource" className="form-label">
            Referral Source
          </label>
          <input
            onChange={handleChange}
            name="referralSource"
            type="text"
            className="form-control"
            id="referralSource"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="DEA" className="form-label">
            DEA
          </label>
          <input
            onChange={handleChange}
            name="DEA"
            type="number"
            className="form-control"
            id="DEA"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="stateLicense" className="form-label">
            State License
          </label>
          <input
            onChange={handleChange}
            name="stateLicense"
            type="number"
            className="form-control"
            id="stateLicense"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="keyContact" className="form-label">
            Key Contact
          </label>
          <input
            onChange={handleChange}
            name="keyContact"
            type="text"
            className="form-control"
            id="keyContact"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phoneNumber_1" className="form-label">
            Phone Number
          </label>
          <input
            onChange={handleChange}
            name="phoneNumber_1"
            type="number"
            className="form-control"
            id="phoneNumber_1"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phoneNumber_2" className="form-label">
            Secondary Phone Number
          </label>
          <input
            onChange={handleChange}
            name="phoneNumber_2"
            type="number"
            className="form-control"
            id="phoneNumber_2"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            onChange={handleChange}
            name="website"
            type="text"
            className="form-control"
            id="website"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="faxNumber" className="form-label">
            Fax Number
          </label>
          <input
            onChange={handleChange}
            name="faxNumber"
            type="number"
            className="form-control"
            id="faxNumber"
          />
        </div>
        <div className="col-12"></div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
      <>
        {flag ? (
          <>
            <p>{msg}. Click Next To Continue.</p>
            <button
              onClick={() =>
                props.onAddprovider(
                  formData.firstName,
                  formData.lastName,
                  formData.NPI
                )
              }
              className="btn btn-success">
              Next
            </button>
          </>
        ) : null}
      </>
    </div>
  );
}

export default Addprovider;
