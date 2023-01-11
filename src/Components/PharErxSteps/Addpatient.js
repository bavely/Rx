import React, { useState, useEffect } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import helper from "../../utils/helper";

function Addpatient(props) {
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
  const userId = sessionStorage.getItem("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: 2,
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber_1: "",
    phoneNumber_2: "",
    pharmacistID: userId,
    providerID: props.data.provider_id,
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
    pharmacistHelper.handleAddPatient(formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setMsg(res.data.message);
        setFlag(true);
      } else {
        setMsg("Something went wrong");
      }
    });
  };
  return (
    <div>
      <h1>Add New Patient</h1>
      <form
        className="row g-3 needs-validation"
        onSubmit={handleSubmit}
        noValidate
      >
        <>
          {msg === "Something went wrong" ? (
            <div class="alert alert-danger" role="alert">
              <p>Something went wrong</p>{" "}
            </div>
          ) : (
            <></>
          )}
        </>
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
          <div className="invalid-feedback">Please Enter Last Name.</div>
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
        {/* <div className="col-md-6">
        <label htmlFor="inputPassword4" className="form-label">Password</label>
        <input onChange={handleChange} name='password' type="password" className="form-control" id="inputPassword4" required/>
        <div className="invalid-feedback">
          Please Create A Password.
        </div>
      </div> */}
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
          <label htmlFor="DOB" className="form-label">
            DOB
          </label>
          <input
            onChange={handleChange}
            name="DOB"
            type="date"
            className="form-control"
            id="DOB"
            required
          />
          <div className="invalid-feedback">Please Enter DOB.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <input
            onChange={handleChange}
            name="weight"
            type="number"
            className="form-control"
            id="weight"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="height" className="form-label">
            Height
          </label>
          <input
            onChange={handleChange}
            name="height"
            type="number"
            className="form-control"
            id="height"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="allergies" className="form-label">
            Allergies
          </label>
          <input
            onChange={handleChange}
            name="allergies"
            type="text"
            className="form-control"
            id="allergies"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="SSN" className="form-label">
            SSN
          </label>
          <input
            onChange={handleChange}
            name="SSN"
            type="text"
            pattern="[0-9]{9}"
            className="form-control"
            id="SSN"

          required/>
          <div className="invalid-feedback">Please Enter A Valid SSN.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="phoneNumber_1" className="form-label">
            Phone Number
          </label>
          <input
            onChange={handleChange}
            name="phoneNumber_1"
            type="tel"
            className="form-control"
            id="phoneNumber_1"
            autoComplete="tel"
            pattern="[0-9]{10}"
          required/>
          <div className="invalid-feedback">Please Enter A Valid Phone Number.</div>
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
          <label htmlFor="race" className="form-label">
            Race
          </label>
          <select
            aria-label="Default select example"
            onChange={handleChange}
            name="race"
            type="text"
            className="form-control form-select"
            id="race"
          >
            <option>Select an option</option>
            <option>White</option>
            <option>African American</option>
            <option>Hispanic</option>
            <option>Asian</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            onChange={handleChange}
            name="gender"
            type="text"
            className="form-control"
            id="gender"
          >
            <option>Select an option</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-12"></div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
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
                props.onAddpt(
                  formData.firstName,
                  formData.lastName,
                  formData.DOB
                )
              }
              className="btn btn-primary"
            >
              Next
            </button>
          </>
        ) : null}
      </>
    </div>
  );
}

export default Addpatient;
