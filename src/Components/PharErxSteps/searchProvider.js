import React from "react";
import { useState } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import Addprovider from "./Addprovider";
function SearchProvider(props) {
  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy !== "" ? props.data.therapy : "",
    ICD10: props.data.ICD10 !== "" ? props.data.ICD10 : "",
    diagnose: props.data.diagnose !== "" ? props.data.diagnose : "",
    provider_id: props.data.provider_id !== "" ? props.data.provider_id : "",
    patient_id: props.data.patient_id !== "" ? props.data.patient_id : "",
    clinicalinfo: props.data.clinicalinfo !== "" ? props.data.clinicalinfo : [],
    medications: props.data.medications !== "" ? props.data.medications : [],
    provider_name:
      props.data.provider_name !== "" ? props.data.provider_name : "",
    patient_name: props.data.patient_name !== "" ? props.data.patient_name : "",
  });
  console.log(props.data, "props.data");
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    NPI: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formInfo);
    if (
      formInfo.firstName === "" &&
      formInfo.lastName === "" &&
      formInfo.NPI === ""
    ) {
      setMsg("Please fill at least one fields");
    } else {
      pharmacistHelper.handleSearchProvider(formInfo).then((res) => {
        if (res.status !== 200 || !res.status) {
          setMsg("Provider Not Found");
        } else {
          setMsg("");
          rx.provider_id = res.data.Provider.id;
          rx.provider_name =
            res.data.Provider.firstName + " " + res.data.Provider.lastName;
          setRx(rx);
          props.updata("spatient", rx);
        }
      });
    }
  };

  const handleAddProvider = (firstName, lastName, NPI) => {
    const dataToserver = { firstName, lastName, NPI };
    pharmacistHelper.handleSearchProvider(dataToserver).then((res) => {
      if (res.status !== 200 || !res.status) {
        setMsg("Provider Not Found");
      } else {
        setMsg("");
        rx.provider_id = res.data.Provider.id;
        rx.provider_name =
          res.data.Provider.firstName + " " + res.data.Provider.lastName;
        setRx(rx);
        props.updata("spatient", rx);
      }
    });
  };

  return (
    <div className="App">
      <>
        {msg === "Provider Not Found" ? (
          <>
            <Addprovider onAddprovider={handleAddProvider} />
          </>
        ) : (
          <>
            <h1>Find Provider</h1>
            <>{msg === "" ? <></> : <>{msg}</>}</>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    name="firstName"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="NPI"
                    aria-label="NPI"
                    name="NPI"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-grid gap-2 col-md-12 mx-auto mb-3">
                  <button className="btn btn-success" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </>
    </div>
  );
}

export default SearchProvider;
